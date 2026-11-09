import { NextResponse } from "next/server";
import { z } from "zod";

import { sendVerificationEmail, signup } from "@/lib/api/op/identity";
import { apiErrorResponse, invalidRequest } from "@/lib/api/op/respond";
import { getDeviceId, writeSession } from "@/lib/auth/session";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
  passwordConfirmation: z.string().min(1),
  name: z.string().trim().min(1),
  surname: z.string().trim().min(1),
});

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return invalidRequest(body.error);
  const { email, password, passwordConfirmation, name, surname } = body.data;

  try {
    const auth = await signup(
      {
        name,
        surname,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
      await getDeviceId(),
    );
    await writeSession(auth, { remember: true });
    await sendVerificationEmail(email).catch((error) => {
      console.error("Could not send the verification email", error);
    });
    return NextResponse.json(
      {
        user: {
          id: auth.uid,
          email: auth.email,
          name: `${auth.name} ${auth.surname}`.trim(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return apiErrorResponse(error, (e) =>
      /already exists/i.test(e.message)
        ? 409
        : e.status === 422
          ? 400
          : e.status,
    );
  }
}
