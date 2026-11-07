"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";
import type { SessionUser } from "@/lib/auth/mock-session";

import { cardTint } from "./card-tint";
import { CategorySection } from "./category-section";
import { FeaturedSection } from "./featured-section";
import { HomeSkeleton } from "./home-skeleton";
import { RefillSection } from "./refill-section";
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
    href: "#",
  },
  {
    iconSrc: "/icons/home/card-compliance.svg",
    title: "Compliance",
    subtitle: "1/4 doses taken today",
    tint: "#E18CB2",
    href: "#",
  },
];

const SCRIPTS_CARD: StatCardData = {
  iconSrc: "/icons/home/card-scripts.svg",
  title: "Scripts",
  subtitle: "4 added",
  note: "2 expiring soon",
  tint: "#56AB68",
  href: "/scripts",
};

const DOSES = [
  { name: "Metformin 500mg", time: "8:00 PM", eta: "2h 30m" },
  { name: "Vitamin D3", time: "8:00 PM", eta: "2h 30m" },
];

export function LoggedInHome({ user }: { user: SessionUser }) {
  // Simulate fetching the dashboard so the loading skeleton is exercised.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <HomeSkeleton />;

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Hello {user.firstName}
          </h1>
          <p className="text-body-16 text-secondary-300">
            You have 2 prescriptions expiring soon
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            {ROW_CARDS.map((card) => (
              <StatCard key={card.title} card={card} />
            ))}
          </div>
          <StatCard card={SCRIPTS_CARD} />
        </div>

        <section className="flex flex-col gap-4">
          <SectionHeader title="Upcoming doses" />
          <div className="flex flex-col gap-3">
            {DOSES.map((dose) => (
              <div
                key={dose.name}
                className="flex items-center gap-4 rounded-card border border-neutral-300 bg-white p-4"
              >
                <Icon src="/icons/home/clock.svg" size={24} />
                <div className="flex flex-1 flex-col">
                  <span className="text-body-16-bold text-secondary-900">
                    {dose.name}
                  </span>
                  <span className="text-body-14 text-secondary-300">
                    {dose.time}
                  </span>
                </div>
                <span className="text-caption-12-bold text-[#F08080]">
                  {dose.eta}
                </span>
              </div>
            ))}
          </div>
        </section>

        <RefillSection />
        <CategorySection />
        <FeaturedSection />
      </div>
    </div>
  );
}

function StatCard({ card }: { card: StatCardData }) {
  const { iconSrc, title, subtitle, note, tint, href } = card;
  return (
    <a
      href={href}
      className="flex flex-col gap-4 rounded-card border border-neutral-300 bg-white px-4 pt-4 pb-6 transition-shadow hover:shadow-card"
      style={{ backgroundImage: cardTint(tint) }}
    >
      <div className="flex items-start justify-between">
        <Icon src={iconSrc} size={24} />
        <Icon src="/icons/home/arrow-right.svg" size={16} />
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-subtitle-18-bold text-[#1C232A]">{title}</span>
          <span className="text-caption-12-bold text-secondary-300">
            {subtitle}
          </span>
        </div>
        {note && (
          <span className="shrink-0 text-caption-12-bold text-secondary-300">
            {note}
          </span>
        )}
      </div>
    </a>
  );
}
