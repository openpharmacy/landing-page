export type View = "day" | "week" | "month";
export const VIEWS: View[] = ["day", "week", "month"];

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

const DAY_MS = 86_400_000;
const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseView(value: string | undefined): View | null {
  return VIEWS.includes(value as View) ? (value as View) : null;
}

export function isIsoDate(value: string | undefined): value is string {
  const match = value && ISO.exec(value);
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function toUtc(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function fromUtc(ms: number) {
  return new Date(ms).toISOString().slice(0, 10);
}

export function toIsoDate(now: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function addDays(iso: string, days: number) {
  return fromUtc(toUtc(iso) + days * DAY_MS);
}

export function addMonths(iso: string, months: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1 + months, 1));
  const last = new Date(
    Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0),
  ).getUTCDate();
  return fromUtc(
    Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), Math.min(d, last)),
  );
}

export function daysBetween(from: string, to: string) {
  return Math.round((toUtc(to) - toUtc(from)) / DAY_MS);
}

export function weekday(iso: string) {
  return new Date(toUtc(iso)).getUTCDay();
}

export function dayOfMonth(iso: string) {
  return Number(iso.slice(8, 10));
}

export function dayMonthLabel(iso: string) {
  return `${dayOfMonth(iso)} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;
}

export function monthYear(iso: string): [string, string] {
  const month = MONTHS[Number(iso.slice(5, 7)) - 1].slice(0, 3).toUpperCase();
  return [month, iso.slice(0, 4)];
}

export function stripDays(iso: string) {
  return [-1, 0, 1].map((n) => addDays(iso, n));
}

export function weekDays(iso: string) {
  return [-2, -1, 0, 1, 2, 3, 4].map((n) => addDays(iso, n));
}

export function monthWeeks(iso: string): (string | null)[][] {
  const first = `${iso.slice(0, 8)}01`;
  const length = daysBetween(first, addMonths(first, 1));
  const cells: (string | null)[] = Array(weekday(first)).fill(null);
  for (let day = 0; day < length; day++) cells.push(addDays(first, day));
  while (cells.length % 7) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function hourLabel(hour: number): [string, string] {
  return [String(hour % 12 || 12), hour < 12 ? "AM" : "PM"];
}

export function clockLabel(time: string): [string, string] {
  const [hour, minute] = time.split(":").map(Number);
  return [
    `${hour % 12 || 12}:${String(minute).padStart(2, "0")}`,
    hour < 12 ? "AM" : "PM",
  ];
}

export function hourOf(time: string) {
  return Number(time.slice(0, 2));
}
