import { describe, expect, it } from "vitest";

import type { Script } from "@/features/scripts/model/script";

import { MOCK_SCHEDULES } from "@/features/scheduler/model/mock-schedules";
import type { Schedule } from "@/features/scheduler/model/schedule";

import {
  doseLabel,
  draftFromSchedule,
  formProblems,
  freeTime,
  HALF_HOURS,
  joinTime,
  localDate,
  newDraft,
  parseDate,
  parseScheduleId,
  parseScriptId,
  parseTime,
  splitTime,
  timeLabel,
  toSchedule,
} from "./draft";
import { pickableScripts } from "./existing-scripts";

describe("times", () => {
  it("splits and joins 12-hour times", () => {
    expect(splitTime("07:00")).toEqual({ clock: "7:00", period: "AM" });
    expect(splitTime("00:30")).toEqual({ clock: "12:30", period: "AM" });
    expect(splitTime("12:05")).toEqual({ clock: "12:05", period: "PM" });
    expect(timeLabel("20:30")).toBe("8:30 PM");
    expect(joinTime(12, 0, "AM")).toBe("00:00");
    expect(joinTime(12, 15, "PM")).toBe("12:15");
    expect(joinTime(8, 30, "PM")).toBe("20:30");
  });

  it("offers a time the schedule does not have yet", () => {
    expect(freeTime("07:00", [])).toBe("07:00");
    expect(freeTime("07:00", ["07:00"])).toBe("07:30");
    expect(freeTime("07:00", ["07:00", "07:30"])).toBe("08:00");
    expect(freeTime("07:15", ["07:15"])).toBe("07:30");
    expect(freeTime("23:30", ["23:30"])).toBe("00:00");
    expect(freeTime("07:00", HALF_HOURS)).toBe("07:00");
  });

  it("lists every half hour of the day", () => {
    expect(HALF_HOURS).toHaveLength(48);
    expect(HALF_HOURS.slice(0, 3)).toEqual(["00:00", "00:30", "01:00"]);
    expect(HALF_HOURS[24]).toBe("12:00");
    expect(HALF_HOURS.at(-1)).toBe("23:30");
  });
});

describe("route params", () => {
  it("accepts real dates and times only", () => {
    expect(parseDate("2025-10-12")).toBe("2025-10-12");
    expect(parseDate("2025-02-30")).toBeNull();
    expect(parseDate("12/10/2025")).toBeNull();
    expect(parseDate(undefined)).toBeNull();
    expect(parseTime("09:00")).toBe("09:00");
    expect(parseTime("24:00")).toBeNull();
    expect(parseTime("9:00")).toBeNull();
  });

  it("accepts a script's opaque id and a schedule id", () => {
    expect(parseScriptId("0123456789abcdef")).toBe("0123456789abcdef");
    expect(parseScriptId("0123456789ABCDEF")).toBeNull();
    expect(parseScriptId("21KR32J3Y51XKM1XK7")).toBeNull();
    expect(parseScriptId(undefined)).toBeNull();
    expect(parseScheduleId("5f0c2d1e-0000-4000-8000-000000000001")).toBe(
      "5f0c2d1e-0000-4000-8000-000000000001",
    );
    expect(parseScheduleId("panadol")).toBe("panadol");
    expect(parseScheduleId("../x")).toBeNull();
    expect(parseScheduleId("")).toBeNull();
  });

  it("formats the local date", () => {
    expect(localDate(new Date(2025, 9, 5, 23, 59))).toBe("2025-10-05");
  });
});

describe("doseLabel", () => {
  it("pluralises counted units only", () => {
    expect(doseLabel({ quantity: 1, unit: "Tablet" })).toBe("1 tablet");
    expect(doseLabel({ quantity: 2, unit: "Capsule" })).toBe("2 capsules");
    expect(doseLabel({ quantity: 2, unit: "Gel" })).toBe("2 gel");
  });
});

