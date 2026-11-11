"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";

const SKIP_HIDE_CONFIRM_KEY = "op_hide_confirm_skip";

function skipsHideConfirm() {
  try {
    return window.localStorage.getItem(SKIP_HIDE_CONFIRM_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberSkip() {
  try {
    window.localStorage.setItem(SKIP_HIDE_CONFIRM_KEY, "1");
  } catch {}
}

const COPY = {
  hide: {
    title: "Hide script from healthcare providers?",
    text: "This will prevent healthcare providers from seeing this script.",
    confirm: "Hide",
    icon: "/icons/scripts/hide-script.svg",
  },
  show: {
    title: "Show script to healthcare providers?",
    text: "Healthcare providers will be able to see this script again.",
    confirm: "Unhide",
    icon: "/icons/scripts/show-script.svg",
  },
};

export function HideScriptModal({
  mode = "hide",
  onConfirm,
  onClose,
}: {
  mode?: "hide" | "show";
  onConfirm: (dontShowAgain: boolean) => void;
  onClose: () => void;
}) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const copy = COPY[mode];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pr-[30px] pl-[31px] lg:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={copy.title}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-[#131921]/95 lg:bg-black/60"
        onClick={(event) => {
          if (event.detail <= 1) onClose();
        }}
      />

      <div className="relative flex w-full max-w-[448px] -translate-y-[18px] flex-col gap-6 rounded-card bg-white px-6 pt-10 pb-9 lg:-translate-y-[66px] lg:pt-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-6 transition-opacity hover:opacity-70 lg:top-6 lg:right-[30px]"
        >
          <Icon src="/icons/scripts/close.svg" size={24} />
        </button>

        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex size-11 items-center justify-center rounded-control bg-primary-500/20">
            <Icon src={copy.icon} size={24} />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-title-20 text-neutral-900">{copy.title}</h2>
            <p className="text-body-16 text-secondary-500">{copy.text}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            className="w-full"
            onClick={() => onConfirm(dontShowAgain)}
          >
            {copy.confirm}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full py-[15px]"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>

        {mode === "hide" && (
          <div className="flex items-start gap-2">
            <Checkbox
              id="hide-dont-show"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked === true)}
              className="data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500"
            />
            <Label
              htmlFor="hide-dont-show"
              className="text-body-14 text-secondary-900"
            >
              Don’t show this again
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}

export function useHideConfirm(setHidden: (hidden: boolean) => void) {
  const [asking, setAsking] = useState<"hide" | "show" | null>(null);

  function request(hidden: boolean) {
    if (hidden && skipsHideConfirm()) setHidden(true);
    else setAsking(hidden ? "hide" : "show");
  }

  const dialog = asking && (
    <HideScriptModal
      mode={asking}
      onConfirm={(dontShowAgain) => {
        if (asking === "hide" && dontShowAgain) rememberSkip();
        setAsking(null);
        setHidden(asking === "hide");
      }}
      onClose={() => setAsking(null)}
    />
  );

  return { request, dialog };
}
