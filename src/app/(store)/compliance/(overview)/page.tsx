import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { isMockingEnabled } from "@/config/env";
import {
  complianceHref,
  ComplianceReports,
  parseRange,
  parseTab,
} from "@/features/compliance/components/reports/compliance-reports";
import { homeForPage } from "@/features/home/model/home-data";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Compliance · Open Pharmacy" };

const REFILL_CARDS = 3;

export default async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string; tab?: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const params = await searchParams;
  const range = parseRange(params.range);
  const tab = parseTab(params.tab);
  const path = complianceHref(range, tab);
  if (!(await getServerSession())) {
    redirect(`/sign-in?next=${encodeURIComponent(path)}`);
  }

  if (tab !== "overview" || isMockingEnabled) {
    return <ComplianceReports range={range} tab={tab} />;
  }
  const { home, error } = await homeForPage(path);
  const refills = (home?.refills ?? [])
    .slice(0, REFILL_CARDS)
    .map(({ id, name, form, expiry }) => ({ id, name, form, expiry }));
  return (
    <ComplianceReports
      range={range}
      tab={tab}
      refills={refills}
      refillsError={error}
    />
  );
}
