"use client";

import { SkeletonBlock as Block, SkeletonPage } from "@/components/ui/skeleton";
import { useRehydrateSideEffects } from "@/features/compliance/model/side-effect-store";
import { useRehydrateVitals } from "@/features/compliance/model/vitals-store";
import { HomeSkeleton } from "@/features/home/components/home-skeleton";
import { useRehydrateSchedules } from "@/features/scheduler/model/store";

type Step = "dose" | "taken" | "symptoms" | "vitals";

export function LogPageSkeleton({ step }: { step: Step }) {
  return (
    <>
      <div className="max-lg:hidden" inert>
        <HomeSkeleton />
      </div>
      <LogDialogSkeleton step={step} />
    </>
  );
}

export function LogDialogSkeleton({ step }: { step: Step }) {
  useRehydrateSchedules();
  useRehydrateSideEffects();
  useRehydrateVitals();
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white lg:bg-black/60">
      <div className="flex min-h-full lg:items-center lg:justify-center lg:p-4">
        <div className="flex w-full flex-col bg-white lg:w-[448px] lg:rounded-card">
          <SkeletonPage className="flex flex-1 flex-col">
            {step === "dose" && <Dose />}
            {step === "taken" && <Taken />}
            {step === "symptoms" && <Symptoms />}
            {step === "vitals" && <Vitals />}
          </SkeletonPage>
        </div>
      </div>
    </div>
  );
}

function CloseBar() {
  return (
    <div className="flex justify-end p-6">
      <Block className="size-6 rounded-[4px]" />
    </div>
  );
}

function TitleBar() {
  return (
    <div className="flex items-center gap-4 border-b border-neutral-300 p-6">
      <Block className="size-8 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-1">
        <Block className="h-7 w-[200px] rounded-control" />
        <Block className="h-4 w-[170px] rounded-control" />
      </div>
      <Block className="size-6 shrink-0 rounded-[4px]" />
    </div>
  );
}

function Dose() {
  return (
    <>
      <CloseBar />
      <div className="flex flex-1 flex-col justify-center-safe px-6 pt-6 pb-9 max-lg:max-h-[760px] lg:flex-none">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-[125px] items-center justify-center">
              <Block className="size-[102px] rounded-full" />
            </div>
            <Block className="h-8 w-[278px] rounded-control" />
            <Block className="h-6 w-[60px] rounded-control" />
          </div>
          <Block className="h-[76px] rounded-card" />
          <div className="flex flex-col gap-4">
            <Block className="h-14 rounded-card" />
            <div className="flex gap-4">
              <Block className="h-14 flex-1 rounded-card" />
              <Block className="h-14 flex-1 rounded-card" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Taken() {
  return (
    <>
      <CloseBar />
      <div className="flex flex-col gap-12 px-6 pt-6 pb-9">
        <div className="flex flex-col items-center gap-2">
          <Block className="size-[100px] rounded-full" />
          <Block className="h-8 w-[110px] rounded-control" />
          <Block className="h-6 w-[225px] rounded-control" />
        </div>
        <Block className="h-[272px] rounded-[20px] lg:h-[248px]" />
        <div className="flex flex-col items-center gap-2">
          <Block className="h-14 w-full rounded-card" />
          <Block className="h-8 w-[267px] rounded-control" />
        </div>
      </div>
    </>
  );
}

function Symptoms() {
  return (
    <>
      <TitleBar />
      <div className="flex flex-col gap-[23px] px-6 pt-6 pb-9">
        <Block className="h-14 rounded-[10px]" />
        <div className="grid grid-cols-2 gap-[10.5px]">
          {Array.from({ length: 10 }, (_, i) => (
            <Block key={i} className="h-[101.5px] rounded-card" />
          ))}
        </div>
        <Block className="h-14 rounded-card" />
      </div>
    </>
  );
}

function Vitals() {
  return (
    <>
      <TitleBar />
      <div className="flex flex-1 flex-col justify-between gap-9 px-6 pt-6 pb-[53px] lg:justify-start lg:pb-9">
        <div className="flex flex-col gap-9">
          <Block className="h-14 rounded-[10px]" />
          <div className="flex flex-col gap-2">
            {[0, 1, 2, 3].map((row) => (
              <Block key={row} className="h-[72px] rounded-card" />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Block className="h-14 flex-1 rounded-card" />
          <Block className="h-14 flex-1 rounded-card" />
        </div>
      </div>
    </>
  );
}
