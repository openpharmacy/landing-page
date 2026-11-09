"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { isMockingEnabled } from "@/config/env";
import { userStorage } from "@/lib/user-storage";

import { MOCK_DOSES, MOCK_SCHEDULES } from "./mock-schedules";
import type { Dose, Schedule } from "./schedule";

type ScheduleData = { schedules: Schedule[]; doses: Dose[] };

type ScheduleState = ScheduleData & {
  addSchedule: (schedule: Schedule) => void;
  replaceSchedule: (schedule: Schedule) => void;
  removeSchedule: (id: string) => void;
  logDose: (dose: Dose) => void;
};

const sameIntake = (a: Dose, b: Dose) =>
  a.scheduleId === b.scheduleId && a.date === b.date && a.time === b.time;

export function initialSchedules(mock: boolean): ScheduleData {
  return mock
    ? { schedules: MOCK_SCHEDULES, doses: MOCK_DOSES }
    : { schedules: [], doses: [] };
}

const isSample = (samples: unknown[], item: unknown) =>
  samples.some((sample) => JSON.stringify(sample) === JSON.stringify(item));

export function withoutSampleSchedules<T extends Partial<ScheduleData>>(
  saved: T,
): T {
  const out = { ...saved };
  if (saved.schedules) {
    out.schedules = saved.schedules.filter((s) => !isSample(MOCK_SCHEDULES, s));
  }
  if (saved.doses) {
    out.doses = saved.doses.filter((d) => !isSample(MOCK_DOSES, d));
  }
  return out;
}

const storage = userStorage("op_schedules", () =>
  initialSchedules(isMockingEnabled),
);

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      ...initialSchedules(isMockingEnabled),
      addSchedule: (schedule) =>
        set((state) => ({ schedules: [...state.schedules, schedule] })),
      replaceSchedule: (schedule) =>
        set((state) => ({
          schedules: state.schedules.map((s) =>
            s.id === schedule.id ? schedule : s,
          ),
          doses: state.doses.filter(
            (d) =>
              d.scheduleId !== schedule.id ||
              schedule.intakes.some((intake) => intake.time === d.time),
          ),
        })),
      removeSchedule: (id) =>
        set((state) => ({
          schedules: state.schedules.filter((s) => s.id !== id),
          doses: state.doses.filter((d) => d.scheduleId !== id),
        })),
      logDose: (dose) =>
        set((state) => ({
          doses: [...state.doses.filter((d) => !sameIntake(d, dose)), dose],
        })),
    }),
    {
      ...storage.options,
      skipHydration: true,
      version: 1,
      migrate: (saved) => {
        const state = saved as ScheduleState;
        return isMockingEnabled ? state : withoutSampleSchedules(state);
      },
    },
  ),
);
storage.connect(useScheduleStore);

export const loadSchedules = storage.load;

export function useRehydrateSchedules(enabled = true) {
  useEffect(() => {
    if (enabled) void loadSchedules();
  }, [enabled]);
}
