"use client";

import { Icon } from "@/components/ui/icon";
import type { Range } from "@/features/compliance/model/report";

import { ICONS } from "./ui";

export function ExportButton({ range }: { range: Range }) {
  return (
    <button
      type="button"
      aria-label={`Download the ${range} report`}
      onClick={() => window.print()}
      className="flex size-14 shrink-0 items-center justify-center rounded-card transition-colors hover:bg-secondary-500/5"
    >
      <Icon
        src={`${ICONS}/download-dark.svg`}
        size={24}
        className="lg:hidden"
      />
      <Icon src={`${ICONS}/download.svg`} size={24} className="max-lg:hidden" />
    </button>
  );
}
