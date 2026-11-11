import { NextResponse } from "next/server";
import { z } from "zod";

import { changeEmail, sendVerificationEmail } from "@/lib/api/op/identity";
import { invalidRequest } from "@/lib/api/op/respond";
import { writeSession } from "@/lib/auth/session";

import { withSession } from "@/features/account/server/with-session";

const bodySchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(256),
});

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return invalidRequest(body.error);
  const { email, password } = body.data;
  return withSession(async (session) => {
    const { name, surname } = session.profile;
    if (email.toLowerCase() === session.profile.email.toLowerCase()) {
      return NextResponse.json(
        { error: "This is already your email address." },
        { status: 400 },
      );
    }
    const tokens = await changeEmail(
      { current_email: session.profile.email, new_email: email, password },
      session,
      session.deviceId,
    );
    await writeSession({
      uid: tokens.uid,
      idToken: tokens.idToken,
      refreshToken: tokens.refreshToken,
      email_verified: false,
      email,
      name,
      surname,
    });
    await sendVerificationEmail(email).catch((error) => {
      console.error("Could not send the verification email", error);
    });
    return NextResponse.json({
      user: { id: tokens.uid, email, name: `${name} ${surname}`.trim() },
    });
  });
}
