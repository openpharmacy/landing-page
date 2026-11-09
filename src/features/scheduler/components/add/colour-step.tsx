"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  MEDICATION_COLOURS,
  type MedicationColour,
} from "@/features/scheduler/model/schedule";
import { cn } from "@/lib/utils";

const NAMES: Record<MedicationColour, string> = {
  "#6366F1": "Indigo",
  "#10B981": "Green",
  "#F59E0B": "Amber",
  "#EF4444": "Red",
  "#06B6D4": "Cyan",
  "#84CC16": "Lime",
  "#F97316": "Orange",
  "#EC4899": "Pink",
};

const GRADIENT_50 = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' preserveAspectRatio='none'%3E%3ClinearGradient id='g' gradientUnits='userSpaceOnUse' x2='1' gradientTransform='matrix(0.27356 0.55357 -0.01604 0.27356 0.02322 -0.13678)'%3E%3Cstop stop-color='%2375c2ff'/%3E%3Cstop offset='1' stop-color='%23269df9'/%3E%3C/linearGradient%3E%3Crect width='1' height='1' fill='url(%23g)' opacity='0.5'/%3E%3C/svg%3E")`;

export function ColourStep({
  colour,
  onColour,
  onSave,
}: {
  colour: MedicationColour | null;
  onColour: (colour: MedicationColour) => void;
  onSave: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col px-4 pt-[25px] lg:px-6 lg:pt-6 lg:pb-9">
      <span
        id="colour-label"
        className="font-brand text-[12.25px] leading-[17.5px] tracking-[-0.018px] text-secondary-900"
      >
        Color
      </span>
      <div
        role="radiogroup"
        aria-labelledby="colour-label"
        className="mt-[7px] grid grid-cols-4 grid-rows-[108px_110px] gap-x-1 gap-y-[7px]"
      >
        {MEDICATION_COLOURS.map((c) => {
          const on = c === colour;
          return (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={NAMES[c]}
              onClick={() => onColour(c)}
              className={cn(
                "flex items-center justify-center rounded-card",
                on && "border border-white",
              )}
              style={{ backgroundColor: c }}
            >
              {on && (
                <Icon src="/icons/scheduler/add/tick-circle.svg" size={24} />
              )}
            </button>
          );
        })}
      </div>
      <Button
        type="button"
        disabled={!colour}
        onClick={onSave}
        className="w-full max-lg:mx-auto max-lg:mt-auto max-lg:mb-[34px] max-lg:max-w-[358px] lg:mt-[23px]"
        style={colour ? undefined : { backgroundImage: GRADIENT_50 }}
      >
        <span className="lg:hidden">Submit</span>
        <span className="max-lg:hidden">Next</span>
      </Button>
    </div>
  );
}
