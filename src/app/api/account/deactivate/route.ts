import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/errors";
import { deactivateAccount } from "@/lib/api/op/identity";
import { clearSession, forgetLastUser } from "@/lib/auth/session";

import { withSession } from "@/features/account/server/with-session";

export async function POST() {
  return withSession(async (session) => {
    try {
      await deactivateAccount(session, session.deviceId);
    } catch (error) {
      if (!isSignOutBug(error)) throw error;
    }
    await clearSession();
    await forgetLastUser();
    return new NextResponse(null, { status: 204 });
  });
}

function isSignOutBug(error: unknown) {
  return (
    error instanceof ApiError &&
    error.status === 403 &&
    error.message === "Could not sign out"
  );
}
