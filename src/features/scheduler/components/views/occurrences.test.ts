import { describe, expect, it } from "vitest";

import { MOCK_DOSES, MOCK_SCHEDULES } from "../../model/mock-schedules";
import type { Schedule } from "../../model/schedule";
import {
  addMonths,
  clockLabel,
  hourLabel,
  isIsoDate,
  monthWeeks,
  weekday,
  weekDays,
} from "./calendar";
import {
  activeOn,
  doseLabel,
  frequencyLabel,
  intakesOn,
  medicationDosesOn,
  medicationsOn,
  occurrencesOn,
  ordinal,
  reminderLabel,
} from "./occurrences";

const base: Schedule = {
  id: "s",
  name: "Test 1mg",
  colour: "#6366F1",
  frequency: { kind: "daily" },
  intakes: [{ time: "08:00", quantity: 1, unit: "Tablet" }],
  remindMinutesBefore: null,
  startDate: "2025-10-01",
};

describe("calendar", () => {
  it("reads 12 October 2025 as a Sunday", () => {
    expect(weekday("2025-10-12")).toBe(0);
  });

  it("puts the chosen day third in the week", () => {
    expect(weekDays("2025-10-12")).toEqual([
      "2025-10-10",
      "2025-10-11",
      "2025-10-12",
      "2025-10-13",
      "2025-10-14",
      "2025-10-15",
      "2025-10-16",
    ]);
  });

  it("starts October 2025 on a Wednesday and fills five weeks", () => {
    const weeks = monthWeeks("2025-10-12");
    expect(weeks).toHaveLength(5);
    expect(weeks[0].slice(0, 4)).toEqual([null, null, null, "2025-10-01"]);
    expect(weeks[4].slice(4)).toEqual(["2025-10-30", "2025-10-31", null]);
  });

  it("clamps the day when moving between months", () => {
    expect(addMonths("2025-01-31", 1)).toBe("2025-02-28");
    expect(addMonths("2025-10-12", -1)).toBe("2025-09-12");
  });

  it("labels noon and midnight", () => {
    expect(hourLabel(0)).toEqual(["12", "AM"]);
    expect(hourLabel(12)).toEqual(["12", "PM"]);
    expect(hourLabel(13)).toEqual(["1", "PM"]);
    expect(clockLabel("19:00")).toEqual(["7:00", "PM"]);
  });

  it("accepts real dates only", () => {
    expect(isIsoDate("2025-10-12")).toBe(true);
    expect(isIsoDate("2025-02-30")).toBe(false);
    expect(isIsoDate("12/10/2025")).toBe(false);
  });
});

describe("occurrences", () => {
  it("follows the frequency", () => {
    const weekdays = {
      ...base,
      frequency: { kind: "weekdays" as const, days: [1, 3] },
    };
    expect(activeOn(weekdays, "2025-10-13")).toBe(true);
    expect(activeOn(weekdays, "2025-10-14")).toBe(false);

    const everyThree = {
      ...base,
      frequency: { kind: "everyDays" as const, every: 3 },
    };
    expect(activeOn(everyThree, "2025-10-04")).toBe(true);
    expect(activeOn(everyThree, "2025-10-05")).toBe(false);

    const fortnightly = {
      ...base,
      frequency: { kind: "everyWeeks" as const, every: 2 },
    };
    expect(activeOn(fortnightly, "2025-10-15")).toBe(true);
    expect(activeOn(fortnightly, "2025-10-08")).toBe(false);

    expect(activeOn(base, "2025-09-30")).toBe(false);
  });

  it("skips the off weeks of a cycle", () => {
    const cycle = { ...base, cycle: { takeWeeks: 3, skipWeeks: 1 } };
    expect(activeOn(cycle, "2025-10-21")).toBe(true);
    expect(activeOn(cycle, "2025-10-22")).toBe(false);
    expect(activeOn(cycle, "2025-10-28")).toBe(false);
    expect(activeOn(cycle, "2025-10-29")).toBe(true);
  });

  it("starts with the first intake on the start date", () => {
    const panadol = MOCK_SCHEDULES.find((s) => s.id === "panadol")!;
    expect(intakesOn(panadol, "2025-10-12").map((i) => i.time)).toEqual([
      "19:00",
    ]);
    expect(intakesOn(panadol, "2025-10-13").map((i) => i.time)).toEqual([
      "19:00",
      "07:00",
    ]);
  });

  it("draws 12 October 2025 as the frames do", () => {
    const day = occurrencesOn(MOCK_SCHEDULES, MOCK_DOSES, "2025-10-12").map(
      (o) => [o.intake.time, o.schedule.name, o.status ?? null],
    );
    expect(day).toEqual([
      ["07:00", "Garsil 35mg", "taken"],
      ["10:00", "Roaccutane 30mg", null],
      ["12:00", "CardioActive 20ml", null],
      ["12:00", "Garsil 35mg", null],
      ["19:00", "Panadol 500mg", null],
    ]);
    expect(medicationsOn(MOCK_SCHEDULES, "2025-10-11")).toHaveLength(3);
  });

  it("words doses, reminders and frequencies", () => {
    expect(doseLabel({ quantity: 2, unit: "Tablet" })).toBe("2 tablets");
    expect(doseLabel({ quantity: 1, unit: "Capsule" })).toBe("1 capsule");
    expect(doseLabel({ quantity: 20, unit: "Liquid" })).toBe("20 drops");
    expect(reminderLabel(30)).toBe("Reminder 30 min before");
    expect(reminderLabel(10, true)).toBe("10 min before");
    expect(
      frequencyLabel({
        ...base,
        intakes: [
          ...base.intakes,
          { time: "20:00", quantity: 1, unit: "Tablet" },
        ],
      }),
    ).toBe("twice a day");
    expect(
      frequencyLabel({
        ...base,
        frequency: { kind: "weekdays", days: [4, 1] },
      }),
    ).toBe("once a day on Mon, Thu");
    expect([1, 2, 3, 4, 11, 22].map(ordinal)).toEqual([
      "1st",
      "2nd",
      "3rd",
      "4th",
      "11th",
      "22nd",
    ]);
  });
});

describe("medicationDosesOn", () => {
  const twice: Schedule = {
    ...base,
    id: "twice",
    intakes: [
      { time: "08:00", quantity: 1, unit: "Tablet" },
      { time: "20:00", quantity: 1, unit: "Tablet" },
    ],
  };
  const once: Schedule = { ...base, id: "once" };
  const day = "2025-10-12";
  const log = (
    scheduleId: string,
    time: string,
    status: "taken" | "skipped",
  ) => ({
    scheduleId,
    date: day,
    time,
    status,
  });

  it("gives each medication its first dose not logged yet", () => {
    const [first, second] = medicationDosesOn(
      [twice, once],
      [log("twice", "08:00", "taken")],
      day,
    );
    expect(first).toMatchObject({ schedule: twice, intake: twice.intakes[1] });
    expect(first.status).toBeUndefined();
    expect(second).toMatchObject({ schedule: once, intake: once.intakes[0] });
  });

  it("says Taken once the day's doses are logged, Skipped when none was taken", () => {
    expect(
      medicationDosesOn(
        [twice],
        [log("twice", "08:00", "skipped"), log("twice", "20:00", "taken")],
        day,
      )[0],
    ).toMatchObject({ intake: twice.intakes[1], status: "taken" });
    expect(
      medicationDosesOn([once], [log("once", "08:00", "skipped")], day)[0]
        .status,
    ).toBe("skipped");
  });

  it("lists nothing on a day without doses", () => {
    expect(medicationDosesOn([once], [], "2025-09-30")).toEqual([]);
  });
});
