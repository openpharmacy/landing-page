"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { isMockingEnabled } from "@/config/env";

import type { Provider, ProviderPayload } from "../api/auth-api";
import {
  CANCELLED,
  type GoogleButton,
  prepareApple,
  prepareGoogle,
  type PreparedProvider,
  type ProviderToken,
} from "../api/provider-sdk";
import type { GoogleAccount } from "../components/google-account-modal";
import { useAuthActions } from "./use-auth-actions";

const googleClientId = () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const appleServicesId = () => process.env.NEXT_PUBLIC_APPLE_SERVICES_ID ?? "";

const UNAVAILABLE = {
  "sign-in": "Social sign-in isn't available yet.",
  "sign-up": "Social sign-up isn't available yet.",
} as const;

const NOT_LOADED = {
  google: "Google sign-in could not load. Check your connection and try again.",
  apple: "Apple sign-in could not load. Check your connection and try again.",
} as const;

const MOCK_ID_TOKEN = "mock-google-id-token";

type Intent = keyof typeof UNAVAILABLE;

export function useSocialSignIn(intent: Intent, next: string | null = null) {
  const router = useRouter();
  const { signInWithProvider } = useAuthActions();
  const [notice, setNotice] = useState<string | null>(null);
  const [mockOpen, setMockOpen] = useState(false);
  const [googleButton, setGoogleButton] = useState<GoogleButton | null>(null);
  const loading = useRef<
    Partial<Record<Provider, Promise<GoogleButton | PreparedProvider>>>
  >({});
  const apple = useRef<PreparedProvider | null>(null);
  const waiting = useRef(false);
  const onGoogleToken = useRef<(token: ProviderToken) => void>(() => {});

  const prepare = useCallback(
    (provider: Provider) => {
      const id = provider === "google" ? googleClientId() : appleServicesId();
      if (!id) return null;
      let pending = loading.current[provider];
      if (!pending) {
        pending =
          provider === "google"
            ? prepareGoogle(
                id,
                intent === "sign-up" ? "signup" : "signin",
                (token) => onGoogleToken.current(token),
              )
            : prepareApple(id);
        loading.current[provider] = pending;
        pending.then(
          (prepared) => {
            if (provider === "google") {
              setGoogleButton(prepared as GoogleButton);
            } else {
              apple.current = prepared as PreparedProvider;
            }
          },
          (error: unknown) => {
            console.warn(error);
            delete loading.current[provider];
          },
        );
      }
      return pending;
    },
    [intent],
  );

  useEffect(() => {
    if (isMockingEnabled) return;
    for (const provider of ["google", "apple"] as const) {
      prepare(provider)?.catch(() => {});
    }
  }, [prepare]);

  async function finish(
    provider: Provider,
    token: Promise<ProviderPayload>,
    mockAccount?: GoogleAccount | null,
  ) {
    try {
      const { isNewUser } = await signInWithProvider(provider, await token);
      if (isNewUser || (isMockingEnabled && intent === "sign-up")) {
        const query = new URLSearchParams();
        if (mockAccount) {
          query.set("first", mockAccount.first);
          query.set("last", mockAccount.last);
        }
        if (next) query.set("next", next);
        const search = query.toString();
        router.push(`/sign-up/google${search ? `?${search}` : ""}`);
        router.refresh();
        return;
      }
      router.push(next ?? "/home");
      router.refresh();
    } catch (error) {
      if (error instanceof Error && error.message === CANCELLED) return;
      setNotice(error instanceof Error ? error.message : UNAVAILABLE[intent]);
    }
  }

  async function start(provider: Provider) {
    setNotice(null);
    if (isMockingEnabled) {
      if (provider === "google") setMockOpen(true);
      else setNotice(UNAVAILABLE[intent]);
      return;
    }
    if (provider === "apple" && apple.current) {
      void finish(provider, apple.current.request());
      return;
    }
    const pending = prepare(provider);
    if (!pending) {
      setNotice(UNAVAILABLE[intent]);
      return;
    }
    if (waiting.current) return;
    waiting.current = true;
    try {
      const loaded = await pending;
      if (provider === "apple") {
        void finish(provider, (loaded as PreparedProvider).request());
      }
    } catch {
      setNotice(NOT_LOADED[provider]);
    } finally {
      waiting.current = false;
    }
  }

  useEffect(() => {
    onGoogleToken.current = (token) =>
      void finish("google", Promise.resolve(token));
  });

  function pickMockAccount(account: GoogleAccount | null) {
    setMockOpen(false);
    void finish(
      "google",
      Promise.resolve({ id_token: MOCK_ID_TOKEN }),
      account,
    );
  }

  return {
    notice,
    start,
    googleButton,
    mockOpen,
    closeMock: () => setMockOpen(false),
    pickMockAccount,
  };
}
