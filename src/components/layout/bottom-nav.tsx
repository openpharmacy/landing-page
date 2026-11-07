"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactNode } from "react";

import { initials, type SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";

import {
  CapsuleIcon,
  HomeActiveIcon,
  HomeIcon,
  ShopActiveIcon,
  ShopIcon,
} from "./nav-icons";

type Glyph = ComponentType<{ className?: string }>;

const TABS: { label: string; href: string; icon: Glyph; activeIcon: Glyph }[] =
  [
    {
      label: "Home",
      href: "/home",
      icon: HomeIcon,
      activeIcon: HomeActiveIcon,
    },
    {
      label: "Scripts",
      href: "/scripts",
      icon: CapsuleIcon,
      activeIcon: CapsuleIcon,
    },
    {
      label: "Shop",
      href: "/shop",
      icon: ShopIcon,
      activeIcon: ShopActiveIcon,
    },
  ];

/**
 * Mobile bottom tab bar (Figma `319:7595`) shown to signed-in users. Fixed to
 * the viewport bottom; the active tab tints info-500 with an underline. Hidden
 * from `lg` up, where the header nav takes over.
 */
export function BottomNav({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-neutral-300 bg-white pt-3.5 lg:hidden"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      {TABS.map((tab) => {
        const active = isActive(tab.href);
        const Glyph = active ? tab.activeIcon : tab.icon;
        return (
          <Tab
            key={tab.label}
            href={tab.href}
            label={tab.label}
            active={active}
          >
            <Glyph className="size-6" />
          </Tab>
        );
      })}
      <Tab
        href="/account"
        label="Profile"
        active={pathname.startsWith("/account")}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-info-500 text-caption-12-bold text-white">
          {initials(user)}
        </span>
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
        "flex flex-1 flex-col items-center gap-0.5 transition-colors",
        active ? "text-info-500" : "text-[#1C232A]",
      )}
    >
      {children}
      <span className={active ? "text-caption-12-bold" : "text-caption-12"}>
        {label}
      </span>
      {/* Active-tab underline (kept in flow but hidden when inactive). */}
      <span
        className={cn(
          "h-0.5 w-4 rounded-full bg-info-500",
          !active && "invisible",
        )}
      />
    </Link>
  );
}
