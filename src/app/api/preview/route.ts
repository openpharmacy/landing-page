import { NextResponse, type NextRequest } from "next/server";

import { HIDDEN_SCREENS_COOKIE } from "@/lib/features";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));
  if (request.nextUrl.searchParams.get("hidden") === "1") {
    response.cookies.set(HIDDEN_SCREENS_COOKIE, "1", {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
  } else {
    response.cookies.delete(HIDDEN_SCREENS_COOKIE);
  }
  return response;
}
