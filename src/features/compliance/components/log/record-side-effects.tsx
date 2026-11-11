"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  useRehydrateSideEffects,
  useSideEffectStore,
} from "@/features/compliance/model/side-effect-store";
import {
  useRehydrateSchedules,
  useScheduleStore,
} from "@/features/scheduler/model/store";

import { dayHref, takenHref, today, type DoseRef } from "./format";
import { LogDialogSkeleton } from "./log-skeleton";
import { SideEffectFlow } from "./side-effect-flow";
import { useHydrated } from "./use-client-state";

const newEntryId = () =>
  `se-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export function RecordSideEffects({ dose }: { dose: DoseRef }) {
  const router = useRouter();
  useRehydrateSchedules();
  useRehydrateSideEffects();
  const schedulesReady = useHydrated(useScheduleStore);
  const entriesReady = useHydrated(useSideEffectStore);
  const schedule = useScheduleStore((s) =>
    s.schedules.find((item) => item.id === dose.schedule),
  );
  const addEntry = useSideEffectStore((s) => s.addEntry);

  const date = dose.date || today();
  const missing = schedulesReady && !schedule;
  useEffect(() => {
    if (missing) router.replace(dayHref(date));
  }, [missing, router, date]);

  if (!schedulesReady || !entriesReady) {
    return <LogDialogSkeleton step="symptoms" />;
  }
  if (!schedule) return null;

  const ref = { ...dose, date };
  return (
    <SideEffectFlow
      mode="record"
      medication={schedule.name}
      date={date}
      onExit={() => router.push(takenHref(ref))}
      onSave={({ symptoms, note }) => {
        const recorded = symptoms.length > 0 || Boolean(note);
        if (recorded) {
          addEntry({
            id: newEntryId(),
            scheduleId: schedule.id,
            medication: schedule.name,
            date,
            symptoms,
            note,
          });
        }
        router.replace(
          takenHref({ ...ref, sideEffects: recorded || dose.sideEffects }),
        );
      }}
    />
  );
}
