import { SkeletonBlock as Block, SkeletonPage } from "@/components/ui/skeleton";

import { PROFILE_COLUMN } from "./account-layout";

function Field() {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Block className="h-5 w-[96px]" />
      <Block className="h-14" />
    </div>
  );
}

export function EditProfileSkeleton() {
  return (
    <SkeletonPage className={PROFILE_COLUMN}>
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-1 lg:gap-4">
          <Block className="h-6 w-[62px]" />
          <Block className="h-8 w-[144px] lg:h-10 lg:w-[192px]" />
        </div>

        <div className="flex flex-col gap-4 lg:gap-2.5 lg:rounded-card-lg lg:border lg:border-[#e5e7eb] lg:bg-white lg:px-[23px] lg:pt-[23px] lg:pb-[47px]">
          <div className="flex justify-center">
            <Block className="size-32 rounded-full" />
          </div>
          <div className="flex flex-col gap-[23px]">
            <div className="flex flex-col gap-[23px] lg:flex-row">
              <Field />
              <Field />
            </div>
            <Field />
            <Field />
            <Field />
            <div className="grid grid-cols-2 gap-3">
              <Block className="h-14" />
              <Block className="h-14" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}
