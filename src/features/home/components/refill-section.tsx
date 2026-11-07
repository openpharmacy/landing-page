import { ShieldCheck } from "lucide-react";

import { cardTint } from "./card-tint";
import { SectionHeader } from "./section-header";

type Refill = { name: string; dose: string; secure: boolean };

const REFILLS: Refill[] = [
  { name: "Metformin 500mg", dose: "500mg tablet", secure: false },
  { name: "Amlodipine 5mg", dose: "5mg tablet", secure: true },
  { name: "Metformin 500mg", dose: "500mg tablet", secure: true },
];

export function RefillSection() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Medications you can refill now" />
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {REFILLS.map((refill, index) => (
          <RefillCard key={index} refill={refill} />
        ))}
      </div>
    </section>
  );
}

function RefillCard({ refill }: { refill: Refill }) {
  return (
    <div
      className="relative min-w-[280px] overflow-hidden rounded-card border border-neutral-300 bg-white p-4 sm:min-w-0"
      style={{ backgroundImage: cardTint("#21B23F") }}
    >
      <span className="absolute top-0 right-0 rounded-bl-lg bg-[#219A55] px-2 py-1 text-caption-12-bold text-white">
        Active
      </span>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-subtitle-18-bold text-[#1C232A]">
              {refill.name}
            </span>
            {refill.secure && (
              <ShieldCheck className="size-4 shrink-0 text-[#56AB68]" />
            )}
          </div>
          <span className="text-caption-12-bold text-secondary-300">
            {refill.dose}
          </span>
          <span className="text-[10px] text-[#F08080]">Expires soon</span>
        </div>

        <button
          type="button"
          className="w-fit rounded-control bg-gradient-primary px-4 py-2 text-body-14 font-bold text-white"
        >
          Refill
        </button>
      </div>
    </div>
  );
}
