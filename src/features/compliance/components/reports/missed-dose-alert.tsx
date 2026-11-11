"use client";

import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import type { MissedDose } from "@/features/compliance/model/report";
import { cn } from "@/lib/utils";

import { ICONS } from "./ui";

export function MissedDoseAlert({
  alert,
  className,
}: {
  alert: MissedDose;
  className?: string;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="status"
      className={cn(
        "flex gap-2 rounded-card-lg border border-[#FFD6A8] bg-[linear-gradient(to_bottom_right,#FFFBEB,#FFF7ED)] p-[15px]",
        className,
      )}
    >
      <span className="flex h-6 w-5 shrink-0 items-center">
        <Icon src={`${ICONS}/clock-small.svg`} size={20} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-body-14 text-text">{alert.text}</p>
        <Link
          href={alert.href}
          className="w-fit text-body-16 text-info-500 hover:underline"
        >
          Adjust Schedule
        </Link>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
        className="size-6 shrink-0 transition-opacity hover:opacity-70"
      >
        <Icon src={`${ICONS}/close.svg`} size={24} />
      </button>
    </div>
  );
}
