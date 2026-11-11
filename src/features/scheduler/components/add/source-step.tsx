import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function SourceStep({
  hasScripts,
  onScripts,
  onManual,
}: {
  hasScripts: boolean;
  onScripts: () => void;
  onManual: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 pt-6 pr-[25px] pb-6 pl-[23px] lg:gap-[17px] lg:px-6 lg:pb-9">
      {hasScripts && (
        <SourceCard
          onClick={onScripts}
          className="min-h-[108.5px]"
          icon={
            <span className="mr-3.5 flex size-[45px] items-center justify-center rounded-[10px] bg-[#d6eafc]">
              <Icon src="/icons/scheduler/add/clipboard.svg" size={24} />
            </span>
          }
          title="From Existing Scripts"
          text={
            <>
              Add a medication from your <br className="max-[349px]:hidden" />
              current prescriptions
            </>
          }
        />
      )}
      <SourceCard
        onClick={onManual}
        className="min-h-[87.5px]"
        icon={
          <span className="mr-[15px] flex size-11 items-center justify-center rounded-control bg-[#d6eafc]">
            <Icon src="/icons/scheduler/add/add.svg" size={24} />
          </span>
        }
        title="Add Manually"
        text="Enter medication details manually"
      />
    </div>
  );
}

function SourceCard({
  onClick,
  className,
  icon,
  title,
  text,
}: {
  onClick: () => void;
  className: string;
  icon: ReactNode;
  title: string;
  text: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full shrink-0 items-center rounded-card border border-neutral-300 bg-white pt-[18.5px] pr-[15.5px] pb-[18px] pl-[18.5px] text-left transition-colors hover:bg-bg-section",
        className,
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col gap-[3.5px]">
        <span className="text-body-16-bold text-secondary-900">{title}</span>
        <span className="text-[14px] leading-[21px] text-secondary-500">
          {text}
        </span>
      </span>
      <span className="ml-3.5 flex shrink-0">
        <Icon src="/icons/scheduler/add/chevron.svg" size={20} />
      </span>
    </button>
  );
}
