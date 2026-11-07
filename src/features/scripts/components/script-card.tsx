"use client";

import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

import { HiddenBanner } from "./hidden-banner";
import { HideScriptModal } from "./hide-script-modal";
import { ScriptActionsMenu } from "./script-actions-menu";
import { SecurityShield } from "./security-shield";

export type Script = {
  name: string;
  detail: string;
  tags: string[];
  status: "active" | "expired";
  /** ASL-sourced scripts show a shield next to the name (Figma synced state). */
  secure?: boolean;
};

const STATUS = {
  active: { label: "Active", className: "bg-[#219A55]" },
  expired: { label: "Expired", className: "bg-[#B93B2F]" },
} as const;

// Remembers the "Don't show this again" choice for the Hide confirmation.
const HIDE_CONFIRM_KEY = "op_hide_confirm_dismissed";

/** A single prescription card in the My Scripts list (Figma `293:3936`). */
export function ScriptCard({ script }: { script: Script }) {
  const router = useRouter();
  const status = STATUS[script.status];
  const [hidden, setHidden] = useState(false);
  const [hideModalOpen, setHideModalOpen] = useState(false);

  function openDetail() {
    const params = new URLSearchParams({
      name: script.name,
      status: script.status,
      variant: script.secure ? "asl" : "paper",
      tags: script.tags.join(","),
    });
    if (hidden) params.set("hidden", "1");
    router.push(`/scripts/detail?${params.toString()}`);
  }

  // Stop card-body clicks on the action controls from opening the detail page.
  const stop = (event: MouseEvent) => event.stopPropagation();

  function requestHide() {
    const dismissed =
      typeof window !== "undefined" &&
      window.localStorage.getItem(HIDE_CONFIRM_KEY) === "1";
    if (dismissed) {
      setHidden(true);
    } else {
      setHideModalOpen(true);
    }
  }

  function confirmHide(dontShowAgain: boolean) {
    if (dontShowAgain && typeof window !== "undefined") {
      window.localStorage.setItem(HIDE_CONFIRM_KEY, "1");
    }
    setHideModalOpen(false);
    setHidden(true);
  }

  return (
    <>
      <div
        onClick={openDetail}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") openDetail();
        }}
        className="relative cursor-pointer rounded-card border border-[#E5E7EB] bg-white p-6 transition-shadow hover:shadow-card"
      >
        <span
          className={cn(
            "absolute top-0 right-0 rounded-tr-card rounded-bl-[8px] px-1.5 py-1.5 text-caption-12-bold text-white",
            status.className,
          )}
        >
          {status.label}
        </span>

        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-2">
            <h3 className="text-title-20 text-[#101828]">{script.name}</h3>
            {script.secure && (
              <SecurityShield className="size-5 shrink-0 text-success-500" />
            )}
          </div>

          <p className="text-body-16 text-text-muted">{script.detail}</p>

          <div className="flex flex-wrap gap-2">
            {script.tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-control bg-[#EFF6FF] px-3 py-1.5 text-body-14 font-semibold text-info-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {hidden && <HiddenBanner />}

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={stop}
                className="rounded-control bg-gradient-primary px-4 py-2 text-body-14 font-bold text-white transition-opacity hover:opacity-95"
              >
                Refill
              </button>
              <button
                type="button"
                onClick={stop}
                className="rounded-control border border-secondary-500 bg-white px-4 py-2 text-body-14 font-bold text-secondary-500 transition-colors hover:bg-secondary-500/5"
              >
                Schedule
              </button>
            </div>
            <div onClick={stop}>
              <ScriptActionsMenu
                onHide={requestHide}
                triggerClassName="flex size-9 items-center justify-center rounded-control text-[#9EB6C9] transition-colors hover:bg-bg-app"
              />
            </div>
          </div>
        </div>
      </div>

      {hideModalOpen && (
        <HideScriptModal
          onConfirm={confirmHide}
          onClose={() => setHideModalOpen(false)}
        />
      )}
    </>
  );
}
