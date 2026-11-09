"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { isMockingEnabled } from "@/config/env";
import { MOCK_SEVERITY_TRENDS } from "@/features/compliance/model/mock-reports";
import {
  diaryMedications,
  severityTrend,
  shortDate,
  TREND_RANGES,
  type TrendRange,
} from "@/features/compliance/model/report";
import {
  useRehydrateSideEffects,
  useSideEffectStore,
} from "@/features/compliance/model/side-effect-store";
import type {
  Severity,
  SideEffectEntry,
} from "@/features/compliance/model/side-effects";
import { toIsoDate } from "@/features/scheduler/components/views/calendar";
import { useNow } from "@/features/scheduler/components/views/use-clock";
import { cn } from "@/lib/utils";

import { useHydrated } from "../log/use-client-state";
import { EntryActions } from "./entry-actions";
import { SeverityChart } from "./severity-chart";
import {
  CARD,
  DateLabel,
  ICONS,
  PageTitleRow,
  SectionHeader,
  STORE_BODY,
  Tag,
} from "./ui";

const SAMPLE_MEDICATIONS = Object.keys(MOCK_SEVERITY_TRENDS);
const CHIP_WIDTHS: Record<TrendRange, number> = {
  "7d": 33.1,
  "14d": 39.4,
  "30d": 40.9,
};
const TONES: Record<Severity, "mild" | "moderate" | "severe"> = {
  Mild: "mild",
  Moderate: "moderate",
  Severe: "severe",
};

const RANGE_DAYS: Record<TrendRange, string> = {
  "7d": "7 days",
  "14d": "14 days",
  "30d": "30 days",
};

export function SideEffectDiary() {
  useRehydrateSideEffects();
  const entries = useSideEffectStore((state) => state.entries);
  const removeEntry = useSideEffectStore((state) => state.removeEntry);
  const hydrated = useHydrated(useSideEffectStore);
  const now = useNow();
  const [picked, setPicked] = useState<string | null>(null);
  const [range, setRange] = useState<TrendRange>("7d");

  const medications = isMockingEnabled
    ? SAMPLE_MEDICATIONS
    : hydrated
      ? diaryMedications(entries)
      : [];
  const medication =
    picked && medications.includes(picked) ? picked : medications[0];
  const trend = !medication
    ? null
    : isMockingEnabled
      ? MOCK_SEVERITY_TRENDS[medication][range]
      : now && severityTrend(entries, medication, range, toIsoDate(now));
  const ready = isMockingEnabled || (hydrated && now !== null);

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-[17px] pb-[74.5px] lg:max-w-[884px] lg:pt-6 lg:pr-0 lg:pb-[122px] lg:pl-[14px]">
      <PageTitleRow
        title="Side-Effect Diary"
        backHref="/compliance"
        backLabel="Back to Compliance"
        className="h-10"
      />

      <div
        className={cn(
          "mt-8 flex flex-col gap-8 lg:mt-6 lg:gap-6 lg:pr-4",
          STORE_BODY,
        )}
      >
        {ready && (
          <>
            <section
              className={cn(
                CARD,
                "flex flex-col gap-4 px-[15px] pt-[7px] pb-[15px]",
              )}
            >
              <h2 className="text-subtitle-18-bold text-secondary-900">
                Side-Effect Severity Trend
              </h2>
              {hydrated && !medication && (
                <p className="text-body-14 text-secondary-300">
                  Record a side effect after a dose to see its trend here.
                </p>
              )}
              {medication && (
                <>
                  <div className="flex h-[33.5px] items-center gap-[7px]">
                    <label className="relative h-full min-w-0 flex-[0_1_194.6px]">
                      <span className="sr-only">Medication</span>
                      <select
                        value={medication}
                        onChange={(event) => setPicked(event.target.value)}
                        className="size-full appearance-none rounded-[8.75px] border border-neutral-300 bg-white pr-8 pl-[9px] text-body-14 text-secondary-900 outline-none focus-visible:ring-2 focus-visible:ring-info-500/30 lg:text-neutral-900"
                      >
                        {medications.map((name) => (
                          <option key={name}>{name}</option>
                        ))}
                      </select>
                      <Icon
                        src={`${ICONS}/chevron-down-light.svg`}
                        size={16}
                        className="pointer-events-none absolute top-[8.8px] right-[7px] lg:hidden"
                      />
                      <Icon
                        src={`${ICONS}/chevron-down.svg`}
                        size={16}
                        className="pointer-events-none absolute top-[8.8px] right-[7px] max-lg:hidden"
                      />
                    </label>
                    <div
                      role="group"
                      aria-label="Range"
                      className="flex shrink-0 gap-[3.5px]"
                    >
                      {TREND_RANGES.map((value) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={value === range}
                          onClick={() => setRange(value)}
                          style={{ width: CHIP_WIDTHS[value] }}
                          className={cn(
                            "h-7 rounded-[8.75px] font-brand text-[10.5px] leading-[14px] tracking-[0.09px] transition-colors",
                            value === range
                              ? "bg-info-500 text-white lg:bg-[#37B5FE]"
                              : "bg-bg-app text-secondary-300 lg:bg-neutral-300 lg:text-secondary-900",
                          )}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  {trend ? (
                    <SeverityChart trend={trend} />
                  ) : (
                    <p className="flex h-[259px] items-center justify-center text-center text-body-14 text-secondary-300">
                      {now &&
                        `No side effects recorded for ${medication} in the last ${RANGE_DAYS[range]}.`}
                    </p>
                  )}
                </>
              )}
            </section>

            <section className="flex flex-col gap-4">
              <SectionHeader title="Recent Entries" />
              {hydrated && entries.length === 0 ? (
                <p className="text-body-14 text-secondary-300">
                  No side effects recorded yet.
                </p>
              ) : (
                <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
                  {entries.map((entry) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      onDelete={() => removeEntry(entry.id)}
                    />
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  onDelete,
}: {
  entry: SideEffectEntry;
  onDelete: () => void;
}) {
  const date = shortDate(entry.date);
  const symptoms = entry.symptoms
    .map(({ symptom, severity }) => `${symptom} (${severity})`)
    .join(", ");
  return (
    <li className={cn(CARD, "flex flex-col gap-4 p-[15px]")}>
      <DateLabel className="text-secondary-900 lg:text-secondary-500">
        {date}
      </DateLabel>
      <div className="flex flex-col gap-2">
        <h3 className="text-subtitle-18-bold text-secondary-900 lg:text-neutral-900">
          Medications: {entry.medication}
        </h3>
        <div className="flex flex-wrap gap-1">
          {entry.symptoms.map(({ symptom, severity }) => (
            <Tag key={symptom} tone={TONES[severity]}>
              {symptom}
            </Tag>
          ))}
        </div>
      </div>
      {entry.note && (
        <p className="text-body-14 font-light text-secondary-300 italic">
          {entry.note}
        </p>
      )}
      <div className="flex flex-col gap-4 lg:mt-auto">
        <div className="-my-[0.5px] h-px bg-neutral-300" />
        <EntryActions
          editHref={`/compliance/side-effects/${entry.id}/edit`}
          onDelete={onDelete}
          label={`${entry.medication}, ${date}`}
          shareText={`${date} · ${entry.medication}: ${symptoms}${entry.note ? `. ${entry.note}` : ""}`}
        />
      </div>
    </li>
  );
}
