import { NextResponse } from "next/server";
import { z } from "zod";

import { verifyEmail } from "@/lib/api/op/identity";
import { apiErrorResponse, invalidRequest } from "@/lib/api/op/respond";
import { getSession, writeProfile } from "@/lib/auth/session";

const bodySchema = z.object({ code: z.string().regex(/^\d{4}$/) });

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated", signIn: true },
      { status: 401 },
    );
  }
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return invalidRequest(body.error);

  try {
    await verifyEmail(session.profile.email, body.data.code);
    await writeProfile({ ...session.profile, emailVerified: true });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
