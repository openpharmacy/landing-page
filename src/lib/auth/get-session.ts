import { cookies } from "next/headers";

import {
  ASL_CONNECTED_COOKIE,
  MOCK_SESSION_COOKIE,
  SCRIPTS_ADDED_COOKIE,
  type SessionUser,
} from "./mock-session";

/** Read the mock session from the cookie (server components / layouts). */
export async function getServerSession(): Promise<SessionUser | null> {
  const raw = (await cookies()).get(MOCK_SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as SessionUser;
  } catch {
    return null;
  }
}

/** Whether the mock ASL has been connected (drives the synced My Scripts view). */
export async function getAslConnected(): Promise<boolean> {
  return (await cookies()).get(ASL_CONNECTED_COOKIE)?.value === "1";
}

/** Whether the user has added a script (otherwise My Scripts shows the chooser). */
export async function getScriptsAdded(): Promise<boolean> {
  return (await cookies()).get(SCRIPTS_ADDED_COOKIE)?.value === "1";
}
