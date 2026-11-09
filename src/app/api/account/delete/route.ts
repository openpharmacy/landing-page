import { NextResponse } from "next/server";

import { deleteAccount } from "@/lib/api/op/identity";
import { clearSession, forgetLastUser } from "@/lib/auth/session";

import { withSession } from "@/features/account/server/with-session";

export async function POST() {
  return withSession(async (session) => {
    await deleteAccount(session, session.deviceId);
    await clearSession();
    await forgetLastUser();
    return new NextResponse(null, { status: 204 });
  });
}
