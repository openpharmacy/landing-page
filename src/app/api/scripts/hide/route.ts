import { z } from "zod";

import { scriptIdSchema } from "@/features/scripts/model/validation";
import { ApiError } from "@/lib/api/errors";
import { setScriptHidden } from "@/lib/api/op/scripts";

import { findScript, scriptsRoute } from "../handler";

const bodySchema = z.object({ id: scriptIdSchema, hidden: z.boolean() });

export function POST(request: Request) {
  return scriptsRoute(request, bodySchema, async (session, { id, hidden }) => {
    const script = await findScript(session, id);
    if (!script.hide_body) {
      throw new ApiError({
        message: "Only scripts from your Active Script List can be hidden.",
        status: 400,
        code: "not_hideable",
      });
    }
    await setScriptHidden(
      session,
      { ...script, hide_body: script.hide_body },
      hidden,
    );
  });
}
