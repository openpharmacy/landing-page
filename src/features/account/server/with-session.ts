import "server-only";

import { NextResponse } from "next/server";

import { apiErrorResponse, isSessionGone } from "@/lib/api/op/respond";
import { clearSession, getSession, type Session } from "@/lib/auth/session";

export async function withSession(
  run: (session: Session) => Promise<Response>,
): Promise<Response> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated", signIn: true },
      { status: 401 },
    );
  }
  try {
    return await run(session);
  } catch (error) {
    if (isSessionGone(error)) {
      await clearSession();
      return NextResponse.json(
        {
          error: "Your session has ended. Please sign in again.",
          signIn: true,
        },
        { status: 401 },
      );
    }
    return apiErrorResponse(error);
  }
}
