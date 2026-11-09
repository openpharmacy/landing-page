export const MEDICATION_COLOURS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#EC4899",
] as const;
export type MedicationColour = (typeof MEDICATION_COLOURS)[number];

export const DOSE_UNITS = [
  "Tablet",
  "Capsule",
  "Liquid",
  "Spray",
  "Ointment",
  "Gel",
  "Injection",
  "Powder",
] as const;
export type DoseUnit = (typeof DOSE_UNITS)[number];

export type Frequency =
  | { kind: "daily" }
  | { kind: "weekdays"; days: number[] }
  | { kind: "everyDays"; every: number }
  | { kind: "everyWeeks"; every: number };

export type Intake = {
  time: string;
  quantity: number;
  unit: DoseUnit;
};

export type Schedule = {
  id: string;
  name: string;
  form?: string;
  scriptId?: string;
  colour: MedicationColour;
  frequency: Frequency;
  intakes: Intake[];
  remindMinutesBefore: number | null;
  cycle?: { takeWeeks: number; skipWeeks: number };
  note?: string;
  startDate: string;
};

export type DoseStatus = "taken" | "skipped";

export type Dose = {
  scheduleId: string;
  date: string;
  time: string;
  status: DoseStatus;
};
