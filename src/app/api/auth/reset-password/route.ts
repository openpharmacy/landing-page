import { NextResponse } from "next/server";
import { z } from "zod";

import { ApiError } from "@/lib/api/errors";
import { resetPassword } from "@/lib/api/op/identity";
import { apiErrorResponse, invalidRequest } from "@/lib/api/op/respond";
import { clearSession, getSession } from "@/lib/auth/session";

const bodySchema = z.object({
  email: z.string().trim().email(),
  code: z.string().regex(/^\d{4}$/),
  password: z.string().min(1),
  passwordConfirmation: z.string().min(1),
});

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return invalidRequest(body.error);
  const { email, code, password, passwordConfirmation } = body.data;

  try {
    await resetPassword({
      email,
      verification_code: code,
      password,
      password_confirmation: passwordConfirmation,
    });
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 400 &&
      /verification code/i.test(error.message)
    ) {
      return NextResponse.json(
        { error: error.message, field: "code" },
        { status: 400 },
      );
    }
    return apiErrorResponse(error, (e) => (e.status === 422 ? 400 : e.status));
  }

  const session = await getSession();
  if (session && session.profile.email.toLowerCase() === email.toLowerCase()) {
    await clearSession();
  }
  return new NextResponse(null, { status: 204 });
}
