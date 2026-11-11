import type { ReactNode } from "react";

import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TAB_BAR_HEIGHT } from "@/components/layout/nav";
import { getServerSession } from "@/lib/auth/get-session";
import { cn } from "@/lib/utils";

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getServerSession();
  return (
    <div className="flex min-h-dvh flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
      {user && (
        <>
          <div
            className={cn(TAB_BAR_HEIGHT, "bg-secondary-700 lg:hidden")}
            aria-hidden
          />
          <BottomNav user={user} />
        </>
      )}
    </div>
  );
}
