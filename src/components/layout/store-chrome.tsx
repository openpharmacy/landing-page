"use client";

import { usePathname } from "next/navigation";

import type { SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";

import { BottomNav } from "./bottom-nav";
import { Footer } from "./footer";

// Focused flows (cart / checkout) drop the footer + tab bar — they pin their own
// action panel (Order Summary, Order & Pay) to the bottom instead.
const FOCUSED = ["/cart", "/checkout"];

/**
 * Mobile chrome for the store group: the marketing footer (only on the account
 * hub, per Figma — content/list/detail screens have none) plus, for signed-in
 * users, the bottom tab bar. Client-side so it can read the current route. The
 * spacer reserves room for the fixed tab bar; it's footer-tinted only when a
 * footer sits above it.
 */
export function StoreChrome({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  if (FOCUSED.some((path) => pathname.startsWith(path))) return null;

  const hasFooter = pathname === "/account";

  return (
    <>
      {hasFooter && (
        <div className="lg:hidden">
          <Footer />
        </div>
      )}
      {user && (
        <>
          <div
            className={cn("h-24 lg:hidden", hasFooter && "bg-secondary-700")}
            aria-hidden
          />
          <BottomNav user={user} />
        </>
      )}
    </>
  );
}
