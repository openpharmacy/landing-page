import { NextResponse } from "next/server";

import { checkAppVersion } from "@/lib/api/op/version";

export async function GET() {
  return NextResponse.json(await checkAppVersion(), {
    headers: { "Cache-Control": "no-store" },
  });
}
