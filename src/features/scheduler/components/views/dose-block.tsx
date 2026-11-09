import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { clockLabel } from "./calendar";
import { IntentLink } from "./intent-link";
import { detailsHref } from "./links";
import { doseLabel, type Occurrence, reminderLabel } from "./occurrences";
import { DARK_INK, TAKEN, TINT } from "./tints";

const ICONS = "/icons/scheduler/views";

export type BlockVariant = "wide" | "card" | "week" | "week-split";

export function DoseBlock({
  occurrence,
  variant,
  className,
}: {
  occurrence: Occurrence;
  variant: BlockVariant;
  className?: string;
}) {
  const { schedule, intake, date, status } = occurrence;
  const taken = status === "taken";
  const dark = DARK_INK.has(schedule.colour);
  const week = variant === "week" || variant === "week-split";
  const [clock, meridiem] = clockLabel(intake.time);
  const label = [
    schedule.name,
    doseLabel(intake),
    `${clock} ${meridiem}`,
    status === "taken" ? "taken" : status === "skipped" ? "skipped" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <IntentLink
      href={detailsHref(schedule.id, date, intake.time)}
      aria-label={label}
      className={cn(
        "flex h-[74px] min-w-0 flex-col gap-0.5 rounded-control border p-[7px] transition-opacity hover:opacity-80",
        taken ? TAKEN : TINT[schedule.colour],
        week && taken && "max-lg:border-[#21B23F]",
        week && "max-lg:items-center max-lg:justify-center",
        className,
      )}
    >
      {week ? (
        <>
          {taken && (
            <Icon src={`${ICONS}/taken.svg`} size={12} className="lg:hidden" />
          )}
          <div className="hidden h-[42px] min-w-0 flex-col lg:flex">
            <span className="truncate text-[12px]/[21px] tracking-[-0.15px] text-secondary-900">
              {schedule.name}
            </span>
            <span
              className={cn(
                "text-[10px]/[17.5px] tracking-[-0.018px] whitespace-nowrap",
                dark ? "text-secondary-900" : "text-secondary-500",
              )}
            >
              {doseLabel(intake)}
            </span>
          </div>
          {variant === "week" && (
            <div className="hidden lg:flex">
              <Status occurrence={occurrence} variant={variant} dark={dark} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex h-[42px] items-center justify-between">
            <div className="flex min-w-0 flex-1 flex-col self-stretch">
              <div className="flex items-center">
                <span className="min-w-0 flex-1 truncate text-[14px]/[21px] tracking-[-0.15px] text-secondary-900">
                  {schedule.name}
                </span>
                {variant === "card" && <Chevron dark={dark} />}
              </div>
              <span
                className={cn(
                  "text-[12.25px]/[17.5px] tracking-[-0.018px]",
                  dark ? "text-secondary-900" : "text-secondary-500",
                )}
              >
                {doseLabel(intake)}
              </span>
            </div>
            {variant === "wide" && (
              <span className="flex size-[35px] shrink-0 items-center justify-center">
                <Chevron dark={dark} />
              </span>
            )}
          </div>
          <Status occurrence={occurrence} variant={variant} dark={dark} />
        </>
      )}
    </IntentLink>
  );
}

function Chevron({ dark }: { dark: boolean }) {
  return (
    <Icon src={`${ICONS}/${dark ? "chevron-dark" : "chevron"}.svg`} size={20} />
  );
}

function Status({
  occurrence: { schedule, status },
  variant,
  dark,
}: {
  occurrence: Occurrence;
  variant: BlockVariant;
  dark: boolean;
}) {
  const week = variant === "week";
  const ink = dark ? "text-secondary-900" : "text-secondary-500";
  if (status === "taken") {
    return (
      <span className="flex h-3.5 items-center gap-1 text-[10.5px]/[14px] tracking-[0.092px] text-[#21B23F]">
        <Icon src={`${ICONS}/taken.svg`} size={12} />
        Taken
      </span>
    );
  }
  if (status === "skipped") {
    return (
      <span
        className={cn(
          "h-3.5 tracking-[0.092px]",
          week ? "text-[8px]/[14px]" : "text-[10.5px]/[14px]",
          ink,
        )}
      >
        Skipped
      </span>
    );
  }
  if (schedule.remindMinutesBefore === null) return null;
  return (
    <span
      className={cn(
        "flex h-3.5 items-center tracking-[0.092px] whitespace-nowrap",
        week ? "gap-1 text-[8px]/[14px]" : "text-[10.5px]/[14px]",
        variant === "wide" ? "gap-[7px]" : "gap-1",
        ink,
      )}
    >
      <Icon
        src={`${ICONS}/${week ? "bell-small" : dark ? "bell-dark" : "bell"}.svg`}
        size={week ? 8 : 12}
      />
      {reminderLabel(schedule.remindMinutesBefore, variant === "card")}
    </span>
  );
}
