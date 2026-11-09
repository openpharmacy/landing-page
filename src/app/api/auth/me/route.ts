import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { email, name, surname } = session.profile;
  return NextResponse.json({
    user: { id: session.uid, email, name: `${name} ${surname}`.trim() },
  });
}
