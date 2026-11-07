"use client";

import { MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { ScriptTokenInput } from "./script-token-input";

/**
 * Logged-out "Scripts" screen (Figma `214:2541`). Enter an eScript token to
 * start the guest upload flow; `onUpload` receives the (uppercased) token.
 */
export function UnlockPrescriptionCard({
  onUpload,
}: {
  onUpload: (token: string) => void;
}) {
  const [token, setToken] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (token.trim()) onUpload(token.trim());
  }

  return (
    <div className="mx-auto w-full max-w-[870px] rounded-card-lg border border-[#E5E7EB] bg-white px-6 py-12">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex w-full max-w-[442px] flex-col gap-9"
      >
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/icons/script-unlock.svg"
            alt=""
            width={80}
            height={80}
            unoptimized
          />
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-h4-24 text-[#101828] lg:text-h3-30">
              Unlock Prescription Medications
            </h1>
            <p className="text-body-16 text-text-muted lg:text-body-18">
              Add your eScript token to browse prescription medications
              available for your specific prescriptions
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="escript-token">eScript Token</Label>
          <ScriptTokenInput value={token} onChange={setToken} />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!token.trim()}
          className="w-full"
        >
          Upload eScript Token
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="w-full gap-1 text-secondary-700"
        >
          <MessageCircleQuestion className="size-6" />
          Where is the eScript token?
        </Button>
      </form>
    </div>
  );
}
