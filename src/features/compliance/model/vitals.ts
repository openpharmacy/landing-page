export const VITAL_TYPES = [
  "bloodPressure",
  "heartRate",
  "bloodSugar",
  "weight",
] as const;
export type VitalType = (typeof VITAL_TYPES)[number];

export const VITAL_LABELS: Record<VitalType, string> = {
  bloodPressure: "Blood Pressure",
  heartRate: "Heart Rate",
  bloodSugar: "Blood Sugar",
  weight: "Weight",
};

export const VITAL_UNITS: Record<VitalType, string> = {
  bloodPressure: "mmHg",
  heartRate: "bpm",
  bloodSugar: "mg/dL",
  weight: "kg",
};

type ReadingBase = {
  id: string;
  date: string;
  time: string;
  scheduleId?: string;
  medication?: string;
};

export type VitalReading =
  | (ReadingBase & {
      type: "bloodPressure";
      systolic: number;
      diastolic: number;
    })
  | (ReadingBase & {
      type: "heartRate" | "bloodSugar" | "weight";
      value: number;
    });

export function formatReading(reading: VitalReading) {
  const value =
    reading.type === "bloodPressure"
      ? `${reading.systolic}/${reading.diastolic}`
      : String(reading.value);
  return `${value} ${VITAL_UNITS[reading.type]}`;
}

export const VITAL_PERIODS = ["week", "month", "year"] as const;
export type VitalPeriod = (typeof VITAL_PERIODS)[number];

export const VITAL_PERIOD_LABELS: Record<VitalPeriod, string> = {
  week: "Week",
  month: "Month",
  year: "Year",
};

const PERIOD_DAYS: Record<VitalPeriod, number> = {
  week: 7,
  month: 30,
  year: 365,
};

const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export function readingsInPeriod(
  readings: VitalReading[],
  period: VitalPeriod,
  today: Date,
) {
  const start = new Date(today);
  start.setDate(start.getDate() - (PERIOD_DAYS[period] - 1));
  const from = isoDate(start);
  const to = isoDate(today);
  return readings
    .filter((reading) => reading.date >= from && reading.date <= to)
    .sort((a, b) =>
      a.date === b.date
        ? b.time.localeCompare(a.time)
        : b.date < a.date
          ? -1
          : 1,
    );
}

export { isoDate };
