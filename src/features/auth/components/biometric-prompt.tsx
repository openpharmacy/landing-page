"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { isMockingEnabled } from "@/config/env";

import { useAuthActions } from "../hooks/use-auth-actions";
import { LAST_USER_SIGN_IN, withNext } from "../model/next-path";

const SHEET =
  "rounded-[24px] border border-secondary-300 bg-white shadow-[0_0_20px_rgb(0_0_0/0.18)]";

export function BiometricPrompt({
  email,
  next,
}: {
  email: string;
  next: string | null;
}) {
  const router = useRouter();
  const { signInWithDevice } = useAuthActions();
  const [open, setOpen] = useState(true);
  const cancelHref = withNext("/sign-in/quick", next);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") router.push(cancelHref);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, cancelHref, router]);

  async function verify() {
    if (!isMockingEnabled) {
      router.push(withNext(LAST_USER_SIGN_IN, next));
      return;
    }
    setOpen(false);
    try {
      await signInWithDevice(email);
      router.push(next ?? "/home");
      router.refresh();
    } catch {
      setOpen(true);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="biometric-title"
      className="absolute inset-0 z-50 bg-black/80"
    >
      <div className="absolute top-[calc(50%-173px)] left-[max(16px,calc(50%-179px))] flex w-[360px] max-w-[calc(100%-30px)] flex-col gap-4">
        <div
          className={`flex w-[359px] max-w-full translate-x-[0.5px] flex-col items-center gap-6 p-[23px] ${SHEET}`}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 id="biometric-title" className="text-h4-24 text-secondary-900">
              Verify your identity
            </h2>
            <p className="w-[262px] max-w-full text-body-14 text-secondary-500">
              OpenPharmacy needs to verify it’s you.
              <br />
              <br />
              Scan your fingerprint.
            </p>
          </div>
          <Link
            href={cancelHref}
            className="flex h-[30px] items-center rounded-[6px] px-1 text-subtitle-18-bold text-info-500 hover:underline"
          >
            Cancel
          </Link>
        </div>
        <button
          type="button"
          onClick={verify}
          aria-label="Scan your fingerprint"
          className={`flex size-[100px] items-center justify-center self-center ${SHEET}`}
        >
          <Icon src="/icons/auth/fingerprint.svg" size={48} />
        </button>
      </div>
    </div>
  );
}
