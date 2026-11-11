import { describe, expect, it } from "vitest";

import { parseDoseRef, signInHref } from "./route-params";

describe("parseDoseRef", () => {
  it("reads the dose from the query", () => {
    expect(
      parseDoseRef({
        schedule: "sch-1",
        date: "2026-11-06",
        time: "08:30",
        sideEffects: "1",
      }),
    ).toEqual({
      schedule: "sch-1",
      date: "2026-11-06",
      time: "08:30",
      sideEffects: true,
      vitals: false,
    });
  });

  it("drops a date or time that is not a real one", () => {
    for (const date of ["2026-13-01", "2026-02-30", "06/11/2026", "x"]) {
      expect(parseDoseRef({ date }).date).toBe("");
    }
    for (const time of ["24:00", "08:60", "8:30", "08:30:00"]) {
      expect(parseDoseRef({ time }).time).toBeUndefined();
    }
    expect(parseDoseRef({ date: ["2026-11-06", "x"] }).date).toBe("2026-11-06");
  });
});

describe("signInHref", () => {
  it("comes back to the same path and query", () => {
    expect(signInHref("/compliance/vitals/new", {})).toBe(
      "/sign-in?next=%2Fcompliance%2Fvitals%2Fnew",
    );
    expect(
      signInHref("/compliance/dose", { schedule: "a b", date: "2026-11-06" }),
    ).toBe(
      `/sign-in?next=${encodeURIComponent("/compliance/dose?schedule=a+b&date=2026-11-06")}`,
    );
  });
});
