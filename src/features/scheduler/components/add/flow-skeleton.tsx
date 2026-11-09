"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

import { SkeletonBlock as Block, SkeletonPage } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function AddMedicationSkeleton() {
  const params = useSearchParams();
  const edit = params.has("edit");
  const form = edit || params.has("script");
  return (
    <div className="fixed inset-0 z-50 max-lg:overflow-y-auto lg:flex lg:items-center lg:justify-center lg:p-4">
      <div className="absolute inset-0 bg-black/60 max-lg:hidden" />
      <div className="relative flex min-h-full flex-col bg-white lg:max-h-[max(calc(100dvh-291px),min(100%,560px))] lg:min-h-0 lg:w-[448px] lg:overflow-hidden lg:rounded-card">
        <SkeletonPage className="flex flex-col">
          <div
            className={cn(
              "flex items-center border-b border-neutral-300 py-6 max-lg:pr-[25px] max-lg:pl-[23px] lg:px-6",
              form ? "gap-4" : "gap-[21px] lg:gap-4",
            )}
          >
            {form && !edit && (
              <Block className="my-1 size-10 shrink-0 rounded-full" />
            )}
            <div className="flex-1">
              <Block
                className={cn(
                  "w-[170px] rounded-control",
                  form ? "h-7" : "h-[30px] lg:h-8 lg:w-[190px]",
                )}
              />
            </div>
            <Block className="size-6 shrink-0 rounded-[4px]" />
          </div>
          {form ? (
            <div className="flex flex-col gap-[23px] pt-6 pb-6 max-lg:px-[15px] lg:px-6 lg:pb-9 [&>*]:max-lg:max-w-[358px]">
              <Field>
                <Block className="h-14 rounded-control" />
              </Field>
              <Field>
                <Block className="h-14 rounded-control" />
              </Field>
              <Field>
                {edit && <Block className="h-[72px] rounded-[7px]" />}
                <Block className="h-[54.5px] rounded-card" />
              </Field>
              <Field>
                <Block className="h-14 rounded-control" />
              </Field>
              <Block className="h-[38px] w-[170px] rounded-control" />
              <Block className="h-14 rounded-card" />
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-6 pr-[25px] pb-6 pl-[23px] lg:gap-[17px] lg:px-6 lg:pb-9">
              <Block className="h-[108.5px] rounded-card" />
              <Block className="h-[87.5px] rounded-card" />
            </div>
          )}
        </SkeletonPage>
      </div>
    </div>
  );
}

function Field({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Block className="h-5 w-[120px] rounded-control" />
      {children}
    </div>
  );
}
