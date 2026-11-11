import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { SideEffectDiary } from "@/features/compliance/components/reports/side-effect-diary";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = {
  title: "Side-Effect Diary · Open Pharmacy",
};

export default async function SideEffectDiaryPage() {
  if (!(await showHiddenScreens())) notFound();
  if (!(await getServerSession())) {
    redirect(`/sign-in?next=${encodeURIComponent("/compliance/side-effects")}`);
  }
  return <SideEffectDiary />;
}