describe("the schedule form", () => {
  it("starts from the slot it was opened from", () => {
    expect(newDraft("09:00").intakes).toEqual([
      { time: "09:00", quantity: 1, unit: "Tablet" },
    ]);
    expect(newDraft(null).intakes).toEqual([]);
  });

  it("needs a name, a time and, for specific days, a day", () => {
    const draft = { ...newDraft(null), frequency: "weekdays" as const };
    expect(formProblems(draft)).toEqual({
      name: true,
      days: true,
      intakes: true,
    });
    expect(
      formProblems({
        ...draft,
        name: "Panadol",
        days: [1],
        intakes: newDraft("07:00").intakes,
      }),
    ).toEqual({ name: false, days: false, intakes: false });
  });

  it("builds a schedule", () => {
    const schedule = toSchedule(
      {
        ...newDraft("19:00"),
        name: " Panadol ",
        frequency: "weekdays",
        days: [5, 1, 3],
        intakes: [
          { time: "19:00", quantity: 1, unit: "Tablet" },
          { time: "07:00", quantity: 2, unit: "Tablet" },
        ],
        cycle: true,
        note: "After food",
        suggestions: ["Monitor blood sugar levels"],
        colour: "#EF4444",
      },
      { id: "s1", startDate: "2025-10-12" },
    );
    expect(schedule).toEqual({
      id: "s1",
      name: "Panadol",
      colour: "#EF4444",
      frequency: { kind: "weekdays", days: [1, 3, 5] },
      intakes: [
        { time: "07:00", quantity: 2, unit: "Tablet" },
        { time: "19:00", quantity: 1, unit: "Tablet" },
      ],
      remindMinutesBefore: 15,
      cycle: { takeWeeks: 3, skipWeeks: 1 },
      note: "After food\nMonitor blood sugar levels",
      startDate: "2025-10-12",
    });
  });

  it("keeps the script a schedule was added from", () => {
    const schedule = toSchedule(
      {
        ...newDraft("07:00"),
        name: "Metformin 500mg",
        form: "500mg tablet",
        scriptId: "asl-metformin",
        frequency: "everyDays",
        everyDays: 3,
        colour: "#6366F1",
      },
      { id: "s2", startDate: "2025-10-12" },
    );
    expect(schedule.form).toBe("500mg tablet");
    expect(schedule.scriptId).toBe("asl-metformin");
    expect(schedule.frequency).toEqual({ kind: "everyDays", every: 3 });
    expect(schedule.cycle).toBeUndefined();
    expect(schedule.note).toBeUndefined();
  });
});

describe("editing a schedule", () => {
  const edited: Schedule = {
    id: "s3",
    name: "Metformin 500mg",
    form: "500mg tablet",
    scriptId: "0123456789abcdef",
    colour: "#10B981",
    frequency: { kind: "weekdays", days: [1, 4] },
    intakes: [
      { time: "08:00", quantity: 1, unit: "Tablet" },
      { time: "20:00", quantity: 2, unit: "Tablet" },
    ],
    remindMinutesBefore: 30,
    cycle: { takeWeeks: 2, skipWeeks: 1 },
    note: "After breakfast\nMonitor blood sugar levels",
    startDate: "2025-10-01",
  };

  it("fills the form with the saved schedule", () => {
    expect(draftFromSchedule(edited)).toMatchObject({
      name: "Metformin 500mg",
      form: "500mg tablet",
      scriptId: "0123456789abcdef",
      frequency: "weekdays",
      days: [1, 4],
      intakes: edited.intakes,
      remindMinutesBefore: 30,
      cycle: true,
      takeWeeks: 2,
      skipWeeks: 1,
      note: "After breakfast",
      suggestions: ["Monitor blood sugar levels"],
      colour: "#10B981",
    });
    expect(
      draftFromSchedule({
        ...edited,
        frequency: { kind: "everyWeeks", every: 4 },
      }),
    ).toMatchObject({ frequency: "everyWeeks", everyWeeks: 4, days: [] });
  });

  it("saves the same schedule when nothing changes", () => {
    for (const schedule of [edited, ...MOCK_SCHEDULES]) {
      const draft = draftFromSchedule(schedule);
      const again = toSchedule(
        { ...draft, colour: schedule.colour },
        { id: schedule.id, startDate: schedule.startDate },
      );
      expect(again).toEqual({
        ...schedule,
        intakes: [...schedule.intakes].sort((a, b) =>
          a.time.localeCompare(b.time),
        ),
      });
    }
  });
});

describe("pickableScripts", () => {
  it("lists the active scripts that have medication data", () => {
    const base = {
      token: "2PPMFK9JTN79538539",
      secure: true,
      addedOn: "",
      hidden: false,
      canHide: true,
      canDelete: false,
      patient: "John Smith",
    };
    const scripts: Script[] = [
      {
        ...base,
        kind: "medication",
        id: "a",
        status: "active",
        name: "Metformin 500mg",
        form: "500mg tablet",
        detail: "500mg tablet • 2 repeats left",
        tags: [],
      },
      {
        ...base,
        kind: "medication",
        id: "b",
        status: "expired",
        name: "Amlodipine 5mg",
        form: "5mg tablet",
        detail: "5mg tablet • 0 repeats left",
        tags: [],
      },
      { ...base, kind: "token", id: "c", status: "active" },
    ];
    expect(pickableScripts(scripts)).toEqual([
      { id: "a", name: "Metformin 500mg", form: "500mg tablet" },
    ]);
    expect(pickableScripts([])).toEqual([]);
  });
});
