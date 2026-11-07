import type { ReactNode } from "react";

import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getServerSession } from "@/lib/auth/get-session";

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
      {/* Signed-in users get the mobile bottom tab bar; the spacer (footer-tinted)
          reserves room so the fixed bar never covers the footer. */}
      {user && (
        <>
          <div className="h-24 bg-secondary-700 lg:hidden" aria-hidden />
          <BottomNav user={user} />
        </>
      )}
    </div>
  );
}
