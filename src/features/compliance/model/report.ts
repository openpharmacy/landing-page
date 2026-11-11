import {
  addDays,
  addMonths,
  daysBetween,
  WEEKDAYS,
  weekday,
} from "@/features/scheduler/components/views/calendar";
import { intakesOn } from "@/features/scheduler/components/views/occurrences";
import type {
  Dose,
  DoseStatus,
  Schedule,
} from "@/features/scheduler/model/schedule";

import {
  SYMPTOMS,
  type Severity,
  type SideEffectEntry,
  type Symptom,
} from "./side-effects";
import {
  formatReading,
  readingsInPeriod,
  VITAL_LABELS,
  VITAL_TYPES,
  VITAL_UNITS,
  type VitalPeriod,
  type VitalReading,
  type VitalType,
} from "./vitals";

export const RANGES = ["7d", "30d", "90d"] as const;
export type Range = (typeof RANGES)[number];

export const RANGE_LABELS: Record<Range, string> = {
  "7d": "7 days",
  "30d": "30 days",
  "90d": "90 days",
};

const RANGE_DAYS: Record<Range, number> = { "7d": 7, "30d": 30, "90d": 90 };

export type MedicationDoses = {
  medication: string;
  taken: number;
  total: number;
};

export type ProgressRow = {
  label: string;
  dates?: string;
  percent: number | null;
};

export type BreakdownPeriod = {
  title: string;
  dates?: string;
  percent: number;
  medications: MedicationDoses[];
};

export type TrendBar = ProgressRow;

export type MissedDose = { text: string; href: string };

export type TrendInsight = {
  kind: "improving" | "declining" | "bestTime" | "opportunity";
  title: string;
  text: string;
};

export type InsightsData = {
  highRiskTimes: string[];
  highRiskText: string;
  mostMissed: { medication: string; text: string; share: number }[];
  byTimeOfDay: { label: string; missed: number }[];
  recommendation: string | null;
  emptyText: string;
};

export type Achievement = {
  kind: "perfectWeek" | "consistency";
  title: string;
  text: string;
  earned: boolean;
};

export type ComplianceReport = {
  missedDose: MissedDose | null;
  streakDays: number;
  dosesTaken: number;
  dosesMissed: number;
  progress: ProgressRow[];
  breakdownTitle: string;
  breakdown: BreakdownPeriod[];
  trend: TrendBar[];
  trendInsights: TrendInsight[];
  insights: InsightsData;
  achievements: Achievement[];
  emptyText: string;
};

export function complianceRate({
  dosesTaken,
  dosesMissed,
}: Pick<ComplianceReport, "dosesTaken" | "dosesMissed">) {
  const total = dosesTaken + dosesMissed;
  return total === 0 ? null : Math.round((100 * dosesTaken) / total);
}

export type CountedDose = {
  scheduleId: string;
  name: string;
  date: string;
  time: string;
  taken: boolean;
};

const doseKey = (scheduleId: string, date: string, time: string) =>
  `${scheduleId}|${date}|${time}`;

export function countedDoses(
  schedules: Schedule[],
  doses: Dose[],
  from: string,
  to: string,
  today: string,
): CountedDose[] {
  const logged = new Map<string, DoseStatus>();
  for (const dose of doses) {
    logged.set(doseKey(dose.scheduleId, dose.date, dose.time), dose.status);
  }
  const last = to < today ? to : today;
  const out: CountedDose[] = [];
  for (let date = from; date <= last; date = addDays(date, 1)) {
    const day: CountedDose[] = [];
    for (const schedule of schedules) {
      for (const { time } of intakesOn(schedule, date)) {
        const status = logged.get(doseKey(schedule.id, date, time));
        if (!status && date === today) continue;
        day.push({
          scheduleId: schedule.id,
          name: schedule.name,
          date,
          time,
          taken: status === "taken",
        });
      }
    }
    out.push(...day.sort((a, b) => a.time.localeCompare(b.time)));
  }
  return out;
}

const percentOf = (doses: CountedDose[]) =>
  doses.length === 0
    ? null
    : Math.round((100 * doses.filter((d) => d.taken).length) / doses.length);

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = (iso: string) => MONTHS[Number(iso.slice(5, 7)) - 1];
const shortMonth = (iso: string) => month(iso).slice(0, 3);
const day = (iso: string) => Number(iso.slice(8, 10));

export const monthDay = (iso: string) => `${shortMonth(iso)} ${day(iso)}`;

export const shortDate = (iso: string) =>
  `${WEEKDAYS[weekday(iso)]}, ${monthDay(iso)}`;

