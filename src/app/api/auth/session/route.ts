import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "op_session";
const DEFAULT_MAX_AGE = 60 * 60 * 24; // 24h (matches backend JWT TTL)

/** Set the httpOnly session cookie after the client signs in. */
export async function POST(request: Request) {
  const body = (await request.json()) as {
    access_token?: unknown;
    expires_in?: unknown;
  };

  if (typeof body.access_token !== "string") {
    return NextResponse.json(
      { error: "Missing access_token" },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, body.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge:
      typeof body.expires_in === "number" ? body.expires_in : DEFAULT_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}

/** Clear the session cookie on sign-out. */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
