import "server-only";

import { scriptId } from "@/lib/api/op/script-id";
import type { ApiScript } from "@/lib/api/op/scripts";

export { scriptId };

import {
  parseStatus,
  statusText,
  type Script,
  type ScriptDetails,
  type ScriptGroup,
} from "./script";

const DASH = "—";

export function isoDate(value: string | null | undefined): string | null {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value ?? "");
  return match ? `${match[3]}-${match[2]}-${match[1]}` : null;
}

const utc = (iso: string) => new Date(`${iso}T00:00:00Z`);

function addMonths(iso: string, months: number): string {
  const date = utc(iso);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return date.toISOString().slice(0, 10);
}

export function expiryDate(script: ApiScript): string | null {
  const explicit = isoDate(script.medication_expiration_date);
  if (explicit) return explicit;
  const issued = isoDate(script.authored_on);
  if (!issued || script.schedule_number == null) return null;
  return addMonths(issued, script.schedule_number === "8" ? 6 : 12);
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export function countdown(expiresOn: string, today: string) {
  const days = Math.round(
    (utc(expiresOn).getTime() - utc(today).getTime()) / 86_400_000,
  );
  if (days < 0) return undefined;
  const soon = days <= 30;
  const left = soon
    ? plural(days, "day")
    : plural(Math.round(days / 30.44), "month");
  const sameYear = expiresOn.slice(0, 4) === today.slice(0, 4);
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
    timeZone: "UTC",
  }).format(utc(expiresOn));
  return { left: `${left} left`, date: `Expires ${date}`, soon };
}

const FORMS: Record<string, string> = {
  TAB: "tablet",
  CAP: "capsule",
  INJ: "injection",
  SUSP: "suspension",
  SOLN: "solution",
  LIQ: "liquid",
  OINT: "ointment",
  CREAM: "cream",
  GEL: "gel",
  "EYE GEL": "eye gel",
  "EYE DROPS": "eye drops",
  "EAR DROPS": "ear drops",
  DROPS: "drops",
  SPRAY: "spray",
  "NASAL SPRAY": "nasal spray",
  INHAL: "inhaler",
  PATCH: "patch",
  SUPP: "suppository",
  LOZ: "lozenge",
  PESS: "pessary",
  POWDER: "powder",
  SACHET: "sachet",
};
const COUNTED = new Set([
  "tablet",
  "capsule",
  "patch",
  "suppository",
  "lozenge",
  "pessary",
  "sachet",
]);

export function formLabel(code: string | null): string {
  if (!code) return "";
  const key = code.trim().toUpperCase();
  return FORMS[key] ?? key.toLowerCase();
}

const capitalise = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export function displayName(raw: string): string {
  const name = raw.trim();
  if (name !== name.toUpperCase() || !/[A-Z]/.test(name)) return name;
  return name
    .toLowerCase()
    .replace(
      /(^|[\s'-])(\p{L})/gu,
      (_, sep: string, ch: string) => `${sep}${ch.toUpperCase()}`,
    );
}

export function patientName(script: ApiScript, ownName: string): string {
  const raw = script.patient_name_year?.replace(/\s*\(\d{4}\)\s*$/, "") ?? "";
  return raw.trim() ? displayName(raw) : ownName;
}

const INDEFINITE = -10;

function repeatsLeft(remaining: number | null): string {
  if (remaining == null) return "";
  if (remaining === INDEFINITE) return "indefinite repeats";
  return `${plural(Math.max(remaining - 1, 0), "repeat")} left`;
}

export type MappingContext = {
  today: string;
  ownName: string;
};

export function toScript(api: ApiScript, ctx: MappingContext): Script {
  const id = scriptId(api.prescription_dspid);
  const status = parseStatus(api.prescription_status);
  const base = {
    id,
    token: api.prescription_dspid,
    status,
    ...(status === "other" && {
      statusText: statusText(api.prescription_status),
    }),
    secure: api.entry_method === "mysl",
    addedOn: isoDate(api.medication_added_on) ?? "",
    hidden: api.is_hidden === true,
    canHide: api.hide_body != null,
    canDelete: api.entry_method !== "mysl",
    patient: patientName(api, ctx.ownName),
  };

  const name = api.medication_name || api.medication_display_name;
  if (!name) return { ...base, kind: "token" };

  const form = [api.medication_strength, formLabel(api.medication_form)]
    .filter(Boolean)
    .join(" ");
  const expiresOn = expiryDate(api) ?? undefined;
  return {
    ...base,
    kind: "medication",
    name,
    form,
    detail: [form, repeatsLeft(api.supplies_remaining)]
      .filter(Boolean)
      .join(" • "),
    tags: [],
    expiresOn,
    expiry:
      expiresOn && base.status === "active"
        ? countdown(expiresOn, ctx.today)
        : undefined,
  };
}

function suppliesLeft(remaining: number | null): string {
  if (remaining == null) return DASH;
  if (remaining === INDEFINITE) return "Indefinite";
  return `${remaining} ${remaining === 1 ? "supply" : "supplies"}`;
}

function quantity(raw: string | null, form: string): string {
  const value = Number.parseFloat(raw ?? "");
  if (!Number.isFinite(value)) return DASH;
  return COUNTED.has(form) ? plural(value, form) : String(value);
}

export function toScriptDetails(api: ApiScript): ScriptDetails {
  const form = formLabel(api.medication_form);
  const prescriber = [api.practitioner_first_name, api.practitioner_last_name]
    .filter(Boolean)
    .join(" ");
  return {
    form: form ? capitalise(form) : "Medication",
    suppliesLeft: suppliesLeft(api.supplies_remaining),
    quantity: quantity(api.prescribed_quantity, form),
    strength: api.medication_strength ?? DASH,
    route: api.administration_route ?? DASH,
    prescriber: prescriber ? displayName(prescriber) : DASH,
    clinic: api.clinic_name,
    issueDate: isoDate(api.authored_on) ?? DASH,
    expiryDate: expiryDate(api) ?? DASH,
    doctorNotes: api.patient_instructions,
    personalNotes: api.notes,
  };
}

const AVATARS = ["bg-primary-500", "bg-[#ff8c42]", "bg-[#9b59b6]"];

export function avatarClass(name: string): string {
  const sum = [...name].reduce((total, ch) => total + ch.charCodeAt(0), 0);
  return AVATARS[sum % AVATARS.length];
}

export function nameInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

export function groupScripts(
  scripts: Script[],
  ownName: string,
): ScriptGroup[] {
  const groups = new Map<string, ScriptGroup>();
  const own = ownName.toLowerCase();
  const order = [...scripts].sort(
    (a, b) =>
      Number(b.patient.toLowerCase() === own) -
      Number(a.patient.toLowerCase() === own),
  );
  for (const script of order) {
    const key = script.patient.toLowerCase();
    const group = groups.get(key) ?? {
      name: script.patient,
      initials: nameInitials(script.patient),
      avatarClass: avatarClass(script.patient),
      scripts: [],
    };
    group.scripts.push(script);
    groups.set(key, group);
  }
  return [...groups.values()];
}
