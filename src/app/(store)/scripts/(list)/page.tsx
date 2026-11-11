import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { MyScripts } from "@/features/scripts/components/my-scripts";
import { ScriptsSync } from "@/features/scripts/components/scripts-sync";
import { groupScripts } from "@/features/scripts/model/from-api";
import { scriptsForPage } from "@/features/scripts/model/load";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Scripts · Open Pharmacy" };

export default async function ScriptsPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/scripts");

  const { scripts, error } = await scriptsForPage("/scripts");
  const empty = scripts !== null && scripts.scripts.length === 0;
  return (
    <>
      <ScriptsSync />
      <MyScripts
        groups={scripts ? groupScripts(scripts.scripts, scripts.ownName) : []}
        archived={scripts?.archived}
        synced={Boolean(scripts?.data.patient_id)}
        error={error}
      />
      {empty && (
        <div className="lg:hidden">
          <Footer />
        </div>
      )}
    </>
  );
}
