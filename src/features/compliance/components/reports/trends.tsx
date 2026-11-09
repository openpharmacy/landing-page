import { Icon } from "@/components/ui/icon";
import type { ComplianceReport } from "@/features/compliance/model/report";
import { cardTint } from "@/features/home/components/card-tint";
import { cn } from "@/lib/utils";

import { MissedDoseAlert } from "./missed-dose-alert";
import { CARD, ICONS, SectionHeader } from "./ui";

const barColour = (percent: number) =>
  percent >= 70 ? "#27AE60" : percent >= 50 ? "#F39C12" : "#E74C3C";

const INSIGHT_STYLES = {
  improving: {
    icon: "trend-up",
    fill: "rgb(46 204 113 / 0.05)",
    tint: "#56AB68",
  },
  bestTime: {
    icon: "clock-pink",
    fill: "rgb(244 135 182 / 0.1)",
    tint: "#F487B6",
  },
  opportunity: {
    icon: "danger",
    fill: "rgb(204 146 46 / 0.05)",
    tint: "#E8F236",
  },
};
const DECLINING = INSIGHT_STYLES.opportunity;

export function Trends({ report }: { report: ComplianceReport }) {
  const bars = report.trend;
  const barWidth = bars.length >= 5 ? "w-[33px]" : "w-[81px]";
  const withDates = bars.some((bar) => bar.dates);
  const spread = bars.length === 5;
  const months = bars.length === 3;
  const empty = bars.every((bar) => bar.percent === null);
  return (
    <div className="flex flex-col gap-8 lg:gap-6">
      {report.missedDose && (
        <MissedDoseAlert alert={report.missedDose} className="max-lg:hidden" />
      )}

      <section
        className={cn(CARD, "flex flex-col gap-4 px-[15px] pt-[7px] pb-[15px]")}
      >
        <h2 className="text-subtitle-18-bold text-secondary-900">
          Compliance Trend
        </h2>
        {empty ? (
          <p className="text-body-14 text-secondary-300">{report.emptyText}</p>
        ) : (
          <>
            <div className="flex h-28 items-end" aria-hidden>
              {bars.map((bar) => (
                <div
                  key={bar.label + bar.dates}
                  className="flex h-[100px] flex-1 flex-col items-center"
                >
                  {bar.percent !== null && (
                    <div
                      className={cn("rounded-t-[3.5px]", barWidth)}
                      style={{
                        height: Math.max(bar.percent, 2),
                        marginTop: Math.max(100 - Math.max(bar.percent, 2), 1),
                        backgroundColor: barColour(bar.percent),
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <ul
              className={cn(
                "flex",
                !withDates && "h-[21px] pt-[7px]",
                spread && "max-lg:justify-between",
                months && "max-lg:justify-between max-lg:px-[33px]",
              )}
            >
              {bars.map((bar) => (
                <li
                  key={bar.label + bar.dates}
                  className={cn(
                    "flex flex-col items-center lg:flex-1",
                    spread
                      ? "max-lg:w-[41px] max-lg:items-start"
                      : months
                        ? "max-lg:w-[41px]"
                        : "flex-1",
                  )}
                >
                  <span
                    className={cn(
                      "text-caption-12 whitespace-nowrap text-secondary-300",
                      bar.dates && "font-bold",
                    )}
                  >
                    {bar.label}
                  </span>
                  {bar.dates && (
                    <span className="text-[8px] leading-[10px] whitespace-nowrap text-secondary-300">
                      {bar.dates}
                    </span>
                  )}
                  <span className="sr-only">
                    :{" "}
                    {bar.percent === null ? "no doses due" : `${bar.percent}%`}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Insights & Recommendations" />
        {report.trendInsights.length === 0 && (
          <p className="text-body-14 text-secondary-300">
            Insights appear here once you have taken or skipped a few doses.
          </p>
        )}
        <ul className="flex flex-col gap-3 empty:hidden">
          {report.trendInsights.map((insight) => {
            const style =
              insight.kind === "declining"
                ? DECLINING
                : INSIGHT_STYLES[insight.kind];
            return (
              <li
                key={insight.kind}
                className="flex items-center gap-2 rounded-card border border-neutral-300 p-[15px]"
                style={{
                  backgroundColor: style.fill,
                  backgroundImage: cardTint(style.tint),
                }}
              >
                <Icon src={`${ICONS}/${style.icon}.svg`} size={24} />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-body-16-bold text-neutral-900">
                    {insight.title}
                  </span>
                  <span className="text-caption-12-bold text-secondary-300">
                    {insight.text}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
