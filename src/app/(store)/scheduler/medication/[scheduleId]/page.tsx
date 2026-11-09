import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { isIsoDate } from "@/features/scheduler/components/views/calendar";
import { MedicationDetails } from "@/features/scheduler/components/views/medication-details";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = {
  title: "Medication Details · Open Pharmacy",
};

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export default async function MedicationDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ scheduleId: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const { scheduleId } = await params;
  const { date, time } = await searchParams;
  const user = await getServerSession();
  if (!user) {
    const query = new URLSearchParams();
    if (date) query.set("date", date);
    if (time) query.set("time", time);
    const path = `/scheduler/medication/${encodeURIComponent(scheduleId)}`;
    const next = query.size ? `${path}?${query}` : path;
    redirect(`/sign-in?next=${encodeURIComponent(next)}`);
  }
  return (
    <MedicationDetails
      scheduleId={scheduleId}
      date={isIsoDate(date) ? date : null}
      time={time && TIME.test(time) ? time : null}
    />
  );
}
