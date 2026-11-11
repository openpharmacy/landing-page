"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { isMockingEnabled } from "@/config/env";
import { vitalAverages } from "@/features/compliance/model/report";
import { useMissedDose } from "@/features/compliance/model/use-report";
import { cardTint } from "@/features/home/components/card-tint";
import {
  formatReading,
  readingsInPeriod,
  VITAL_LABELS,
  VITAL_PERIOD_LABELS,
  VITAL_PERIODS,
  type VitalPeriod,
  type VitalReading,
  type VitalType,
} from "@/features/compliance/model/vitals";
import { SAMPLE_AVERAGES } from "@/features/compliance/model/vitals-samples";
import {
  useRehydrateVitals,
  useVitalsStore,
} from "@/features/compliance/model/vitals-store";
import { useSchedulesHydrated } from "@/features/scheduler/components/views/use-clock";
import { cn } from "@/lib/utils";

import { EntryActions } from "./entry-actions";
import { MissedDoseAlert } from "./missed-dose-alert";
import {
  CARD,
  ICONS,
  PageTitleRow,
  SegmentedControl,
  STORE_BODY,
  Tag,
  VITAL_ICONS,
} from "./ui";

const AVERAGES: { type: VitalType; label: string; icon: string }[] = [
  { type: "bloodPressure", label: "Avg BP", icon: "heart-pink" },
  { type: "heartRate", label: "Avg HR", icon: "pulse" },
  { type: "bloodSugar", label: "Avg BS", icon: "drop-pink" },
  { type: "weight", label: "Avg Weight", icon: "weight-blue" },
];

const dayLabel = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const timeLabel = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

export function HealthVitals() {
  useRehydrateVitals();
  const readings = useVitalsStore((state) => state.readings);
  const hydrated = useVitalsStore((state) => state.hydrated);
  const removeReading = useVitalsStore((state) => state.removeReading);
  const [period, setPeriod] = useState<VitalPeriod>("week");
  const missedDose = useMissedDose();
  const schedulesReady = useSchedulesHydrated();
  const ready = isMockingEnabled || (hydrated && schedulesReady);

  const shown = hydrated ? readingsInPeriod(readings, period, new Date()) : [];
  const averages = isMockingEnabled
    ? SAMPLE_AVERAGES[period]
    : vitalAverages(hydrated ? readings : [], period, new Date());
  const days = [...new Set(shown.map((reading) => reading.date))];
  const periodOptions = VITAL_PERIODS.map((value) => ({
    label: VITAL_PERIOD_LABELS[value],
    active: value === period,
    onSelect: () => setPeriod(value),
  }));

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-[17px] pb-[74px] lg:max-w-[884px] lg:pt-6 lg:pr-0 lg:pb-[122px] lg:pl-[14px]">
      <PageTitleRow
        title="Health Vitals"
        backHref="/compliance"
        backLabel="Back to Compliance"
        className="h-10"
      >
        <SegmentedControl
          label="Period"
          options={periodOptions}
          className="w-[361px] max-lg:hidden"
        />
      </PageTitleRow>
      <SegmentedControl
        label="Period"
        options={periodOptions}
        className="mt-8 lg:hidden"
      />

      <div
        className={cn(
          "mt-8 flex flex-col gap-8 lg:mt-12 lg:gap-6 lg:pr-4",
          STORE_BODY,
        )}
      >
        {ready && (
          <>
            {missedDose && (
              <MissedDoseAlert alert={missedDose} className="max-lg:hidden" />
            )}

            <div className="grid grid-cols-2 gap-2">
              {AVERAGES.map(({ type, label, icon }) => {
                const average = averages[type];
                return (
                  <div
                    key={type}
                    className="flex flex-col gap-2 rounded-card border border-neutral-300 bg-white p-[15px]"
                    style={{ backgroundImage: cardTint("#21B23F") }}
                  >
                    <div className="flex h-6 items-center gap-1">
                      <Icon src={`${ICONS}/${icon}.svg`} size={24} />
                      <span className="text-caption-12-bold text-secondary-300">
                        {label}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-h4-24 text-secondary-900">
                        {average.value}
                      </span>
                      {average.status && (
                        <span
                          className={cn(
                            "text-caption-12-bold",
                            "normal" in average && !average.normal
                              ? "text-[#F39C12]"
                              : "text-[#219A55]/60",
                          )}
                        >
                          {average.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {hydrated && shown.length === 0 && (
              <p className="text-body-14 text-secondary-300">
                No readings this {period}.
              </p>
            )}

            {days.map((day) => (
              <section key={day} className="flex flex-col gap-4">
                <h2 className="flex h-6 items-center gap-1 text-body-14 text-secondary-900">
                  <Icon src={`${ICONS}/calendar.svg`} size={24} />
                  {dayLabel(day)}
                </h2>
                <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
                  {shown
                    .filter((reading) => reading.date === day)
                    .map((reading) => (
                      <ReadingCard
                        key={reading.id}
                        reading={reading}
                        onDelete={() => removeReading(reading.id)}
                      />
                    ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function ReadingCard({
  reading,
  onDelete,
}: {
  reading: VitalReading;
  onDelete: () => void;
}) {
  const title = VITAL_LABELS[reading.type];
  const value = formatReading(reading);
  const time = timeLabel(reading.time);
  return (
    <li className={cn(CARD, "flex flex-col gap-4 p-[15px]")}>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1 lg:flex-col lg:items-start">
        <div className="flex min-w-0 flex-1 items-center gap-1 lg:w-full">
          <Icon src={`${ICONS}/${VITAL_ICONS[reading.type]}.svg`} size={24} />
          <h3 className="text-subtitle-18-bold text-secondary-900">{title}</h3>
        </div>
        <span className="text-subtitle-18 text-secondary-900">{value}</span>
      </div>
      <div className="flex h-6 items-center gap-4">
        <span className="min-w-0 flex-1 text-body-14 text-secondary-900">
          {time}
        </span>
        {reading.medication && <Tag tone="info">{reading.medication}</Tag>}
      </div>
      <div className="-my-[0.5px] h-px bg-neutral-300" />
      <EntryActions
        editHref={`/compliance/vitals/${reading.id}/edit`}
        onDelete={onDelete}
        label={`${title}, ${dayLabel(reading.date)} ${time}`}
        shareText={`${title}: ${value} · ${dayLabel(reading.date)} ${time}${reading.medication ? ` · after ${reading.medication}` : ""}`}
      />
    </li>
  );
}
