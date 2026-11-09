import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { verifyEmailBanner } from "@/features/account/server/email-banner";
import { LoggedInHome } from "@/features/home/components/logged-in-home";
import { homeForPage } from "@/features/home/model/home-data";
import { ScriptsSync } from "@/features/scripts/components/scripts-sync";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Home · Open Pharmacy" };

export default async function HomePage() {
  const user = await getServerSession();
  if (!user) redirect("/");

  const [{ home, error }, banner] = await Promise.all([
    homeForPage("/home"),
    verifyEmailBanner("/home"),
  ]);
  return (
    <>
      <ScriptsSync />
      <LoggedInHome user={user} home={home} error={error} banner={banner} />
    </>
  );
}
