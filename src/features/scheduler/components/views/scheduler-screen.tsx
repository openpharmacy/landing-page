"use client";

import { useSearchParams } from "next/navigation";

import { SkeletonPage } from "@/components/ui/skeleton";

import { useScheduleStore, useRehydrateSchedules } from "../../model/store";
import {
  isIsoDate,
  parseView,
  toIsoDate,
  type View,
  weekDays,
} from "./calendar";
import { AddButton } from "./add-button";
import { DayStrip, WeekHeader } from "./date-strips";
import { MonthView } from "./month-view";
import { SchedulerHeader } from "./scheduler-header";
import { SchedulerBodySkeleton } from "./scheduler-skeleton";
import { Timeline } from "./timeline";
import { useNow, useRememberedView, useSchedulesHydrated } from "./use-clock";

export function SchedulerScreen({
  view: requestedView,
}: {
  view: View | null;
}) {
  useRehydrateSchedules();
  const schedules = useScheduleStore((s) => s.schedules);
  const doses = useScheduleStore((s) => s.doses);
  const hydrated = useSchedulesHydrated();
  const now = useNow();
  const remembered = useRememberedView();
  const requestedDate = useSearchParams().get("date") ?? undefined;
  const view = requestedView ?? remembered ?? "week";
  const date = isIsoDate(requestedDate)
    ? requestedDate
    : now
      ? toIsoDate(now)
      : null;
  const shown = hydrated ? date : null;

  const grid = view !== "month";
  return (
    <div
      className={
        grid
          ? "flex h-[calc(100dvh-57px)] flex-col overflow-hidden px-4 pt-6 lg:mx-auto lg:h-[calc(100dvh-80px)] lg:w-[884px] lg:pr-0 lg:pl-[14px]"
          : "px-4 pt-6 lg:mx-auto lg:w-[884px] lg:pr-0 lg:pl-[14px]"
      }
    >
      <SchedulerHeader view={view} date={date} />
      {!shown && (
        <SkeletonPage
          className={grid ? "flex min-h-0 flex-1 flex-col" : undefined}
        >
          <SchedulerBodySkeleton view={view} />
        </SkeletonPage>
      )}
      {shown && view === "day" && (
        <>
          <DayStrip date={shown} />
          <Timeline
            days={[shown]}
            schedules={schedules}
            doses={doses}
            now={now}
          />
        </>
      )}
      {shown && view === "week" && (
        <>
          <WeekHeader date={shown} />
          <Timeline
            days={weekDays(shown)}
            schedules={schedules}
            doses={doses}
            now={now}
          />
        </>
      )}
      {shown && view === "month" && (
        <MonthView date={shown} schedules={schedules} doses={doses} />
      )}
      <AddButton date={date} />
    </div>
  );
}

export function SchedulerLoading() {
  const view = parseView(useSearchParams().get("view") ?? undefined);
  return <SchedulerScreen view={view} />;
}
