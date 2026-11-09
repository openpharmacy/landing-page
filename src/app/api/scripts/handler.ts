import "server-only";

import { NextResponse } from "next/server";
import type { z } from "zod";

import { scriptId } from "@/features/scripts/model/from-api";
import { ApiError } from "@/lib/api/errors";
import {
  apiErrorResponse,
  isMyslRejection,
  isSessionGone,
} from "@/lib/api/op/respond";
import { fetchEscripts, type ApiScript } from "@/lib/api/op/scripts";
import { clearSession, getSession, type Session } from "@/lib/auth/session";

async function respondError(error: unknown) {
  if (isSessionGone(error)) {
    await clearSession();
    return NextResponse.json(
      { error: "Your session has ended. Please sign in again.", signIn: true },
      { status: 401 },
    );
  }
  return apiErrorResponse(error, (e) => (isMyslRejection(e) ? 502 : e.status));
}

export async function scriptsRoute<T>(
  request: Request,
  schema: z.ZodType<T>,
  run: (session: Session, input: T) => Promise<unknown>,
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Please sign in again.", signIn: true },
      { status: 401 },
    );
  }
  const input = schema.safeParse(await request.json().catch(() => null));
  if (!input.success) {
    return NextResponse.json(
      { error: input.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }
  try {
    return NextResponse.json((await run(session, input.data)) ?? { ok: true });
  } catch (error) {
    return respondError(error);
  }
}

export async function findScript(
  session: Session,
  id: string,
): Promise<ApiScript> {
  const { scripts } = await fetchEscripts(session);
  const script = scripts.find((s) => scriptId(s.prescription_dspid) === id);
  if (!script) {
    throw new ApiError({
      message: "Script not found",
      status: 404,
      code: "not_found",
    });
  }
  return script;
}
