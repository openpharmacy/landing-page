import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ScriptDetail } from "@/features/scripts/components/script-detail";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Script · Open Pharmacy" };

export default async function ScriptDetailPage({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    status?: string;
    variant?: string;
    tags?: string;
    hidden?: string;
  }>;
}) {
  const user = await getServerSession();
  if (!user) redirect("/sign-in");

  const sp = await searchParams;
  return (
    <ScriptDetail
      name={sp.name ?? "Script"}
      status={sp.status === "expired" ? "expired" : "active"}
      variant={sp.variant === "paper" ? "paper" : "asl"}
      tags={sp.tags ? sp.tags.split(",").filter(Boolean) : []}
      hidden={sp.hidden === "1"}
    />
  );
}
