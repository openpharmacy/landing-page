export const SYMPTOMS = [
  "Nausea",
  "Headache",
  "Dizziness",
  "Fatigue",
  "Stomach Pain",
  "Skin Rash",
  "Dry Mouth",
  "Insomnia",
  "Drowsiness",
  "Anxiety",
] as const;
export type Symptom = (typeof SYMPTOMS)[number];

export const SEVERITIES = ["Mild", "Moderate", "Severe"] as const;
export type Severity = (typeof SEVERITIES)[number];

export type SideEffectEntry = {
  id: string;
  scheduleId?: string;
  medication: string;
  date: string;
  symptoms: { symptom: Symptom; severity: Severity }[];
  note?: string;
};
