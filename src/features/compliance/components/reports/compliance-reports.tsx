import Link from "next/link";

import {
  RANGE_LABELS,
  RANGES,
  type Range,
} from "@/features/compliance/model/report";
import { cn } from "@/lib/utils";

import { ExportButton } from "./export-button";
import type { ScriptRefill } from "./overview";
import { ReportBody } from "./report-body";
import { PageTitleRow, SegmentedControl, STORE_BODY } from "./ui";

export const TABS = ["overview", "detailed", "trends", "insights"] as const;
export type Tab = (typeof TABS)[number];

const TAB_LABELS: Record<Tab, string> = {
  overview: "Overview",
  detailed: "Detailed",
  trends: "Trends",
  insights: "Insights",
};

export const parseRange = (value: unknown): Range =>
  RANGES.includes(value as Range) ? (value as Range) : "7d";
export const parseTab = (value: unknown): Tab =>
  TABS.includes(value as Tab) ? (value as Tab) : "overview";

export const complianceHref = (range: Range, tab: Tab) =>
  `/compliance?range=${range}&tab=${tab}`;

function bottomSpace(tab: Tab, range: Range) {
  if (tab === "overview") {
    const mobile = {
      "7d": "pb-[52px]",
      "30d": "pb-[47px]",
      "90d": "pb-[127px]",
    };
    return cn(mobile[range], "lg:pb-[159px]");
  }
  if (tab === "trends" && range !== "7d") return "pb-[69px] lg:pb-20";
  if (tab === "detailed") return "pb-[74px] lg:pb-[122px]";
  return "pb-[74px] lg:pb-20";
}

export function ComplianceReports({
  range,
  tab,
  refills = [],
  refillsError = null,
}: {
  range: Range;
  tab: Tab;
  refills?: ScriptRefill[];
  refillsError?: string | null;
}) {
  const rangeOptions = RANGES.map((value) => ({
    label: RANGE_LABELS[value],
    href: complianceHref(value, tab),
    active: value === range,
  }));

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[870px] px-4 pt-[17px] lg:max-w-[884px] lg:pt-6 lg:pr-0 lg:pl-[14px]",
        bottomSpace(tab, range),
      )}
    >
      <PageTitleRow
        title="Compliance"
        backHref="/home"
        backLabel="Back to home"
        className="h-14"
      >
        <SegmentedControl
          label="Period"
          options={rangeOptions}
          desktopTint
          className="w-[375px] max-lg:hidden"
        />
        <ExportButton range={range} />
      </PageTitleRow>

      <SegmentedControl
        label="Period"
        options={rangeOptions}
        className="mt-8 lg:hidden"
      />

      <nav
        aria-label="Compliance views"
        className="mt-6 flex h-10 border-b border-neutral-300"
      >
        {TABS.map((value) => {
          const active = value === tab;
          return (
            <Link
              key={value}
              href={complianceHref(range, value)}
              scroll={false}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-1 justify-center text-body-16 transition-colors",
                active
                  ? "font-bold text-info-500"
                  : "text-secondary-900 hover:text-info-500",
              )}
            >
              {TAB_LABELS[value]}
              {active && (
                <span className="absolute inset-x-0 bottom-px h-0.5 bg-info-500" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className={cn("mt-8 lg:mt-6", STORE_BODY)}>
        <ReportBody
          range={range}
          tab={tab}
          refills={refills}
          refillsError={refillsError}
        />
      </div>
    </div>
  );
}
