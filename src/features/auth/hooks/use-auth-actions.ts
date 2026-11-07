"use client";

import { useRouter } from "next/navigation";

import * as authApi from "../api/auth-api";
import type { AuthSession, SignInInput, SignUpInput } from "../model/schema";
import { useAuthStore } from "../stores/auth-store";

/** Mirror the token into memory + set the httpOnly session cookie (SSR/guard). */
async function persistSession(session: AuthSession) {
  useAuthStore.getState().setSession(session);
  await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: session.access_token,
      expires_in: session.expires_in,
    }),
  });
}

export function useAuthActions() {
  const router = useRouter();

  return {
    async signIn(input: SignInInput) {
      const session = await authApi.signIn(input);
      await persistSession(session);
      router.push("/");
      router.refresh();
    },
    async signUp(input: SignUpInput) {
      const session = await authApi.signUp({
        email: input.email,
        password: input.password,
        name: input.name || undefined,
      });
      await persistSession(session);
      router.push("/");
      router.refresh();
    },
    async signInWithGoogle(idToken: string) {
      const session = await authApi.signInWithGoogle(idToken);
      await persistSession(session);
      router.push("/");
      router.refresh();
    },
  };
}
