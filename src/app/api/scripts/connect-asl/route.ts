import { aslSetupSchema, dobForAsl } from "@/features/scripts/model/validation";
import { isSessionGone } from "@/lib/api/op/respond";
import {
  connectPatient,
  fetchEscripts,
  pullAslScripts,
} from "@/lib/api/op/scripts";

import { scriptsRoute } from "../handler";

export function POST(request: Request) {
  return scriptsRoute(request, aslSetupSchema, async (session, input) => {
    await connectPatient(session, {
      p_firstname: input.firstName,
      p_lastname: input.lastName,
      p_dob: dobForAsl(input.dob),
      p_actcode: input.activationCode,
    });
    try {
      await pullAslScripts(session);
    } catch (error) {
      if (isSessionGone(error)) throw error;
      console.error("ASL pull failed", error);
    }
    const { scripts } = await fetchEscripts(session);
    const activeScripts = scripts.filter(
      (s) => s.entry_method === "mysl" && s.prescription_status === "active",
    ).length;
    return { activeScripts };
  });
}
