import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import type { Refill } from "../model/home-data";
import { cardTint } from "./card-tint";
import { EmptyCard } from "./empty-card";
import { SectionHeader } from "./section-header";

const DESKTOP_REFILLS = 3;

export function RefillSection({ refills }: { refills: Refill[] }) {
  return (
    <section className="mt-6 flex flex-col gap-4 lg:mt-9">
      <SectionHeader
        title="Medications to refill"
        href="/scripts"
        className="pr-4"
        linkClassName="hidden lg:inline"
      />
      <div className="-mx-4 flex [scrollbar-width:none] gap-3 overflow-x-auto overscroll-x-contain px-4 lg:mx-0 lg:overflow-visible lg:px-0">
        {refills.map((refill, index) => (
          <RefillCard
            key={refill.id}
            refill={refill}
            className={index >= DESKTOP_REFILLS ? "lg:hidden" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export function EmptyRefillSection() {
  return (
    <section className="mt-9 flex flex-col gap-4">
      <SectionHeader
        title="Medications you can refill now"
        href="/scripts"
        className="pr-4"
        titleClassName="lg:leading-6"
        linkClassName="hidden lg:inline"
      />
      <div className="-mx-4 flex overflow-hidden px-4 lg:mx-0 lg:px-0">
        <EmptyCard
          iconSrc="/icons/home/capsule.svg"
          title="No refills yet"
          text="once you add prescriptions, refill options will appear hear."
          className="w-[870px] shrink-0 lg:w-full"
        />
      </div>
    </section>
  );
}

function RefillCard({
  refill,
  className,
}: {
  refill: Refill;
  className?: string;
}) {
  return (
    <Link
      href={`/scripts/detail?id=${refill.id}`}
      className={cn(
        "relative flex w-[282px] shrink-0 flex-col gap-4 rounded-card border border-neutral-300 bg-white p-[15px] transition-shadow outline-none hover:shadow-card focus-visible:ring-2 focus-visible:ring-info-500/50 focus-visible:ring-inset",
        className,
      )}
      style={{ backgroundImage: cardTint("#21B23F") }}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-1 pr-11">
          <h3 className="text-body-16-bold text-neutral-900 lg:text-subtitle-18-bold">
            {refill.name}
          </h3>
          {refill.synced && (
            <Icon
              src="/icons/home/security.svg"
              size={16}
              alt="Synced with the ASL"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-caption-12-bold text-secondary-300">
            {refill.form}
          </span>
          {refill.expiry && (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-[5px] p-1 text-caption-12-bold",
                  refill.expiry.soon
                    ? "bg-[#F83536]/10 text-[#F93236]"
                    : "bg-info-500/10 text-info-500",
                )}
              >
                {refill.expiry.left}
              </span>
              <span className="text-[10px] leading-3 text-secondary-300">
                {refill.expiry.date}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-10 items-center gap-2">
        <span
          className={cn(
            "flex h-7 w-[28.5px] items-center justify-center rounded-full text-[12px] leading-5 font-bold text-white",
            refill.patientClass,
          )}
        >
          {refill.patientInitials}
        </span>
        <span className="text-[16px] leading-7 font-bold text-[#101828]">
          {refill.patient}
        </span>
      </div>

      <span className="absolute -top-px -right-px rounded-tr-card rounded-bl-[8px] bg-[#219A55] p-1.5 text-caption-12-bold text-white">
        Active
      </span>
    </Link>
  );
}
