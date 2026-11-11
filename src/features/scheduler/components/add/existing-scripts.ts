import {
  isTokenOnly,
  type MedicationScript,
  type Script,
} from "@/features/scripts/model/script";

export type PickableScript = { id: string; name: string; form: string };

export function pickableScripts(scripts: Script[]): PickableScript[] {
  return scripts
    .filter(
      (s): s is MedicationScript => !isTokenOnly(s) && s.status === "active",
    )
    .map((s) => ({ id: s.id, name: s.name, form: s.form }));
}
