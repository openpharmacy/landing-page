"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  useRehydrateSchedules,
  useScheduleStore,
} from "@/features/scheduler/model/store";

import { CloseBar } from "./dialog-header";
import {
  dayHref,
  formatDose,
  formatTime,
  takenHref,
  today,
  type DoseRef,
} from "./format";
import { LogDialog } from "./log-dialog";
import { LogDialogSkeleton } from "./log-skeleton";
import { useHydrated } from "./use-client-state";

const ICONS = "/icons/compliance/log";

export function DoseReminder({ dose }: { dose: DoseRef }) {
  const router = useRouter();
  useRehydrateSchedules();
  const hydrated = useHydrated(useScheduleStore);
  const schedule = useScheduleStore((s) =>
    s.schedules.find((item) => item.id === dose.schedule),
  );
  const logDose = useScheduleStore((s) => s.logDose);

  const date = dose.date || today();
  const intake =
    schedule?.intakes.find((item) => item.time === dose.time) ??
    schedule?.intakes[0];
  const missing = hydrated && (!schedule || !intake);

  useEffect(() => {
    if (missing) router.replace(dayHref(date));
  }, [missing, router, date]);

  if (!hydrated) return <LogDialogSkeleton step="dose" />;
  if (!schedule || !intake) return null;

  const ref = { schedule: schedule.id, date, time: intake.time };
  const log = (status: "taken" | "skipped") =>
    logDose({ scheduleId: schedule.id, date, time: intake.time, status });

  return (
    <LogDialog
      label="Time for your medication!"
      onClose={() => router.push("/home")}
    >
      <CloseBar onClose={() => router.push("/home")} />
      <div className="flex flex-1 flex-col justify-center-safe px-6 pt-6 pb-9 max-lg:max-h-[760px] lg:flex-none">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="relative size-[125px]">
              <span className="absolute top-[11.5px] left-[11px] flex size-[102px] items-center justify-center rounded-full border border-[#37B5FE] bg-[#37B5FE]/5">
                <Icon src={`${ICONS}/bell.svg`} size={54} />
              </span>
            </div>
            <h2 className="text-h4-24 text-secondary-900">
              Time for your medication!
            </h2>
            <p className="text-body-16 text-neutral-900">
              {formatTime(intake.time)}
            </p>
          </div>

          <div className="flex gap-2 rounded-card border border-neutral-300 bg-bg-app p-[15px]">
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-control"
              style={{ backgroundColor: schedule.colour }}
            >
              <Icon src={`${ICONS}/pill.svg`} size={28} />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="text-body-16-bold text-secondary-900">
                {schedule.name}
              </span>
              <span className="text-body-14 text-secondary-300">
                {formatDose(intake)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                log("taken");
                router.replace(takenHref(ref));
              }}
            >
              Take
            </Button>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  log("skipped");
                  router.replace(dayHref(date));
                }}
              >
                Skip
              </Button>
              <Button asChild variant="secondary" className="flex-1">
                <Link
                  href={`/scheduler/add?edit=${encodeURIComponent(schedule.id)}`}
                  prefetch
                >
                  Reschedule
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LogDialog>
  );
}
