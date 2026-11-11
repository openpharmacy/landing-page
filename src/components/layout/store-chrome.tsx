"use client";

import { usePathname } from "next/navigation";

import type { SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";

import { BottomNav } from "./bottom-nav";
import { Footer } from "./footer";
import { TAB_BAR_HEIGHT } from "./nav";

const FOOTER_ROUTES = [
  "/account",
  "/help",
  "/compliance",
  "/scripts/connect-asl",
];

const NO_FOOTER = [
  "/compliance/dose",
  "/compliance/side-effects/new",
  "/compliance/vitals/new",
];
const VITALS_EDIT = /^\/compliance\/vitals\/[^/]+\/edit$/;

const DESKTOP_FOOTER_ROUTES = ["/help"];

const NO_TAB_BAR = [
  "/compliance",
  "/scripts/detail",
  "/scripts/connect-asl",
  "/help",
  "/account/settings/password",
  "/scheduler",
];

const within = (pathname: string, routes: string[]) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

function hasMobileFooter(pathname: string) {
  if (within(pathname, NO_FOOTER) || VITALS_EDIT.test(pathname)) return false;
  return within(pathname, FOOTER_ROUTES);
}

export function StoreChrome({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();

  const hasFooter = hasMobileFooter(pathname);
  const hasDesktopFooter = within(pathname, DESKTOP_FOOTER_ROUTES);
  const hasTabBar = user && !within(pathname, NO_TAB_BAR);

  return (
    <>
      {(hasFooter || hasDesktopFooter) && (
        <div
          className={cn(
            !hasDesktopFooter && "lg:hidden",
            !hasFooter && "max-lg:hidden",
          )}
        >
          <Footer />
        </div>
      )}
      {hasTabBar && (
        <>
          <div
            className={cn(
              TAB_BAR_HEIGHT,
              "lg:hidden",
              hasFooter && "bg-secondary-700",
            )}
            aria-hidden
          />
          <BottomNav user={user} />
        </>
      )}
    </>
  );
}
