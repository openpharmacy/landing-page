"use client";

import { SkeletonBlock as Block, SkeletonPage } from "@/components/ui/skeleton";
import { useRehydrateSideEffects } from "@/features/compliance/model/side-effect-store";
import { useRehydrateVitals } from "@/features/compliance/model/vitals-store";
import { useRehydrateSchedules } from "@/features/scheduler/model/store";
import { cn } from "@/lib/utils";

import { STORE_BODY } from "./ui";

export function ComplianceSkeleton() {
  useRehydrateSchedules();
  useRehydrateSideEffects();
  useRehydrateVitals();
  return (
    <SkeletonPage className="mx-auto w-full max-w-[870px] px-4 pt-[17px] pb-[74px] lg:max-w-[884px] lg:pt-6 lg:pr-0 lg:pb-20 lg:pl-[14px]">
      <div className="flex h-14 items-center gap-4 lg:gap-2">
        <Block className="size-8 shrink-0 rounded-full lg:size-10" />
        <div className="min-w-0 flex-1">
          <Block className="h-8 w-[127px] rounded-control lg:h-[26px]" />
        </div>
        <Block className="h-9 w-[375px] rounded-control max-lg:hidden" />
        <div className="flex size-14 shrink-0 items-center justify-center">
          <Block className="size-6 rounded-[4px]" />
        </div>
      </div>
      <Block className="mt-8 h-9 rounded-control lg:hidden" />
      <div className="mt-6 flex h-10 border-b border-neutral-300">
        {[0, 1, 2, 3].map((tab) => (
          <div key={tab} className="flex flex-1 justify-center">
            <Block className="h-6 w-[70px] rounded-control" />
          </div>
        ))}
      </div>
      <div className={cn("mt-8 lg:mt-6", STORE_BODY)}>
        <ComplianceBodySkeleton overview />
      </div>
    </SkeletonPage>
  );
}

export function ComplianceBodySkeleton({ overview }: { overview: boolean }) {
  if (!overview) {
    return (
      <div className="flex flex-col gap-4 lg:gap-6">
        <Block className="h-6 w-[160px] rounded-control" />
        {[0, 1, 2].map((card) => (
          <Block key={card} className="h-[86px] rounded-card" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 lg:gap-6 lg:pr-4">
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((stat) => (
          <Block key={stat} className="h-[122px] rounded-card" />
        ))}
      </div>
      <Block className="h-[86px] rounded-card" />
      <div className="flex flex-col gap-4">
        <Block className="h-6 w-[200px] rounded-control" />
        <div className="flex gap-3 overflow-hidden max-lg:-mx-4 max-lg:px-4">
          {[0, 1, 2].map((card) => (
            <Block
              key={card}
              className="h-24 w-[239px] shrink-0 rounded-card lg:w-auto lg:flex-1"
            />
          ))}
        </div>
      </div>
      {[0, 1, 2].map((section) => (
        <div key={section} className="flex flex-col gap-4">
          <Block className="h-6 w-[140px] rounded-control" />
          <Block className="h-[88px] rounded-card lg:h-[90px]" />
        </div>
      ))}
    </div>
  );
}
