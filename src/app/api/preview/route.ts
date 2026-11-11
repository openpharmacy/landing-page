import type { NextRequest } from "next/server";

import { HIDDEN_SCREENS_COOKIE } from "@/lib/features";
import { redirectTo } from "@/lib/redirect";

export function GET(request: NextRequest) {
  const response = redirectTo("/");
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
