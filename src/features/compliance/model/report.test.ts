import { afterEach, describe, expect, it } from "vitest";

import {
  addDays,
  toIsoDate,
} from "@/features/scheduler/components/views/calendar";
import type { Dose, Schedule } from "@/features/scheduler/model/schedule";

import {
  achievements,
  complianceRate,
  complianceReport,
  complianceSubtitle,
  countedDoses,
  dayStreak,
  diaryMedications,
  latestSideEffects,
  latestVitals,
  missedDoseAlert,
  severityTrend,
  vitalAverages,
  vitalStatus,
} from "./report";
import type { SideEffectEntry } from "./side-effects";
import type { VitalReading } from "./vitals";

const TODAY = "2026-11-06";
const ago = (days: number) => addDays(TODAY, -days);

function schedule(patch: Partial<Schedule> = {}): Schedule {
  return {
    id: "ator",
    name: "Atorvastatin 20mg",
    colour: "#6366F1",
    frequency: { kind: "daily" },
    intakes: [{ time: "08:00", quantity: 1, unit: "Tablet" }],
    remindMinutesBefore: null,
    startDate: ago(30),
    ...patch,
  };
}

const EVENING = schedule({
  id: "lisi",
  name: "Lisinopril 10mg",
  intakes: [{ time: "20:00", quantity: 1, unit: "Tablet" }],
});

const log = (
  scheduleId: string,
  date: string,
  time: string,
  status: Dose["status"] = "taken",
): Dose => ({ scheduleId, date, time, status });

const takenOn = (days: number[], id = "ator", time = "08:00") =>
  days.map((n) => log(id, ago(n), time));

describe("countedDoses", () => {
  it("counts taken, skipped and past unlogged doses, and leaves today's open", () => {
    const s = schedule({
      startDate: ago(2),
      intakes: [
        { time: "08:00", quantity: 1, unit: "Tablet" },
        { time: "20:00", quantity: 1, unit: "Tablet" },
      ],
    });
    const doses = [
      log("ator", ago(2), "08:00"),
      log("ator", ago(1), "20:00", "skipped"),
      log("ator", TODAY, "20:00"),
    ];
    const counted = countedDoses([s], doses, ago(6), TODAY, TODAY);
    expect(counted.map((d) => [d.date, d.time, d.taken])).toEqual([
      [ago(2), "08:00", true],
      [ago(2), "20:00", false],
      [ago(1), "08:00", false],
      [ago(1), "20:00", false],
      [TODAY, "20:00", true],
    ]);
  });

  it("follows the scheduler: the start day's first intake, weekdays, nothing after today", () => {
    const s = schedule({
      startDate: ago(7),
      intakes: [
        { time: "19:00", quantity: 1, unit: "Tablet" },
        { time: "07:00", quantity: 1, unit: "Tablet" },
      ],
      frequency: { kind: "weekdays", days: [1, 5] },
    });
    const counted = countedDoses(
      [s],
      [log("ator", addDays(TODAY, 3), "07:00")],
      ago(10),
      addDays(TODAY, 7),
      TODAY,
    );
    expect(counted.map((d) => `${d.date} ${d.time}`)).toEqual([
      `${ago(7)} 19:00`,
      `${ago(4)} 07:00`,
      `${ago(4)} 19:00`,
    ]);
  });
});

