"use client";

import { useEffect } from "react";

import { isMockingEnabled } from "@/config/env";

/**
 * Starts the MSW browser worker in development when mocking is enabled.
 * Does not gate rendering (avoids hydration mismatch); unhandled requests pass
 * through to the network. See `src/mocks/handlers`.
 */
export function MswProvider() {
  useEffect(() => {
    if (!isMockingEnabled) return;
    void import("./browser").then(({ worker }) =>
      worker.start({ onUnhandledRequest: "bypass" }),
    );
  }, []);

  return null;
}
