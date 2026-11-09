import {
  addDays,
  clockLabel,
  dayMonthLabel,
  toIsoDate,
} from "../components/views/calendar";
import { detailsHref } from "../components/views/links";
import {
  doseTime,
  nextOccurrences,
  occurrencesOn,
} from "../components/views/occurrences";
import type { Dose, Schedule } from "./schedule";

export function todaysDoses(schedules: Schedule[], doses: Dose[], now: Date) {
  const due = occurrencesOn(schedules, doses, toIsoDate(now));
  return {
    due: due.length,
    taken: due.filter((dose) => dose.status === "taken").length,
  };
}

export function timeLeftLabel(ms: number) {
  const minutes = Math.max(1, Math.ceil(ms / 60_000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  if (hours < 24) {
    return restMinutes ? `${hours}h ${restMinutes}m` : `${hours}h`;
  }
  const days = Math.floor(hours / 24);
  const restHours = hours % 24;
  return restHours ? `${days}d ${restHours}h` : `${days}d`;
}

function whenLabel(date: string, time: string, today: string) {
  const clock = clockLabel(time).join(" ");
  if (date === today) return clock;
  if (date === addDays(today, 1)) return `Tomorrow, ${clock}`;
  return `${dayMonthLabel(date)}, ${clock}`;
}

export type UpcomingDose = {
  key: string;
  name: string;
  time: string;
  eta: string;
  href: string;
};

export function upcomingDoses(
  schedules: Schedule[],
  doses: Dose[],
  now: Date,
  count = 2,
): UpcomingDose[] {
  const today = toIsoDate(now);
  return nextOccurrences(schedules, doses, now, count).map(
    ({ schedule, intake, date }, i) => ({
      key: `${schedule.id}-${date}-${intake.time}-${i}`,
      name: schedule.name,
      time: whenLabel(date, intake.time, today),
      eta: timeLeftLabel(doseTime(date, intake.time).getTime() - now.getTime()),
      href: detailsHref(schedule.id, date, intake.time),
    }),
  );
}
