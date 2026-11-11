import "server-only";

import { isMockingEnabled } from "@/config/env";
import { ApiError } from "@/lib/api/errors";

import { opRequest } from "./client";

const DEFAULT_VERSION = "1.1.0";
const ANSWER_MS = 10 * 60_000;
const FAILURE_MS = 60_000;

export type VersionStatus = { version: string; outdated: boolean };

export function appVersion(): string {
  return process.env.OP_APP_VERSION?.trim() || DEFAULT_VERSION;
}

let cached: { version: string; outdated: boolean; until: number } | null = null;
let pending: Promise<boolean> | null = null;

async function ask(version: string): Promise<boolean> {
  let outdated = false;
  let keepMs = ANSWER_MS;
  try {
    await opRequest(
      `/user/v1/version/verification?version=${encodeURIComponent(version)}`,
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 426) {
      outdated = true;
    } else {
      console.error("Version check failed", error);
      keepMs = FAILURE_MS;
    }
  }
  cached = { version, outdated, until: Date.now() + keepMs };
  return outdated;
}

export async function checkAppVersion(): Promise<VersionStatus> {
  const version = appVersion();
  if (isMockingEnabled) return { version, outdated: false };
  if (cached && cached.version === version && cached.until > Date.now()) {
    return { version, outdated: cached.outdated };
  }
  pending ??= ask(version).finally(() => {
    pending = null;
  });
  return { version, outdated: await pending };
}
