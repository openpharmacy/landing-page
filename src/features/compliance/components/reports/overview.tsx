import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import type { RefillCardData } from "@/features/compliance/model/mock-reports";
import {
  type Achievement,
  complianceRate,
  type ComplianceReport,
  type SideEffectSummary,
  type VitalSummary,
} from "@/features/compliance/model/report";
import type { ComplianceView } from "@/features/compliance/model/use-report";
import { cardTint } from "@/features/home/components/card-tint";
import { EmptyCard } from "@/features/home/components/empty-card";
import type { Refill } from "@/features/home/model/home-data";
import { cn } from "@/lib/utils";

import { MissedDoseAlert } from "./missed-dose-alert";
import { CARD, DateLabel, ICONS, SectionHeader, Tag, VITAL_ICONS } from "./ui";

const GREEN = "#2ECC71";
const RED = "#E74C3C";

export const percentColour = (percent: number) => (percent >= 80 ? GREEN : RED);

export type ScriptRefill = Pick<Refill, "id" | "name" | "form" | "expiry">;

export type Refills =
  | { samples: RefillCardData[] }
  | { scripts: ScriptRefill[]; error: string | null };

export function Overview({
  view,
  refills,
}: {
  view: ComplianceView;
  refills: Refills;
}) {
  const { report } = view;
  return (
    <div className="flex flex-col gap-4 lg:gap-6 lg:pr-4">
      {report.missedDose && <MissedDoseAlert alert={report.missedDose} />}
      <Stats report={report} />
      <Progress report={report} />
      <RefillsSection refills={refills} />
      <SideEffects entries={view.sideEffects} />
      <Vitals vitals={view.vitals} />
      <Achievements
        earned={report.achievements.filter((item) => item.earned)}
      />
    </div>
  );
}

