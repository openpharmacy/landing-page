"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";

import { GLYPHS, NavGlyph } from "./nav";

export function NotificationsButton() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  if (openOn !== null && openOn !== pathname) setOpenOn(null);
  const open = openOn === pathname;
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback((refocus = false) => {
    setOpenOn(null);
    if (refocus) button.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) close();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close(true);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div ref={ref} className="flex">
      <button
        ref={button}
        type="button"
        aria-label="Notifications"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpenOn(open ? null : pathname)}
        className="flex"
      >
        <NavGlyph glyph={GLYPHS.bell} />
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Notifications"
          className="absolute inset-x-4 top-full z-50 mt-2 flex flex-col gap-6 rounded-card border border-neutral-300 bg-white p-[23px] shadow-card lg:inset-x-auto lg:right-0 lg:mt-9 lg:w-[360px]"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-subtitle-18-bold text-secondary-900">
              Notifications
            </h2>
            <button
              type="button"
              aria-label="Close notifications"
              onClick={() => close(true)}
              className="flex transition-opacity hover:opacity-70"
            >
              <Icon src="/icons/account/close.svg" size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 pb-2 text-center">
            <Icon src="/icons/account/notifications.svg" size={48} />
            <div className="flex flex-col gap-1">
              <p className="text-title-20 text-[#101828]">
                No notifications yet
              </p>
              <p className="text-body-16 text-secondary-300">
                New notifications will appear here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
