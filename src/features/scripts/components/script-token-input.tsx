"use client";

import { Icon } from "@/components/ui/icon";

/**
 * eScript token field (barcode icon + input). eScript tokens are uppercase, so
 * the value is force-uppercased as the user types. Shared by the Add-a-script
 * page and modal.
 */
export function ScriptTokenInput({
  value,
  onChange,
  id = "escript-token",
}: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-control border border-neutral-300 bg-white px-3 py-4 transition-colors focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/30">
      <Icon src="/icons/scan-barcode.svg" size={20} className="shrink-0" />
      <input
        id={id}
        name="escript-token"
        value={value}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        placeholder="Token"
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        className="w-full bg-transparent text-body-16-bold text-secondary-900 outline-none placeholder:font-normal placeholder:text-[#9EB6C9]"
      />
    </div>
  );
}
