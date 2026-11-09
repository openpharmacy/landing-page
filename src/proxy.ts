import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isMockingEnabled } from "@/config/env";
import { jwtExpiry } from "@/lib/api/op/client";
import { refreshToken } from "@/lib/api/op/identity";
import {
  cookieOptions,
  DEVICE_COOKIE,
  DEVICE_MAX_AGE,
  REFRESH_COOKIE,
  REMEMBER_COOKIE,
  SESSION_COOKIE,
  SESSION_COOKIES,
  sessionMaxAge,
  UID_COOKIE,
} from "@/lib/auth/session";
import { HIDDEN_SCREENS_COOKIE } from "@/lib/features";

const REFRESH_MARGIN_MS = 2 * 60_000;

export async function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/api/") &&
    !["GET", "HEAD", "OPTIONS"].includes(request.method) &&
    isCrossSite(request)
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const set: [string, string, number | undefined][] = [];
  const remove: string[] = [];

  if (!request.cookies.has(DEVICE_COOKIE)) {
    set.push([DEVICE_COOKIE, crypto.randomUUID(), DEVICE_MAX_AGE]);
  }

  const idToken = request.cookies.get(SESSION_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  const uid = request.cookies.get(UID_COOKIE)?.value;
  if (
    !isMockingEnabled &&
    idToken &&
    jwtExpiry(idToken) - Date.now() < REFRESH_MARGIN_MS
  ) {
    const deviceId =
      request.cookies.get(DEVICE_COOKIE)?.value ?? set[0]?.[1] ?? "";
    if (refresh && uid) {
      try {
        const renewed = await refreshToken(refresh, uid, deviceId);
        const maxAge = sessionMaxAge(
          request.cookies.get(REMEMBER_COOKIE)?.value,
        );
        set.push([SESSION_COOKIE, renewed.idToken, maxAge]);
        set.push([REFRESH_COOKIE, renewed.refreshToken, maxAge]);
      } catch (error) {
        if (isHttpError(error)) remove.push(...SESSION_COOKIES);
      }
    } else {
      remove.push(...SESSION_COOKIES);
    }
  }

  for (const [name, value] of set) request.cookies.set(name, value);
  for (const name of remove) request.cookies.delete(name);

  const signedIn = request.cookies.has(SESSION_COOKIE);
  const response =
    !signedIn && needsSignIn(request)
      ? redirectToSignIn(request)
      : NextResponse.next({ request });

  for (const [name, value, maxAge] of set) {
    response.cookies.set(name, value, cookieOptions(maxAge));
  }
  for (const name of remove) response.cookies.delete(name);
  return response;
}

function isCrossSite(request: NextRequest) {
  const site = request.headers.get("sec-fetch-site");
  if (site) return site !== "same-origin" && site !== "none";
  const origin = request.headers.get("origin");
  return origin !== null && origin !== request.nextUrl.origin;
}

const within = (pathname: string, section: string) =>
  pathname === section || pathname.startsWith(`${section}/`);

function needsSignIn(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (within(pathname, "/account") || within(pathname, "/scripts")) {
    return true;
  }
  const hiddenShown =
    request.cookies.get(HIDDEN_SCREENS_COOKIE)?.value === "1" ||
    process.env.HIDDEN_SCREENS === "enabled";
  return (
    hiddenShown &&
    (within(pathname, "/scheduler") || within(pathname, "/compliance"))
  );
}

function redirectToSignIn(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/sign-in";
  url.search = "";
  url.searchParams.set(
    "next",
    request.nextUrl.pathname + request.nextUrl.search,
  );
  return NextResponse.redirect(url);
}

function isHttpError(error: unknown) {
  return (
    !!error &&
    typeof error === "object" &&
    "status" in error &&
    typeof error.status === "number" &&
    error.status >= 400 &&
    error.status < 500
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|images/|mockServiceWorker.js).*)",
  ],
};
