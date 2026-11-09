"use client";

import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

import { SORT_OPTIONS, type SortKey } from "../model/script";
import { MENU_ROW, MenuSheet, useMenuDismiss } from "./menu-sheet";

export function SortMenu({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useMenuDismiss(ref, open, close);

  return (
    <div ref={ref} className="relative flex-1 lg:flex-none">
      <Button
        variant="secondary"
        className="w-full gap-1 px-[23px] py-[15px] lg:w-auto"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon src="/icons/scripts/sort.svg" size={24} />
        Sort
      </Button>

      {open && (
        <MenuSheet
          onClose={close}
          label="Sort by"
          className="lg:top-full lg:left-0"
        >
          {SORT_OPTIONS.map((option) => {
            const selected = option.key === value;
            return (
              <button
                key={option.key}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  onChange(option.key);
                  close();
                }}
                className={MENU_ROW}
              >
                <span>{option.label}</span>
                {selected && (
                  <Icon src="/icons/check.svg" size={20} className="ml-auto" />
                )}
              </button>
            );
          })}
        </MenuSheet>
      )}
    </div>
  );
}
