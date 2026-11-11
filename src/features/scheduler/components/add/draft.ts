import type {
  DoseUnit,
  Frequency,
  Intake,
  MedicationColour,
  Schedule,
} from "@/features/scheduler/model/schedule";

export type FrequencyKind = Frequency["kind"];

export const FREQUENCY_OPTIONS: {
  kind: FrequencyKind;
  option: string;
  value: string;
}[] = [
  { kind: "daily", option: "Every day", value: "Every Day" },
  {
    kind: "weekdays",
    option: "Specific Days of the week",
    value: "Specific days of week",
  },
  { kind: "everyDays", option: "Every X days", value: "Every X Days" },
  { kind: "everyWeeks", option: "Every X weeks", value: "Every X Weeks" },
];

export const REMIND_OPTIONS: { minutes: number | null; label: string }[] = [
  { minutes: 5, label: "5 minutes before" },
  { minutes: 10, label: "10 minutes before" },
  { minutes: 15, label: "15 minutes before" },
  { minutes: 30, label: "30 minutes before" },
  { minutes: 60, label: "1 hour before" },
  { minutes: null, label: "No reminder" },
];

export const WEEKDAYS = [
  { day: 1, label: "Mon" },
  { day: 2, label: "Tue" },
  { day: 3, label: "Wed" },
  { day: 4, label: "Thu" },
  { day: 5, label: "Fri" },
  { day: 6, label: "Sat" },
  { day: 0, label: "Sun" },
];

export const AI_SUGGESTIONS = [
  "Take with food to reduce stomach upset.",
  "Monitor blood sugar levels",
  "Take with meals to reduce stomach upset.",
  "Swallow the tablet whole with a glass of water — do not crush or chew.",
];

export const LIMITS = {
  everyDays: { min: 2, max: 30 },
  everyWeeks: { min: 2, max: 12 },
  takeWeeks: { min: 1, max: 12 },
  skipWeeks: { min: 1, max: 12 },
  quantity: { min: 1, max: 99 },
};

export type Draft = {
  name: string;
  form?: string;
  scriptId?: string;
  frequency: FrequencyKind;
  days: number[];
  everyDays: number;
  everyWeeks: number;
  intakes: Intake[];
  remindMinutesBefore: number | null;
  cycle: boolean;
  takeWeeks: number;
  skipWeeks: number;
  note: string;
  suggestions: string[];
  colour: MedicationColour | null;
};

export const DEFAULT_TIME = "07:00";

export function newDraft(time: string | null): Draft {
  return {
    name: "",
    frequency: "daily",
    days: [],
    everyDays: 2,
    everyWeeks: 2,
    intakes: time ? [{ time, quantity: 1, unit: "Tablet" }] : [],
    remindMinutesBefore: 15,
    cycle: false,
    takeWeeks: 3,
    skipWeeks: 1,
    note: "",
    suggestions: [],
    colour: null,
  };
}

export function splitTime(time: string): {
  clock: string;
  period: "AM" | "PM";
} {
  const [h = 0, m = 0] = time.split(":").map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return {
    clock: `${hour}:${String(m).padStart(2, "0")}`,
    period: h < 12 ? "AM" : "PM",
  };
}

export function timeLabel(time: string): string {
  const { clock, period } = splitTime(time);
  return `${clock} ${period}`;
}

