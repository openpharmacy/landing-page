"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { VIEWS, type View } from "./calendar";
import { schedulerHref } from "./links";
import { rememberView } from "./use-clock";

const ICONS = "/icons/scheduler/views";
export const VIEW_LABEL: Record<View, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
};

export function ViewSwitcher({
  view,
  date,
}: {
  view: View;
  date: string | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

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
  }, [open, close]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[34px] items-center gap-[7px] rounded-[6.75px] border border-neutral-300 p-1 lg:h-12"
      >
        <span className="flex items-center gap-1 text-[12.25px]/[17.5px] font-bold tracking-[-0.018px] text-secondary-900">
          <Icon src={`${ICONS}/${view}.svg`} size={24} />
          {VIEW_LABEL[view]}
        </span>
        <Icon src={`${ICONS}/chevron-down.svg`} size={16} />
      </button>

      {open && (
        <>
          <div
            aria-hidden
            onPointerDown={close}
            className="fixed inset-0 z-50 bg-[#131921]/95 lg:hidden"
          />
          <div
            role="menu"
            aria-label="View"
            className={cn(
              "z-50 flex flex-col gap-4 rounded-card border border-[#E5E7EB] bg-white p-[23px] shadow-[0_-4px_25px_0_rgb(0_0_0/0.15)]",
              "max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0",
              "lg:absolute lg:top-full lg:right-0 lg:mt-2 lg:w-[393px]",
            )}
          >
            {VIEWS.map((option) => (
              <Link
                key={option}
                href={schedulerHref(option, date)}
                role="menuitemradio"
                aria-checked={option === view}
                onClick={() => {
                  rememberView(option);
                  close();
                }}
                className="flex h-[58px] items-center gap-1 rounded-[6.75px] border border-neutral-300 px-4 text-[16px]/[17.5px] font-bold tracking-[-0.018px] text-secondary-900 transition-colors hover:bg-bg-app"
              >
                <Icon src={`${ICONS}/${option}.svg`} size={24} />
                {VIEW_LABEL[option]}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
