import { describe, expect, it } from "vitest";

import type { Dose, Schedule } from "./schedule";
import { timeLeftLabel, todaysDoses, upcomingDoses } from "./today";

const panadol: Schedule = {
  id: "p",
  name: "Panadol 500mg",
  colour: "#EF4444",
  frequency: { kind: "daily" },
  intakes: [
    { time: "08:00", quantity: 1, unit: "Tablet" },
    { time: "20:00", quantity: 1, unit: "Tablet" },
  ],
  remindMinutesBefore: 15,
  startDate: "2026-11-01",
};
const vitaminD: Schedule = {
  ...panadol,
  id: "d",
  name: "Vitamin D3",
  intakes: [{ time: "08:00", quantity: 1, unit: "Capsule" }],
  startDate: "2026-11-09",
};

const now = new Date(2026, 10, 6, 17, 30);
const dose = (time: string, status: Dose["status"]): Dose => ({
  scheduleId: "p",
  date: "2026-11-06",
  time,
  status,
});

describe("todaysDoses", () => {
  it("counts today's doses and the ones taken", () => {
    expect(todaysDoses([panadol], [dose("08:00", "taken")], now)).toEqual({
      due: 2,
      taken: 1,
    });
    expect(todaysDoses([panadol], [dose("08:00", "skipped")], now)).toEqual({
      due: 2,
      taken: 0,
    });
  });

  it("finds nothing due before a schedule starts", () => {
    expect(todaysDoses([vitaminD], [], now)).toEqual({ due: 0, taken: 0 });
  });
});

describe("upcomingDoses", () => {
  it("lists the next two doses after now with the time left", () => {
    expect(upcomingDoses([panadol], [], now)).toEqual([
      {
        key: "p-2026-11-06-20:00-0",
        name: "Panadol 500mg",
        time: "8:00 PM",
        eta: "2h 30m",
        href: "/scheduler/medication/p?date=2026-11-06&time=20%3A00",
      },
      {
        key: "p-2026-11-07-08:00-1",
        name: "Panadol 500mg",
        time: "Tomorrow, 8:00 AM",
        eta: "14h 30m",
        href: "/scheduler/medication/p?date=2026-11-07&time=08%3A00",
      },
    ]);
  });

  it("skips doses already logged", () => {
    const later = upcomingDoses([panadol], [dose("20:00", "taken")], now);
    expect(later.map((d) => d.key)).toEqual([
      "p-2026-11-07-08:00-0",
      "p-2026-11-07-20:00-1",
    ]);
  });

  it("names the day of a dose after tomorrow", () => {
    expect(upcomingDoses([vitaminD], [], now, 1)).toEqual([
      {
        key: "d-2026-11-09-08:00-0",
        name: "Vitamin D3",
        time: "9 November, 8:00 AM",
        eta: "2d 14h",
        href: "/scheduler/medication/d?date=2026-11-09&time=08%3A00",
      },
    ]);
  });

  it("finds nothing when no dose falls in the next 90 days", () => {
    expect(
      upcomingDoses([{ ...vitaminD, startDate: "2027-06-01" }], [], now),
    ).toEqual([]);
    expect(upcomingDoses([], [], now)).toEqual([]);
  });
});

describe("timeLeftLabel", () => {
  it("rounds up to the minute", () => {
    expect(timeLeftLabel(45_000)).toBe("1m");
    expect(timeLeftLabel(44 * 60_000 + 1)).toBe("45m");
    expect(timeLeftLabel(60 * 60_000)).toBe("1h");
    expect(timeLeftLabel(150 * 60_000)).toBe("2h 30m");
    expect(timeLeftLabel(24 * 3_600_000)).toBe("1d");
    expect(timeLeftLabel(26 * 3_600_000 + 60_000)).toBe("1d 2h");
  });
});
