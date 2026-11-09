import { cn } from "@/lib/utils";

import type { Dose, Schedule } from "../../model/schedule";
import { dayMonthLabel } from "./calendar";
import { DoseBlock } from "./dose-block";
import { medicationDosesOn } from "./occurrences";

export function DayList({
  date,
  schedules,
  doses,
  className,
}: {
  date: string;
  schedules: Schedule[];
  doses: Dose[];
  className?: string;
}) {
  const medications = medicationDosesOn(schedules, doses, date);
  const count = medications.length;
  return (
    <div className={cn("flex flex-col", className)}>
      <h2 className="text-[14px]/[21px] tracking-[-0.15px] text-secondary-900">
        {dayMonthLabel(date)} - {count} medication{count === 1 ? "" : "s"}
      </h2>
      <div className="flex flex-col gap-[7px]">
        {medications.map((occurrence) => (
          <DoseBlock
            key={occurrence.schedule.id}
            occurrence={occurrence}
            variant="card"
          />
        ))}
      </div>
    </div>
  );
}
