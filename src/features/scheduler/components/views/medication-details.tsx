"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SkeletonPage } from "@/components/ui/skeleton";
import { ConfirmModal } from "@/features/account/components/confirm-modal";
import { BackCircle } from "@/features/scripts/components/back-circle";
import {
  MENU_ROW,
  MenuSheet,
  useMenuDismiss,
} from "@/features/scripts/components/menu-sheet";
import { cn } from "@/lib/utils";

import { useRehydrateSchedules, useScheduleStore } from "../../model/store";
import type { Schedule } from "../../model/schedule";
import { parseTime } from "../add/draft";
import { clockLabel, dayMonthLabel, isIsoDate, toIsoDate } from "./calendar";
import { AddButton } from "./add-button";
import { editHref, schedulerHref, takenHref } from "./links";
import { MedicationBodySkeleton } from "./scheduler-skeleton";
import {
  doseLabel,
  frequencyLabel,
  ordinal,
  reminderLabel,
} from "./occurrences";
import { SOLID } from "./tints";
import { useNow, useSchedulesHydrated } from "./use-clock";

const ICONS = "/icons/scheduler/views";

export function MedicationDetails({
  scheduleId,
  date: requestedDate,
  time: requestedTime,
}: {
  scheduleId: string;
  date: string | null;
  time: string | null;
}) {
  useRehydrateSchedules();
  const router = useRouter();
  const schedule = useScheduleStore((s) =>
    s.schedules.find((item) => item.id === scheduleId),
  );
  const logDose = useScheduleStore((s) => s.logDose);
  const removeSchedule = useScheduleStore((s) => s.removeSchedule);
  const hydrated = useSchedulesHydrated();
  const [confirming, setConfirming] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const now = useNow();
  const today = now ? toIsoDate(now) : null;
  const date = requestedDate ?? today;
  const back = schedulerHref("day", date);

  if (!schedule) {
    return (
      <Page back={back}>
        {!hydrated && (
          <SkeletonPage>
            <MedicationBodySkeleton />
          </SkeletonPage>
        )}
        {hydrated && !deleted && (
          <p className="text-body-16 text-secondary-500">
            This medication is no longer in your schedule.
          </p>
        )}
      </Page>
    );
  }

  const time =
    schedule.intakes.find((intake) => intake.time === requestedTime)?.time ??
    schedule.intakes[0]?.time;
  const intake = schedule.intakes.find((item) => item.time === time);

  const reschedule = editHref(scheduleId, date);

  function remove() {
    setDeleted(true);
    removeSchedule(scheduleId);
    router.push(back);
  }

  function log(status: "taken" | "skipped") {
    if (!date || !time) return;
    logDose({ scheduleId, date, time, status });
    router.push(
      status === "taken"
        ? takenHref(scheduleId, date, time)
        : schedulerHref("day", date),
    );
  }

  return (
    <Page back={back}>
      <section className="flex flex-col items-center gap-12 pt-4 lg:gap-9 lg:rounded-card lg:border lg:border-[#E5E7EB] lg:bg-white lg:p-[23px]">
        <div className="flex flex-col items-center gap-4 text-secondary-900">
          <span
            className={cn(
              "flex size-14 items-center justify-center rounded-chip",
              SOLID[schedule.colour],
            )}
          >
            <Icon src={`${ICONS}/pill.svg`} size={28} />
          </span>
          <h2 className="text-[24px]/[21px] font-bold">{schedule.name}</h2>
          <p className="flex flex-col items-center gap-1 text-[16px]/[19.2px]">
            {intake && <span>{doseLabel(intake)}</span>}
            <span>{frequencyLabel(schedule)}</span>
          </p>
        </div>
        <div className="flex w-full gap-3 lg:w-auto">
          <Button
            onClick={() => log("taken")}
            disabled={!date}
            className="h-14 flex-1 px-0 lg:w-[140.5px] lg:flex-none"
          >
            Take
          </Button>
          <Button
            variant="secondary"
            onClick={() => log("skipped")}
            disabled={!date}
            className="h-14 flex-1 px-0 lg:w-[140.5px] lg:flex-none"
          >
            Skip
          </Button>
          <Button
            asChild
            variant="secondary"
            className="h-14 flex-1 px-0 lg:hidden"
          >
            <Link href={reschedule} prefetch>
              Reschedule
            </Link>
          </Button>
          <MoreActions
            rescheduleHref={reschedule}
            onDelete={() => setConfirming(true)}
          />
        </div>
      </section>

      <Section title="Daily Schedule" className="max-lg:mt-12">
        <div className="flex flex-col gap-[13px]">
          {schedule.intakes.map((item, i) => {
            const [clock, meridiem] = clockLabel(item.time);
            return (
              <div
                key={`${item.time}-${i}`}
                className="flex h-[72px] items-center gap-3 rounded-[7px] border border-neutral-300 bg-white pr-[7px] pl-[15px]"
              >
                <span className="flex-1 text-body-16-bold text-secondary-900">
                  {ordinal(i + 1)} intake
                </span>
                <span className="flex items-center gap-1.5 p-2 text-[16px]/[19.2px]">
                  <span className="font-medium text-secondary-900">
                    {clock}
                  </span>
                  <span className="text-secondary-500">{meridiem}</span>
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Details" className="max-lg:mt-12">
        <div className="flex flex-col gap-6 rounded-[7px] border border-neutral-300 bg-white py-[15px] pr-[7px] pl-[15px] lg:px-[15px] lg:py-[23px]">
          {schedule.remindMinutesBefore !== null && (
            <Detail icon="reminder">
              {reminderLabel(schedule.remindMinutesBefore)}
            </Detail>
          )}
          <Detail icon="started">{startedLabel(schedule, today)}</Detail>
          {schedule.note && <Detail icon="note">{schedule.note}</Detail>}
        </div>
      </Section>

      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="mt-12 flex h-[66px] items-center justify-center gap-1 rounded-control border border-secondary-500 text-[14px]/[18px] font-bold text-secondary-500 transition-colors hover:bg-secondary-500/5 lg:hidden"
      >
        <Icon src={`${ICONS}/trash.svg`} size={16} />
        Delete from Schedule
      </button>
      <AddButton date={date} />
      {confirming && (
        <ConfirmModal
          title={"Are you sure you want to \ndelete this medication?"}
          confirmLabel="Yes, Delete"
          onConfirm={remove}
          onClose={() => setConfirming(false)}
        />
      )}
    </Page>
  );
}

export function MedicationDetailsLoading() {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const params = useSearchParams();
  const date = params.get("date") ?? undefined;
  return (
    <MedicationDetails
      scheduleId={scheduleId}
      date={isIsoDate(date) ? date : null}
      time={parseTime(params.get("time") ?? undefined)}
    />
  );
}

function MoreActions({
  rescheduleHref,
  onDelete,
}: {
  rescheduleHref: string;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useMenuDismiss(ref, open, close);

  return (
    <div ref={ref} className="relative hidden lg:flex">
      <Button
        variant="secondary"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="size-14 p-0"
      >
        <Icon src={`${ICONS}/more.svg`} size={24} />
      </Button>
      {open && (
        <MenuSheet
          onClose={close}
          label="More actions"
          className="lg:top-full lg:right-0 lg:mt-2"
        >
          <Link
            href={rescheduleHref}
            prefetch
            role="menuitem"
            onClick={close}
            className={MENU_ROW}
          >
            <Icon src="/icons/scripts/menu/schedule.svg" size={24} />
            <span>Reschedule</span>
          </Link>
          <div className="pt-[7px] pb-2">
            <div className="h-px bg-neutral-300" />
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              close();
              onDelete();
            }}
            className={MENU_ROW}
          >
            <Icon src="/icons/scripts/menu/trash.svg" size={24} />
            <span>Delete from Schedule</span>
          </button>
        </MenuSheet>
      )}
    </div>
  );
}

function Page({ back, children }: { back: string; children: ReactNode }) {
  return (
    <div className="flex flex-col px-4 pt-6 pb-24 lg:mx-auto lg:w-[884px] lg:pr-0 lg:pb-12 lg:pl-[14px]">
      <div className="flex h-12 items-center gap-4 lg:items-start">
        <BackCircle href={back} label="Back" className="lg:mt-1" />
        <h1 className="text-title-20 text-secondary-900 lg:text-display-32">
          Medication Details
        </h1>
      </div>
      <div className="mt-6 flex flex-col lg:mt-9">{children}</div>
    </div>
  );
}

function Section({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("flex flex-col gap-2 lg:mt-4", className)}>
      <h2 className="text-[18px]/[21px] text-secondary-900">{title}</h2>
      {children}
    </section>
  );
}

function Detail({
  icon,
  children,
}: {
  icon: "reminder" | "started" | "note";
  children: ReactNode;
}) {
  return (
    <p className="flex items-center gap-2 text-[16px]/[14px] tracking-[0.092px] text-secondary-900">
      <Icon src={`${ICONS}/${icon}.svg`} size={16} />
      {children}
    </p>
  );
}

function startedLabel(schedule: Schedule, today: string | null) {
  if (schedule.startDate === today) return "Started Today";
  const day = `${dayMonthLabel(schedule.startDate)} ${schedule.startDate.slice(0, 4)}`;
  return today !== null && schedule.startDate > today
    ? `Starts ${day}`
    : `Started ${day}`;
}
