import type { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { StoreChrome } from "@/components/layout/store-chrome";
import { getServerSession } from "@/lib/auth/get-session";

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
