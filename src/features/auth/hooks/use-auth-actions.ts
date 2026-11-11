"use client";

import { isMockingEnabled } from "@/config/env";
import { clearLocalSession } from "@/lib/auth/mock-session";

import * as authApi from "../api/auth-api";
import type { User } from "../model/schema";
import { useAuthStore } from "../stores/auth-store";

type SignInPayload = Parameters<typeof authApi.signIn>[0];
type SignUpPayload = Parameters<typeof authApi.signUp>[0];

const signedIn = (user: User) => {
  useAuthStore.getState().setUser(user);
  return user;
};

export function useAuthActions() {
  return {
    async signIn(payload: SignInPayload): Promise<User> {
      return signedIn(await authApi.signIn(payload));
    },
    async signUp(payload: SignUpPayload): Promise<User> {
      return signedIn(await authApi.signUp(payload));
    },
    async signInWithProvider(
      provider: authApi.Provider,
      payload: authApi.ProviderPayload,
    ): Promise<{ user: User; isNewUser: boolean }> {
      const result = await authApi.signInWithProvider(provider, payload);
      signedIn(result.user);
      return result;
    },
    async completeProfile(payload: {
      name: string;
      surname: string;
    }): Promise<User> {
      return signedIn(await authApi.completeProfile(payload));
    },
    async signInWithDevice(email: string): Promise<User> {
      if (!isMockingEnabled) {
        throw new Error("Device sign-in is not available");
      }
      return signedIn(await authApi.signIn({ email, password: "mock-device" }));
    },
    async signOut() {
      const result = await authApi.logout();
      clearLocalSession();
      if (result !== "unreachable") useAuthStore.getState().clear();
      return result;
    },
  };
}
