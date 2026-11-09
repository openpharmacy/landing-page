import { isoDate, type VitalPeriod, type VitalReading } from "./vitals";

export function sampleReadings(today: Date): VitalReading[] {
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return [today, yesterday].flatMap((day): VitalReading[] => {
    const date = isoDate(day);
    const base = { date, time: "08:30", medication: "Amlodipine 5mg" };
    return [
      {
        ...base,
        id: `vital-bp-${date}`,
        type: "bloodPressure",
        systolic: 128,
        diastolic: 82,
      },
      { ...base, id: `vital-hr-${date}`, type: "heartRate", value: 72 },
    ];
  });
}

export function isSampleReading(reading: VitalReading) {
  const [y, m, d] = reading.date.split("-").map(Number);
  const json = JSON.stringify(reading);
  return sampleReadings(new Date(y, m - 1, d)).some(
    (sample) => JSON.stringify(sample) === json,
  );
}

export type VitalAverage = { value: string; status: string };

export const SAMPLE_AVERAGES: Record<
  VitalPeriod,
  Record<"bloodPressure" | "heartRate" | "bloodSugar" | "weight", VitalAverage>
> = {
  week: {
    bloodPressure: { value: "128/82", status: "Normal" },
    heartRate: { value: "72 bpm", status: "Healthy" },
    bloodSugar: { value: "98 mg/dL", status: "Normal" },
    weight: { value: "78 kg", status: "Normal" },
  },
  month: {
    bloodPressure: { value: "126/81", status: "Normal" },
    heartRate: { value: "74 bpm", status: "Healthy" },
    bloodSugar: { value: "101 mg/dL", status: "Normal" },
    weight: { value: "78 kg", status: "Normal" },
  },
  year: {
    bloodPressure: { value: "129/83", status: "Normal" },
    heartRate: { value: "73 bpm", status: "Healthy" },
    bloodSugar: { value: "103 mg/dL", status: "Normal" },
    weight: { value: "79 kg", status: "Normal" },
  },
};
