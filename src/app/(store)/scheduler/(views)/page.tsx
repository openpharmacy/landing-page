import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { parseView } from "@/features/scheduler/components/views/calendar";
import { SchedulerScreen } from "@/features/scheduler/components/views/scheduler-screen";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Med Scheduler · Open Pharmacy" };

export default async function SchedulerPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; date?: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const { view, date } = await searchParams;
  const user = await getServerSession();
  if (!user) {
    const query = new URLSearchParams();
    if (view) query.set("view", view);
    if (date) query.set("date", date);
    const next = query.size ? `/scheduler?${query}` : "/scheduler";
    redirect(`/sign-in?next=${encodeURIComponent(next)}`);
  }
  return <SchedulerScreen view={parseView(view)} />;
}
