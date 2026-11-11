import type { Intake } from "@/features/scheduler/model/schedule";

export function formatTime(time: string): string {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const suffix = hours < 12 ? "AM" : "PM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

const COUNTABLE = new Set(["Tablet", "Capsule", "Spray", "Injection"]);

export function formatDose({ quantity, unit }: Intake): string {
  const plural = quantity !== 1 && COUNTABLE.has(unit);
  return `${quantity} ${unit}${plural ? "s" : ""}`;
}

export function formatLongDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function today(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export type DoseRef = {
  schedule: string;
  date: string;
  time?: string;
  sideEffects?: boolean;
  vitals?: boolean;
};

export function doseQuery(dose: DoseRef): string {
  const query = new URLSearchParams({
    schedule: dose.schedule,
    date: dose.date,
  });
  if (dose.time) query.set("time", dose.time);
  if (dose.sideEffects) query.set("sideEffects", "1");
  if (dose.vitals) query.set("vitals", "1");
  return query.toString();
}

export const takenHref = (dose: DoseRef) =>
  `/compliance/dose/taken?${doseQuery(dose)}`;
export const sideEffectsHref = (dose: DoseRef) =>
  `/compliance/side-effects/new?${doseQuery(dose)}`;
export const vitalsHref = (dose: DoseRef) =>
  `/compliance/vitals/new?${doseQuery(dose)}`;
export const dayHref = (date: string) =>
  `/scheduler?view=day&date=${encodeURIComponent(date)}`;
