import { create } from "zustand";

import type { User } from "../model/schema";

type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  status: AuthStatus;
  setUser: (user: User | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  status: "unknown",
  setUser: (user) =>
    set({ user, status: user ? "authenticated" : "unauthenticated" }),
  clear: () => set({ user: null, status: "unauthenticated" }),
}));