function spanLabel(from: string, to: string) {
  if (from === to) return monthDay(from);
  if (from.slice(0, 7) === to.slice(0, 7)) {
    return `${monthDay(from)}-${day(to)}`;
  }
  return `${monthDay(from)} - ${monthDay(to)}`;
}

type Period = {
  label: string;
  title: string;
  dates?: string;
  from: string;
  to: string;
};

function periodsOf(range: Range, today: string): Period[] {
  const start = addDays(today, 1 - RANGE_DAYS[range]);
  const out: Period[] = [];
  if (range === "7d") {
    for (let date = start; date <= today; date = addDays(date, 1)) {
      out.push({
        label: WEEKDAYS[weekday(date)],
        title: shortDate(date),
        from: date,
        to: date,
      });
    }
  } else if (range === "30d") {
    for (let i = 0, from = start; from <= today; i++, from = addDays(from, 7)) {
      const end = addDays(from, 6);
      const to = end < today ? end : today;
      const label = `Week ${i + 1}`;
      out.push({ label, title: label, dates: spanLabel(from, to), from, to });
    }
  } else {
    let from = start;
    while (from <= today) {
      const next = addMonths(`${from.slice(0, 8)}01`, 1);
      const end = addDays(next, -1);
      const to = end < today ? end : today;
      out.push({
        label: shortMonth(from),
        title: `${month(from)} ${from.slice(0, 4)}`,
        dates: `${monthDay(from)} - ${monthDay(to)}`,
        from,
        to,
      });
      from = next;
    }
  }
  return out;
}

const BREAKDOWN_TITLES: Record<Range, string> = {
  "7d": "Daily Breakdown",
  "30d": "Weekly Breakdown",
  "90d": "Monthly Breakdown",
};

function byMedication(
  schedules: Schedule[],
  doses: CountedDose[],
): MedicationDoses[] {
  const names = [...new Set(schedules.map((schedule) => schedule.name))];
  return names.flatMap((medication) => {
    const own = doses.filter((d) => d.name === medication);
    if (own.length === 0) return [];
    return [
      {
        medication,
        taken: own.filter((d) => d.taken).length,
        total: own.length,
      },
    ];
  });
}

const PARTS = ["morning", "afternoon", "evening", "night"] as const;
type Part = (typeof PARTS)[number];

const hourOf = (time: string) => Number(time.slice(0, 2));