describe("complianceReport with no data", () => {
  it("has empty numbers and no sample in any range", () => {
    for (const range of ["7d", "30d", "90d"] as const) {
      const report = complianceReport([], [], range, TODAY);
      expect(report.dosesTaken).toBe(0);
      expect(report.dosesMissed).toBe(0);
      expect(complianceRate(report)).toBeNull();
      expect(report.streakDays).toBe(0);
      expect(report.missedDose).toBeNull();
      expect(report.breakdown).toEqual([]);
      expect(report.trendInsights).toEqual([]);
      expect(report.progress.every((row) => row.percent === null)).toBe(true);
      expect(report.trend.every((bar) => bar.percent === null)).toBe(true);
      expect(report.insights.highRiskTimes).toEqual([]);
      expect(report.insights.mostMissed).toEqual([]);
      expect(report.insights.recommendation).toBeNull();
      expect(report.achievements.some((a) => a.earned)).toBe(false);
    }
    const week = complianceReport([], [], "7d", TODAY);
    expect(week.emptyText).toBe("No doses were due in the last 7 days.");
    expect(week.insights.emptyText).toBe(
      "No doses were due in the last 7 days.",
    );
  });

  it("does not count a schedule that starts later", () => {
    const report = complianceReport(
      [schedule({ startDate: addDays(TODAY, 2) })],
      [],
      "7d",
      TODAY,
    );
    expect(report.dosesMissed).toBe(0);
    expect(report.achievements.some((a) => a.earned)).toBe(false);
  });
});

describe("complianceReport over 7 days", () => {
  const s = schedule({ startDate: ago(3) });
  const doses = [log("ator", ago(3), "08:00"), log("ator", ago(1), "08:00")];
  const report = complianceReport([s], doses, "7d", TODAY);

  it("counts the doses and the rate", () => {
    expect(report.dosesTaken).toBe(2);
    expect(report.dosesMissed).toBe(1);
    expect(complianceRate(report)).toBe(67);
  });

  it("rows newest first, bars oldest first, by weekday", () => {
    expect(report.progress.map((r) => [r.label, r.percent])).toEqual([
      ["Fri", null],
      ["Thu", 100],
      ["Wed", 0],
      ["Tue", 100],
      ["Mon", null],
      ["Sun", null],
      ["Sat", null],
    ]);
    expect(report.trend.map((b) => b.label)).toEqual([
      "Sat",
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
    ]);
    expect(report.progress[0].dates).toBeUndefined();
  });

  it("breaks down the days that had doses, per medication", () => {
    expect(report.breakdownTitle).toBe("Daily Breakdown");
    expect(report.breakdown).toEqual([
      {
        title: "Thu, Nov 5",
        percent: 100,
        medications: [{ medication: "Atorvastatin 20mg", taken: 1, total: 1 }],
      },
      {
        title: "Wed, Nov 4",
        percent: 0,
        medications: [{ medication: "Atorvastatin 20mg", taken: 0, total: 1 }],
      },
      {
        title: "Tue, Nov 3",
        percent: 100,
        medications: [{ medication: "Atorvastatin 20mg", taken: 1, total: 1 }],
      },
    ]);
  });

  it("names only what the numbers show", () => {
    expect(report.trendInsights).toEqual([]);
    expect(report.insights.highRiskTimes).toEqual(["Early Morning (6-9 AM)"]);
    expect(report.insights.mostMissed).toEqual([
      {
        medication: "Atorvastatin 20mg",
        text: "1 missed in last 7 days",
        share: 1 / 3,
      },
    ]);
    expect(report.insights.byTimeOfDay).toEqual([
      { label: "6AM", missed: 1 },
      { label: "9AM", missed: 0 },
      { label: "12AM", missed: 0 },
      { label: "3PM", missed: 0 },
      { label: "6PM", missed: 0 },
      { label: "9PM", missed: 0 },
      { label: "12AM", missed: 0 },
    ]);
    expect(report.insights.recommendation).toBeNull();
    expect(report.streakDays).toBe(1);
  });
});

describe("one medication on two schedules", () => {
  it("is one row per medication in the breakdown and in Most Missed", () => {
    const morning = schedule({
      id: "met-am",
      name: "Metformin 500mg",
      startDate: ago(2),
    });
    const evening = schedule({
      id: "met-pm",
      name: "Metformin 500mg",
      startDate: ago(2),
      intakes: [{ time: "20:00", quantity: 1, unit: "Tablet" }],
    });
    const doses = [
      log("met-am", ago(1), "08:00"),
      log("met-pm", ago(1), "20:00", "skipped"),
    ];
    const report = complianceReport([morning, evening], doses, "7d", TODAY);
    expect(report.breakdown.map((period) => period.medications)).toEqual([
      [{ medication: "Metformin 500mg", taken: 1, total: 2 }],
      [{ medication: "Metformin 500mg", taken: 0, total: 2 }],
    ]);
    expect(report.insights.mostMissed).toEqual([
      {
        medication: "Metformin 500mg",
        text: "3 missed in last 7 days",
        share: 3 / 4,
      },
    ]);
  });
});

