"use client";

import { useLayoutEffect, useRef } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import type { Dose, Schedule } from "../../model/schedule";
import { dayMonthLabel, hourLabel, hourOf, toIsoDate } from "./calendar";
import { DoseBlock } from "./dose-block";
import { IntentLink } from "./intent-link";
import { addHref } from "./links";
import { NowLine } from "./now-line";
import { occurrencesOn } from "./occurrences";

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
export const HOUR_PX = 82;

export function Timeline({
  days,
  schedules,
  doses,
  now,
}: {
  days: string[];
  schedules: Schedule[];
  doses: Dose[];
  now: Date | null;
}) {
  const week = days.length > 1;
  const scroller = useRef<HTMLDivElement>(null);
  const today = now ? toIsoDate(now) : null;
  const showsToday = today !== null && days.includes(today);
  const byDay = days.map((day) => occurrencesOn(schedules, doses, day));

  const hours = byDay.flat().map((o) => hourOf(o.intake.time));
  const firstHour = hours.length ? Math.min(...hours) : 7;
  const startHour =
    now && showsToday ? Math.max(0, now.getHours() - 2) : firstHour;
  const ready = now !== null;

  useLayoutEffect(() => {
    if (ready && scroller.current) {
      scroller.current.scrollTop = startHour * HOUR_PX;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div
      ref={scroller}
      className={cn(
        "relative -mr-4 min-h-0 flex-1 [scrollbar-width:none] overflow-x-hidden overflow-y-auto pr-4",
        week
          ? "lg:-mr-[5px] lg:mb-[30px] lg:pr-[5px]"
          : "lg:mr-0 lg:mb-[46px] lg:pr-0",
      )}
    >
      <div className={cn("relative flex flex-col gap-2", !week && "lg:pr-4")}>
        {HOURS.map((hour) => {
          const [number, meridiem] = hourLabel(hour);
          return (
            <div
              key={hour}
              className={cn(
                "h-[74px]",
                week
                  ? "grid grid-cols-[23px_repeat(7,minmax(0,1fr))] gap-1"
                  : "flex gap-[14px]",
              )}
            >
              <span
                className={cn(
                  "flex shrink-0 flex-col text-secondary-500",
                  week ? "w-[23px]" : hour <= 12 ? "w-[17px]" : "w-4",
                )}
              >
                <span className="text-[12px]/[14.4px] tracking-[-0.29px]">
                  {number}
                </span>
                <span className="text-[10px]/[12px] tracking-[0.092px]">
                  {meridiem}
                </span>
              </span>
              {days.map((day, i) => {
                const here = byDay[i].filter(
                  (o) => hourOf(o.intake.time) === hour,
                );
                if (here.length === 0) {
                  return <EmptyCell key={day} day={day} hour={hour} />;
                }
                return (
                  <div
                    key={day}
                    className={cn(
                      "flex min-w-0 flex-1",
                      week ? "gap-0.5" : "gap-[14px]",
                    )}
                  >
                    {here.map((occurrence, j) => (
                      <DoseBlock
                        key={`${occurrence.schedule.id}-${occurrence.intake.time}-${j}`}
                        occurrence={occurrence}
                        variant={
                          week
                            ? here.length > 1
                              ? "week-split"
                              : "week"
                            : here.length > 1
                              ? "card"
                              : "wide"
                        }
                        className="flex-1"
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
        {now && showsToday && (
          <NowLine
            top={
              (now.getHours() +
                now.getMinutes() / 60 +
                now.getSeconds() / 3600) *
              HOUR_PX
            }
            className={cn(
              "-right-[5px] left-[25px]",
              week ? "text-primary-500 lg:-right-[4px]" : "lg:right-[11px]",
            )}
          />
        )}
      </div>
    </div>
  );
}

function EmptyCell({ day, hour }: { day: string; hour: number }) {
  const [number, meridiem] = hourLabel(hour);
  return (
    <IntentLink
      href={addHref(day, `${String(hour).padStart(2, "0")}:00`)}
      aria-label={`Add a medication on ${dayMonthLabel(day)} at ${number} ${meridiem}`}
      className="group flex min-w-0 flex-1 items-center justify-center rounded-control border border-neutral-300 transition-colors hover:border-transparent hover:bg-primary-500/30 focus-visible:border-transparent focus-visible:bg-primary-500/30 active:border-transparent active:bg-primary-500/30"
    >
      <Icon
        src="/icons/scheduler/views/add-cell.svg"
        size={24}
        className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
      />
    </IntentLink>
  );
}