function partOfDay(time: string): Part {
  const hour = hourOf(time);
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

const capitalise = (text: string) => text[0].toUpperCase() + text.slice(1);

function trendInsights(
  counted: CountedDose[],
  range: Range,
  today: string,
): TrendInsight[] {
  if (counted.length < 3) return [];
  const out: TrendInsight[] = [];
  const days = RANGE_DAYS[range];
  const middle = addDays(today, 1 - days + Math.floor(days / 2));
  const before = percentOf(counted.filter((d) => d.date < middle));
  const after = percentOf(counted.filter((d) => d.date >= middle));
  if (before !== null && after !== null) {
    const change = after - before;
    if (change >= 1) {
      out.push({
        kind: "improving",
        title: "Improving Trend",
        text: `Your compliance has improved by ${change}% over the last ${RANGE_LABELS[range]}.`,
      });
    } else if (change <= -1) {
      out.push({
        kind: "declining",
        title: "Declining Trend",
        text: `Your compliance has dropped by ${-change}% over the last ${RANGE_LABELS[range]}.`,
      });
    }
  }

  const parts = PARTS.flatMap((part) => {
    const own = counted.filter((d) => partOfDay(d.time) === part);
    const percent = percentOf(own);
    return percent === null ? [] : [{ part, percent, own }];
  });
  if (parts.length >= 2) {
    const best = parts.reduce((a, b) => (b.percent > a.percent ? b : a));
    const worst = parts.reduce((a, b) => (b.percent < a.percent ? b : a));
    if (best.percent > worst.percent) {
      out.push({
        kind: "bestTime",
        title: "Best Time",
        text: `You're most consistent with ${best.part} doses (${best.percent}% compliance).`,
      });
      out.push({
        kind: "opportunity",
        title: "Opportunity",
        text: `${capitalise(worst.part)} doses are missed more often. Consider setting a reminder.`,
      });
    }
  }
  return out;
}

const SLOTS = [
  { label: "6AM", name: "Early Morning (6-9 AM)", between: "6 and 9 AM" },
  { label: "9AM", name: "Morning (9 AM-12 PM)", between: "9 AM and 12 PM" },
  { label: "12AM", name: "Midday (12-3 PM)", between: "12 and 3 PM" },
  { label: "3PM", name: "Afternoon (3-6 PM)", between: "3 and 6 PM" },
  { label: "6PM", name: "Evening (6-9 PM)", between: "6 and 9 PM" },
  { label: "9PM", name: "Late Night (9-12 PM)", between: "9 PM and midnight" },
  { label: "12AM", name: "Overnight (12-6 AM)", between: "midnight and 6 AM" },
];

function slotOf(time: string) {
  const hour = hourOf(time);
  return hour < 6 ? 6 : Math.floor((hour - 6) / 3);
}

function insightsOf(
  schedules: Schedule[],
  counted: CountedDose[],
  range: Range,
): InsightsData {
  const label = RANGE_LABELS[range];
  const missed = counted.filter((d) => !d.taken);
  const bySlot = SLOTS.map(
    (_, slot) => missed.filter((d) => slotOf(d.time) === slot).length,
  );
  const risky = bySlot
    .map((count, slot) => ({ count, slot }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 2);

  const mostMissed = byMedication(schedules, counted)
    .map((dose) => ({ ...dose, missed: dose.total - dose.taken }))
    .filter((dose) => dose.missed > 0)
    .sort((a, b) => b.missed - a.missed)
    .slice(0, 3)
    .map((dose) => ({
      medication: dose.medication,
      text: `${dose.missed} missed in last ${label}`,
      share: dose.missed / dose.total,
    }));

  const top = risky[0];
  const recommendation =
    top && top.count >= 2 && top.count * 2 >= missed.length
      ? `Most of your missed doses are between ${SLOTS[top.slot].between}. Consider setting a reminder or moving these doses to a time that suits your routine.`
      : null;

  return {
    highRiskTimes: risky.map(({ slot }) => SLOTS[slot].name),
    highRiskText: "You're more likely to miss doses during these times",
    mostMissed,
    byTimeOfDay: SLOTS.map((slot, i) => ({
      label: slot.label,
      missed: bySlot[i],
    })),
    recommendation,
    emptyText:
      counted.length === 0
        ? `No doses were due in the last ${label}.`
        : `No missed doses in the last ${label}.`,
  };
}

const earliestStart = (schedules: Schedule[]) =>
  schedules.reduce<string | null>(
    (first, s) => (first === null || s.startDate < first ? s.startDate : first),
    null,
  );

const HISTORY_DAYS = 365;

function history(schedules: Schedule[], doses: Dose[], today: string) {
  const first = earliestStart(schedules);
  if (first === null || first > today) return [];
  const limit = addDays(today, -HISTORY_DAYS);
  return countedDoses(
    schedules,
    doses,
    first < limit ? limit : first,
    today,
    today,
  );
}

export function dayStreak(counted: CountedDose[], today: string) {
  const days = new Map<string, CountedDose[]>();
  for (const dose of counted) {
    days.set(dose.date, [...(days.get(dose.date) ?? []), dose]);
  }
  const first = counted[0]?.date;
  let streak = 0;
  for (let date = today; first && date >= first; date = addDays(date, -1)) {
    const due = days.get(date);
    if (!due) continue;
    if (!due.every((d) => d.taken)) break;
    streak++;
  }
  return streak;
}

function achievementsOf(counted: CountedDose[], today: string): Achievement[] {
  const streak = dayStreak(counted, today);
  const first = counted[0]?.date;
  let consistent = first !== undefined && daysBetween(first, today) >= 6;
  for (let end = today; consistent && first && end >= first; ) {
    const start = addDays(end, -6);
    const missed = counted.filter(
      (d) => !d.taken && d.date >= start && d.date <= end,
    ).length;
    consistent = missed <= 1;
    end = addDays(start, -1);
  }
  return [
    {
      kind: "perfectWeek",
      title: "Perfect Week",
      text: "100% compliance for 7 days",
      earned: streak >= 7,
    },
    {
      kind: "consistency",
      title: "Consistency Champion",
      text: "Never missed more than 1 dose in a week",
      earned: consistent,
    },
  ];
}

export function achievements(
  schedules: Schedule[],
  doses: Dose[],
  today: string,
) {
  return achievementsOf(history(schedules, doses, today), today);
}

export function missedDoseAlert(
  schedules: Schedule[],
  doses: Dose[],
  today: string,
): MissedDose | null {
  return alertOf(schedules, history(schedules, doses, today));
}

function alertOf(
  schedules: Schedule[],
  counted: CountedDose[],
): MissedDose | null {
  let found: { schedule: Schedule; run: CountedDose[] } | null = null;
  for (const schedule of schedules) {
    const own = counted.filter((d) => d.scheduleId === schedule.id);
    let start = own.length;
    while (start > 0 && !own[start - 1].taken) start--;
    const run = own.slice(start);
    if (run.length < 2) continue;
    const last = run[run.length - 1];
    const latest = found?.run[found.run.length - 1];
    if (
      !latest ||
      `${last.date} ${last.time}` > `${latest.date} ${latest.time}`
    ) {
      found = { schedule, run };
    }
  }
  if (!found) return null;
  const { schedule, run } = found;
  const part = partOfDay(run[0].time);
  const samePart = run.every((d) => partOfDay(d.time) === part);
  return {
    text: `You've missed your last ${run.length} ${samePart ? `${part} ` : ""}doses of ${schedule.name}. Want to shift your schedule?`,
    href: `/scheduler/add?edit=${encodeURIComponent(schedule.id)}`,
  };
}

export function complianceReport(
  schedules: Schedule[],
  doses: Dose[],
  range: Range,
  today: string,
): ComplianceReport {
  const all = history(schedules, doses, today);
  const start = addDays(today, 1 - RANGE_DAYS[range]);
  const counted = all.filter((d) => d.date >= start);
  const periods = periodsOf(range, today).map((period) => ({
    period,
    doses: counted.filter((d) => d.date >= period.from && d.date <= period.to),
  }));
  const withDates = range !== "7d";
  const rows = periods.map(({ period, doses }) => ({
    label: period.label,
    ...(withDates ? { dates: period.dates } : {}),
    percent: percentOf(doses),
  }));

  return {
    missedDose: alertOf(schedules, all),
    streakDays: dayStreak(all, today),
    dosesTaken: counted.filter((d) => d.taken).length,
    dosesMissed: counted.filter((d) => !d.taken).length,
    progress: [...rows].reverse(),
    breakdownTitle: BREAKDOWN_TITLES[range],
    breakdown: periods
      .filter(({ doses }) => doses.length > 0)
      .reverse()
      .map(({ period, doses }) => ({
        title: period.title,
        ...(withDates ? { dates: period.dates } : {}),
        percent: percentOf(doses) ?? 0,
        medications: byMedication(schedules, doses),
      })),
    trend: rows,
    trendInsights: trendInsights(counted, range, today),
    insights: insightsOf(schedules, counted, range),
    achievements: achievementsOf(all, today),
    emptyText: `No doses were due in the last ${RANGE_LABELS[range]}.`,
  };
}

export function complianceSubtitle(
  schedules: Schedule[],
  doses: Dose[],
  today: string,
) {
  const counted = countedDoses(
    schedules,
    doses,
    addDays(today, -6),
    today,
    today,
  );
  const percent = percentOf(counted);
  return percent === null ? null : `${percent}% in the last 7 days`;
}

export type Tone = "mild" | "moderate" | "severe";

const TONES: Record<Severity, Tone> = {
  Mild: "mild",
  Moderate: "moderate",
  Severe: "severe",
};

export type SideEffectSummary = {
  date: string;
  medication: string;
  symptoms: { symptom: Symptom; tone: Tone }[];
  note?: string;
};

export function latestSideEffects(
  entries: SideEffectEntry[],
  count = 3,
): SideEffectSummary[] {
  return [...entries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
    .map((entry) => ({
      date: shortDate(entry.date),
      medication: entry.medication,
      symptoms: entry.symptoms.map(({ symptom, severity }) => ({
        symptom,
        tone: TONES[severity],
      })),
      note: entry.note,
    }));
}

export type VitalStatus = { label: string; normal: boolean };

const inRange = (value: number, low: number, high: number, normal: string) =>
  value < low
    ? { label: "Low", normal: false }
    : value > high
      ? { label: "High", normal: false }
      : { label: normal, normal: true };

export function vitalStatus(
  type: VitalType,
  value: number,
  diastolic?: number,
): VitalStatus | null {
  switch (type) {
    case "bloodPressure": {
      const dia = diastolic ?? 0;
      if (value >= 140 || dia >= 90) return { label: "High", normal: false };
      if (value < 90 || dia < 60) return { label: "Low", normal: false };
      return { label: "Normal", normal: true };
    }
    case "heartRate":
      return inRange(value, 60, 100, "Healthy");
    case "bloodSugar":
      return inRange(value, 70, 140, "Normal");
    case "weight":
      return null;
  }
}

const statusOf = (reading: VitalReading) =>
  reading.type === "bloodPressure"
    ? vitalStatus(reading.type, reading.systolic, reading.diastolic)
    : vitalStatus(reading.type, reading.value);

export type VitalSummary = {
  kind: VitalType;
  when: string;
  title: string;
  reading: string;
  normal: boolean;
  after: string;
};

const newestFirst = (a: VitalReading, b: VitalReading) =>
  b.date === a.date
    ? b.time.localeCompare(a.time)
    : b.date.localeCompare(a.date);

export function latestVitals(
  readings: VitalReading[],
  today: string,
): VitalSummary[] {
  const sorted = [...readings].filter((r) => r.date <= today).sort(newestFirst);
  return VITAL_TYPES.flatMap((type) => {
    const reading = sorted.find((r) => r.type === type);
    return reading ? [reading] : [];
  })
    .sort(newestFirst)
    .slice(0, 3)
    .map((reading) => {
      const vital = statusOf(reading);
      return {
        kind: reading.type,
        when:
          reading.date === today
            ? "Today"
            : reading.date === addDays(today, -1)
              ? "Yesterday"
              : monthDay(reading.date),
        title: VITAL_LABELS[reading.type],
        reading: `${formatReading(reading)}${vital ? ` • ${vital.label}` : ""}`,
        normal: vital?.normal ?? true,
        after: reading.medication ? `After ${reading.medication}` : "",
      };
    });
}

export type VitalAverage = { value: string; status: string; normal: boolean };

const NO_AVERAGE: VitalAverage = { value: "—", status: "", normal: true };

const mean = (values: number[]) =>
  values.reduce((sum, v) => sum + v, 0) / values.length;

export function vitalAverages(
  readings: VitalReading[],
  period: VitalPeriod,
  today: Date,
): Record<VitalType, VitalAverage> {
  const shown = readingsInPeriod(readings, period, today);
  const averages = {} as Record<VitalType, VitalAverage>;
  for (const type of VITAL_TYPES) {
    const own = shown.filter((r) => r.type === type);
    if (own.length === 0) {
      averages[type] = NO_AVERAGE;
      continue;
    }
    let value: string;
    let vital: VitalStatus | null;
    if (type === "bloodPressure") {
      const pressures = own.flatMap((r) =>
        r.type === "bloodPressure" ? [[r.systolic, r.diastolic]] : [],
      );
      const sys = Math.round(mean(pressures.map(([s]) => s)));
      const dia = Math.round(mean(pressures.map(([, d]) => d)));
      value = `${sys}/${dia}`;
      vital = vitalStatus(type, sys, dia);
    } else {
      const raw = mean(own.map((r) => ("value" in r ? r.value : 0)));
      const rounded =
        type === "weight" ? Math.round(raw * 10) / 10 : Math.round(raw);
      value = `${rounded} ${VITAL_UNITS[type]}`;
      vital = vitalStatus(type, rounded);
    }
    averages[type] = {
      value,
      status: vital?.label ?? "",
      normal: vital?.normal ?? true,
    };
  }
  return averages;
}

export const TREND_RANGES = ["7d", "14d", "30d"] as const;
export type TrendRange = (typeof TREND_RANGES)[number];

export type SeverityTrend = {
  labels: string[];
  series: { symptom: Symptom; levels: number[] }[];
};

const TREND_DAYS: Record<TrendRange, [number, number]> = {
  "7d": [7, 1],
  "14d": [14, 2],
  "30d": [30, 5],
};

const LEVELS: Record<Severity, number> = { Mild: 1, Moderate: 2, Severe: 3 };

export function diaryMedications(entries: SideEffectEntry[]) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  return [...new Set(sorted.map((entry) => entry.medication))];
}

export function severityTrend(
  entries: SideEffectEntry[],
  medication: string,
  range: TrendRange,
  today: string,
): SeverityTrend | null {
  const [days, size] = TREND_DAYS[range];
  const start = addDays(today, 1 - days);
  const own = entries.filter(
    (e) => e.medication === medication && e.date >= start && e.date <= today,
  );
  const symptoms = SYMPTOMS.filter((symptom) =>
    own.some((e) => e.symptoms.some((s) => s.symptom === symptom)),
  );
  if (symptoms.length === 0) return null;
  const points = Array.from({ length: days / size }, (_, i) => {
    const from = addDays(start, i * size);
    return { from, to: addDays(from, size - 1) };
  });
  return {
    labels: points.map(({ from }) => monthDay(from)),
    series: symptoms.map((symptom) => ({
      symptom,
      levels: points.map(({ from, to }) =>
        own
          .filter((e) => e.date >= from && e.date <= to)
          .flatMap((e) => e.symptoms)
          .filter((s) => s.symptom === symptom)
          .reduce((worst, s) => Math.max(worst, LEVELS[s.severity]), 0),
      ),
    })),
  };
}
