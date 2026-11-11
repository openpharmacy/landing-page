"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthActions } from "@/features/auth/hooks/use-auth-actions";

const OFFLINE =
  "Could not reach OpenPharmacy, so you are still signed in. Check your connection and try again.";

export function LogoutButton() {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function logout() {
    setBusy(true);
    setError(null);
    const result = await signOut();
    if (result === "unreachable") {
      setBusy(false);
      setError(OFFLINE);
      return;
    }
    if (result === "failed") {
      window.location.assign("/api/auth/expired?next=/");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={logout}
        disabled={busy}
        aria-busy={busy || undefined}
        className="flex h-[93px] w-full items-center gap-4 border-t border-[#e5e7eb] px-5 text-left transition-colors hover:bg-error-500/5 disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-transparent"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-card bg-error-500/10">
          <LogOut className="size-6 text-error-500" strokeWidth={1.5} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="h-7 text-subtitle-18-bold text-error-500">
            Log Out
          </span>
          <span className="text-body-14 text-text-muted">
            {busy ? "Signing out…" : "Sign out of your account"}
          </span>
        </span>
      </button>
      {error && (
        <p role="alert" className="px-5 pb-4 text-caption-12 text-error-500">
          {error}
        </p>
      )}
    </>
  );
}
