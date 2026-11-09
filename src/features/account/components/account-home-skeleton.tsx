import { SkeletonBlock as Block, SkeletonPage } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { ACCOUNT_COLUMN } from "./account-layout";

function Row({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 px-5", className)}>
      <Block className="size-12 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Block className="h-5 w-[160px] max-w-full" />
        <Block className="h-4 w-[240px] max-w-full" />
      </div>
    </div>
  );
}

export function AccountHomeSkeleton({ banner }: { banner: boolean }) {
  return (
    <SkeletonPage className={ACCOUNT_COLUMN}>
      <div className="flex flex-col gap-6 lg:gap-9">
        <div className="flex flex-col gap-2 lg:gap-9">
          <Block className="h-8 w-[104px] lg:h-10 lg:w-[136px]" />

          <div className="flex flex-col gap-6 rounded-card-lg border border-[#e5e7eb] bg-white p-8 lg:flex-row lg:items-center">
            <div className="flex min-w-0 items-center gap-4 lg:flex-1">
              <Block className="size-20 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Block className="h-7 w-[180px] max-w-full" />
                <Block className="h-5 w-[240px] max-w-full" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 lg:w-[209px]">
              <Block className="h-10 w-12" />
              <Block className="h-5 w-[84px]" />
            </div>
          </div>
          {banner && <Block className="h-14 sm:h-[52px]" />}
        </div>

        <div className="flex flex-col gap-2 lg:gap-4">
          <Block className="h-7 w-[92px]" />
          <div className="overflow-hidden rounded-card-lg border border-[#e5e7eb] bg-white">
            <div className="divide-y divide-[#e5e7eb]">
              <Row className="h-[93px]" />
              <Row className="h-[93px]" />
              <Row className="hidden h-[93px] lg:flex" />
              <Row className="h-[93px]" />
              <Row className="h-[92px]" />
            </div>
            <Row className="h-[93px] border-t border-[#e5e7eb]" />
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
