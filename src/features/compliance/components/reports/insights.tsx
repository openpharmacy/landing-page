import { Icon } from "@/components/ui/icon";
import type { ComplianceReport } from "@/features/compliance/model/report";
import { cn } from "@/lib/utils";

import { MissedDoseAlert } from "./missed-dose-alert";
import { CARD, ICONS, Meter } from "./ui";

function CardTitle({
  icon,
  iconWidth = 24,
  children,
}: {
  icon: string;
  iconWidth?: number;
  children: string;
}) {
  return (
    <h2 className="flex h-6 items-center gap-1 text-body-16-bold text-neutral-900">
      <span
        className="flex h-6 shrink-0 items-center"
        style={{ width: iconWidth }}
      >
        <Icon src={`${ICONS}/${icon}.svg`} size={24} />
      </span>
      {children}
    </h2>
  );
}

export function Insights({ report }: { report: ComplianceReport }) {
  const { insights } = report;
  const noneText = (
    <p className="text-body-14 text-secondary-300">{insights.emptyText}</p>
  );
  return (
    <div className="flex flex-col gap-6">
      {report.missedDose && (
        <MissedDoseAlert alert={report.missedDose} className="max-lg:hidden" />
      )}

      <section className={cn(CARD, "flex flex-col gap-4 p-[15px]")}>
        <CardTitle icon="clock">High-Risk Times of Day</CardTitle>
        {insights.highRiskTimes.length === 0 ? (
          noneText
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {insights.highRiskTimes.map((time) => (
                <span
                  key={time}
                  className="rounded-[4px] bg-[#F39C12]/20 px-2 py-1 text-body-14 text-[#F39C12]"
                >
                  {time}
                </span>
              ))}
            </div>
            <p className="text-body-14 text-neutral-900">
              {insights.highRiskText}
            </p>
          </>
        )}
      </section>

      <section className={cn(CARD, "flex flex-col gap-4 p-[15px]")}>
        <CardTitle icon="capsule" iconWidth={21}>
          Most Missed Medications
        </CardTitle>
        {insights.mostMissed.length === 0 && noneText}
        <ul className="flex flex-col gap-2 empty:hidden">
          {insights.mostMissed.map((row) => (
            <li key={row.medication} className="flex items-center gap-2">
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-body-14 font-bold text-neutral-900">
                  {row.medication}
                </span>
                <span className="text-caption-12 text-secondary-300">
                  {row.text}
                </span>
              </div>
              <Meter
                share={row.share}
                color="#E74C3C"
                className="w-[100px] lg:w-[200px]"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(CARD, "flex flex-col gap-4 p-[15px]")}>
        <CardTitle icon="calendar">Missed Doses by Time of Day</CardTitle>
        <div className="flex h-[68px] flex-col justify-end gap-1">
          <ul className="flex h-[21px]">
            {insights.byTimeOfDay.map((slot, index) => (
              <li
                key={index}
                aria-label={`${slot.missed} missed at ${slot.label}`}
                className="flex-1 text-center text-caption-12 text-secondary-300"
              >
                {slot.missed || "-"}
              </li>
            ))}
          </ul>
          <ul className="flex h-[21px]" aria-hidden>
            {insights.byTimeOfDay.map((slot, index) => (
              <li
                key={index}
                className="flex-1 text-center text-caption-12 text-secondary-300"
              >
                {slot.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {insights.recommendation && (
        <section className="flex gap-1 rounded-[10px] border border-info-500 bg-info-500/10 p-[11px]">
          <span className="flex h-6 w-5 shrink-0 items-center">
            <Icon src={`${ICONS}/info.svg`} size={20} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 className="text-body-14 text-info-500">Recommendation</h2>
            <p className="text-body-14 text-neutral-900">
              {insights.recommendation}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
