"use client";

import { useEffect, type ReactNode, type RefObject } from "react";

import { cn } from "@/lib/utils";

export function useMenuDismiss(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) close();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, open, close]);
}

export function MenuSheet({
  onClose,
  label,
  className,
  children,
}: {
  onClose: () => void;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[#131921]/95 lg:hidden"
      />
      <div
        role="menu"
        aria-label={label}
        className={cn(
          "z-50 flex flex-col gap-6 rounded-card border border-neutral-300 bg-white shadow-card",
          "max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:px-[23px] max-lg:pt-[23px] max-lg:pb-[35px]",
          "lg:absolute lg:w-[266px] lg:p-[23px]",
          className,
        )}
      >
        <div className="flex h-5 items-center justify-center lg:hidden">
          <span className="h-1.5 w-[125px] rounded-full bg-[#192c3b]/10" />
        </div>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </>
  );
}

export const MENU_ROW =
  "flex w-full items-center gap-2.5 py-2 text-left text-subtitle-18-bold text-secondary-900 transition-opacity hover:opacity-70";
