export type KnownStatus =
  | "active"
  | "expired"
  | "dispensed"
  | "deferred"
  | "disabled"
  | "ceased"
  | "cancelled";

export type ScriptStatus = KnownStatus | "other";

type ScriptBase = {
  id: string;
  token: string;
  status: ScriptStatus;
  statusText?: string;
  secure: boolean;
  addedOn: string;
  hidden: boolean;
  canHide: boolean;
  canDelete: boolean;
  patient: string;
};

export type MedicationScript = ScriptBase & {
  kind: "medication";
  name: string;
  form: string;
  detail: string;
  tags: string[];
  expiry?: { left: string; date: string; soon?: boolean };
  expiresOn?: string;
};

export type TokenOnlyScript = ScriptBase & { kind: "token" };

export type Script = MedicationScript | TokenOnlyScript;

export type ScriptDetails = {
  form: string;
  suppliesLeft: string;
  quantity: string;
  strength: string;
  route: string;
  prescriber: string;
  clinic: string | null;
  issueDate: string;
  expiryDate: string;
  doctorNotes: string | null;
  personalNotes: string | null;
};

export type ScriptGroup = {
  name: string;
  initials: string;
  avatarClass: string;
  scripts: Script[];
};

export function isTokenOnly(script: Script): script is TokenOnlyScript {
  return script.kind === "token";
}

export const scheduleHref = (id: string) => `/scheduler/add?script=${id}`;

export function scriptTitle(script: Script): string {
  return isTokenOnly(script) ? script.token : script.name;
}

export const STATUS_LABEL: Record<KnownStatus, string> = {
  active: "Active",
  dispensed: "Dispensed",
  deferred: "Deferred",
  expired: "Expired",
  disabled: "Disabled",
  ceased: "Ceased",
  cancelled: "Cancelled",
};

const STATUS_ORDER = Object.keys(STATUS_LABEL) as KnownStatus[];

export function parseStatus(value: string | null | undefined): ScriptStatus {
  const status = value?.trim().toLowerCase();
  return STATUS_ORDER.find((known) => known === status) ?? "other";
}

export function statusText(value: string | null | undefined): string {
  const words = (value ?? "")
    .trim()
    .replace(/[\s_-]+/g, " ")
    .toLowerCase();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "Unknown";
}

export function statusLabel(script: Script): string {
  return script.status === "other"
    ? (script.statusText ?? "Unknown")
    : STATUS_LABEL[script.status];
}

const statusRank = (status: ScriptStatus) =>
  status === "other" ? STATUS_ORDER.length : STATUS_ORDER.indexOf(status);

export type SortKey = "expiry" | "added" | "name" | "status";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "expiry", label: "Expiry Date" },
  { key: "added", label: "Recently Added" },
  { key: "name", label: "Name (A–Z)" },
  { key: "status", label: "Status" },
];

export const DEFAULT_SORT: SortKey = "expiry";

function expiryRank(script: Script): [number, string] {
  if (isTokenOnly(script)) return [3, ""];
  if (script.status === "expired") return [2, ""];
  return script.expiresOn ? [0, script.expiresOn] : [1, ""];
}

const COMPARE: Record<SortKey, (a: Script, b: Script) => number> = {
  expiry: (a, b) => {
    const [ra, da] = expiryRank(a);
    const [rb, db] = expiryRank(b);
    return ra - rb || da.localeCompare(db);
  },
  added: (a, b) => b.addedOn.localeCompare(a.addedOn),
  name: (a, b) => scriptTitle(a).localeCompare(scriptTitle(b), "en"),
  status: (a, b) => statusRank(a.status) - statusRank(b.status),
};

export function sortScripts<T extends Script>(scripts: T[], key: SortKey): T[] {
  return [...scripts].sort(COMPARE[key]);
}

export function formatAddedDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
