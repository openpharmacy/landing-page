import type {
  Dose,
  DoseStatus,
  DoseUnit,
  Intake,
  Schedule,
} from "../../model/schedule";
import { addDays, daysBetween, toIsoDate, weekday } from "./calendar";

export type Occurrence = {
  schedule: Schedule;
  intake: Intake;
  date: string;
  status?: DoseStatus;
};

export function activeOn(schedule: Schedule, date: string) {
  const days = daysBetween(schedule.startDate, date);
  if (days < 0) return false;
  const { frequency, cycle } = schedule;
  if (cycle) {
    const period = cycle.takeWeeks + cycle.skipWeeks;
    if (period > 0 && Math.floor(days / 7) % period >= cycle.takeWeeks) {
      return false;
    }
  }
  switch (frequency.kind) {
    case "daily":
      return true;
    case "weekdays":
      return frequency.days.includes(weekday(date));
    case "everyDays":
      return days % Math.max(1, frequency.every) === 0;
    case "everyWeeks":
      return days % (7 * Math.max(1, frequency.every)) === 0;
  }
}

export function intakesOn(schedule: Schedule, date: string) {
  if (!activeOn(schedule, date)) return [];
  if (date !== schedule.startDate) return schedule.intakes;
  const first = schedule.intakes[0]?.time ?? "00:00";
  return schedule.intakes.filter((intake) => intake.time >= first);
}

export function occurrencesOn(
  schedules: Schedule[],
  doses: Dose[],
  date: string,
): Occurrence[] {
  const out: Occurrence[] = [];
  for (const schedule of schedules) {
    for (const intake of intakesOn(schedule, date)) {
      const dose = doses.find(
        (d) =>
          d.scheduleId === schedule.id &&
          d.date === date &&
          d.time === intake.time,
      );
      out.push({ schedule, intake, date, status: dose?.status });
    }
  }
  return out.sort((a, b) => a.intake.time.localeCompare(b.intake.time));
}

export function doseTime(date: string, time: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(y, m - 1, d, hour, minute);
}

const LOOK_AHEAD_DAYS = 90;

export function nextOccurrences(
  schedules: Schedule[],
  doses: Dose[],
  now: Date,
  count: number,
): Occurrence[] {
  const out: Occurrence[] = [];
  const today = toIsoDate(now);
  for (let day = 0; day <= LOOK_AHEAD_DAYS && out.length < count; day++) {
    const date = addDays(today, day);
    for (const occurrence of occurrencesOn(schedules, doses, date)) {
      if (!occurrence.status && doseTime(date, occurrence.intake.time) > now) {
        out.push(occurrence);
      }
    }
  }
  return out.slice(0, count);
}

export function medicationsOn(schedules: Schedule[], date: string) {
  return schedules.filter((schedule) => intakesOn(schedule, date).length > 0);
}

export function medicationDosesOn(
  schedules: Schedule[],
  doses: Dose[],
  date: string,
): Occurrence[] {
  const all = occurrencesOn(schedules, doses, date);
  return medicationsOn(schedules, date).map((schedule) => {
    const own = all.filter((o) => o.schedule.id === schedule.id);
    return (
      own.find((o) => !o.status) ??
      own.find((o) => o.status === "taken") ??
      own[0]
    );
  });
}

const UNIT_NOUN: Record<DoseUnit, [string, string]> = {
  Tablet: ["tablet", "tablets"],
  Capsule: ["capsule", "capsules"],
  Liquid: ["drop", "drops"],
  Spray: ["spray", "sprays"],
  Ointment: ["application", "applications"],
  Gel: ["application", "applications"],
  Injection: ["injection", "injections"],
  Powder: ["sachet", "sachets"],
};

export function doseLabel({
  quantity,
  unit,
}: Pick<Intake, "quantity" | "unit">) {
  const [one, many] = UNIT_NOUN[unit];
  return `${quantity} ${quantity === 1 ? one : many}`;
}

export function reminderLabel(minutes: number, short = false) {
  const text = `${minutes} min before`;
  return short ? text : `Reminder ${text}`;
}

const TIMES = ["once", "twice"];
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function frequencyLabel({ frequency, intakes }: Schedule) {
  const times = TIMES[intakes.length - 1] ?? `${intakes.length} times`;
  const perDay = `${times} a day`;
  switch (frequency.kind) {
    case "daily":
      return perDay;
    case "weekdays":
      return `${perDay} on ${[...frequency.days]
        .sort()
        .map((d) => WEEKDAY_NAMES[d])
        .join(", ")}`;
    case "everyDays":
      return frequency.every === 1
        ? perDay
        : `${perDay} every ${frequency.every} days`;
    case "everyWeeks":
      return frequency.every === 1
        ? `${perDay} once a week`
        : `${perDay} every ${frequency.every} weeks`;
  }
}

export function ordinal(n: number) {
  const tens = n % 100;
  const suffix =
    tens >= 11 && tens <= 13
      ? "th"
      : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  return `${n}${suffix}`;
}
