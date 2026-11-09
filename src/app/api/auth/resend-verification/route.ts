import { NextResponse } from "next/server";

import { sendVerificationEmail } from "@/lib/api/op/identity";
import { apiErrorResponse } from "@/lib/api/op/respond";
import { getSession } from "@/lib/auth/session";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated", signIn: true },
      { status: 401 },
    );
  }

  try {
    await sendVerificationEmail(session.profile.email);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
