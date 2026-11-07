import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountHome } from "@/features/account/components/account-home";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Account · Open Pharmacy" };

export default async function AccountPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account");
  return <AccountHome user={user} />;
}
