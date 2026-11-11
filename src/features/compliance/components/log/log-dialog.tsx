"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import { useIsClient } from "./use-client-state";

export function LogDialog({
  label,
  onClose,
  focusKey,
  children,
  className,
}: {
  label: string;
  onClose: () => void;
  focusKey?: string;
  children: ReactNode;
  className?: string;
}) {
  const isClient = useIsClient();
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    const page = Array.from(document.body.children).filter(
      (el) => el !== dialog && !el.hasAttribute("inert"),
    );
    for (const el of page) el.setAttribute("inert", "");

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      for (const el of page) el.removeAttribute("inert");
      root.style.overflow = overflow;
    };
  }, [isClient]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.scrollTop = 0;
    dialog.focus({ preventScroll: true });
  }, [isClient, focusKey]);

  if (!isClient) return null;
  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-white outline-none lg:bg-black/60"
    >
      <div className="flex min-h-full lg:items-center lg:justify-center lg:p-4">
        <div
          className={cn(
            "flex w-full flex-col bg-white lg:w-[448px] lg:rounded-card",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
