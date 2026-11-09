"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { initials, type SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";
import { useShowHidden } from "@/providers/hidden-screens";

import { Container } from "./container";
import { Avatar, type Glyph, GLYPHS, isNavActive, NavGlyph } from "./nav";
import { NotificationsButton } from "./notifications";

type NavItem = { label: string; href: string; icon: Glyph; activeIcon: Glyph };

const HOME: NavItem = {
  label: "Home",
  href: "/home",
  icon: GLYPHS.home,
  activeIcon: GLYPHS.homeActive,
};
const SCRIPTS: NavItem = {
  label: "Scripts",
  href: "/scripts",
  icon: GLYPHS.capsule,
  activeIcon: GLYPHS.capsuleActive,
};
const SCHEDULER: NavItem = {
  label: "Scheduler",
  href: "/scheduler",
  icon: GLYPHS.calendar,
  activeIcon: GLYPHS.calendarActive,
};

const GUEST_NAV = [{ ...HOME, href: "/" }, SCRIPTS];
const USER_NAV = [HOME, SCRIPTS];

export function Header({ user }: { user?: SessionUser | null }) {
  const [menu, setMenu] = useState<"closed" | "open" | "closing">("closed");
  const pathname = usePathname();
  const showHidden = useShowHidden();

  const closeMenu = useCallback(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMenu((state) =>
      state === "closed" ? state : still ? "closed" : "closing",
    );
  }, []);

  useEffect(() => {
    if (menu !== "open") return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, closeMenu]);

  const nav = user
    ? showHidden
      ? [...USER_NAV, SCHEDULER]
      : USER_NAV
    : GUEST_NAV;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-neutral-300 bg-white lg:h-20",
        !user && "lg:border",
      )}
    >
      <Container className="flex items-center justify-between py-2.5 lg:h-full lg:py-0">
        <Link href="/" className="flex items-center gap-1">
          <Icon src="/icons/logo.svg" size={36} />
          <span className="text-wordmark text-secondary-500">OpenPharmacy</span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-[60px] lg:flex"
        >
          {nav.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              active={isNavActive(pathname, item.href)}
            />
          ))}
        </nav>

        {user ? (
          <div className="flex items-center gap-6 lg:relative">
            <NotificationsButton />
            <Link
              href="/account"
              aria-label="Account"
              className="hidden lg:flex"
            >
              <Avatar initials={initials(user)} />
            </Link>
          </div>
        ) : (
          <>
            <Button asChild className="hidden w-[130px] lg:inline-flex">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMenu("open")}
              aria-label="Open menu"
              aria-expanded={menu === "open"}
              className="flex p-2 lg:hidden"
            >
              <Image
                src="/icons/nav/menu.svg"
                alt=""
                width={14}
                height={27}
                unoptimized
              />
            </button>
          </>
        )}
      </Container>

      {menu !== "closed" && !user && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className={cn(
              "absolute inset-0 cursor-default bg-[#131921]/95",
              menu === "closing" ? "animate-fade-out" : "animate-page-fade",
            )}
          />
          <div
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget && menu === "closing") {
                setMenu("closed");
              }
            }}
            className={cn(
              "absolute inset-y-0 right-0 left-[43px] flex flex-col bg-white",
              menu === "closing" ? "animate-drawer-out" : "animate-drawer-in",
            )}
          >
            <div className="flex justify-end px-6 py-4">
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="flex"
              >
                <NavGlyph glyph={GLYPHS.close} />
              </button>
            </div>
            <nav aria-label="Menu" className="flex flex-col gap-2 px-6 pt-2">
              <DrawerRow
                href="/"
                label="Home"
                leading={<NavGlyph glyph={GLYPHS.homeMobile} />}
                onClick={closeMenu}
              />
              <DrawerRow
                href="/scripts"
                label="Scripts"
                leading={<NavGlyph glyph={GLYPHS.capsuleMobile} />}
                onClick={closeMenu}
              />
              <DrawerRow
                href="/sign-in"
                label="Profile"
                leading={<NavGlyph glyph={GLYPHS.profile} />}
                onClick={closeMenu}
              />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-0.5",
        active
          ? "text-caption-12-bold text-info-500"
          : "text-caption-12 text-secondary-900",
      )}
    >
      <NavGlyph glyph={active ? item.activeIcon : item.icon} />
      {item.label}
    </Link>
  );
}

function DrawerRow({
  href,
  label,
  leading,
  onClick,
}: {
  href: string;
  label: string;
  leading: ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between border-b border-neutral-300 py-6"
    >
      <span className="flex items-center gap-1 text-body-16 text-[#101828]">
        {leading}
        {label}
      </span>
      <NavGlyph glyph={GLYPHS.chevronRight} />
    </Link>
  );
}
