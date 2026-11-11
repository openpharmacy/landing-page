import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { AchievementsList } from "@/features/compliance/components/reports/achievements";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Achievements · Open Pharmacy" };

export default async function AchievementsPage() {
  if (!(await showHiddenScreens())) notFound();
  if (!(await getServerSession())) {
    redirect(`/sign-in?next=${encodeURIComponent("/compliance/achievements")}`);
  }
  return <AchievementsList />;
}
