import { z } from "zod";

import { NOTES_MAX, scriptIdSchema } from "@/features/scripts/model/validation";
import { updateScriptNote } from "@/lib/api/op/scripts";

import { findScript, scriptsRoute } from "../handler";

const bodySchema = z.object({
  id: scriptIdSchema,
  notes: z
    .string()
    .trim()
    .max(NOTES_MAX, `Notes can be up to ${NOTES_MAX} characters`),
});

export function POST(request: Request) {
  return scriptsRoute(request, bodySchema, async (session, { id, notes }) => {
    const script = await findScript(session, id);
    await updateScriptNote(session, script.prescription_dspid, notes);
  });
}
