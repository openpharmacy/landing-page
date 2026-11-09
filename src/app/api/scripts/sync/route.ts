import { cookies } from "next/headers";
import { z } from "zod";

import { isMockingEnabled } from "@/config/env";
import { isSessionGone } from "@/lib/api/op/respond";
import {
  fetchEscripts,
  pullAslScripts,
  refreshScripts,
  type Escripts,
} from "@/lib/api/op/scripts";
import { cookieOptions, type Session } from "@/lib/auth/session";

import { scriptsRoute } from "../handler";

export const maxDuration = 60;

const SYNC_COOKIE = "op_sync";
const WINDOW_S = 10 * 60;

const bodySchema = z.strictObject({}).nullable();

async function syncedRecently(uid: string) {
  const [owner, startedAt] = (
    (await cookies()).get(SYNC_COOKIE)?.value ?? ""
  ).split(":");
  const age = Date.now() - Number(startedAt);
  return owner === uid && age >= 0 && age < WINDOW_S * 1000;
}

async function attempt<T>(
  step: string,
  call: () => Promise<T>,
): Promise<{ value: T } | null> {
  try {
    return { value: await call() };
  } catch (error) {
    if (isSessionGone(error)) throw error;
    console.error(`Script sync: ${step} failed`, error);
    return null;
  }
}

const fingerprint = ({ scripts, patient_id }: Escripts) =>
  JSON.stringify([
    patient_id,
    scripts.map((s) => JSON.stringify(s)).sort((a, b) => a.localeCompare(b)),
  ]);

async function sync(session: Session): Promise<boolean> {
  const before = await attempt("loading the scripts", () =>
    fetchEscripts(session),
  );
  if (!before) return false;

  const { scripts, patient_id } = before.value;
  if (!patient_id && scripts.length === 0) return false;
  const pulled =
    !!patient_id &&
    !!(await attempt("the ASL pull", () => pullAslScripts(session)));
  const refreshed = !!(await attempt("the refresh", () =>
    refreshScripts(session),
  ));
  if (!pulled && !refreshed) return false;

  const after = await attempt("reloading the scripts", () =>
    fetchEscripts(session),
  );
  return !!after && fingerprint(after.value) !== fingerprint(before.value);
}

const running = new Map<string, Promise<boolean>>();

function sharedSync(session: Session) {
  const key = `${session.uid}:${session.deviceId}`;
  let run = running.get(key);
  if (!run) {
    run = sync(session).finally(() => running.delete(key));
    running.set(key, run);
  }
  return run;
}

export function POST(request: Request) {
  return scriptsRoute(request, bodySchema, async (session) => {
    if (isMockingEnabled || (await syncedRecently(session.uid))) {
      return { updated: false };
    }
    (await cookies()).set(
      SYNC_COOKIE,
      `${session.uid}:${Date.now()}`,
      cookieOptions(WINDOW_S),
    );
    return { updated: await sharedSync(session) };
  });
}