describe("streaks and achievements", () => {
  it("counts the days in a row with every dose taken", () => {
    const s = schedule();
    const doses = takenOn([0, 1, 2, 3, 4, 5, 6, 7]);
    expect(complianceReport([s], doses, "7d", TODAY).streakDays).toBe(8);
    const broken = doses.filter((d) => d.date !== ago(4));
    expect(complianceReport([s], broken, "7d", TODAY).streakDays).toBe(4);
  });

  it("keeps the streak while today's dose is open, and ends it on a skip", () => {
    const s = schedule();
    const doses = takenOn([1, 2, 3]);
    expect(complianceReport([s], doses, "7d", TODAY).streakDays).toBe(3);
    const skipped = [...doses, log("ator", TODAY, "08:00", "skipped")];
    expect(complianceReport([s], skipped, "7d", TODAY).streakDays).toBe(0);
  });

  it("is not broken by days with nothing due", () => {
    const s = schedule({
      frequency: { kind: "weekdays", days: [1, 3, 5] },
      startDate: ago(14),
    });
    const doses = [0, 2, 4, 7, 9].map((n) => log("ator", ago(n), "08:00"));
    expect(complianceReport([s], doses, "7d", TODAY).streakDays).toBe(5);
    expect(dayStreak([], TODAY)).toBe(0);
  });

  it("earns Perfect Week after seven perfect days in a row", () => {
    const s = schedule();
    const six = achievements([s], takenOn([0, 1, 2, 3, 4, 5]), TODAY);
    expect(six.find((a) => a.kind === "perfectWeek")?.earned).toBe(false);
    const week = achievements(
      [schedule({ startDate: ago(6) })],
      takenOn([0, 1, 2, 3, 4, 5, 6]),
      TODAY,
    );
    expect(week.find((a) => a.kind === "perfectWeek")?.earned).toBe(true);
  });

  it("earns Consistency Champion with at most one miss in every week", () => {
    const s = schedule({ startDate: ago(13) });
    const all = Array.from({ length: 14 }, (_, n) => n);
    const champion = (doses: Dose[]) =>
      achievements([s], doses, TODAY).find((a) => a.kind === "consistency")
        ?.earned;
    expect(champion(takenOn(all.filter((n) => n !== 2 && n !== 10)))).toBe(
      true,
    );
    expect(champion(takenOn(all.filter((n) => n !== 2 && n !== 3)))).toBe(
      false,
    );
    expect(
      achievements(
        [schedule({ startDate: ago(4) })],
        takenOn([0, 1, 2, 3, 4]),
        TODAY,
      ).find((a) => a.kind === "consistency")?.earned,
    ).toBe(false);
  });
});

