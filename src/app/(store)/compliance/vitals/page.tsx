import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { HealthVitals } from "@/features/compliance/components/reports/health-vitals";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Health Vitals · Open Pharmacy" };

export default async function HealthVitalsPage() {
  if (!(await showHiddenScreens())) notFound();
  if (!(await getServerSession())) {
    redirect(`/sign-in?next=${encodeURIComponent("/compliance/vitals")}`);
  }
  return <HealthVitals />;
}
