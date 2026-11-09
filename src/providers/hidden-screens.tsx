"use client";

import { createContext, useContext, type ReactNode } from "react";

const HiddenScreensContext = createContext(false);

export function HiddenScreensProvider({
  value,
  children,
}: {
  value: boolean;
  children: ReactNode;
}) {
  return (
    <HiddenScreensContext.Provider value={value}>
      {children}
    </HiddenScreensContext.Provider>
  );
}

export function useShowHidden() {
  return useContext(HiddenScreensContext);
}
