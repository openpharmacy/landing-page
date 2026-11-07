"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { setScriptsAdded } from "@/lib/auth/mock-session";

import { ScriptSourceCards } from "./script-source-cards";
import { ScriptTokenInput } from "./script-token-input";

/**
 * "Add Script" dialog opened from the + button on My Scripts. Two steps: the
 * source chooser (Figma `298:4966`) and the manual token form (Figma `94:4654`).
 * "Add Manually" advances to the token step; "Connect ASL Now" navigates to the
 * ASL flow (handled by the card link). No eScript backend yet (docs/api-gaps.md).
 */
export function AddScriptModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState<"choose" | "manual">("choose");
  const [token, setToken] = useState("");

  // Mounted only while open; close on Escape.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!token.trim()) return;
    // No eScript backend yet (docs/api-gaps.md) — mock the add so the list shows.
    setScriptsAdded();
    onClose();
    router.refresh();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={step === "choose" ? "Add Script" : "Add a script"}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />

      <div className="relative max-h-[90dvh] w-full max-w-[448px] overflow-x-hidden overflow-y-auto rounded-card bg-white shadow-card">
        {step === "choose" ? (
          <>
            <div className="flex items-center justify-between gap-4 border-b border-neutral-300 p-6">
              <h2 className="text-h4-24 text-[#101828]">Add Script</h2>
              <CloseButton onClose={onClose} />
            </div>
            <div className="p-6">
              <ScriptSourceCards onAddManually={() => setStep("manual")} />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 p-6">
              <div className="flex flex-col">
                <h2 className="text-h4-24 text-[#101828]">Add a script</h2>
                <p className="text-body-14 text-[#9EB6C9]">
                  Enter your eScript token to add the script
                </p>
              </div>
              <CloseButton onClose={onClose} />
            </div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-2 px-6 pb-6">
                <Label htmlFor="escript-token-modal">eScript Token</Label>
                <ScriptTokenInput
                  id="escript-token-modal"
                  value={token}
                  onChange={setToken}
                />
                <p className="text-caption-12 text-[#9EB6C9]">
                  Enter the token exactly as shown.
                </p>
              </div>
              <div className="flex flex-col gap-4 px-6 pb-6">
                <Button type="submit" size="lg" className="w-full">
                  Submit Script
                </Button>
                <button
                  type="button"
                  className="flex h-14 w-full items-center justify-center gap-1 rounded-card text-body-16-bold text-secondary-300 transition-colors hover:bg-secondary-500/5"
                >
                  <Icon src="/icons/scripts/message-question.svg" size={24} />
                  Where do I find my token?
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="shrink-0 text-secondary-900 transition-colors hover:text-secondary-500"
    >
      <X className="size-5" />
    </button>
  );
}
