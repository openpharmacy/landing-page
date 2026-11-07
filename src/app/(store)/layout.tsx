import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { StoreChrome } from "@/components/layout/store-chrome";
import { getServerSession } from "@/lib/auth/get-session";

/**
 * App-shell layout: shared Header. Desktop store screens stay focused (no
 * footer); mobile shows the marketing footer below the content and, for
 * signed-in users, the bottom tab bar (Figma mobile screens). The marketing
 * site lives in `(marketing)`.
 */
export default async function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getServerSession();
  return (
    <div className="flex min-h-dvh flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
      <StoreChrome user={user} />
    </div>
  );
}
