"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useShowHidden } from "@/providers/hidden-screens";

import { MENU_ROW, MenuSheet, useMenuDismiss } from "./menu-sheet";

type MenuAction = {
  label: string;
  icon: string;
  iconClassName?: string;
  href?: string;
  onSelect?: () => void;
  unavailable?: string;
};

const ICON = {
  schedule: "/icons/scripts/menu/schedule.svg",
  qr: "/icons/scripts/menu/qr-code.svg",
  hide: "/icons/scripts/menu/hide.svg",
  show: "/icons/scripts/menu/show.svg",
  archive: "/icons/scripts/menu/archive.svg",
  share: "/icons/scripts/menu/share.svg",
  trash: "/icons/scripts/menu/trash.svg",
};

const MENU_HEIGHT = 388;

const QR_SELECTOR = '[role="img"][aria-label="Digital prescription QR code"]';

function scrollToQr() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelector(QR_SELECTOR)?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "center",
  });
}

export function ScriptActionsMenu({
  triggerClassName,
  dark = false,
  tokenOnly = false,
  hidden,
  archived,
  canHide,
  canDelete,
  scheduleHref,
  onViewQr = scrollToQr,
  onSetHidden,
  onSetArchived,
  onShare,
  onDelete,
}: {
  triggerClassName: string;
  dark?: boolean;
  tokenOnly?: boolean;
  hidden: boolean;
  archived: boolean;
  canHide: boolean;
  canDelete: boolean;
  scheduleHref: string;
  onViewQr?: () => void;
  onSetHidden: (hidden: boolean) => void;
  onSetArchived: (archived: boolean) => void;
  onShare: () => void;
  onDelete: () => void;
}) {
  const showHidden = useShowHidden();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useMenuDismiss(ref, open, close);

  function toggle() {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setPlacement(
        spaceBelow < MENU_HEIGHT + 16 && rect.top > spaceBelow
          ? "top"
          : "bottom",
      );
    }
    setOpen((value) => !value);
  }

  const notFromAsl = canHide
    ? undefined
    : "Only scripts from your Active Script List can be hidden.";
  const items: (MenuAction | false)[] = [
    showHidden &&
      !tokenOnly && {
        label: "Schedule",
        icon: ICON.schedule,
        href: scheduleHref,
      },
    !tokenOnly && {
      label: "View QR-Code",
      icon: ICON.qr,
      iconClassName: "h-[21px] w-[24.33px]",
      onSelect: onViewQr,
    },
    hidden
      ? {
          label: "Unhide",
          icon: ICON.show,
          onSelect: () => onSetHidden(false),
          unavailable: notFromAsl,
        }
      : {
          label: "Hide",
          icon: ICON.hide,
          onSelect: () => onSetHidden(true),
          unavailable: notFromAsl,
        },
    {
      label: archived ? "Unarchive" : "Archive",
      icon: ICON.archive,
      onSelect: () => onSetArchived(!archived),
    },
    !tokenOnly && { label: "Share", icon: ICON.share, onSelect: onShare },
  ];
  const remove: MenuAction = {
    label: "Delete",
    icon: ICON.trash,
    onSelect: onDelete,
    unavailable: canDelete
      ? undefined
      : "Scripts from your Active Script List can’t be deleted. You can hide or archive them instead.",
  };

  function select(item: MenuAction) {
    setOpen(false);
    item.onSelect?.();
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
        <Icon
          src={
            dark ? "/icons/scripts/more-dark.svg" : "/icons/scripts/more.svg"
          }
          size={24}
        />
      </button>

      {open && (
        <MenuSheet
          onClose={close}
          className={cn(
            "lg:right-0",
            placement === "bottom" ? "lg:top-full" : "lg:bottom-full",
          )}
        >
          {items
            .filter((item) => item !== false)
            .map((item) => (
              <MenuItem
                key={item.label}
                item={item}
                onSelect={() => select(item)}
              />
            ))}
          {(canDelete || !tokenOnly) && (
            <>
              <div className="pt-[7px] pb-2">
                <div className="h-px bg-neutral-300" />
              </div>
              <MenuItem item={remove} onSelect={() => select(remove)} />
            </>
          )}
        </MenuSheet>
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
  const content = (
    <>
      <Icon src={item.icon} size={24} className={item.iconClassName} />
      <span>{item.label}</span>
    </>
  );
  if (item.href) {
    return (
      <Link
        href={item.href}
        role="menuitem"
        onClick={onSelect}
        className={MENU_ROW}
      >
        {content}
      </Link>
    );
  }
  return (
    <div title={item.unavailable}>
      <button
        type="button"
        role="menuitem"
        disabled={Boolean(item.unavailable)}
        onClick={onSelect}
        className={cn(
          MENU_ROW,
          "disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        {content}
      </button>
    </div>
  );
}
