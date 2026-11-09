import { z } from "zod";

import { scriptTokenSchema } from "@/features/scripts/model/validation";
import { addScriptByToken } from "@/lib/api/op/scripts";

import { scriptsRoute } from "../handler";

const bodySchema = z.object({ token: scriptTokenSchema });

export function POST(request: Request) {
  return scriptsRoute(request, bodySchema, async (session, { token }) => {
    await addScriptByToken(session, token);
  });
}
