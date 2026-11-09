import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { BackCircle } from "@/features/scripts/components/back-circle";

import { addDays, addMonths, monthYear, type View } from "./calendar";
import { schedulerHref } from "./links";
import { ViewSwitcher } from "./view-switcher";

const STEP: Record<View, string> = { day: "day", week: "week", month: "month" };

export function SchedulerHeader({
  view,
  date,
}: {
  view: View;
  date: string | null;
}) {
  const shift = (n: number) =>
    date &&
    (view === "month"
      ? addMonths(date, n)
      : addDays(date, n * (view === "week" ? 7 : 1)));
  const [month, year] = date ? monthYear(date) : ["", ""];

  return (
    <div className="flex h-12 items-center gap-4 lg:gap-2">
      <BackCircle href="/home" label="Back" />
      <h1 className="min-w-max flex-1 text-title-20 text-secondary-900 lg:min-w-0 lg:basis-0 lg:text-[24px]/[26px]">
        Medication Scheduler
      </h1>
      <div className="hidden h-12 flex-1 basis-0 items-center justify-center gap-2 lg:flex">
        {date && (
          <>
            <span className="flex h-12 items-center gap-1 px-1.5 text-secondary-900">
              <span className="text-[16px]/[27px] font-medium">{month}</span>
              <span className="text-[16px]/[19.2px]">{year}</span>
            </span>
            <span className="flex gap-2">
              {[-1, 1].map((n) => (
                <Link
                  key={n}
                  href={schedulerHref(view, shift(n))}
                  aria-label={`${n < 0 ? "Previous" : "Next"} ${STEP[view]}`}
                  className="flex h-12 w-[38px] items-center justify-center rounded-[6.75px] transition-colors hover:bg-white"
                >
                  <Icon
                    src="/icons/scheduler/views/chevron-down.svg"
                    size={16}
                    className={n < 0 ? "rotate-90" : "-rotate-90"}
                  />
                </Link>
              ))}
            </span>
          </>
        )}
      </div>
      <ViewSwitcher view={view} date={date} />
    </div>
  );
}
