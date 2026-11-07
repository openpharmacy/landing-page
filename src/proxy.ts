import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 renamed `middleware` -> `proxy` (Node.js runtime).
// Optimistic auth guard for the account routes only — cart + checkout are open
// to guests. It only checks for the presence of the session cookie. While the
// backend is mocked, that is the mock-session cookie (`op_mock_session`); swap
// this to the real httpOnly `op_session` once live auth is wired. No secret here.

const SESSION_COOKIE = "op_mock_session";

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  if (hasSession) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/sign-in";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/account/:path*"],
};
