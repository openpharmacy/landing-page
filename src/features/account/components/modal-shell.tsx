"use client";

import { useEffect, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";

export function ModalShell({
  label,
  onClose,
  closeDisabled = false,
  children,
}: {
  label: string;
  onClose: () => void;
  closeDisabled?: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    if (closeDisabled) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, closeDisabled]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pr-[30px] pl-[31px] lg:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-busy={closeDisabled || undefined}
    >
      <button
        type="button"
        aria-label="Close"
        disabled={closeDisabled}
        className="absolute inset-0 cursor-default bg-[#131921]/95 lg:bg-black/60"
        onClick={(event) => {
          if (event.detail <= 1) onClose();
        }}
      />

      <div className="relative flex w-full max-w-[448px] -translate-y-[18px] flex-col gap-6 rounded-card bg-white px-6 pt-10 pb-9 lg:-translate-y-[66px] lg:pt-12">
        <button
          type="button"
          onClick={onClose}
          disabled={closeDisabled}
          aria-label="Close"
          className="absolute top-4 right-6 flex transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40 lg:top-6 lg:right-[30px]"
        >
          <Icon src="/icons/account/close.svg" size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