function Stats({ report }: { report: ComplianceReport }) {
  const rate = complianceRate(report);
  const stats = [
    {
      icon: "tick-circle",
      value: rate === null ? "—" : `${rate}%`,
      label: "Compliance Rate",
    },
    { icon: "medal-pink", value: report.streakDays, label: "Day Streak" },
    { icon: "tick-circle", value: report.dosesTaken, label: "Doses Taken" },
    { icon: "close-circle", value: report.dosesMissed, label: "Missed Doses" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-2 rounded-card border border-neutral-300 bg-white px-[15px] pt-[15px] pb-[23px]"
          style={{ backgroundImage: cardTint("#21B23F") }}
        >
          <Icon src={`${ICONS}/${stat.icon}.svg`} size={24} />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-h4-24 text-neutral-900">{stat.value}</span>
            <span className="text-caption-12-bold text-secondary-300">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Progress({ report }: { report: ComplianceReport }) {
  const withDates = report.progress.some((row) => row.dates);
  const empty = report.progress.every((row) => row.percent === null);
  return (
    <section
      className={cn(CARD, "flex flex-col gap-4 px-[15px] pt-[7px] pb-[15px]")}
    >
      <h2 className="text-subtitle-18-bold text-neutral-900 lg:text-secondary-900">
        Weekly Progress
      </h2>
      {empty ? (
        <p className="text-body-14 text-secondary-300">{report.emptyText}</p>
      ) : (
        <ul className="flex flex-col gap-3.5 max-lg:pr-0.5">
          {report.progress.map((row) => {
            const colour =
              row.percent === null ? undefined : percentColour(row.percent);
            return (
              <li key={row.label} className="flex items-center gap-9">
                <div
                  className={cn(
                    "flex shrink-0 flex-col",
                    withDates ? "w-[41px]" : "w-[26px]",
                  )}
                >
                  <span className="text-caption-12-bold whitespace-nowrap text-secondary-300 lg:text-secondary-500/60">
                    {row.label}
                  </span>
                  {row.dates && (
                    <span className="text-[8px] leading-[10px] whitespace-nowrap text-secondary-300">
                      {row.dates}
                    </span>
                  )}
                </div>
                <div className="h-[7px] flex-1 overflow-hidden rounded-[10px] bg-bg-app">
                  <div
                    className="h-full rounded-[10px]"
                    style={{
                      width: `${row.percent ?? 0}%`,
                      backgroundColor: colour,
                    }}
                  />
                </div>
                <span
                  className="w-8 shrink-0 text-center text-caption-12-bold text-secondary-300"
                  style={{ color: colour }}
                >
                  {row.percent === null ? "—" : `${row.percent}%`}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function CardRow({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "flex [scrollbar-width:none] gap-3 overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-info-500/30 lg:grid lg:grid-cols-3 lg:overflow-visible",
        className,
      )}
    >
      {children}
    </div>
  );
}

const ROW_CARD = "w-[239px] shrink-0 lg:w-auto";

function RefillsSection({ refills }: { refills: Refills }) {
  const samples = "samples" in refills;
  return (
    <section className={cn("flex flex-col gap-4", samples && "min-h-[215px]")}>
      <SectionHeader
        href="/scripts"
        className="max-lg:-mx-4 max-lg:px-4"
        titleClassName="leading-6"
        title={
          <>
            <span className="lg:hidden">Medications To Refill</span>
            <span className="max-lg:hidden">
              Medications You Can Refill Now
            </span>
          </>
        }
      />
      {samples ? (
        <CardRow
          label="Medications to refill"
          className="max-lg:-mx-4 max-lg:px-4"
        >
          {refills.samples.map((refill, index) => (
            <RefillCard key={index} refill={refill} />
          ))}
        </CardRow>
      ) : refills.error ? (
        <p role="alert" className="text-caption-12 text-error-500">
          {refills.error}
        </p>
      ) : refills.scripts.length === 0 ? (
        <EmptyCard
          iconSrc="/icons/home/capsule.svg"
          title="No refills yet"
          text="once you add prescriptions, refill options will appear hear."
        />
      ) : (
        <CardRow
          label="Medications to refill"
          className="max-lg:-mx-4 max-lg:px-4"
        >
          {refills.scripts.map((refill) => (
            <ScriptRefillCard key={refill.id} refill={refill} />
          ))}
        </CardRow>
      )}
    </section>
  );
}

function ExpiryChip({
  left,
  date,
  soon,
}: {
  left: string;
  date: string;
  soon?: boolean;
}) {
  return (
    <div className="flex h-6 items-center gap-2">
      <span
        className={cn(
          "rounded-[5px] p-1 text-caption-12-bold",
          soon
            ? "bg-[#F83536]/10 text-[#F93236]"
            : "bg-info-500/10 text-info-500",
        )}
      >
        {left}
      </span>
      <span className="text-[10px] leading-[11px] text-secondary-300">
        {date}
      </span>
    </div>
  );
}

const ACTIVE_BADGE =
  "absolute -top-px -right-px rounded-tr-card rounded-bl-[8px] bg-[#219A55] p-1.5 text-caption-12-bold text-white";

function ScriptRefillCard({ refill }: { refill: ScriptRefill }) {
  return (
    <Link
      href={`/scripts/detail?id=${encodeURIComponent(refill.id)}`}
      className={cn(
        CARD,
        ROW_CARD,
        "relative flex flex-col gap-4 p-[15px] transition-shadow hover:shadow-card",
      )}
    >
      <div className="flex flex-col pr-12">
        <h3 className="text-body-16-bold text-neutral-900">{refill.name}</h3>
        {refill.form && (
          <span className="text-caption-12-bold text-secondary-300">
            {refill.form}
          </span>
        )}
      </div>
      {refill.expiry && <ExpiryChip {...refill.expiry} />}
      <span className={ACTIVE_BADGE}>Active</span>
    </Link>
  );
}

function RefillCard({ refill }: { refill: RefillCardData }) {
  return (
    <article
      className={cn(CARD, ROW_CARD, "relative flex flex-col gap-4 p-[15px]")}
    >
      <div className="flex flex-col pr-8">
        <h3 className="text-body-16-bold text-neutral-900">{refill.name}</h3>
        <span className="text-caption-12-bold whitespace-nowrap text-secondary-300">
          {refill.runsOut}
        </span>
      </div>
      <div className="flex h-3.5 items-center justify-between text-[12px] leading-4 text-secondary-300">
        <span className="flex items-center gap-1">
          <span className="font-bold">{refill.pillsLeft}</span>
          <span>pills left</span>
        </span>
        <span className="h-[10.5px] w-px bg-neutral-300 lg:bg-secondary-300" />
        <span className="flex items-center gap-1">
          <span className="font-bold">{refill.perDay}</span>
          <span>per day</span>
        </span>
      </div>
      <div className="h-[5.2px] overflow-hidden rounded-full bg-bg-app">
        <div
          className="h-[5px] rounded-full bg-[#F39C12]"
          style={{ width: `${refill.supply * 100}%` }}
        />
      </div>
      <ExpiryChip
        left={refill.timeLeft}
        date={refill.expires}
        soon={refill.expiringSoon}
      />
      <span className={ACTIVE_BADGE}>Active</span>
    </article>
  );
}

function SideEffects({ entries }: { entries: SideEffectSummary[] }) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Side Effects"
        href="/compliance/side-effects"
        className="pr-4 max-lg:-mr-[14px]"
      />
      {entries.length === 0 ? (
        <EmptyCard
          iconSrc={`${ICONS}/calendar.svg`}
          title="No side effects yet"
          text="Side effects you report after a dose will appear here."
        />
      ) : (
        <CardRow label="Side effects" className="max-lg:-mr-4">
          {entries.map((entry, index) => (
            <article
              key={index}
              className={cn(CARD, ROW_CARD, "flex flex-col gap-4 p-[15px]")}
            >
              <DateLabel className="text-neutral-900">{entry.date}</DateLabel>
              <div className="flex flex-col gap-2">
                <h3 className="truncate text-subtitle-18-bold text-neutral-900 lg:overflow-visible lg:whitespace-normal lg:text-secondary-900">
                  Medications: {entry.medication}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {entry.symptoms.map(({ symptom, tone }) => (
                    <Tag key={symptom} tone={tone}>
                      {symptom}
                    </Tag>
                  ))}
                </div>
              </div>
              {entry.note && (
                <p className="truncate text-body-14 font-light text-secondary-300 italic">
                  {entry.note}
                </p>
              )}
            </article>
          ))}
        </CardRow>
      )}
    </section>
  );
}

function Vitals({ vitals }: { vitals: VitalSummary[] }) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Health Vitals"
        href="/compliance/vitals"
        className="pr-4 max-lg:-mr-[14px]"
      />
      {vitals.length === 0 ? (
        <EmptyCard
          iconSrc={`${ICONS}/heart.svg`}
          title="No vitals yet"
          text="Vitals you record after a dose will appear here."
        />
      ) : (
        <CardRow label="Health vitals" className="max-lg:-mr-4">
          {vitals.map((vital, index) => (
            <article
              key={index}
              className={cn(CARD, ROW_CARD, "flex flex-col gap-4 p-[15px]")}
            >
              <div className="flex h-6 items-center gap-1">
                <Icon
                  src={`${ICONS}/${VITAL_ICONS[vital.kind]}.svg`}
                  size={24}
                />
                <span className="text-body-14 text-neutral-900">
                  {vital.when}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-subtitle-18-bold text-neutral-900 lg:text-secondary-900">
                  {vital.title}
                </h3>
                <span
                  className={cn(
                    "text-caption-12",
                    vital.normal ? "text-success-500" : "text-[#F39C12]",
                  )}
                >
                  {vital.reading}
                </span>
                {vital.after && (
                  <span className="text-caption-12 text-secondary-300">
                    {vital.after}
                  </span>
                )}
              </div>
            </article>
          ))}
        </CardRow>
      )}
    </section>
  );
}

export const ACHIEVEMENT_STYLES = {
  perfectWeek: {
    icon: "medal-green",
    fill: "rgb(46 204 113 / 0.05)",
    tint: "#56AB68",
    border: "lg:border-success-500/30",
  },
  consistency: {
    icon: "clock",
    fill: "rgb(204 146 46 / 0.05)",
    tint: "#E8F236",
    border: "lg:border-[#CC922E]/30",
  },
};

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const style = ACHIEVEMENT_STYLES[achievement.kind];
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-card border border-neutral-300 p-[15px]",
        achievement.earned ? style.border : "bg-white",
      )}
      style={
        achievement.earned
          ? {
              backgroundColor: style.fill,
              backgroundImage: cardTint(style.tint),
            }
          : undefined
      }
    >
      <Icon src={`${ICONS}/${style.icon}.svg`} size={24} />
      <div className="flex flex-col">
        <span className="text-body-16-bold text-neutral-900 lg:text-secondary-900">
          {achievement.title}
        </span>
        <span className="text-caption-12-bold text-secondary-300">
          {achievement.text}
        </span>
      </div>
    </li>
  );
}

function Achievements({ earned }: { earned: Achievement[] }) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Achievements"
        href="/compliance/achievements"
        titleClassName="text-neutral-900 lg:text-secondary-900"
        linkClassName="max-lg:text-primary-500"
      />
      {earned.length === 0 ? (
        <EmptyCard
          iconSrc={`${ICONS}/medal-green.svg`}
          title="No achievements yet"
          text="Take every dose for 7 days in a row to earn Perfect Week."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {earned.map((achievement) => (
            <AchievementCard key={achievement.kind} achievement={achievement} />
          ))}
        </ul>
      )}
    </section>
  );
}