describe("the missed-dose alert", () => {
  it("shows when the last two doses of a schedule were missed", () => {
    const s = schedule({ startDate: ago(4) });
    const alert = missedDoseAlert([s], takenOn([4, 3]), TODAY);
    expect(alert).toEqual({
      text: "You've missed your last 2 morning doses of Atorvastatin 20mg. Want to shift your schedule?",
      href: "/scheduler/add?edit=ator",
    });
    expect(
      complianceReport([s], takenOn([4, 3]), "30d", TODAY).missedDose,
    ).toEqual(alert);
  });

  it("stays away after one miss, or once a dose is taken again", () => {
    const s = schedule({ startDate: ago(4) });
    expect(missedDoseAlert([s], takenOn([4, 3, 2]), TODAY)).toBeNull();
    expect(
      missedDoseAlert(
        [s],
        [...takenOn([4]), log("ator", TODAY, "08:00")],
        TODAY,
      ),
    ).toBeNull();
    expect(missedDoseAlert([], [], TODAY)).toBeNull();
  });

  it("picks the schedule missed most recently and names mixed times plainly", () => {
    const morning = schedule({ startDate: ago(5) });
    const twice = schedule({
      id: "met id",
      name: "Lisinopril 10mg",
      startDate: ago(3),
      intakes: [
        { time: "08:00", quantity: 1, unit: "Tablet" },
        { time: "20:00", quantity: 1, unit: "Tablet" },
      ],
    });
    const doses = [
      ...takenOn([5, 4, 3]),
      log("met id", ago(3), "08:00"),
      log("met id", ago(3), "20:00"),
      log("met id", ago(2), "08:00"),
    ];
    expect(missedDoseAlert([morning, twice], doses, TODAY)).toEqual({
      text: "You've missed your last 3 doses of Lisinopril 10mg. Want to shift your schedule?",
      href: "/scheduler/add?edit=met%20id",
    });
  });
});

describe("periods of 30 and 90 days", () => {
  it("splits 30 days into weeks from the first day", () => {
    const report = complianceReport([], [], "30d", TODAY);
    expect(report.trend.map((b) => [b.label, b.dates])).toEqual([
      ["Week 1", "Oct 8-14"],
      ["Week 2", "Oct 15-21"],
      ["Week 3", "Oct 22-28"],
      ["Week 4", "Oct 29 - Nov 4"],
      ["Week 5", "Nov 5-6"],
    ]);
    expect(report.progress[0].label).toBe("Week 5");
    expect(report.breakdownTitle).toBe("Weekly Breakdown");
  });

  it("splits 90 days into calendar months", () => {
    const report = complianceReport(
      [schedule({ startDate: ago(89) })],
      takenOn(Array.from({ length: 90 }, (_, n) => n)),
      "90d",
      TODAY,
    );
    expect(report.trend.map((b) => [b.label, b.dates, b.percent])).toEqual([
      ["Aug", "Aug 9 - Aug 31", 100],
      ["Sep", "Sep 1 - Sep 30", 100],
      ["Oct", "Oct 1 - Oct 31", 100],
      ["Nov", "Nov 1 - Nov 6", 100],
    ]);
    expect(report.breakdown.map((p) => p.title)).toEqual([
      "November 2026",
      "October 2026",
      "September 2026",
      "August 2026",
    ]);
    expect(report.breakdown[0].medications).toEqual([
      { medication: "Atorvastatin 20mg", taken: 6, total: 6 },
    ]);
    expect(report.dosesTaken).toBe(90);
    expect(report.streakDays).toBe(90);
  });

  it("keeps only the range's doses in the totals", () => {
    const s = schedule({ startDate: ago(60) });
    const doses = takenOn(Array.from({ length: 20 }, (_, n) => n));
    expect(complianceReport([s], doses, "7d", TODAY).dosesMissed).toBe(0);
    expect(complianceReport([s], doses, "30d", TODAY).dosesMissed).toBe(10);
    expect(complianceReport([s], doses, "90d", TODAY).dosesMissed).toBe(41);
  });
});

