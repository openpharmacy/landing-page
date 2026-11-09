import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { HomeBackdrop } from "@/features/compliance/components/log/home-backdrop";
import {
  parseDoseRef,
  signInHref,
  type SearchParams,
} from "@/features/compliance/components/log/route-params";
import { RecordVitals } from "@/features/compliance/components/reports/record-vitals";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Record Vitals · Open Pharmacy" };

export default async function RecordVitalsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const params = await searchParams;
  const user = await getServerSession();
  if (!user) redirect(signInHref("/compliance/vitals/new", params));
  const dose = parseDoseRef(params);

  return (
    <>
      <HomeBackdrop user={user} />
      <RecordVitals
        scheduleId={dose.schedule || undefined}
        date={dose.date || undefined}
        time={dose.time}
        sideEffects={dose.sideEffects}
      />
    </>
  );
}
