"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

import { UpdateRequired } from "@/components/layout/update-required";
import { getQueryClient } from "@/lib/query/query-client";
import { MswProvider } from "@/mocks/msw-provider";

import { HiddenScreensProvider } from "./hidden-screens";
import { UserKeyProvider } from "./user-key";

export function Providers({
  showHidden,
  userKey,
  children,
}: {
  showHidden: boolean;
  userKey: string | null;
  children: ReactNode;
}) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MswProvider />
      <UpdateRequired />
      <HiddenScreensProvider value={showHidden}>
        <UserKeyProvider value={userKey}>{children}</UserKeyProvider>
      </HiddenScreensProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
