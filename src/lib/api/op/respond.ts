import "server-only";

import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/errors";

export function apiErrorResponse(
  error: unknown,
  statusFor?: (e: ApiError) => number,
) {
  if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
    return NextResponse.json(
      { error: error.message },
      { status: statusFor?.(error) ?? error.status },
    );
  }
  console.error("API call failed", error);
  return NextResponse.json(
    { error: "The service is not available right now. Please try again." },
    { status: 502 },
  );
}

export function invalidRequest(error: { issues: { path: PropertyKey[] }[] }) {
  const email = error.issues.some((issue) => issue.path[0] === "email");
  return NextResponse.json(
    { error: email ? "Enter a valid email" : "Invalid request" },
    { status: 400 },
  );
}

export function isInvalidCredentials(error: unknown) {
  return (
    error instanceof ApiError &&
    error.status === 400 &&
    /invalid credentials/i.test(error.message)
  );
}

export function isSessionGone(error: unknown) {
  if (!(error instanceof ApiError)) return false;
  if (error.status === 406) return true;
  if (error.status === 400) return /invalid id token/i.test(error.message);
  if (error.status === 403) return /revoked/i.test(error.message);
  if (error.status !== 401) return false;
  return (
    !isMyslRejection(error) &&
    error.message !== "Could not validate credentials"
  );
}

export function isMyslRejection(error: unknown) {
  if (!(error instanceof ApiError) || error.status !== 401) return false;
  const text = `${error.message} ${JSON.stringify(error.detail ?? "")}`;
  return /unauthori[sz]ed access|OperationOutcome/i.test(text);
}
