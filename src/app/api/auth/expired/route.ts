import type { NextRequest } from "next/server";

import { safeNextPath } from "@/features/auth/model/next-path";
import { clearSession } from "@/lib/auth/session";
import { redirectTo, siteHost } from "@/lib/redirect";

export async function GET(request: NextRequest) {
  const next = safeNextPath(request.nextUrl.searchParams.get("next")) ?? "/";
  if (fromThisSite(request)) await clearSession();
  return redirectTo(`/sign-in?${new URLSearchParams({ next })}`);
}

function fromThisSite(request: NextRequest) {
  const site = request.headers.get("sec-fetch-site");
  if (site !== null) return site === "same-origin" || site === "none";
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    return new URL(referer).host === siteHost(request);
  } catch {
    return false;
  }
}
