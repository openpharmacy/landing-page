"use client";

import { ChevronRight, CircleUserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useCartStore } from "@/features/shop/stores/cart-store";
import { initials, type SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import {
  CapsuleIcon,
  CartGlyph,
  CartGlyphFilled,
  HomeActiveIcon,
  HomeIcon,
  ScriptsActiveIcon,
  ScriptsIcon,
  ShopActiveIcon,
  ShopIcon,
} from "./nav-icons";

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  // Some glyphs differ between states (Iconsax linear vs bold), not just colour
  // — e.g. the Shop magnifier is outline when inactive, filled when active.
  activeIcon?: ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { label: "Home", href: "/home", icon: HomeIcon, activeIcon: HomeActiveIcon },
  {
    label: "Scripts",
    href: "/scripts",
    icon: ScriptsIcon,
    activeIcon: ScriptsActiveIcon,
  },
  { label: "Shop", href: "/shop", icon: ShopIcon, activeIcon: ShopActiveIcon },
];

// Mobile drawer rows (Figma `341:6461`): outline glyphs; the Scripts row uses a
// capsule (not the nav's Rx mark) and a Profile row is appended after these.
const DRAWER_NAV = [
  { label: "Home", href: "/home", icon: HomeIcon },
  { label: "Scripts", href: "/scripts", icon: CapsuleIcon },
  { label: "Shop", href: "/shop", icon: ShopIcon },
];

/** Site header. Active nav follows the route; the right side adapts to the session. */
export function Header({ user }: { user?: SessionUser | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  // The cart icon lights up while on the cart / checkout flow.
  const cartActive =
    pathname.startsWith("/cart") || pathname.startsWith("/checkout");

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-300 bg-white">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Icon src="/icons/logo.svg" size={36} alt="OpenPharmacy" />
          <span className="text-wordmark text-secondary-500">OpenPharmacy</span>
        </Link>

        <nav className="hidden items-center gap-[60px] lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              active={isActive(item.href)}
            />
          ))}
        </nav>

        <div className="hidden lg:block">
          {user ? (
            <div className="flex items-center gap-6">
              <NotificationsButton />
              <CartLink active={cartActive} />
              <Link
                href="/account"
                aria-label="Account"
                className="flex size-7 items-center justify-center rounded-full bg-info-500 text-caption-12-bold text-white"
              >
                {initials(user)}
              </Link>
            </div>
          ) : (
            // Guests can shop + check out, so they keep the cart too.
            <div className="flex items-center gap-6">
              <CartLink active={cartActive} />
              <Button asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile right side: signed-in users get notifications (the bottom tab
            bar handles navigation); guests get the menu button. Both keep cart. */}
        <div className="flex items-center gap-6 lg:hidden">
          {user ? (
            <>
              <NotificationsButton />
              <CartLink active={cartActive} />
            </>
          ) : (
            <>
              <CartLink active={cartActive} />
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="flex size-10 items-center justify-center rounded-control text-secondary-900"
              >
                <Menu className="size-6" />
              </button>
            </>
          )}
        </div>
      </Container>

      {/* Mobile drawer (Figma `341:6461`): slide-in panel of nav rows (guests). */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 animate-page-fade cursor-default bg-black/40"
          />
          <div className="absolute inset-y-0 right-0 flex w-[85vw] max-w-[316px] animate-drawer-in flex-col bg-white shadow-card">
            <div className="flex justify-end px-5 py-4">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-secondary-900 transition-colors hover:text-secondary-500"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col px-6">
              {DRAWER_NAV.map((item) => (
                <DrawerRow
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  onClick={() => setOpen(false)}
                  leading={<item.icon className="size-6 shrink-0" />}
                />
              ))}
              <DrawerRow
                href={user ? "/account" : "/sign-in"}
                label="Profile"
                onClick={() => setOpen(false)}
                leading={
                  user ? (
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-info-500 text-caption-12-bold text-white">
                      {initials(user)}
                    </span>
                  ) : (
                    <CircleUserRound className="size-6 shrink-0" />
                  )
                }
              />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NotificationsButton() {
  return (
    <button type="button" aria-label="Notifications">
      <Icon src="/icons/home/nav-bell.svg" size={24} />
    </button>
  );
}

// The cart is persisted client-side; gate the count badge on hydration so the
// server-rendered (no badge) markup and the first client render agree.
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function CartLink({ active }: { active: boolean }) {
  const hydrated = useHydrated();
  const count = useCartStore((state) => state.items.length);
  return (
    <Link
      href="/cart"
      aria-label={`Cart${hydrated && count > 0 ? ` (${count})` : ""}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative transition-colors",
        active ? "text-info-500" : "text-secondary-900",
      )}
    >
      {active ? (
        <CartGlyphFilled className="size-6" />
      ) : (
        <CartGlyph className="size-6" />
      )}
      {hydrated && count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF7700] px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

/** A single row in the mobile drawer: leading glyph, label, trailing chevron. */
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
      className="flex items-center gap-3 border-b border-[#E5E7EB] py-4 text-[#101828] transition-colors hover:bg-bg-app"
    >
      {leading}
      <span className="flex-1 text-body-16">{label}</span>
      <ChevronRight className="size-5 shrink-0 text-[#101828]" />
    </Link>
  );
}

function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
}) {
  const Glyph = active && item.activeIcon ? item.activeIcon : item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-0.5 transition-colors",
        active ? "text-info-500" : "text-secondary-900",
      )}
    >
      <Glyph className="shrink-0" />
      <span className={active ? "text-caption-12-bold" : "text-caption-12"}>
        {item.label}
      </span>
    </Link>
  );
}
