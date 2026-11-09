import { SkeletonBlock as Block, SkeletonPage } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { MY_SCRIPTS_COLUMN, SCRIPT_DETAIL_COLUMN } from "./scripts-layout";

function Title({ className, wraps }: { className: string; wraps?: boolean }) {
  return (
    <div className="flex min-h-14 min-w-0 flex-1 flex-col justify-center gap-2 lg:min-h-16">
      <Block className={cn("h-7 lg:h-9", className)} />
      {wraps && <Block className="h-7 max-w-[160px] lg:hidden" />}
      <Block className="h-4 max-w-[247px]" />
    </div>
  );
}

const Circle = ({ className }: { className?: string }) => (
  <Block className={cn("size-10 shrink-0 rounded-full", className)} />
);

export function MyScriptsSkeleton() {
  return (
    <SkeletonPage className={cn(MY_SCRIPTS_COLUMN, "pt-4 pb-8")}>
      <div className="flex flex-col gap-9">
        <div className="flex items-center gap-4">
          <Title className="max-w-[160px] lg:max-w-[200px]" />
          <Block className="size-14 shrink-0" />
        </div>
        <div className="flex gap-4">
          <Block className="h-14 flex-1 lg:w-[122px] lg:flex-none" />
          <Block className="h-14 flex-1 lg:w-[106px] lg:flex-none" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Circle />
            <Block className="h-6 w-40" />
          </div>
          {[0, 1, 2, 3].map((card) => (
            <Block key={card} className="h-[166px]" />
          ))}
        </div>
      </div>
    </SkeletonPage>
  );
}

export function ScriptDetailSkeleton() {
  return (
    <SkeletonPage className={SCRIPT_DETAIL_COLUMN}>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-9 lg:flex-row lg:items-start lg:gap-4">
          <div className="flex flex-1 items-start gap-4">
            <Circle className="my-1" />
            <Title className="max-w-[450px]" wraps />
          </div>
          <Block className="size-14 self-end lg:self-auto" />
        </div>
        <div className="flex flex-col gap-4">
          <Block className="h-[277px]" />
          <Block className="h-[263px]" />
          <Block className="h-[104px]" />
          <Block className="h-[127px]" />
        </div>
      </div>
    </SkeletonPage>
  );
}
