"use client";

import { Button } from "@/components/ui/button";

import { ModalShell } from "./modal-shell";

export function ConfirmModal({
  title,
  confirmLabel,
  onConfirm,
  onClose,
  busy = false,
  error,
}: {
  title: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
  busy?: boolean;
  error?: string | null;
}) {
  return (
    <ModalShell
      label={title.replace(/\s*\n\s*/g, " ")}
      onClose={onClose}
      closeDisabled={busy}
    >
      <h2 className="text-center text-title-20 whitespace-break-spaces text-neutral-900">
        {title}
      </h2>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="destructive"
          size="lg"
          className="w-full"
          disabled={busy}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={busy}
          onClick={onClose}
        >
          Cancel
        </Button>
        {error && (
          <p role="alert" className="text-caption-12 text-error-500">
            {error}
          </p>
        )}
      </div>
    </ModalShell>
  );
}
