"use client";

import { SkeletonBlock as Block, SkeletonPage } from "@/components/ui/skeleton";
import { useShowHidden } from "@/providers/hidden-screens";

import { HOME_COLUMN } from "./home-layout";

function CardRow() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Block className="h-[112px] lg:h-[114px]" />
      <Block className="h-[112px] lg:h-[114px]" />
    </div>
  );
}

export function HomeSkeleton({ banner = false }: { banner?: boolean }) {
  const showHidden = useShowHidden();
  return (
    <SkeletonPage className={HOME_COLUMN}>
      <div className="flex flex-col gap-9">
        {banner && <Block className="h-14 lg:h-[52px]" />}
        <Block className="h-[50px] max-w-[475px] lg:h-[58px]" />
        <div className="flex flex-col gap-2">
          {showHidden && <CardRow />}
          <Block className="h-[112px] lg:h-[114px]" />
        </div>
        {showHidden && (
          <>
            <Block className="h-[58px]" />
            <Block className="h-[58px]" />
          </>
        )}
        <CardRow />
        <Block className="h-[58px]" />
      </div>
    </SkeletonPage>
  );
}
