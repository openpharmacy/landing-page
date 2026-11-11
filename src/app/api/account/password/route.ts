import { NextResponse } from "next/server";
import { z } from "zod";

import { changePassword } from "@/lib/api/op/identity";
import { writeSession } from "@/lib/auth/session";

import { withSession } from "@/features/account/server/with-session";

const password = z.string().min(1).max(256);
const bodySchema = z.object({
  currentPassword: password,
  newPassword: password,
  newPasswordConfirmation: password,
});

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { currentPassword, newPassword, newPasswordConfirmation } = body.data;
  return withSession(async (session) => {
    const tokens = await changePassword(
      {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      },
      session,
      session.deviceId,
    );
    await writeSession({
      ...session.profile,
      uid: tokens.uid,
      idToken: tokens.idToken,
      refreshToken: tokens.refreshToken,
      email_verified: tokens.email_verified,
    });
    return new NextResponse(null, { status: 204 });
  });
}
