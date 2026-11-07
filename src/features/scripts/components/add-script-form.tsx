"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { setScriptsAdded } from "@/lib/auth/mock-session";

import { ScriptTokenInput } from "./script-token-input";

/**
 * Logged-in "Add a script" manual token form (Figma `94:5163` / `94:5356`).
 * The eScript/ASL upload has no backend endpoint yet (see docs/api-gaps.md), so
 * adding is mocked: a valid token flips the mock flag and returns to My Scripts.
 */
export function AddScriptForm() {
  const router = useRouter();
  const [token, setToken] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!token.trim()) return;
    setScriptsAdded();
    router.push("/scripts");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-[480px] px-4 py-8">
      <div className="flex flex-col gap-8">
        <Link
          href="/scripts"
          className="inline-flex items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
        >
          <ArrowLeft className="size-5" />
          Back
        </Link>

        <div className="flex flex-col">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Add a script
          </h1>
          <p className="text-body-16 text-secondary-300">
            Enter your eScript token to add the script
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-[23px]">
          <div className="flex flex-col gap-2">
            <Label htmlFor="escript-token">eScript Token</Label>
            <ScriptTokenInput value={token} onChange={setToken} />
            <p className="text-caption-12 text-[#9EB6C9]">
              Enter the token exactly as shown.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              size="lg"
              disabled={!token.trim()}
              className="w-full"
            >
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
      </div>
    </div>
  );
}