describe("trend insights and recommendations", () => {
  it("compares the two halves of the range", () => {
    const s = schedule({ startDate: ago(6) });
    const better = complianceReport([s], takenOn([0, 1, 2, 3]), "7d", TODAY);
    expect(better.trendInsights[0]).toEqual({
      kind: "improving",
      title: "Improving Trend",
      text: "Your compliance has improved by 100% over the last 7 days.",
    });
    const worse = complianceReport([s], takenOn([6, 5, 4]), "7d", TODAY);
    expect(worse.trendInsights[0]).toMatchObject({
      kind: "declining",
      text: "Your compliance has dropped by 100% over the last 7 days.",
    });
  });

  it("names the best and the weakest time of day", () => {
    const doses = [
      ...takenOn([1, 2, 3, 4]),
      log("lisi", ago(1), "20:00"),
      log("lisi", ago(2), "20:00", "skipped"),
    ];
    const report = complianceReport(
      [schedule({ startDate: ago(4) }), { ...EVENING, startDate: ago(4) }],
      doses,
      "7d",
      TODAY,
    );
    expect(report.trendInsights.filter((i) => i.kind !== "improving")).toEqual([
      {
        kind: "bestTime",
        title: "Best Time",
        text: "You're most consistent with morning doses (100% compliance).",
      },
      {
        kind: "opportunity",
        title: "Opportunity",
        text: "Evening doses are missed more often. Consider setting a reminder.",
      },
    ]);
    expect(report.insights.highRiskTimes).toEqual(["Evening (6-9 PM)"]);
    expect(report.insights.recommendation).toBe(
      "Most of your missed doses are between 6 and 9 PM. Consider setting a reminder or moving these doses to a time that suits your routine.",
    );
    expect(report.insights.mostMissed).toEqual([
      {
        medication: "Lisinopril 10mg",
        text: "3 missed in last 7 days",
        share: 0.75,
      },
    ]);
  });

  it("needs a few doses before it says anything", () => {
    const report = complianceReport(
      [schedule({ startDate: ago(1) })],
      takenOn([1]),
      "7d",
      TODAY,
    );
    expect(report.trendInsights).toEqual([]);
    expect(report.insights.emptyText).toBe(
      "No missed doses in the last 7 days.",
    );
  });
});

describe("time zones", () => {
  const zone = process.env.TZ;
  afterEach(() => {
    process.env.TZ = zone;
  });

  it.each([
    ["Australia/Sydney", 6],
    ["America/Los_Angeles", 5],
    ["UTC", 5],
  ])("counts a late dose by the local day at midnight (%s)", (tz, localDay) => {
    process.env.TZ = tz;
    expect(new Date(Date.UTC(2026, 10, 5, 14)).getDate()).toBe(localDay);
    const late = schedule({
      startDate: "2026-11-01",
      intakes: [{ time: "23:30", quantity: 1, unit: "Tablet" }],
    });
    const beforeMidnight = toIsoDate(new Date(2026, 10, 5, 23, 59));
    const afterMidnight = toIsoDate(new Date(2026, 10, 6, 0, 1));
    expect(beforeMidnight).toBe("2026-11-05");
    expect(afterMidnight).toBe("2026-11-06");

    const doses = ["2026-11-01", "2026-11-02", "2026-11-03", "2026-11-04"].map(
      (date) => log("ator", date, "23:30"),
    );
    const evening = complianceReport([late], doses, "7d", beforeMidnight);
    expect([evening.dosesTaken, evening.dosesMissed]).toEqual([4, 0]);
    const night = complianceReport([late], doses, "7d", afterMidnight);
    expect([night.dosesTaken, night.dosesMissed]).toEqual([4, 1]);
    expect(night.progress[1]).toEqual({ label: "Thu", percent: 0 });
  });

  it("keeps seven days across a daylight-saving change", () => {
    process.env.TZ = "Australia/Sydney";
    const today = toIsoDate(new Date(2026, 9, 6, 9, 0));
    const report = complianceReport(
      [schedule({ startDate: "2026-09-01" })],
      [],
      "7d",
      today,
    );
    expect(report.trend.map((b) => b.label)).toEqual([
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
      "Mon",
      "Tue",
    ]);
    expect(report.dosesMissed).toBe(6);
  });
});

