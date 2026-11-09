import { SkeletonBlock as Block } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { View } from "./calendar";

const DAYS = [0, 1, 2, 3, 4, 5, 6];
const HOURS = Array.from({ length: 10 }, (_, hour) => hour);
const WEEKS = [0, 1, 2, 3, 4];

export function SchedulerBodySkeleton({ view }: { view: View }) {
  if (view === "month") return <MonthSkeleton />;
  const week = view === "week";
  return (
    <>
      {week ? (
        <div className="mt-[15px] mb-[27px] flex items-start gap-[8.1px] lg:my-6 lg:pl-[27px]">
          <Block className="mt-2 h-12 w-[42.9px] shrink-0 rounded-[10px] lg:hidden" />
          <div className="flex h-16 items-center gap-1 lg:grid lg:flex-1 lg:grid-cols-7">
            {DAYS.map((day) => (
              <Block
                key={day}
                className="h-12 w-[42.9px] shrink-0 rounded-[10px] lg:w-auto"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 mb-[34px] flex items-start gap-[8.1px] lg:mb-6">
          <Block className="-mt-px h-12 w-[42.9px] shrink-0 rounded-[10px] lg:hidden" />
          <Block className="h-12 flex-1 rounded-[20px]" />
        </div>
      )}
      <div
        className={cn(
          "-mr-4 min-h-0 flex-1 overflow-hidden pr-4",
          week
            ? "lg:-mr-[5px] lg:mb-[30px] lg:pr-[5px]"
            : "lg:mr-0 lg:mb-[46px] lg:pr-0",
        )}
      >
        <div className={cn("flex flex-col gap-2", !week && "lg:pr-4")}>
          {HOURS.map((hour) => (
            <div
              key={hour}
              className={cn(
                "h-[74px]",
                week
                  ? "grid grid-cols-[23px_repeat(7,minmax(0,1fr))] gap-1"
                  : "flex gap-[14px]",
              )}
            >
              <Block className="h-[26px] w-4 shrink-0 rounded-[4px]" />
              {(week ? DAYS : [0]).map((day) => (
                <Block key={day} className="min-w-0 flex-1 rounded-control" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function MonthSkeleton() {
  return (
    <div className="pb-[92px] lg:pb-6">
      <div className="mt-[15px] mr-[2px] mb-6 ml-[3px] grid h-16 grid-cols-7 items-center gap-1 lg:mx-0 lg:mt-6">
        {DAYS.map((day) => (
          <Block key={day} className="h-12 min-w-0 rounded-[10px]" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {WEEKS.map((week) => (
          <div key={week} className="grid grid-cols-7 gap-1">
            {DAYS.map((day) => (
              <Block
                key={day}
                className="h-[66.75px] min-w-0 rounded-[8.75px]"
              />
            ))}
          </div>
        ))}
        <Block className="h-[60px] rounded-[12.75px] lg:h-[62px] lg:rounded-card" />
      </div>
    </div>
  );
}

export function MedicationBodySkeleton() {
  return (
    <div className="flex flex-col">
      <Block className="h-[291px] rounded-card max-lg:hidden" />
      <div className="flex flex-col items-center gap-12 pt-4 lg:hidden">
        <div className="flex flex-col items-center gap-4">
          <Block className="size-14 rounded-chip" />
          <Block className="h-[21px] w-[166px] rounded-control" />
          <Block className="h-[42px] w-[78px] rounded-control" />
        </div>
        <div className="flex w-full gap-3">
          {[0, 1, 2].map((button) => (
            <Block key={button} className="h-14 flex-1 rounded-card" />
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-2 lg:mt-4">
        <Block className="h-[21px] w-[125px] rounded-control" />
        <div className="flex flex-col gap-[13px]">
          <Block className="h-[72px] rounded-[7px]" />
          <Block className="h-[72px] rounded-[7px]" />
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-2 lg:mt-4">
        <Block className="h-[21px] w-[60px] rounded-control" />
        <Block className="h-32 rounded-[7px] lg:h-36" />
      </div>
      <Block className="mt-12 h-[66px] rounded-control lg:hidden" />
    </div>
  );
}
