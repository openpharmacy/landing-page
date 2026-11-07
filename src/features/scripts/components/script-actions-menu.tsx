"use client";

import { MoreHorizontal, QrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type MenuAction = {
  label: string;
  icon?: string;
  qr?: boolean;
  action?: "hide";
};

const MENU_ITEMS: MenuAction[] = [
  { label: "Refill", icon: "/icons/scripts/menu/refill.svg" },
  { label: "Schedule", icon: "/icons/scripts/menu/schedule.svg" },
  { label: "View QR-Code", qr: true },
  { label: "Hide", icon: "/icons/scripts/menu/hide.svg", action: "hide" },
  { label: "Archive", icon: "/icons/scripts/menu/archive.svg" },
  { label: "Share", icon: "/icons/scripts/menu/share.svg" },
];

// Approx. menu height — used to decide whether to flip it upward.
const MENU_HEIGHT = 320;

/**
 * The per-script "..." actions menu (Figma `161:2605`). Only Hide acts so far.
 * Shared by the script card (compact trigger) and the script detail header
 * (large trigger) via `triggerClassName`.
 */
export function ScriptActionsMenu({
  onHide,
  triggerClassName,
}: {
  onHide: () => void;
  triggerClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Flip the menu above the button when there isn't room below (bottom cards).
  function toggle() {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setPlacement(
        spaceBelow < MENU_HEIGHT + 16 && spaceAbove > spaceBelow
          ? "top"
          : "bottom",
      );
    }
    setOpen((value) => !value);
  }

  function select(item: MenuAction) {
    setOpen(false);
    if (item.action === "hide") onHide();
  }

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        className={triggerClassName}
      >
        <MoreHorizontal className="size-6" />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 z-30 flex w-[210px] flex-col gap-1 rounded-card border border-neutral-300 bg-white p-2 shadow-card",
            placement === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
          )}
        >
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.label}
              item={item}
              onSelect={() => select(item)}
            />
          ))}
          <div className="my-1 h-px bg-neutral-300" />
          <MenuItem
            item={{ label: "Delete", icon: "/icons/scripts/menu/trash.svg" }}
            onSelect={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  item,
  onSelect,
}: {
  item: MenuAction;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className="flex w-full items-center gap-2.5 rounded-control px-3 py-2 text-left transition-colors hover:bg-bg-app"
    >
      {item.qr ? (
        <QrCode className="size-5 text-secondary-900" />
      ) : (
        <Icon src={item.icon!} size={20} />
      )}
      <span className="text-body-14 font-semibold text-secondary-900">
        {item.label}
      </span>
    </button>
  );
}
