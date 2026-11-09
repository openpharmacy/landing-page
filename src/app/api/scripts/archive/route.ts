import { z } from "zod";

import { scriptId } from "@/features/scripts/model/from-api";
import { scriptIdSchema } from "@/features/scripts/model/validation";
import { readArchived, writeArchived } from "@/features/scripts/server/archive";
import { ApiError } from "@/lib/api/errors";
import { fetchEscripts } from "@/lib/api/op/scripts";

import { scriptsRoute } from "../handler";

const bodySchema = z.object({ id: scriptIdSchema, archived: z.boolean() });

export function POST(request: Request) {
  return scriptsRoute(
    request,
    bodySchema,
    async (session, { id, archived }) => {
      const { scripts } = await fetchEscripts(session);
      const ids = new Set(scripts.map((s) => scriptId(s.prescription_dspid)));
      if (!ids.has(id)) {
        throw new ApiError({
          message: "Script not found",
          status: 404,
          code: "not_found",
        });
      }
      const kept = (await readArchived(session.uid)).filter(
        (other) => other !== id && ids.has(other),
      );
      await writeArchived(session.uid, archived ? [...kept, id] : kept);
    },
  );
}
