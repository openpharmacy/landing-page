export type ProviderToken = {
  id_token: string;
  nonce: string;
  name?: string;
  surname?: string;
};

export type PreparedProvider = { request: () => Promise<ProviderToken> };

export const CANCELLED = "cancelled";

const GOOGLE_SRC = "https://accounts.google.com/gsi/client";
const APPLE_SRC =
  "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";

type PromptNotification = {
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
};

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential?: string }) => void;
    nonce: string;
    context: "signin" | "signup";
    use_fedcm_for_prompt: boolean;
  }) => void;
  prompt: (listener: (notification: PromptNotification) => void) => void;
};

type AppleIdAuth = {
  init: (config: {
    clientId: string;
    scope: string;
    redirectURI: string;
    usePopup: boolean;
    nonce: string;
  }) => void;
  signIn: () => Promise<{
    authorization: { id_token: string };
    user?: { name?: { firstName?: string; lastName?: string } };
  }>;
};

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
    AppleID?: { auth: AppleIdAuth };
  }
}

const scripts = new Map<string, Promise<void>>();

export function loadScript(src: string): Promise<void> {
  let loading = scripts.get(src);
  if (!loading) {
    loading = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scripts.delete(src);
        reject(new Error(`Could not load ${src}`));
      };
      document.head.append(script);
    });
    scripts.set(src, loading);
  }
  return loading;
}

export async function createNonce(): Promise<{ raw: string; hashed: string }> {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const raw = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(raw),
  );
  const hashed = Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
  return { raw, hashed };
}

export async function prepareGoogle(
  clientId: string,
  context: "signin" | "signup",
): Promise<PreparedProvider> {
  if (!window.google) await loadScript(GOOGLE_SRC);
  const id = window.google?.accounts.id;
  if (!id) throw new Error("Google sign-in did not load");
  const nonce = await createNonce();

  let pending: {
    resolve: (token: ProviderToken) => void;
    reject: (error: Error) => void;
  } | null = null;
  const settle = () => {
    const current = pending;
    pending = null;
    return current;
  };

  id.initialize({
    client_id: clientId,
    nonce: nonce.hashed,
    context,
    use_fedcm_for_prompt: true,
    callback: ({ credential }) => {
      const current = settle();
      if (credential)
        current?.resolve({ id_token: credential, nonce: nonce.raw });
      else current?.reject(new Error(CANCELLED));
    },
  });

  return {
    request: () =>
      new Promise<ProviderToken>((resolve, reject) => {
        pending = { resolve, reject };
        id.prompt((notification) => {
          if (notification.isSkippedMoment()) {
            settle()?.reject(
              new Error("Google sign-in could not open. Try again later."),
            );
          } else if (
            notification.isDismissedMoment() &&
            notification.getDismissedReason() !== "credential_returned"
          ) {
            settle()?.reject(new Error(CANCELLED));
          }
        });
      }),
  };
}

export async function prepareApple(
  servicesId: string,
): Promise<PreparedProvider> {
  if (!window.AppleID) await loadScript(APPLE_SRC);
  const auth = window.AppleID?.auth;
  if (!auth) throw new Error("Apple sign-in did not load");
  const nonce = await createNonce();

  auth.init({
    clientId: servicesId,
    scope: "name email",
    redirectURI: `${window.location.origin}/sign-in`,
    usePopup: true,
    nonce: nonce.hashed,
  });

  return {
    async request() {
      let response;
      try {
        response = await auth.signIn();
      } catch (error) {
        const code = (error as { error?: unknown } | null)?.error;
        throw new Error(
          code === "popup_closed_by_user" || code === "user_cancelled_authorize"
            ? CANCELLED
            : "Apple sign-in failed. Please try again.",
        );
      }
      return {
        id_token: response.authorization.id_token,
        nonce: nonce.raw,
        name: response.user?.name?.firstName || undefined,
        surname: response.user?.name?.lastName || undefined,
      };
    },
  };
}
