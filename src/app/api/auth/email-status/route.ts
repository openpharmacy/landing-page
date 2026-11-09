import { NextResponse } from "next/server";

import { checkEmailVerification } from "@/lib/api/op/identity";
import { writeProfile } from "@/lib/auth/session";

import { withSession } from "@/features/account/server/with-session";

export async function GET() {
  return withSession(async (session) => {
    const { email_verified } = await checkEmailVerification(
      session,
      session.deviceId,
    );
    const emailVerified = email_verified === true;
    if (emailVerified !== (session.profile.emailVerified !== false)) {
      await writeProfile({ ...session.profile, emailVerified });
    }
    return NextResponse.json({ emailVerified });
  });
}
