"use client";

import { useAchievements } from "@/features/compliance/model/use-report";
import { cn } from "@/lib/utils";

import { AchievementCard } from "./overview";
import { PageTitleRow, SectionHeader, STORE_BODY } from "./ui";

export function AchievementsList() {
  const achievements = useAchievements();
  const earned = achievements?.filter((item) => item.earned) ?? [];
  const pending = achievements?.filter((item) => !item.earned) ?? [];

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-[17px] pb-[74px] lg:max-w-[884px] lg:pt-6 lg:pr-0 lg:pb-[122px] lg:pl-[14px]">
      <PageTitleRow
        title="Achievements"
        backHref="/compliance"
        backLabel="Back to Compliance"
        className="h-10"
      />
      <div
        className={cn(
          "mt-8 flex flex-col gap-8 lg:mt-6 lg:gap-6 lg:pr-4",
          STORE_BODY,
        )}
      >
        {achievements &&
          [
            { title: "Earned", items: earned },
            { title: "Not earned yet", items: pending },
          ].map(
            ({ title, items }) =>
              items.length > 0 && (
                <section key={title} className="flex flex-col gap-4">
                  <SectionHeader title={title} />
                  <ul className="flex flex-col gap-3">
                    {items.map((achievement) => (
                      <AchievementCard
                        key={achievement.kind}
                        achievement={achievement}
                      />
                    ))}
                  </ul>
                </section>
              ),
          )}
      </div>
    </div>
  );
}
