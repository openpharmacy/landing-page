import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

import { thirdPartyLogin } from "@/lib/api/op/identity";
import { apiErrorResponse, invalidRequest } from "@/lib/api/op/respond";
import { getDeviceId, writeSession } from "@/lib/auth/session";

const bodySchema = z.object({
  id_token: z.string().min(1).max(10_000),
  nonce: z.string().min(1).max(512).optional(),
  name: z.string().trim().min(1).max(255).optional(),
  surname: z.string().trim().min(1).max(255).optional(),
});

export function thirdPartySignIn(provider: "google" | "apple") {
  return async function POST(request: Request) {
    const body = bodySchema.safeParse(await request.json().catch(() => null));
    if (!body.success) return invalidRequest(body.error);

    try {
      const auth = await thirdPartyLogin(
        { provider, ...body.data },
        await getDeviceId(),
      );
      await writeSession(auth, { remember: true });
      return NextResponse.json({
        user: {
          id: auth.uid,
          email: auth.email,
          name: `${auth.name ?? ""} ${auth.surname ?? ""}`.trim(),
        },
        isNewUser: auth.is_new_user === true,
      });
    } catch (error) {
      return apiErrorResponse(error, (e) =>
        /disabled/i.test(e.message) ? 403 : e.status === 400 ? 401 : e.status,
      );
    }
  };
}
