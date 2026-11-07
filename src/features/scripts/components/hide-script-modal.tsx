"use client";

import { EyeOff, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

/**
 * "Hide script from healthcare providers?" confirmation (Figma `161:3689`).
 * `onConfirm` receives whether "Don't show this again" was ticked so the caller
 * can persist the preference and skip this dialog next time.
 */
export function HideScriptModal({
  onConfirm,
  onClose,
}: {
  onConfirm: (dontShowAgain: boolean) => void;
  onClose: () => void;
}) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Hide script from healthcare providers?"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[448px] rounded-card bg-white px-6 pt-12 pb-9 shadow-card">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-secondary-900 transition-colors hover:text-secondary-500"
        >
          <X className="size-5" />
        </button>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex size-11 items-center justify-center rounded-control bg-[#D6EAFC]">
              <EyeOff className="size-6 text-primary-500" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-title-20 text-[#1C232A]">
                Hide script from healthcare providers?
              </h2>
              <p className="text-body-16 text-secondary-500">
                This will prevent healthcare providers from seeing this script.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={() => onConfirm(dontShowAgain)}
            >
              Hide
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="hide-dont-show"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked === true)}
            />
            <Label
              htmlFor="hide-dont-show"
              className="text-body-14 text-secondary-900"
            >
              Don&apos;t show this again
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
