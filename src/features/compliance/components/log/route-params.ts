import { isIsoDate } from "@/features/scheduler/components/views/calendar";

import type { DoseRef } from "./format";

export type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export function parseDoseRef(params: SearchParams): DoseRef {
  const date = first(params.date) ?? "";
  const time = first(params.time);
  return {
    schedule: first(params.schedule) ?? "",
    date: isIsoDate(date) ? date : "",
    time: time && TIME.test(time) ? time : undefined,
    sideEffects: first(params.sideEffects) === "1",
    vitals: first(params.vitals) === "1",
  };
}

export function signInHref(path: string, params: SearchParams): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    for (const v of Array.isArray(value) ? value : value ? [value] : []) {
      query.append(key, v);
    }
  }
  const next = query.size ? `${path}?${query}` : path;
  return `/sign-in?next=${encodeURIComponent(next)}`;
}
