import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { ApiError } from "@/lib/api/errors";
import { getEscripts, scriptsToday, type Escripts } from "@/lib/api/op/scripts";
import { isSessionGone } from "@/lib/api/op/respond";

import { readArchived } from "../server/archive";
import { toScript } from "./from-api";
import type { Script } from "./script";

export type UserScripts = {
  data: Escripts;
  ownName: string;
  scripts: Script[];
  archived: string[];
};

export const loadScripts = cache(async (): Promise<UserScripts | null> => {
  const data = await getEscripts();
  if (!data) return null;
  const ownName = `${data.name} ${data.surname}`.trim();
  const context = {
    today: scriptsToday(),
    ownName,
  };
  const scripts = data.scripts.map((script) => toScript(script, context));
  const ids = new Set(scripts.map((script) => script.id));
  const archived = (await readArchived(data.uid)).filter((id) => ids.has(id));
  return { data, ownName, scripts, archived };
});

export function reauthPath(next: string) {
  return `/api/auth/expired?next=${encodeURIComponent(next)}`;
}

export function loadErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
    return error.message;
  }
  return "The service is not available right now. Please try again.";
}

export type ScriptsResult =
  | { scripts: UserScripts | null; error: null }
  | { scripts: null; error: string };

export async function scriptsForPage(next: string): Promise<ScriptsResult> {
  let failure: unknown;
  try {
    return { scripts: await loadScripts(), error: null };
  } catch (error) {
    failure = error;
  }
  if (isSessionGone(failure)) redirect(reauthPath(next));
  console.error("Loading the scripts failed", failure);
  return { scripts: null, error: loadErrorMessage(failure) };
}
