import "server-only";

import { avatarClass, nameInitials } from "@/features/scripts/model/from-api";
import { scriptsForPage } from "@/features/scripts/model/load";
import {
  isTokenOnly,
  sortScripts,
  type MedicationScript,
  type Script,
} from "@/features/scripts/model/script";

export type Refill = {
  id: string;
  name: string;
  form: string;
  synced: boolean;
  expiry?: { left: string; date: string; soon?: boolean };
  patient: string;
  patientInitials: string;
  patientClass: string;
};

export type HomeData = {
  added: number;
  expiringSoon: number;
  refills: Refill[];
};

const isActive = (s: Script): s is MedicationScript =>
  !isTokenOnly(s) && s.status === "active";

export function homeData(scripts: Script[]): HomeData {
  const active = scripts.filter(isActive);
  return {
    added: scripts.length,
    expiringSoon: active.filter((s) => s.expiry?.soon).length,
    refills: sortScripts(active, "expiry").map((s) => ({
      id: s.id,
      name: s.name,
      form: s.form,
      synced: s.secure,
      expiry: s.expiry,
      patient: s.patient,
      patientInitials: nameInitials(s.patient),
      patientClass: avatarClass(s.patient),
    })),
  };
}

export async function homeForPage(path: string) {
  const { scripts, error } = await scriptsForPage(path);
  return {
    home: scripts ? homeData(scripts.scripts) : null,
    error,
  };
}
