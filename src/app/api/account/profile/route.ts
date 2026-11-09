import { NextResponse } from "next/server";
import { z } from "zod";

import { changeUserDetails } from "@/lib/api/op/identity";
import { writeProfile } from "@/lib/auth/session";

import { withSession } from "@/features/account/server/with-session";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(255),
  surname: z.string().trim().min(1).max(255),
});

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  return withSession(async (session) => {
    await changeUserDetails(body.data, session, session.deviceId);
    const profile = { ...session.profile, ...body.data };
    await writeProfile(profile);
    return NextResponse.json({
      user: {
        id: session.uid,
        email: profile.email,
        name: `${profile.name} ${profile.surname}`.trim(),
      },
    });
  });
}
