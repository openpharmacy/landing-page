"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  MENU_ROW,
  MenuSheet,
  useMenuDismiss,
} from "@/features/scripts/components/menu-sheet";

import { ICONS } from "./ui";

export function EntryActions({
  editHref,
  onDelete,
  shareText,
  label,
}: {
  editHref: string;
  onDelete: () => void;
  shareText: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useMenuDismiss(ref, open, close);

  async function share() {
    close();
    try {
      if (navigator.share) await navigator.share({ text: shareText });
      else await navigator.clipboard.writeText(shareText);
    } catch {}
  }

  return (
    <div className="flex h-9 items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Button asChild size="sm" className="h-9">
          <Link href={editHref} aria-label={`Edit ${label}`}>
            Edit
          </Link>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-9"
          aria-label={`Delete ${label}`}
          onClick={(event) => {
            if (event.detail <= 1) onDelete();
          }}
        >
          Delete
        </Button>
      </div>
      <div ref={ref} className="relative">
        <button
          type="button"
          aria-label={`More options for ${label}`}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex size-9 items-center justify-center rounded-control transition-colors hover:bg-secondary-500/5"
        >
          <Icon src={`${ICONS}/more-button.svg`} size={36} />
        </button>
        {open && (
          <MenuSheet
            onClose={close}
            label={`More options for ${label}`}
            className="lg:top-full lg:right-0"
          >
            <button
              type="button"
              role="menuitem"
              onClick={share}
              className={MENU_ROW}
            >
              <Icon src="/icons/scripts/menu/share.svg" size={24} />
              <span>Share</span>
            </button>
          </MenuSheet>
        )}
      </div>
    </div>
  );
}
