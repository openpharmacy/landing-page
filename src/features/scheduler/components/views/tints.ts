import type { MedicationColour } from "../../model/schedule";

export const TINT: Record<MedicationColour, string> = {
  "#6366F1": "border-[#6366F1]/20 bg-[#6366F1]/[0.125]",
  "#10B981": "border-[#10B981]/40 bg-[#10B981]/[0.125]",
  "#F59E0B": "border-[#F59E0B]/20 bg-[#F59E0B]/[0.125]",
  "#EF4444": "border-[#EF4444]/20 bg-[#EF4444]/15",
  "#06B6D4": "border-[#06B6D4]/20 bg-[#06B6D4]/[0.125]",
  "#84CC16": "border-[#84CC16]/20 bg-[#84CC16]/[0.125]",
  "#F97316": "border-[#F97316]/20 bg-[#F97316]/[0.125]",
  "#EC4899": "border-[#EC4899]/20 bg-[#EC4899]/[0.125]",
};

export const BAR: Record<MedicationColour, string> = {
  "#6366F1": "bg-[#6366F1]",
  "#10B981": "bg-[#10B981]",
  "#F59E0B": "bg-[#F59E0B]",
  "#EF4444": "bg-[#EF4444]",
  "#06B6D4": "bg-[#06B6D4]",
  "#84CC16": "bg-[#84CC16]",
  "#F97316": "bg-[#F97316]",
  "#EC4899": "bg-[#EC4899]",
};

export const SOLID = BAR;

export const DARK_INK = new Set<MedicationColour>(["#EF4444"]);

export const TAKEN = "border-[#21B23F]/50 bg-[#21B23F]/10";

export const TAKEN_BAR = "bg-[#21B23F]";
