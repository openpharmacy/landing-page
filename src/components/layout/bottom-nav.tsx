"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { initials, type SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";
import { useShowHidden } from "@/providers/hidden-screens";

import { Avatar, type Glyph, GLYPHS, isNavActive, NavGlyph } from "./nav";

const TABS: {
  label: string;
  href: string;
  icon: Glyph;
  activeIcon: Glyph;
  hidden?: boolean;
}[] = [
  {
    label: "Home",
    href: "/home",
    icon: GLYPHS.homeMobile,
    activeIcon: GLYPHS.homeActive,
  },
  {
    label: "Scripts",
    href: "/scripts",
    icon: GLYPHS.capsuleMobile,
    activeIcon: GLYPHS.capsuleActive,
  },
  {
    label: "Scheduler",
    href: "/scheduler",
    icon: GLYPHS.calendar,
    activeIcon: GLYPHS.calendarActive,
    hidden: true,
  },
];

export function BottomNav({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const onAccount = isNavActive(pathname, "/account");
  const showHidden = useShowHidden();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-neutral-300 bg-white pt-3.5 pb-[max(16px,env(safe-area-inset-bottom))] lg:hidden"
    >
      {TABS.filter((tab) => showHidden || !tab.hidden).map((tab) => {
        const active = isNavActive(pathname, tab.href);
        return (
          <Tab
            key={tab.label}
            href={tab.href}
            label={tab.label}
            active={active}
          >
            <NavGlyph glyph={active ? tab.activeIcon : tab.icon} />
          </Tab>
        );
      })}
      <Tab href="/account" label="Profile" active={onAccount}>
        <Avatar initials={initials(user)} dim={!onAccount} />
      </Tab>
    </nav>
  );
}

function Tab({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-14 flex-1 flex-col items-center justify-center gap-0.5",
        active
          ? "text-caption-12-bold text-info-500"
          : "text-caption-12 text-neutral-900",
      )}
    >
      {children}
      <span>{label}</span>
      {active && (
        <span className="absolute top-[50px] left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-info-500" />
      )}
    </Link>
  );
}
