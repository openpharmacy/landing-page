import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { isMockingEnabled } from "@/config/env";
import type { VitalType } from "@/features/compliance/model/vitals";
import { BackCircle } from "@/features/scripts/components/back-circle";
import { cn } from "@/lib/utils";

export const ICONS = "/icons/compliance/reports";

export const STORE_BODY = isMockingEnabled ? "" : "max-lg:min-h-svh";

export const VITAL_ICONS: Record<VitalType, string> = {
  bloodPressure: "heart",
  heartRate: "pulse",
  bloodSugar: "drop",
  weight: "weight",
};

export const CARD = "rounded-card border border-neutral-300 bg-white";

export function BackButton({ href, label }: { href: string; label: string }) {
  return (
    <>
      <Link
        href={href}
        aria-label={label}
        className="flex size-8 shrink-0 items-center justify-center rounded-[23px] bg-[#1C232A]/8 transition-opacity hover:opacity-80 lg:hidden"
      >
        <Icon src={`${ICONS}/back-mobile.svg`} size={24} />
      </Link>
      <BackCircle href={href} label={label} className="max-lg:hidden" />
    </>
  );
}

export function PageTitleRow({
  title,
  backHref,
  backLabel,
  className,
  children,
}: {
  title: string;
  backHref: string;
  backLabel: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-4 lg:gap-2", className)}>
      <BackButton href={backHref} label={backLabel} />
      <h1 className="min-w-0 flex-1 text-h4-24 text-secondary-900 lg:leading-[26px]">
        {title}
      </h1>
      {children}
    </div>
  );
}

export type SegmentOption = {
  label: string;
  active: boolean;
  href?: string;
  onSelect?: () => void;
};

export function SegmentedControl({
  options,
  label,
  desktopTint = false,
  className,
}: {
  options: SegmentOption[];
  label: string;
  desktopTint?: boolean;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex h-9 items-center rounded-control bg-[#D1D7DE]/30 p-1",
        desktopTint && "lg:bg-[#E7EBF2]",
        className,
      )}
    >
      {options.map((option) => {
        const classes = cn(
          "flex h-7 flex-1 items-center justify-center rounded-[4px] text-body-14 transition-colors",
          option.active
            ? "bg-info-500 font-bold text-white"
            : cn(
                "text-secondary-900 hover:text-info-500",
                desktopTint && "lg:text-secondary-500",
              ),
        );
        return option.href ? (
          <Link
            key={option.label}
            href={option.href}
            scroll={false}
            aria-current={option.active ? "true" : undefined}
            className={classes}
          >
            {option.label}
          </Link>
        ) : (
          <button
            key={option.label}
            type="button"
            aria-pressed={option.active}
            onClick={option.onSelect}
            className={classes}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function SectionHeader({
  title,
  href,
  className,
  titleClassName,
  linkClassName,
}: {
  title: ReactNode;
  href?: string;
  className?: string;
  titleClassName?: string;
  linkClassName?: string;
}) {
  return (
    <div className={cn("flex h-6 items-center gap-4", className)}>
      <h2
        className={cn(
          "min-w-0 flex-1 text-subtitle-18-bold text-secondary-900",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className={cn(
            "shrink-0 text-body-16 text-info-500 hover:underline",
            linkClassName,
          )}
        >
          View all
        </Link>
      )}
    </div>
  );
}

const TAG_TONES = {
  mild: "bg-success-500/20 text-success-500",
  moderate: "bg-[#F39C12]/20 text-[#F39C12]",
  severe: "bg-error-500/20 text-error-500",
  info: "bg-[#37B5FE]/20 text-[#3498DB]",
};

export function Tag({
  tone,
  children,
}: {
  tone: keyof typeof TAG_TONES;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "flex h-6 shrink-0 items-center rounded-[15px] px-2 text-caption-12-bold whitespace-nowrap",
        TAG_TONES[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Meter({
  share,
  color,
  className,
}: {
  share: number;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-2 shrink-0 overflow-hidden rounded-full bg-bg-app",
        className,
      )}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.max(0, Math.min(1, share)) * 100}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

export function DateLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-6 items-center gap-1">
      <Icon src={`${ICONS}/calendar.svg`} size={24} />
      <span className={cn("text-body-14", className)}>{children}</span>
    </div>
  );
}
