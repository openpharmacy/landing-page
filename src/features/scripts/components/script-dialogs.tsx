"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ModalShell } from "@/features/account/components/modal-shell";

export function DeleteScriptModal({
  busy,
  error,
  onConfirm,
  onClose,
}: {
  busy: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const close = () => {
    if (!busy) onClose();
  };
  return (
    <ModalShell label="Delete script?" onClose={close}>
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-title-20 text-neutral-900">Delete script?</h2>
        <p className="text-body-16 text-secondary-500">
          This removes the script from your list. This can’t be undone.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="destructive"
          size="lg"
          className="w-full"
          disabled={busy}
          aria-busy={busy}
          onClick={onConfirm}
        >
          {busy ? "Deleting…" : "Delete"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={busy}
          onClick={close}
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

function HelpModal({
  title,
  href,
  onClose,
  children,
}: {
  title: string;
  href: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return createPortal(
    <ModalShell label={title} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-11 items-center justify-center rounded-control bg-primary-500/20">
          <Icon src="/icons/scripts/help.svg" size={24} />
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-title-20 text-neutral-900">{title}</h2>
          <div className="flex flex-col gap-2 text-body-16 text-secondary-500">
            {children}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button type="button" className="w-full" onClick={onClose}>
          Got it
        </Button>
        <Button asChild variant="secondary" className="w-full">
          <Link href={href}>Read the help article</Link>
        </Button>
      </div>
    </ModalShell>,
    document.body,
  );
}

export function TokenHelpModal({ onClose }: { onClose: () => void }) {
  return (
    <HelpModal
      title="Where do I find my token?"
      href="/help/prescriptions-scripts/where-to-find-my-escript-token"
      onClose={onClose}
    >
      <p>Your prescriber sends your eScript by SMS or email.</p>
      <p>
        The token is the code shown under its QR code: 18 to 21 letters and
        numbers, starting with 1, 2 or 3.
      </p>
    </HelpModal>
  );
}

export function ActivationCodeHelpModal({ onClose }: { onClose: () => void }) {
  return (
    <HelpModal
      title="Don’t have an activation code?"
      href="/help/prescriptions-scripts/setting-up-active-script-list"
      onClose={onClose}
    >
      <p>
        The activation code has 8 characters, including a hyphen. It comes with
        your Active Script List registration, which is usually done at a
        pharmacy.
      </p>
      <p>
        If you don’t have it, ask your pharmacist. You only need it once, to
        connect your list.
      </p>
    </HelpModal>
  );
}
