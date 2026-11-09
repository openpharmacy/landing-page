"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { isMockingEnabled } from "@/config/env";
import { useComplianceSubtitle } from "@/features/compliance/model/use-report";
import {
  useNow,
  useSchedulesHydrated,
} from "@/features/scheduler/components/views/use-clock";
import {
  useRehydrateSchedules,
  useScheduleStore,
} from "@/features/scheduler/model/store";
import {
  todaysDoses,
  upcomingDoses,
  type UpcomingDose,
} from "@/features/scheduler/model/today";
import type { SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";
import { useShowHidden } from "@/providers/hidden-screens";

import type { HomeData } from "../model/home-data";
import { cardTint } from "./card-tint";
import { EmptyCard } from "./empty-card";
import { HOME_COLUMN } from "./home-layout";
import { HomeSkeleton } from "./home-skeleton";
import { EmptyRefillSection, RefillSection } from "./refill-section";
import { SectionHeader } from "./section-header";

type StatCardData = {
  iconSrc: string;
  title: string;
  subtitle: string;
  note?: string;
  tint: string;
  href: string;
};

const ROW_CARDS: StatCardData[] = [
  {
    iconSrc: "/icons/home/card-schedule.svg",
    title: "Medication Schedule",
    subtitle: "1/4 doses taken today",
    tint: "#21B23F",
    href: "/scheduler",
  },
  {
    iconSrc: "/icons/home/card-compliance.svg",
    title: "Compliance",
    subtitle: "1/4 doses taken today",
    tint: "#E18CB2",
    href: "/compliance",
  },
];

const SCRIPTS_CARD: StatCardData = {
  iconSrc: "/icons/home/card-scripts.svg",
  title: "Scripts",
  subtitle: "",
  tint: "#56AB68",
  href: "/scripts",
};

const EMPTY_SUBTITLES = {
  schedule: "No schedule yet",
  compliance: "No data yet",
  scripts: "No scripts added",
};

const DOSES: UpcomingDose[] = [
  {
    key: "metformin",
    name: "Metformin 500mg",
    time: "8:00 PM",
    eta: "2h 30m",
    href: "/scheduler",
  },
  {
    key: "vitamin-d3",
    name: "Vitamin D3",
    time: "8:00 PM",
    eta: "2h 30m",
    href: "/scheduler",
  },
];

const NO_SCHEDULE = { subtitle: null, upcoming: null };

function scheduleSubtitle(due: number, taken: number) {
  if (due === 0) return "No doses scheduled today";
  return `${taken}/${due} dose${due === 1 ? "" : "s"} taken today`;
}

function useStoredSchedule(enabled: boolean) {
  useRehydrateSchedules(enabled);
  const schedules = useScheduleStore((s) => s.schedules);
  const doses = useScheduleStore((s) => s.doses);
  const hydrated = useSchedulesHydrated();
  const now = useNow();
  if (!enabled || !hydrated || !now) return null;
  if (schedules.length === 0) return NO_SCHEDULE;
  const { due, taken } = todaysDoses(schedules, doses, now);
  return {
    subtitle: scheduleSubtitle(due, taken),
    upcoming: upcomingDoses(schedules, doses, now),
  };
}

const prescriptions = (n: number) => `${n} prescription${n === 1 ? "" : "s"}`;

export function LoggedInHome({
  user,
  home,
  error,
  banner,
}: {
  user: SessionUser;
  home: HomeData | null;
  error?: string | null;
  banner?: ReactNode;
}) {
  const hasScripts = (home?.added ?? 0) > 0;
  const empty = !hasScripts && !error;
  const showHidden = useShowHidden();
  const stored = useStoredSchedule(showHidden);
  const compliance = useComplianceSubtitle();
  const drawn = hasScripts
    ? { subtitle: ROW_CARDS[0].subtitle, upcoming: DOSES }
    : NO_SCHEDULE;
  const schedule = isMockingEnabled ? stored && drawn : stored;

  if (showHidden && !schedule) return <HomeSkeleton banner={Boolean(banner)} />;

  const scheduleCard = {
    ...ROW_CARDS[0],
    subtitle: schedule?.subtitle ?? EMPTY_SUBTITLES.schedule,
  };
  const complianceCard = isMockingEnabled
    ? hasScripts
      ? ROW_CARDS[1]
      : { ...ROW_CARDS[1], subtitle: EMPTY_SUBTITLES.compliance }
    : { ...ROW_CARDS[1], subtitle: compliance ?? EMPTY_SUBTITLES.compliance };
  const scriptsCard =
    home && hasScripts
      ? {
          ...SCRIPTS_CARD,
          subtitle: `${home.added} added`,
          note: `${home.expiringSoon} expiring soon`,
        }
      : { ...SCRIPTS_CARD, subtitle: error ? "" : EMPTY_SUBTITLES.scripts };

  return (
    <div className={cn(HOME_COLUMN, empty && "pb-[101px]")}>
      <div className="flex flex-col gap-9">
        {banner}
        <div className="flex flex-col">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Hello {user.firstName}
          </h1>
          {error ? (
            <p role="alert" className="text-caption-12 text-error-500">
              {error}
            </p>
          ) : (
            <p className="text-caption-12 text-secondary-300 lg:text-body-16">
              You have {prescriptions(home?.expiringSoon ?? 0)} expiring soon
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {showHidden && (
            <div className="grid grid-cols-2 gap-2">
              {[scheduleCard, complianceCard].map((card) => (
                <StatCard key={card.title} card={card} />
              ))}
            </div>
          )}
          <StatCard card={scriptsCard} />
        </div>

        {showHidden && (
          <section className="flex flex-col gap-4">
            <SectionHeader title="Upcoming doses" href="/scheduler" />
            {schedule?.upcoming?.length === 0 ? (
              <p className="text-body-14 text-secondary-300">
                No upcoming doses.
              </p>
            ) : schedule?.upcoming ? (
              <div className="flex flex-col gap-2 lg:gap-3">
                {schedule.upcoming.map((dose) => (
                  <Link
                    key={dose.key}
                    href={dose.href}
                    className="flex items-center gap-2 rounded-card border border-neutral-300 bg-white p-[15px] transition-shadow hover:shadow-card"
                  >
                    <Icon src="/icons/home/clock.svg" size={24} />
                    <div className="flex flex-1 flex-col">
                      <span className="text-body-16-bold text-neutral-900 lg:text-subtitle-18-bold">
                        {dose.name}
                      </span>
                      <span className="text-caption-12-bold text-secondary-300">
                        {dose.time}
                      </span>
                    </div>
                    <span className="text-caption-12-bold text-[#F08080]">
                      {dose.eta}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyCard
                iconSrc="/icons/home/clock.svg"
                title="No upcoming doses"
                text="Your reminders will appear here once you add a medication."
              />
            )}
          </section>
        )}
      </div>

      {error ? null : home && home.refills.length > 0 ? (
        <RefillSection refills={home.refills} />
      ) : hasScripts ? (
        <NothingToRefill />
      ) : (
        <EmptyRefillSection />
      )}
    </div>
  );
}

function NothingToRefill() {
  return (
    <section className="mt-6 flex flex-col gap-4 lg:mt-9">
      <SectionHeader
        title="Medications to refill"
        href="/scripts"
        className="pr-4"
        linkClassName="hidden lg:inline"
      />
      <EmptyCard
        iconSrc="/icons/home/capsule.svg"
        title="No refills yet"
        text="Active prescriptions you can refill will appear here."
      />
    </section>
  );
}

function StatCard({ card }: { card: StatCardData }) {
  const { iconSrc, title, subtitle, note, tint, href } = card;
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 rounded-card border border-neutral-300 bg-white px-[15px] pt-[15px] pb-[23px] transition-shadow hover:shadow-card"
      style={{ backgroundImage: cardTint(tint) }}
    >
      <div className="flex items-center justify-between">
        <Icon src={iconSrc} size={24} />
        <Icon src="/icons/home/arrow-right.svg" size={16} />
      </div>
      <div className="flex flex-col">
        <span className="text-body-16-bold text-neutral-900 min-[390px]:whitespace-nowrap lg:text-subtitle-18-bold">
          {title}
        </span>
        <div className="flex min-h-4 items-center justify-between gap-0.5 text-caption-12-bold text-secondary-300">
          <span>{subtitle}</span>
          {note && <span>{note}</span>}
        </div>
      </div>
    </Link>
  );
}
