import { describe, expect, it } from "vitest";

import {
  doseQuery,
  formatDose,
  formatLongDate,
  formatTime,
  takenHref,
} from "./format";
import { parseDoseRef, signInHref } from "./route-params";

describe("formatTime", () => {
  it("writes 12-hour times as the frames do", () => {
    expect(formatTime("14:00")).toBe("2:00 PM");
    expect(formatTime("08:05")).toBe("8:05 AM");
    expect(formatTime("00:30")).toBe("12:30 AM");
    expect(formatTime("12:00")).toBe("12:00 PM");
  });
});

describe("formatDose", () => {
  it("pluralises countable units only", () => {
    expect(formatDose({ time: "08:00", quantity: 1, unit: "Tablet" })).toBe(
      "1 Tablet",
    );
    expect(formatDose({ time: "08:00", quantity: 2, unit: "Capsule" })).toBe(
      "2 Capsules",
    );
    expect(formatDose({ time: "08:00", quantity: 5, unit: "Liquid" })).toBe(
      "5 Liquid",
    );
  });
});

describe("formatLongDate", () => {
  it("names the weekday of the date", () => {
    expect(formatLongDate("2025-09-08")).toBe("Monday, Sep 8, 2025");
  });
});

describe("dose links", () => {
  it("carry the dose and the finished follow-ups", () => {
    expect(
      doseQuery({ schedule: "panadol", date: "2025-10-12", time: "14:00" }),
    ).toBe("schedule=panadol&date=2025-10-12&time=14%3A00");
    expect(
      takenHref({
        schedule: "panadol",
        date: "2025-10-12",
        sideEffects: true,
        vitals: true,
      }),
    ).toBe(
      "/compliance/dose/taken?schedule=panadol&date=2025-10-12&sideEffects=1&vitals=1",
    );
  });

  it("are read back from the route", () => {
    expect(
      parseDoseRef({
        schedule: "panadol",
        date: "2025-10-12",
        time: "14:00",
        vitals: "1",
      }),
    ).toEqual({
      schedule: "panadol",
      date: "2025-10-12",
      time: "14:00",
      sideEffects: false,
      vitals: true,
    });
    expect(parseDoseRef({ date: "12/10/2025", time: "2pm" })).toEqual({
      schedule: "",
      date: "",
      time: undefined,
      sideEffects: false,
      vitals: false,
    });
  });

  it("send guests to sign in and back", () => {
    expect(
      signInHref("/compliance/dose", { schedule: "a", date: "2025-10-12" }),
    ).toBe(
      "/sign-in?next=%2Fcompliance%2Fdose%3Fschedule%3Da%26date%3D2025-10-12",
    );
  });
});
