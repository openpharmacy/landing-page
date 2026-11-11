import { NextResponse } from "next/server";
import { z } from "zod";

import { ApiError } from "@/lib/api/errors";
import { signin } from "@/lib/api/op/identity";
import {
  apiErrorResponse,
  invalidRequest,
  isInvalidCredentials,
} from "@/lib/api/op/respond";
import { getDeviceId, writeSession } from "@/lib/auth/session";

const bodySchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return invalidRequest(body.error);
  const { email, password, remember = true } = body.data;

  try {
    const auth = await signin({ email, password }, await getDeviceId());
    await writeSession(auth, { remember });
    return NextResponse.json({ user: toUser(auth) });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return apiErrorResponse(new Error(error.message));
    }
    return apiErrorResponse(error, (e) =>
      isInvalidCredentials(e)
        ? 401
        : /disabled/i.test(e.message)
          ? 403
          : e.status,
    );
  }
}

function toUser(auth: {
  uid: string;
  email: string;
  name: string;
  surname: string;
}) {
  return {
    id: auth.uid,
    email: auth.email,
    name: `${auth.name} ${auth.surname}`.trim(),
  };
}
