"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { addScript } from "../api/scripts-api";
import { scriptTokenSchema } from "../model/validation";
import { TokenHelpModal } from "./script-dialogs";
import { ScriptSourceCards } from "./script-source-cards";
import { ScriptTokenActions, ScriptTokenField } from "./script-token-input";

export function AddScriptModal({
  onClose,
  initialStep = "choose",
}: {
  onClose: () => void;
  initialStep?: "choose" | "manual";
}) {
  const router = useRouter();
  const [step, setStep] = useState(initialStep);
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = scriptTokenSchema.safeParse(token);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid token");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await addScript(parsed.data);
      onClose();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add the script");
      setSubmitting(false);
    }
  }

  if (step === "choose") {
    return (
      <Dialog
        label="Add Script"
        onClose={onClose}
        className="max-lg:px-5"
        panelClassName="max-lg:-translate-y-[18px]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-neutral-300 p-6">
          <h2 className="text-h4-24 text-[#101828]">Add Script</h2>
          <CloseButton onClose={onClose} />
        </div>
        <div className="p-6">
          <ScriptSourceCards
            variant="modal"
            onAddManually={() => setStep("manual")}
          />
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      label="Add a script"
      onClose={helpOpen ? () => {} : onClose}
      className="max-lg:pr-5 max-lg:pl-[21px]"
      panelClassName="max-lg:-translate-y-[22px]"
    >
      <div className="flex items-center justify-between gap-4 p-6">
        <div className="flex flex-col">
          <h2 className="text-h4-24 text-[#101828]">Add a script</h2>
          <p className="text-body-14 text-[#9eb6c9]">
            Enter your eScript token to add the script
          </p>
        </div>
        <CloseButton onClose={onClose} />
      </div>
      <form onSubmit={onSubmit}>
        <div className="p-6">
          <ScriptTokenField
            id="escript-token-modal"
            value={token}
            error={error}
            onChange={(value) => {
              setToken(value);
              setError(null);
            }}
          />
        </div>
        <div className="p-6">
          <ScriptTokenActions
            submitting={submitting}
            onHelp={() => setHelpOpen(true)}
          />
        </div>
      </form>
      {helpOpen && <TokenHelpModal onClose={() => setHelpOpen(false)} />}
    </Dialog>
  );
}

function Dialog({
  label,
  onClose,
  className,
  panelClassName,
  children,
}: {
  label: string;
  onClose: () => void;
  className?: string;
  panelClassName?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/80 lg:bg-black/60"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative max-h-full w-full max-w-[448px] overflow-x-hidden overflow-y-auto rounded-card bg-white",
          panelClassName,
        )}
      >
        {children}
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
      className="shrink-0 transition-opacity hover:opacity-70"
    >
      <Icon src="/icons/scripts/close.svg" size={24} />
    </button>
  );
}
