import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { HealthVitals } from "@/features/compliance/components/reports/health-vitals";
import { EditVital } from "@/features/compliance/components/reports/record-vitals";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Edit Vital · Open Pharmacy" };

export default async function EditVitalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const { id } = await params;
  if (!(await getServerSession())) {
    redirect(
      `/sign-in?next=${encodeURIComponent(`/compliance/vitals/${encodeURIComponent(id)}/edit`)}`,
    );
  }
  return (
    <>
      <div className="max-lg:hidden" inert>
        <HealthVitals />
      </div>
      <EditVital readingId={id} />
    </>
  );
}
