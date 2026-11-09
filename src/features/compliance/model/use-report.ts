"use client";

import { useMemo } from "react";

import { isMockingEnabled } from "@/config/env";
import { toIsoDate } from "@/features/scheduler/components/views/calendar";
import {
  useNow,
  useSchedulesHydrated,
} from "@/features/scheduler/components/views/use-clock";
import {
  useRehydrateSchedules,
  useScheduleStore,
} from "@/features/scheduler/model/store";

import { useHydrated } from "../components/log/use-client-state";
import {
  MOCK_ACHIEVEMENTS,
  MOCK_REPORTS,
  MOCK_SIDE_EFFECT_SUMMARY,
  MOCK_VITAL_SUMMARY,
} from "./mock-reports";
import {
  achievements,
  complianceReport,
  complianceSubtitle,
  latestSideEffects,
  latestVitals,
  missedDoseAlert,
  type ComplianceReport,
  type Range,
  type SideEffectSummary,
  type VitalSummary,
} from "./report";
import {
  useRehydrateSideEffects,
  useSideEffectStore,
} from "./side-effect-store";
import { useRehydrateVitals, useVitalsStore } from "./vitals-store";

function useToday() {
  const now = useNow();
  return now ? toIsoDate(now) : null;
}

function useDoseHistory() {
  useRehydrateSchedules();
  const schedules = useScheduleStore((s) => s.schedules);
  const doses = useScheduleStore((s) => s.doses);
  const ready = useSchedulesHydrated();
  const today = useToday();
  return useMemo(
    () => (ready && today ? { schedules, doses, today } : null),
    [ready, today, schedules, doses],
  );
}

export type ComplianceView = {
  report: ComplianceReport;
  sideEffects: SideEffectSummary[];
  vitals: VitalSummary[];
};

export function useComplianceView(range: Range): ComplianceView | null {
  const history = useDoseHistory();
  useRehydrateSideEffects();
  useRehydrateVitals();
  const entries = useSideEffectStore((s) => s.entries);
  const entriesReady = useHydrated(useSideEffectStore);
  const readings = useVitalsStore((s) => s.readings);
  const readingsReady = useVitalsStore((s) => s.hydrated);

  const view = useMemo(() => {
    if (isMockingEnabled || !history || !entriesReady || !readingsReady) {
      return null;
    }
    const { schedules, doses, today } = history;
    return {
      report: complianceReport(schedules, doses, range, today),
      sideEffects: latestSideEffects(entries),
      vitals: latestVitals(readings, today),
    };
  }, [history, entries, entriesReady, readings, readingsReady, range]);

  if (isMockingEnabled) {
    return {
      report: MOCK_REPORTS[range],
      sideEffects: MOCK_SIDE_EFFECT_SUMMARY,
      vitals: MOCK_VITAL_SUMMARY,
    };
  }
  return view;
}

export function useMissedDose() {
  const history = useDoseHistory();
  const alert = useMemo(
    () =>
      history && !isMockingEnabled
        ? missedDoseAlert(history.schedules, history.doses, history.today)
        : null,
    [history],
  );
  return isMockingEnabled ? MOCK_REPORTS["7d"].missedDose : alert;
}

export function useAchievements() {
  const history = useDoseHistory();
  const list = useMemo(
    () =>
      history && !isMockingEnabled
        ? achievements(history.schedules, history.doses, history.today)
        : null,
    [history],
  );
  return isMockingEnabled ? MOCK_ACHIEVEMENTS : list;
}

export function useComplianceSubtitle() {
  const history = useDoseHistory();
  return useMemo(
    () =>
      history
        ? complianceSubtitle(history.schedules, history.doses, history.today)
        : null,
    [history],
  );
}
