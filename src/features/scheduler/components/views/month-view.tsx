"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import type { Dose, Schedule } from "../../model/schedule";
import { dayMonthLabel, dayOfMonth, monthWeeks } from "./calendar";
import { MonthHeader } from "./date-strips";
import { DayList } from "./day-list";
import { schedulerHref } from "./links";
import { intakesOn, medicationDosesOn } from "./occurrences";
import { BAR, TAKEN_BAR } from "./tints";

const MAX_BARS = 3;

export function MonthView({
  date,
  schedules,
  doses,
}: {
  date: string;
  schedules: Schedule[];
  doses: Dose[];
}) {
  const router = useRouter();
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheet(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheet]);

  function choose(day: string) {
    const phone = window.matchMedia("(max-width: 1023.98px)").matches;
    if (!phone && day === date) {
      router.push(schedulerHref("day", day));
      return;
    }
    window.history.replaceState(null, "", schedulerHref("month", day));
    if (phone) setSheet(true);
  }

  return (
    <div className="pb-[92px] lg:pb-6">
      <MonthHeader date={date} />
      <div className="flex flex-col gap-2">
        {monthWeeks(date).map((week, i) => (
          <div key={i} className="grid grid-cols-7 gap-1">
            {week.map((day, j) =>
              day ? (
                <DayCell
                  key={day}
                  day={day}
                  selected={day === date}
                  schedules={schedules}
                  doses={doses}
                  onSelect={() => choose(day)}
                />
              ) : (
                <span key={`pad-${j}`} className="h-[66.75px]" />
              ),
            )}
          </div>
        ))}
        <DayList
          date={date}
          schedules={schedules}
          doses={doses}
          className="gap-[10.5px] rounded-card border border-neutral-300 p-[15px] max-lg:rounded-[12.75px] max-lg:p-[13px]"
        />
      </div>

      {sheet && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={dayMonthLabel(date)}
          className="fixed inset-0 z-50 flex items-end lg:hidden"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setSheet(false)}
            className="absolute inset-0 cursor-default bg-[#131921]/95"
          />
          <DayList
            date={date}
            schedules={schedules}
            doses={doses}
            className="relative w-full gap-4 rounded-card border border-[#E5E7EB] bg-white p-[23px] shadow-[0_-4px_25px_0_rgb(0_0_0/0.15)]"
          />
        </div>
      )}
    </div>
  );
}

function DayCell({
  day,
  selected,
  schedules,
  doses,
  onSelect,
}: {
  day: string;
  selected: boolean;
  schedules: Schedule[];
  doses: Dose[];
  onSelect: () => void;
}) {
  const first = (schedule: Schedule) => intakesOn(schedule, day)[0].time;
  const due = medicationDosesOn(schedules, doses, day).sort((a, b) =>
    first(a.schedule).localeCompare(first(b.schedule)),
  );
  const taken = due.filter((o) => o.status === "taken").length;
  const more = due.length - MAX_BARS;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={[
        `${dayMonthLabel(day)}, ${due.length} medication${due.length === 1 ? "" : "s"}`,
        taken > 0 ? `${taken} taken` : null,
      ]
        .filter(Boolean)
        .join(", ")}
      className={cn(
        "flex h-[66.75px] min-w-0 flex-col gap-[3.5px] rounded-[8.75px] text-left text-[12.25px]/[17.5px] tracking-[-0.018px]",
        selected
          ? "bg-info-500 p-[7px] text-white"
          : "border border-neutral-300 p-[7px] text-secondary-500 transition-colors hover:bg-white",
      )}
    >
      <span className="h-[17.5px]">{dayOfMonth(day)}</span>
      <span
        className={cn("flex flex-col", selected ? "gap-0.5" : "gap-[1.75px]")}
      >
        {due.slice(0, MAX_BARS).map(({ schedule, status }) => (
          <span
            key={schedule.id}
            className={cn(
              "h-[3.5px] rounded-full max-lg:w-[33px] lg:w-full",
              selected
                ? "bg-white"
                : status === "taken"
                  ? TAKEN_BAR
                  : BAR[schedule.colour],
            )}
          />
        ))}
        {more > 0 && (
          <span className="text-[10.5px]/[14px] tracking-[0.092px]">
            +{more}
          </span>
        )}
      </span>
    </button>
  );
}
