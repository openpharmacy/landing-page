import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ConnectAslFlow } from "@/features/scripts/components/connect-asl-flow";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Connect ASL · Open Pharmacy" };

export default async function ConnectAslPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/scripts/connect-asl");

  return <ConnectAslFlow />;
}
