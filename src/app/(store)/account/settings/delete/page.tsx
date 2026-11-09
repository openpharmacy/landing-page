import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DeleteAccount } from "@/features/account/components/close-account";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Delete Account · Open Pharmacy" };

export default async function DeleteAccountPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/settings/delete");
  return <DeleteAccount />;
}
