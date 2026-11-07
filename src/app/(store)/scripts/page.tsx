import type { Metadata } from "next";

import { GuestScriptsFlow } from "@/features/scripts/components/guest-scripts-flow";
import { MyScripts } from "@/features/scripts/components/my-scripts";
import {
  getAslConnected,
  getScriptsAdded,
  getServerSession,
} from "@/lib/auth/get-session";

export const metadata: Metadata = {
  title: "Scripts · Open Pharmacy",
  description: "Unlock prescription medications with your eScript token.",
};

export default async function ScriptsPage() {
  const user = await getServerSession();

  // Logged in: My Scripts (synced view once ASL is connected). Logged out: the
  // guest eScript-token flow.
  if (user) {
    const [connected, added] = await Promise.all([
      getAslConnected(),
      getScriptsAdded(),
    ]);
    return <MyScripts connected={connected} added={added} />;
  }

  return <GuestScriptsFlow />;
}
