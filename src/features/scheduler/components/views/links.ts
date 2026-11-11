import type { View } from "./calendar";

const query = (params: Record<string, string | undefined>) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, value);
  }
  return search.toString();
};

export function schedulerHref(view: View, date?: string | null) {
  return `/scheduler?${query({ view, date: date ?? undefined })}`;
}

export function detailsHref(
  scheduleId: string,
  date?: string | null,
  time?: string,
) {
  const search = query({ date: date ?? undefined, time });
  return `/scheduler/medication/${encodeURIComponent(scheduleId)}${search ? `?${search}` : ""}`;
}

export function addHref(date: string, time?: string) {
  return `/scheduler/add?${query({ date, time })}`;
}

export function editHref(scheduleId: string, date?: string | null) {
  return `/scheduler/add?${query({ edit: scheduleId, date: date ?? undefined })}`;
}

export function takenHref(scheduleId: string, date: string, time: string) {
  return `/compliance/dose/taken?${query({ schedule: scheduleId, date, time })}`;
}
