import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { DoseReminder } from "@/features/compliance/components/log/dose-reminder";
import { HomeBackdrop } from "@/features/compliance/components/log/home-backdrop";
import {
  parseDoseRef,
  signInHref,
  type SearchParams,
} from "@/features/compliance/components/log/route-params";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = {
  title: "Time for your medication · Open Pharmacy",
};

export default async function DoseReminderPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const params = await searchParams;
  const user = await getServerSession();
  if (!user) redirect(signInHref("/compliance/dose", params));

  return (
    <>
      <HomeBackdrop user={user} />
      <DoseReminder dose={parseDoseRef(params)} />
    </>
  );
}
