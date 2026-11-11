import { NextResponse } from "next/server";

import { signout } from "@/lib/api/op/identity";
import { clearSession, getSession } from "@/lib/auth/session";

export async function POST() {
  const session = await getSession();
  if (session) {
    await signout(session, session.deviceId).catch(() => {});
  }
  await clearSession();
  return new NextResponse(null, { status: 204 });
}
