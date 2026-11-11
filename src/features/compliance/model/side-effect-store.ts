"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { isMockingEnabled } from "@/config/env";
import { userStorage } from "@/lib/user-storage";

import { MOCK_SIDE_EFFECTS } from "./mock-side-effects";
import type { SideEffectEntry } from "./side-effects";

type SideEffectState = {
  entries: SideEffectEntry[];
  addEntry: (entry: SideEffectEntry) => void;
  updateEntry: (entry: SideEffectEntry) => void;
  removeEntry: (id: string) => void;
};

export const initialSideEffects = (mock: boolean): SideEffectEntry[] =>
  mock ? MOCK_SIDE_EFFECTS : [];

export const withoutSampleEntries = (entries: SideEffectEntry[]) =>
  entries.filter(
    (entry) =>
      !MOCK_SIDE_EFFECTS.some(
        (sample) => JSON.stringify(sample) === JSON.stringify(entry),
      ),
  );

const storage = userStorage("op_side_effects", () => ({
  entries: initialSideEffects(isMockingEnabled),
}));

export const useSideEffectStore = create<SideEffectState>()(
  persist(
    (set) => ({
      entries: initialSideEffects(isMockingEnabled),
      addEntry: (entry) =>
        set((state) => ({ entries: [entry, ...state.entries] })),
      updateEntry: (entry) =>
        set((state) => ({
          entries: state.entries.map((e) => (e.id === entry.id ? entry : e)),
        })),
      removeEntry: (id) =>
        set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),
    }),
    {
      ...storage.options,
      skipHydration: true,
      version: 1,
      migrate: (saved) => {
        const state = saved as SideEffectState;
        return isMockingEnabled || !state.entries
          ? state
          : { ...state, entries: withoutSampleEntries(state.entries) };
      },
    },
  ),
);
storage.connect(useSideEffectStore);

export function useRehydrateSideEffects() {
  useEffect(() => {
    void storage.load();
  }, []);
}
