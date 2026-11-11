export type ProviderToken = {
  id_token: string;
  nonce: string;
  name?: string;
  surname?: string;
};

export type PreparedProvider = { request: () => Promise<ProviderToken> };

export type GoogleButton = {
  render: (parent: HTMLElement, width: number) => void;
};

export const CANCELLED = "cancelled";

const GOOGLE_SRC = "https://accounts.google.com/gsi/client";
const APPLE_SRC =
  "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential?: string }) => void;
    nonce: string;
    context: "signin" | "signup";
    ux_mode: "popup";
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      type: "standard";
      theme: "outline";
      size: "large";
      text: "signin_with" | "signup_with";
      shape: "rectangular";
      logo_alignment: "center";
      width: number;
    },
  ) => void;
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
  onToken: (token: ProviderToken) => void,
): Promise<GoogleButton> {
  if (!window.google) await loadScript(GOOGLE_SRC);
  const id = window.google?.accounts.id;
  if (!id) throw new Error("Google sign-in did not load");
  const nonce = await createNonce();

  id.initialize({
    client_id: clientId,
    nonce: nonce.hashed,
    context,
    ux_mode: "popup",
    callback: ({ credential }) => {
      if (credential) onToken({ id_token: credential, nonce: nonce.raw });
    },
  });

  return {
    render: (parent, width) =>
      id.renderButton(parent, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: context === "signup" ? "signup_with" : "signin_with",
        shape: "rectangular",
        logo_alignment: "center",
        width,
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
