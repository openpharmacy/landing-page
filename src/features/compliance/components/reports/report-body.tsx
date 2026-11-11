"use client";

import { SkeletonPage } from "@/components/ui/skeleton";
import { isMockingEnabled } from "@/config/env";
import { MOCK_REFILLS } from "@/features/compliance/model/mock-reports";
import type { Range } from "@/features/compliance/model/report";
import { useComplianceView } from "@/features/compliance/model/use-report";

import type { Tab } from "./compliance-reports";
import { ComplianceBodySkeleton } from "./compliance-skeleton";
import { Detailed } from "./detailed";
import { Insights } from "./insights";
import { Overview, type ScriptRefill } from "./overview";
import { Trends } from "./trends";

export function ReportBody({
  range,
  tab,
  refills,
  refillsError,
}: {
  range: Range;
  tab: Tab;
  refills: ScriptRefill[];
  refillsError: string | null;
}) {
  const view = useComplianceView(range);
  if (!view) {
    return (
      <SkeletonPage>
        <ComplianceBodySkeleton overview={tab === "overview"} />
      </SkeletonPage>
    );
  }

  const { report } = view;
  return (
    <>
      {tab === "overview" && (
        <Overview
          view={view}
          refills={
            isMockingEnabled
              ? { samples: MOCK_REFILLS }
              : { scripts: refills, error: refillsError }
          }
        />
      )}
      {tab === "detailed" && <Detailed report={report} />}
      {tab === "trends" && <Trends report={report} />}
      {tab === "insights" && <Insights report={report} />}
    </>
  );
}
