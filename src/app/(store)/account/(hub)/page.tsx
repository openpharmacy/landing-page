import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountHome } from "@/features/account/components/account-home";
import { verifyEmailBanner } from "@/features/account/server/email-banner";
import { scriptsForPage } from "@/features/scripts/model/load";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Account · Open Pharmacy" };

export default async function AccountPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account");
  const [{ scripts }, banner] = await Promise.all([
    scriptsForPage("/account"),
    verifyEmailBanner("/account"),
  ]);
  const activeScripts =
    scripts?.scripts.filter((s) => s.status === "active").length ?? null;
  return (
    <AccountHome user={user} activeScripts={activeScripts} banner={banner} />
  );
}
