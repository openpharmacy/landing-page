import { create } from "zustand";

import { setAccessToken } from "@/lib/api/axios";

import type { AuthSession, User } from "../model/schema";

type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  status: AuthStatus;
  setSession: (session: AuthSession) => void;
  setUser: (user: User | null) => void;
  clear: () => void;
}

/**
 * Client-only auth state. The token lives in memory here (mirrored into the
 * axios client) and as an httpOnly cookie (set via /api/auth/session) — it is
 * never persisted to localStorage.
 */
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  status: "unknown",
  setSession: (session) => {
    setAccessToken(session.access_token);
    set({ user: session.user, status: "authenticated" });
  },
  setUser: (user) =>
    set({ user, status: user ? "authenticated" : "unauthenticated" }),
  clear: () => {
    setAccessToken(null);
    set({ user: null, status: "unauthenticated" });
  },
}));
