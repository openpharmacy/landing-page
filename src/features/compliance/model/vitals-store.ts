"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { isMockingEnabled } from "@/config/env";
import { userStorage } from "@/lib/user-storage";

import type { VitalReading } from "./vitals";
import { isSampleReading, sampleReadings } from "./vitals-samples";

type VitalsState = {
  readings: VitalReading[];
  seeded: boolean;
  hydrated: boolean;
  addReadings: (readings: VitalReading[]) => void;
  updateReading: (reading: VitalReading) => void;
  removeReading: (id: string) => void;
};

export function afterLoad(
  { seeded, readings }: Pick<VitalsState, "seeded" | "readings">,
  mock: boolean,
  today: Date,
): Partial<VitalsState> {
  if (seeded || !mock) return { hydrated: true };
  return {
    readings: [...readings, ...sampleReadings(today)],
    seeded: true,
    hydrated: true,
  };
}

const storage = userStorage(
  "op_vitals",
  (): Pick<VitalsState, "readings" | "seeded" | "hydrated"> => ({
    readings: [],
    seeded: false,
    hydrated: false,
  }),
  () => finishLoad(),
);

export const useVitalsStore = create<VitalsState>()(
  persist(
    (set) => ({
      readings: [],
      seeded: false,
      hydrated: false,
      addReadings: (readings) =>
        set((state) => ({ readings: [...readings, ...state.readings] })),
      updateReading: (reading) =>
        set((state) => ({
          readings: state.readings.map((r) =>
            r.id === reading.id ? reading : r,
          ),
        })),
      removeReading: (id) =>
        set((state) => ({
          readings: state.readings.filter((r) => r.id !== id),
        })),
    }),
    {
      ...storage.options,
      skipHydration: true,
      partialize: ({ readings, seeded }) => ({ readings, seeded }),
      version: 1,
      migrate: (saved) => {
        const state = saved as Pick<VitalsState, "readings" | "seeded">;
        return isMockingEnabled || !state.readings
          ? state
          : {
              ...state,
              readings: state.readings.filter((r) => !isSampleReading(r)),
            };
      },
    },
  ),
);
storage.connect(useVitalsStore);

function finishLoad(): void {
  useVitalsStore.setState(
    afterLoad(useVitalsStore.getState(), isMockingEnabled, new Date()),
  );
}

export function useRehydrateVitals() {
  useEffect(() => {
    void storage.load();
  }, []);
}
