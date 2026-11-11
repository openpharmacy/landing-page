import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DeactivateAccount } from "@/features/account/components/close-account";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = {
  title: "Deactivate Account · Open Pharmacy",
};

export default async function DeactivateAccountPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/settings/deactivate");
  return <DeactivateAccount />;
}
