import type { SideEffectEntry } from "./side-effects";

export const MOCK_SIDE_EFFECTS: SideEffectEntry[] = [
  {
    id: "se-panadol-0908",
    medication: "Panadol 500mg",
    date: "2024-09-08",
    symptoms: [
      { symptom: "Nausea", severity: "Moderate" },
      { symptom: "Headache", severity: "Moderate" },
    ],
    note: "Felt worse in the morning",
  },
  {
    id: "se-amlodipine-0906",
    medication: "Amlodipine",
    date: "2024-09-06",
    symptoms: [{ symptom: "Dizziness", severity: "Mild" }],
    note: "Felt worse in the morning",
  },
  {
    id: "se-metformin-0908",
    medication: "Metformin",
    date: "2024-09-08",
    symptoms: [
      { symptom: "Nausea", severity: "Moderate" },
      { symptom: "Fatigue", severity: "Moderate" },
    ],
  },
];
