import { NextResponse, type NextRequest } from "next/server";

export function redirectTo(path: string) {
  return new NextResponse(null, { status: 307, headers: { Location: path } });
}

export function siteHost(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-host")?.split(",")[0].trim() ||
    request.headers.get("host") ||
    request.nextUrl.host
  );
}
