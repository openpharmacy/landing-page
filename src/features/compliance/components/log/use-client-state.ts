"use client";

import { useCallback, useSyncExternalStore } from "react";

type PersistApi = {
  persist?: {
    hasHydrated: () => boolean;
    onFinishHydration: (listener: () => void) => () => void;
  };
};

const noop = () => {};

export function useHydrated(store: PersistApi): boolean {
  const subscribe = useCallback(
    (onChange: () => void) =>
      store.persist?.onFinishHydration(onChange) ?? noop,
    [store],
  );
  return useSyncExternalStore(
    subscribe,
    () => store.persist?.hasHydrated() ?? false,
    () => false,
  );
}

const noSubscribe = () => noop;

export function useIsClient(): boolean {
  return useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );
}

const DESKTOP = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}
