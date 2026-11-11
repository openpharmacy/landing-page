"use client";

import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export type GoogleAccount = {
  name: string;
  email: string;
  first: string;
  last: string;
  color: string;
};

const ACCOUNTS: GoogleAccount[] = [
  {
    name: "Cody Banks",
    email: "cody.b@gmail.com",
    first: "Cody",
    last: "Banks",
    color: "#5B8DEF",
  },
  {
    name: "CodyBanks",
    email: "cody.banks@gmail.com",
    first: "Cody",
    last: "Banks",
    color: "#E06C75",
  },
];

export function GoogleAccountModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (account: GoogleAccount | null) => void;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose an account"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[480px] overflow-hidden rounded-lg border-t border-[#EAEAEA] bg-white pb-9 shadow-card">
        <div className="flex flex-col items-center gap-4 px-10 pt-6">
          <Image
            src="/icons/logo.svg"
            alt=""
            width={48}
            height={48}
            unoptimized
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-normal text-[#020202]">
              Choose an account
            </h2>
            <p className="text-base text-[#020202]">
              to continue to <span className="text-info-500">OpenPharmacy</span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          {ACCOUNTS.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => onSelect(account)}
              className="flex w-full items-center gap-3 border-b border-[#EAEAEA] px-10 py-3 text-left transition-colors hover:bg-black/[0.03]"
            >
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-caption-12-bold text-white"
                style={{ backgroundColor: account.color }}
              >
                {account.first.at(0)}
              </span>
              <span className="flex flex-col">
                <span className="text-[14px] font-medium text-[#020202]">
                  {account.name}
                </span>
                <span className="text-[12px] text-[#5f6368]">
                  {account.email}
                </span>
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={() => onSelect(null)}
            className="flex w-full items-center gap-3 border-b border-[#EAEAEA] px-10 py-3.5 text-left transition-colors hover:bg-black/[0.03]"
          >
            <CircleUserRound className="size-5 shrink-0 text-[#020202]" />
            <span className="text-[14px] font-medium text-[#020202]">
              Use another account
            </span>
          </button>
        </div>

        <p className="px-10 pt-9 text-[14px] leading-5 text-[#5f6368]">
          To continue, Google will share your name, email address, language
          preference, and profile picture with OpenPharmacy. Before using this
          app, you can review OpenPharmacy&apos;s{" "}
          <Link href="/privacy" className="text-info-500">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-info-500">
            terms of service
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
