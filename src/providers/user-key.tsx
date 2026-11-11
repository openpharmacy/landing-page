"use client";

import type { ReactNode } from "react";

import { setSessionUserKey } from "@/lib/user-storage";

export function UserKeyProvider({
  value,
  children,
}: {
  value: string | null;
  children: ReactNode;
}) {
  setSessionUserKey(value);
  return children;
}