describe("Home's compliance subtitle", () => {
  it("says nothing until a dose counts, then the 7-day rate", () => {
    expect(complianceSubtitle([], [], TODAY)).toBeNull();
    const s = schedule({ startDate: TODAY });
    expect(complianceSubtitle([s], [], TODAY)).toBeNull();
    expect(complianceSubtitle([s], [log("ator", TODAY, "08:00")], TODAY)).toBe(
      "100% in the last 7 days",
    );
    expect(
      complianceSubtitle(
        [schedule({ startDate: ago(20) })],
        takenOn([0, 1, 2]),
        TODAY,
      ),
    ).toBe("43% in the last 7 days");
  });
});

describe("side effects", () => {
  const entry = (patch: Partial<SideEffectEntry>): SideEffectEntry => ({
    id: patch.date ?? "e",
    medication: "Atorvastatin 20mg",
    date: TODAY,
    symptoms: [],
    ...patch,
  });

  it("lists the newest three entries", () => {
    const entries = [
      entry({ id: "a", date: ago(5) }),
      entry({
        id: "b",
        date: ago(1),
        symptoms: [{ symptom: "Nausea", severity: "Severe" }],
        note: "After lunch",
      }),
      entry({ id: "c", date: ago(9) }),
      entry({ id: "d", date: TODAY, medication: "Lisinopril 10mg" }),
    ];
    expect(latestSideEffects(entries)).toEqual([
      {
        date: "Fri, Nov 6",
        medication: "Lisinopril 10mg",
        symptoms: [],
        note: undefined,
      },
      {
        date: "Thu, Nov 5",
        medication: "Atorvastatin 20mg",
        symptoms: [{ symptom: "Nausea", tone: "severe" }],
        note: "After lunch",
      },
      {
        date: "Sun, Nov 1",
        medication: "Atorvastatin 20mg",
        symptoms: [],
        note: undefined,
      },
    ]);
    expect(diaryMedications(entries)).toEqual([
      "Lisinopril 10mg",
      "Atorvastatin 20mg",
    ]);
  });

  it("charts the worst severity of each symptom per point", () => {
    const entries = [
      entry({
        date: ago(1),
        symptoms: [{ symptom: "Headache", severity: "Mild" }],
      }),
      entry({
        id: "x",
        date: ago(1),
        symptoms: [
          { symptom: "Headache", severity: "Severe" },
          { symptom: "Nausea", severity: "Moderate" },
        ],
      }),
      entry({
        date: ago(20),
        symptoms: [{ symptom: "Fatigue", severity: "Mild" }],
      }),
      entry({
        date: ago(1),
        medication: "Lisinopril 10mg",
        symptoms: [{ symptom: "Dizziness", severity: "Mild" }],
      }),
    ];
    const week = severityTrend(entries, "Atorvastatin 20mg", "7d", TODAY);
    expect(week?.labels).toEqual([
      "Oct 31",
      "Nov 1",
      "Nov 2",
      "Nov 3",
      "Nov 4",
      "Nov 5",
      "Nov 6",
    ]);
    expect(week?.series).toEqual([
      { symptom: "Nausea", levels: [0, 0, 0, 0, 0, 2, 0] },
      { symptom: "Headache", levels: [0, 0, 0, 0, 0, 3, 0] },
    ]);

    const fortnight = severityTrend(entries, "Atorvastatin 20mg", "14d", TODAY);
    expect(fortnight?.labels).toHaveLength(7);
    expect(fortnight?.labels[0]).toBe("Oct 24");

    const month = severityTrend(entries, "Atorvastatin 20mg", "30d", TODAY);
    expect(month?.labels).toEqual([
      "Oct 8",
      "Oct 13",
      "Oct 18",
      "Oct 23",
      "Oct 28",
      "Nov 2",
    ]);
    expect(month?.series.map((s) => s.symptom)).toEqual([
      "Nausea",
      "Headache",
      "Fatigue",
    ]);
    expect(month?.series[2].levels).toEqual([0, 1, 0, 0, 0, 0]);
  });

  it("has no trend without a rated side effect in the range", () => {
    const notes = [entry({ note: "Felt tired" })];
    expect(severityTrend(notes, "Atorvastatin 20mg", "7d", TODAY)).toBeNull();
    expect(severityTrend([], "Atorvastatin 20mg", "30d", TODAY)).toBeNull();
  });
});

