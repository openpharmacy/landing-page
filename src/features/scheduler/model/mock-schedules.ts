import type { Dose, Schedule } from "./schedule";

export const MOCK_SCHEDULES: Schedule[] = [
  {
    id: "cardioactive",
    name: "CardioActive 20ml",
    colour: "#F59E0B",
    frequency: { kind: "daily" },
    intakes: [{ time: "12:00", quantity: 20, unit: "Liquid" }],
    remindMinutesBefore: 10,
    startDate: "2025-09-01",
  },
  {
    id: "garsil",
    name: "Garsil 35mg",
    colour: "#6366F1",
    frequency: { kind: "daily" },
    intakes: [
      { time: "07:00", quantity: 2, unit: "Tablet" },
      { time: "12:00", quantity: 2, unit: "Tablet" },
    ],
    remindMinutesBefore: 10,
    startDate: "2025-09-01",
  },
  {
    id: "roaccutane",
    name: "Roaccutane 30mg",
    colour: "#10B981",
    frequency: { kind: "daily" },
    intakes: [{ time: "10:00", quantity: 1, unit: "Capsule" }],
    remindMinutesBefore: 30,
    startDate: "2025-09-01",
  },
  {
    id: "panadol",
    name: "Panadol 500mg",
    form: "500mg tablet",
    colour: "#EF4444",
    frequency: { kind: "daily" },
    intakes: [
      { time: "19:00", quantity: 1, unit: "Tablet" },
      { time: "07:00", quantity: 1, unit: "Tablet" },
    ],
    remindMinutesBefore: 10,
    note: "Take with food to reduce stomach upset.",
    startDate: "2025-10-12",
  },
];

export const MOCK_DOSES: Dose[] = [
  { scheduleId: "garsil", date: "2025-10-12", time: "07:00", status: "taken" },
];
