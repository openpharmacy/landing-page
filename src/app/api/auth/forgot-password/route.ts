import { NextResponse } from "next/server";
import { z } from "zod";

import { sendPasswordResetEmail } from "@/lib/api/op/identity";
import { apiErrorResponse, invalidRequest } from "@/lib/api/op/respond";

const bodySchema = z.object({ email: z.string().trim().email() });

export async function POST(request: Request) {
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return invalidRequest(body.error);

  try {
    await sendPasswordResetEmail(body.data.email);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
