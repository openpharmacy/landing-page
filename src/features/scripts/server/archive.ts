import "server-only";

import { cookies } from "next/headers";

import { cookieOptions } from "@/lib/auth/session";

import { scriptIdSchema } from "../model/validation";

export const ARCHIVED_COOKIE = "op_archived";

const MAX_AGE = 60 * 60 * 24 * 400;

export async function readArchived(uid: string): Promise<string[]> {
  const raw = (await cookies()).get(ARCHIVED_COOKIE)?.value ?? "";
  const split = raw.indexOf(":");
  if (split < 0 || raw.slice(0, split) !== uid) return [];
  return raw
    .slice(split + 1)
    .split(".")
    .filter((id) => scriptIdSchema.safeParse(id).success);
}

export async function writeArchived(uid: string, ids: string[]) {
  const store = await cookies();
  if (ids.length === 0) {
    store.delete(ARCHIVED_COOKIE);
    return;
  }
  const value = `${uid}:${ids.join(".")}`;
  store.set(ARCHIVED_COOKIE, value, cookieOptions(MAX_AGE));
}
