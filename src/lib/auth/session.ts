import "server-only";

import { cookies } from "next/headers";

import { isMockingEnabled } from "@/config/env";
import type { AuthResponse } from "@/lib/api/op/identity";
import { DEMO_EMAIL } from "@/lib/api/op/mock-identity";

export const SESSION_COOKIE = "op_session";
export const REFRESH_COOKIE = "op_refresh";
export const UID_COOKIE = "op_uid";
export const USER_COOKIE = "op_user";
export const DEVICE_COOKIE = "op_device";
export const MYSL_COOKIE = "op_mysl";
export const SYNC_COOKIE = "op_sync";
export const REMEMBER_COOKIE = "op_remember";
export const LAST_USER_COOKIE = "op_last_user";

export const SESSION_COOKIES = [
  SESSION_COOKIE,
  REFRESH_COOKIE,
  UID_COOKIE,
  USER_COOKIE,
  MYSL_COOKIE,
  SYNC_COOKIE,
  REMEMBER_COOKIE,
];

export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
export const DEVICE_MAX_AGE = 60 * 60 * 24 * 400;

export type SessionProfile = {
  email: string;
  name: string;
  surname: string;
  emailVerified?: boolean;
};

export type Session = {
  uid: string;
  idToken: string;
  deviceId: string;
  profile: SessionProfile;
};

export type LastUser = { name: string; email: string };

export const cookieOptions = (maxAge?: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

export function sessionMaxAge(remember: string | undefined) {
  return remember === "0" ? undefined : SESSION_MAX_AGE;
}

const DEMO_PROFILE: SessionProfile = {
  email: DEMO_EMAIL,
  name: "John",
  surname: "Smith",
  emailVerified: true,
};

function readProfile(raw: string | undefined): SessionProfile | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<SessionProfile>;
    if (typeof value.email !== "string") return null;
    return {
      email: value.email,
      name: value.name ?? "",
      surname: value.surname ?? "",
      emailVerified: value.emailVerified !== false,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const idToken = store.get(SESSION_COOKIE)?.value;
  if (!idToken) return null;
  const deviceId = store.get(DEVICE_COOKIE)?.value ?? "";

  if (isMockingEnabled && idToken === "demo") {
    return {
      uid: "demo",
      idToken,
      deviceId,
      profile: readProfile(store.get(USER_COOKIE)?.value) ?? DEMO_PROFILE,
    };
  }

  const uid = store.get(UID_COOKIE)?.value;
  const profile = readProfile(store.get(USER_COOKIE)?.value);
  if (!uid || !profile) return null;
  return { uid, idToken, deviceId, profile };
}

export async function getDeviceId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(DEVICE_COOKIE)?.value;
  if (existing) return existing;
  const id = crypto.randomUUID();
  store.set(DEVICE_COOKIE, id, cookieOptions(DEVICE_MAX_AGE));
  return id;
}

export async function writeSession(
  auth: AuthResponse,
  { remember }: { remember?: boolean } = {},
): Promise<void> {
  const store = await cookies();
  const flag =
    remember === undefined
      ? store.get(REMEMBER_COOKIE)?.value
      : remember
        ? "1"
        : "0";
  const options = cookieOptions(sessionMaxAge(flag));
  store.set(REMEMBER_COOKIE, flag === "0" ? "0" : "1", options);
  store.set(SESSION_COOKIE, auth.idToken, options);
  store.set(REFRESH_COOKIE, auth.refreshToken, options);
  store.set(UID_COOKIE, auth.uid, options);
  await writeProfile({
    email: auth.email,
    name: auth.name,
    surname: auth.surname,
    emailVerified: auth.email_verified !== false,
  });
}

export async function writeProfile(profile: SessionProfile): Promise<void> {
  const store = await cookies();
  const remember = store.get(REMEMBER_COOKIE)?.value;
  store.set(
    USER_COOKIE,
    JSON.stringify(profile),
    cookieOptions(sessionMaxAge(remember)),
  );
  const lastUser: LastUser = {
    name: `${profile.name} ${profile.surname}`.trim(),
    email: profile.email,
  };
  store.set(
    LAST_USER_COOKIE,
    JSON.stringify(lastUser),
    cookieOptions(remember === "0" ? undefined : DEVICE_MAX_AGE),
  );
}

export async function getLastUser(): Promise<LastUser | null> {
  const raw = (await cookies()).get(LAST_USER_COOKIE)?.value;
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<LastUser>;
    if (typeof value.email !== "string" || !value.email) return null;
    return {
      email: value.email,
      name: typeof value.name === "string" ? value.name : "",
    };
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  for (const name of SESSION_COOKIES) store.delete(name);
}

export async function forgetLastUser(): Promise<void> {
  (await cookies()).delete(LAST_USER_COOKIE);
}
