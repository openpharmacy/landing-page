export const CHANNELS = ["email", "push", "sms"] as const;
export const TOPICS = [
  "orders",
  "reminders",
  "promotions",
  "tips",
  "security",
] as const;

export type Channel = (typeof CHANNELS)[number];
export type Topic = (typeof TOPICS)[number];
export type Prefs = Record<Topic, Record<Channel, boolean>>;

export const DEFAULT_PREFS: Prefs = Object.fromEntries(
  TOPICS.map((topic) => [topic, { email: true, push: true, sms: false }]),
) as Prefs;

export function parsePrefs(raw: string | null): Prefs {
  let saved: unknown = null;
  try {
    saved = raw ? JSON.parse(raw) : null;
  } catch {
    saved = null;
  }
  const prefs = structuredClone(DEFAULT_PREFS);
  if (!saved || typeof saved !== "object") return prefs;
  for (const topic of TOPICS) {
    const row = (saved as Record<string, unknown>)[topic];
    if (!row || typeof row !== "object") continue;
    for (const channel of CHANNELS) {
      const value = (row as Record<string, unknown>)[channel];
      if (typeof value === "boolean") prefs[topic][channel] = value;
    }
  }
  return prefs;
}

export function togglePref(prefs: Prefs, topic: Topic, channel: Channel) {
  return {
    ...prefs,
    [topic]: { ...prefs[topic], [channel]: !prefs[topic][channel] },
  };
}

const entries = new Map<string, { raw: string | null; prefs: Prefs }>();
const listeners = new Set<() => void>();

function storedRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function readPrefs(key: string): Prefs {
  const raw = storedRaw(key);
  const entry = entries.get(key);
  if (entry && entry.raw === raw) return entry.prefs;
  const prefs = parsePrefs(raw);
  entries.set(key, { raw, prefs });
  return prefs;
}

export function savePrefs(key: string, prefs: Prefs) {
  const raw = JSON.stringify(prefs);
  let saved = true;
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    saved = false;
  }
  entries.set(key, { raw: saved ? raw : storedRaw(key), prefs });
  for (const listener of listeners) listener();
}

export function subscribePrefs(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}
