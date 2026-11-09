import { NextResponse, type NextRequest } from "next/server";

import { safeNextPath } from "@/features/auth/model/next-path";
import { clearSession } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const next = safeNextPath(request.nextUrl.searchParams.get("next")) ?? "/";
  if (fromThisSite(request)) await clearSession();
  const signIn = new URL("/sign-in", request.url);
  signIn.searchParams.set("next", next);
  return NextResponse.redirect(signIn);
}

function fromThisSite(request: NextRequest) {
  const site = request.headers.get("sec-fetch-site");
  if (site !== null) return site === "same-origin" || site === "none";
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    return new URL(referer).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}
