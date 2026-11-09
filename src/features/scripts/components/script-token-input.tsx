"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function ScriptTokenInput({
  value,
  onChange,
  id = "escript-token",
  invalid = false,
}: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  invalid?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-control border border-neutral-300 bg-white px-[11px] py-[15px] transition-colors focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/30",
        invalid &&
          "border-error-500 focus-within:border-error-500 focus-within:ring-error-500/30",
      )}
    >
      <Icon src="/icons/scan-barcode.svg" size={20} className="shrink-0" />
      <input
        id={id}
        name="escript-token"
        value={value}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        placeholder="Token"
        autoComplete="off"
        autoCapitalize="characters"
        aria-invalid={invalid}
        aria-describedby={`${id}-hint`}
        spellCheck={false}
        className="w-full bg-transparent text-body-16-bold text-neutral-900 outline-none placeholder:font-normal placeholder:text-[#9eb6c9]"
      />
    </div>
  );
}

export function ScriptTokenField({
  id,
  value,
  error,
  onChange,
}: {
  id: string;
  value: string;
  error?: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>eScript Token</Label>
      <ScriptTokenInput
        id={id}
        value={value}
        onChange={onChange}
        invalid={Boolean(error)}
      />
      {error ? (
        <p
          id={`${id}-hint`}
          role="alert"
          className="text-caption-12 text-error-500"
        >
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="text-caption-12 text-[#9eb6c9]">
          Enter the token exactly as shown.
        </p>
      )}
    </div>
  );
}

export function ScriptTokenActions({
  submitting = false,
  onHelp,
}: {
  submitting?: boolean;
  onHelp: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Button type="submit" className="w-full" disabled={submitting}>
        Submit Script
      </Button>
      <button
        type="button"
        onClick={onHelp}
        className="flex h-14 w-full items-center justify-center gap-1 rounded-card text-body-16-bold text-secondary-300 transition-colors hover:bg-secondary-500/5"
      >
        <Icon src="/icons/scripts/message-question.svg" size={24} />
        Where do I find my token?
      </button>
    </div>
  );
}
