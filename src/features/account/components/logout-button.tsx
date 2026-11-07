"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { signOut } from "@/lib/auth/mock-session";

/** "Log Out" row at the bottom of the account settings. */
export function LogoutButton() {
  const router = useRouter();

  function logout() {
    signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="flex w-full items-center gap-4 border-t border-[#E5E7EB] px-5 py-5 text-left transition-colors hover:bg-error-500/5"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-card bg-error-500/10">
        <LogOut className="size-6 text-error-500" />
      </span>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-body-16-bold text-error-500">Log Out</span>
        <span className="text-body-14 text-secondary-300">
          Sign out of your account
        </span>
      </div>
    </button>
  );
}