describe("vitals", () => {
  const reading = (patch: Partial<VitalReading>): VitalReading =>
    ({
      id: `${patch.type}-${patch.date}-${patch.time}`,
      date: TODAY,
      time: "08:00",
      type: "heartRate",
      value: 70,
      ...patch,
    }) as VitalReading;

  it("rates readings against the usual adult ranges", () => {
    expect(vitalStatus("bloodPressure", 128, 82)).toEqual({
      label: "Normal",
      normal: true,
    });
    expect(vitalStatus("bloodPressure", 141, 80)?.label).toBe("High");
    expect(vitalStatus("bloodPressure", 120, 90)?.label).toBe("High");
    expect(vitalStatus("bloodPressure", 88, 58)?.label).toBe("Low");
    expect(vitalStatus("heartRate", 72)?.label).toBe("Healthy");
    expect(vitalStatus("heartRate", 101)?.label).toBe("High");
    expect(vitalStatus("heartRate", 59)?.label).toBe("Low");
    expect(vitalStatus("bloodSugar", 98)?.label).toBe("Normal");
    expect(vitalStatus("bloodSugar", 180)?.label).toBe("High");
    expect(vitalStatus("weight", 78)).toBeNull();
  });

  it("shows the newest reading of each vital", () => {
    const readings = [
      reading({ type: "heartRate", value: 64, date: ago(1), time: "09:00" }),
      reading({ type: "heartRate", value: 110, date: TODAY, time: "07:00" }),
      reading({
        type: "bloodPressure",
        systolic: 118,
        diastolic: 76,
        date: TODAY,
        time: "08:00",
        medication: "Atorvastatin 20mg",
      }),
      reading({ type: "weight", value: 71.5, date: ago(3) }),
      reading({ type: "bloodSugar", value: 90, date: ago(2) }),
      reading({ type: "bloodSugar", value: 99, date: addDays(TODAY, 1) }),
    ];
    expect(latestVitals(readings, TODAY)).toEqual([
      {
        kind: "bloodPressure",
        when: "Today",
        title: "Blood Pressure",
        reading: "118/76 mmHg • Normal",
        normal: true,
        after: "After Atorvastatin 20mg",
      },
      {
        kind: "heartRate",
        when: "Today",
        title: "Heart Rate",
        reading: "110 bpm • High",
        normal: false,
        after: "",
      },
      {
        kind: "bloodSugar",
        when: "Nov 4",
        title: "Blood Sugar",
        reading: "90 mg/dL • Normal",
        normal: true,
        after: "",
      },
    ]);
    expect(latestVitals([reading({ date: ago(1) })], TODAY)[0].when).toBe(
      "Yesterday",
    );
    expect(latestVitals([], TODAY)).toEqual([]);
  });

  it("averages each vital over the period", () => {
    const today = new Date(2026, 10, 6, 12, 0);
    const readings = [
      reading({ type: "bloodPressure", systolic: 120, diastolic: 80 }),
      reading({
        type: "bloodPressure",
        systolic: 131,
        diastolic: 85,
        date: ago(2),
      }),
      reading({ type: "weight", value: 70.25, date: ago(1) }),
      reading({ type: "weight", value: 71, date: ago(2) }),
      reading({ type: "heartRate", value: 120, date: ago(20) }),
    ];
    const week = vitalAverages(readings, "week", today);
    expect(week.bloodPressure).toEqual({
      value: "126/83",
      status: "Normal",
      normal: true,
    });
    expect(week.weight).toEqual({ value: "70.6 kg", status: "", normal: true });
    expect(week.heartRate).toEqual({ value: "—", status: "", normal: true });
    expect(week.bloodSugar.value).toBe("—");
    const month = vitalAverages(readings, "month", today);
    expect(month.heartRate).toEqual({
      value: "120 bpm",
      status: "High",
      normal: false,
    });
  });
});