export function joinTime(hour12: number, minute: number, period: "AM" | "PM") {
  const h = (hour12 % 12) + (period === "PM" ? 12 : 0);
  return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export const HALF_HOURS = Array.from({ length: 48 }, (_, i) =>
  joinTime(Math.floor(i / 2) % 12 || 12, (i % 2) * 30, i < 24 ? "AM" : "PM"),
);

export function freeTime(preferred: string, taken: string[]): string {
  if (!taken.includes(preferred)) return preferred;
  const after = HALF_HOURS.findIndex((t) => t > preferred);
  const start = after === -1 ? 0 : after;
  for (let i = 0; i < HALF_HOURS.length; i++) {
    const time = HALF_HOURS[(start + i) % HALF_HOURS.length];
    if (!taken.includes(time)) return time;
  }
  return preferred;
}

const COUNTABLE = new Set<DoseUnit>([
  "Tablet",
  "Capsule",
  "Spray",
  "Injection",
]);

export function doseLabel({
  quantity,
  unit,
}: Pick<Intake, "quantity" | "unit">) {
  const word = unit.toLowerCase();
  return `${quantity} ${word}${quantity !== 1 && COUNTABLE.has(unit) ? "s" : ""}`;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export function parseDate(value: string | undefined): string | null {
  if (!value || !DATE.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
    ? value
    : null;
}

export function parseTime(value: string | undefined): string | null {
  return value && TIME.test(value) ? value : null;
}

export function parseScriptId(value: string | undefined): string | null {
  return value && /^[0-9a-f]{16}$/.test(value) ? value : null;
}

export function parseScheduleId(value: string | undefined): string | null {
  return value && /^[\w-]{1,64}$/.test(value) ? value : null;
}

export function localDate(now: Date): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function frequencyOf(draft: Draft): Frequency {
  switch (draft.frequency) {
    case "weekdays":
      return { kind: "weekdays", days: [...draft.days].sort((a, b) => a - b) };
    case "everyDays":
      return { kind: "everyDays", every: draft.everyDays };
    case "everyWeeks":
      return { kind: "everyWeeks", every: draft.everyWeeks };
    default:
      return { kind: "daily" };
  }
}

export function formProblems(draft: Draft) {
  return {
    name: draft.name.trim() === "",
    days: draft.frequency === "weekdays" && draft.days.length === 0,
    intakes: draft.intakes.length === 0,
  };
}

export function draftFromSchedule(schedule: Schedule): Draft {
  const { frequency, cycle } = schedule;
  const lines = (schedule.note ?? "").split("\n");
  const blank = newDraft(null);
  return {
    ...blank,
    name: schedule.name,
    form: schedule.form,
    scriptId: schedule.scriptId,
    frequency: frequency.kind,
    days: frequency.kind === "weekdays" ? [...frequency.days] : [],
    everyDays:
      frequency.kind === "everyDays" ? frequency.every : blank.everyDays,
    everyWeeks:
      frequency.kind === "everyWeeks" ? frequency.every : blank.everyWeeks,
    intakes: schedule.intakes.map((intake) => ({ ...intake })),
    remindMinutesBefore: schedule.remindMinutesBefore,
    cycle: Boolean(cycle),
    takeWeeks: cycle?.takeWeeks ?? blank.takeWeeks,
    skipWeeks: cycle?.skipWeeks ?? blank.skipWeeks,
    note: lines.filter((line) => !AI_SUGGESTIONS.includes(line)).join("\n"),
    suggestions: lines.filter((line) => AI_SUGGESTIONS.includes(line)),
    colour: schedule.colour,
  };
}

export function toSchedule(
  draft: Draft & { colour: MedicationColour },
  { id, startDate }: { id: string; startDate: string },
): Schedule {
  const note = [draft.note.trim(), ...draft.suggestions]
    .filter(Boolean)
    .join("\n");
  return {
    id,
    name: draft.name.trim(),
    ...(draft.form ? { form: draft.form } : {}),
    ...(draft.scriptId ? { scriptId: draft.scriptId } : {}),
    colour: draft.colour,
    frequency: frequencyOf(draft),
    intakes: [...draft.intakes].sort((a, b) => a.time.localeCompare(b.time)),
    remindMinutesBefore: draft.remindMinutesBefore,
    ...(draft.cycle
      ? { cycle: { takeWeeks: draft.takeWeeks, skipWeeks: draft.skipWeeks } }
      : {}),
    ...(note ? { note } : {}),
    startDate,
  };
}
