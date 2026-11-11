import { z } from "zod";

import { scriptIdSchema } from "@/features/scripts/model/validation";
import { readArchived, writeArchived } from "@/features/scripts/server/archive";
import { deleteScript } from "@/lib/api/op/scripts";

import { findScript, scriptsRoute } from "../handler";

const bodySchema = z.object({ id: scriptIdSchema });

export function POST(request: Request) {
  return scriptsRoute(request, bodySchema, async (session, { id }) => {
    const script = await findScript(session, id);
    await deleteScript(session, script.prescription_dspid);
    const archived = await readArchived(session.uid);
    if (archived.includes(id)) {
      await writeArchived(
        session.uid,
        archived.filter((other) => other !== id),
      );
    }
  });
}
