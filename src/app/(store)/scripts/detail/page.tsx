import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ScriptDetail } from "@/features/scripts/components/script-detail";
import { toScriptDetails } from "@/features/scripts/model/from-api";
import { scriptsForPage } from "@/features/scripts/model/load";
import { qrCode } from "@/features/scripts/model/qr";
import { isTokenOnly } from "@/features/scripts/model/script";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Script · Open Pharmacy" };

export default async function ScriptDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id = "" } = await searchParams;
  const path = `/scripts/detail?id=${encodeURIComponent(id)}`;
  const user = await getServerSession();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(path)}`);

  const { scripts, error } = await scriptsForPage(path);
  if (error !== null) {
    return (
      <p
        role="alert"
        className="mx-auto w-full max-w-[902px] px-4 pt-6 text-caption-12 text-error-500 lg:pl-[23px]"
      >
        {error}
      </p>
    );
  }
  const index = scripts?.scripts.findIndex((s) => s.id === id) ?? -1;
  if (!scripts || index < 0) notFound();

  const script = scripts.scripts[index];
  const archived = scripts.archived.includes(script.id);
  if (isTokenOnly(script)) {
    return <ScriptDetail script={script} archived={archived} />;
  }
  const api = scripts.data.scripts[index];
  return (
    <ScriptDetail
      script={script}
      archived={archived}
      details={toScriptDetails(api)}
      qr={qrCode(api.prescription_dspid)}
    />
  );
}
