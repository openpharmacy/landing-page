"use client";

import { useEffect } from "react";

import { isMockingEnabled } from "@/config/env";

export function MswProvider() {
  useEffect(() => {
    if (!isMockingEnabled) return;
    void import("./browser").then(({ worker }) =>
      worker.start({ onUnhandledRequest: "bypass" }),
    );
  }, []);

  return null;
}
