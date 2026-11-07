import { create } from "zustand";
import { persist } from "zustand/middleware";

import { requiresScript } from "../data/catalogue";

export type CartLine = {
  name: string;
  priceValue: number;
  img: string;
  qty: number;
  brand?: string;
  /** Prescription items can't be checked out until a script is on file. */
  requiresScript: boolean;
};

export type CartInput = {
  name: string;
  priceValue: number;
  img: string;
  brand?: string;
};

interface CartState {
  items: CartLine[];
  add: (item: CartInput, qty?: number) => void;
  increment: (name: string) => void;
  decrement: (name: string) => void;
  remove: (name: string) => void;
  clear: () => void;
}

/**
 * Global shopping cart. Persisted to localStorage so it survives navigation and
 * refreshes (the only Zustand state we persist — see docs/architecture.md).
 * Components that render on the server must guard reads against hydration
 * (e.g. a mounted flag) because the persisted value only exists on the client.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.name === item.name);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.name === item.name ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...item, qty, requiresScript: requiresScript(item.name) },
            ],
          };
        }),
      increment: (name) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.name === name ? { ...i, qty: i.qty + 1 } : i,
          ),
        })),
      // Drops to a removal once quantity would fall below 1.
      decrement: (name) =>
        set((state) => ({
          items: state.items.flatMap((i) =>
            i.name === name
              ? i.qty <= 1
                ? []
                : [{ ...i, qty: i.qty - 1 }]
              : [i],
          ),
        })),
      remove: (name) =>
        set((state) => ({
          items: state.items.filter((i) => i.name !== name),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "op_cart" },
  ),
);
