import type { CSSProperties, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  SEVERITIES,
  SYMPTOMS,
  type Severity,
  type Symptom,
} from "@/features/compliance/model/side-effects";
import { cn } from "@/lib/utils";

export const NOTE_LIMIT = 200;

function SymptomArt({
  symptom,
  large = false,
  className,
}: {
  symptom: Symptom;
  large?: boolean;
  className: string;
}) {
  const base = `/icons/compliance/symptoms/${symptom.toLowerCase().replace(" ", "-")}${large ? "-large" : ""}`;
  const style: CSSProperties = {
    backgroundImage: `image-set(url("${base}.webp") 1x, url("${base}@2x.webp") 2x)`,
    backgroundSize: "100% 100%",
  };
  return <span aria-hidden className={cn("block", className)} style={style} />;
}

const LEVELS: Record<Severity, { text: string; icon: string; tint: string }> = {
  Mild: {
    text: "Barely noticeable",
    icon: "mild.svg",
    tint: "bg-success-500/20",
  },
  Moderate: {
    text: "Uncomfortable",
    icon: "moderate.svg",
    tint: "bg-[#F39C12]/20",
  },
  Severe: {
    text: "Very bothersome",
    icon: "severe.svg",
    tint: "bg-error-500/20",
  },
};

export function MedicationInfo({
  label,
  medication,
  className,
}: {
  label: string;
  medication: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex gap-1 rounded-[10px] p-4 text-[14px] leading-6 text-secondary-300",
        className,
      )}
    >
      <span>{label}</span>
      <span className="font-bold">{medication}</span>
    </p>
  );
}

export function SymptomGrid({
  selected,
  onToggle,
}: {
  selected: Symptom[];
  onToggle: (symptom: Symptom) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Side effects"
      className="grid grid-cols-2 gap-[10.5px]"
    >
      {SYMPTOMS.map((symptom) => {
        const on = selected.includes(symptom);
        return (
          <button
            key={symptom}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(symptom)}
            className={cn(
              "flex h-[101.5px] flex-col items-center justify-center gap-[7px] rounded-[12.75px] bg-white transition-colors",
              on
                ? "border-2 border-info-500"
                : "border border-neutral-300 hover:bg-bg-section",
            )}
          >
            <SymptomArt
              symptom={symptom}
              className={cn(
                "w-[49px] rounded-[12.75px]",
                on ? "h-[45px]" : "h-[47px]",
              )}
            />
            <span className="h-[17.5px] pt-[0.5px] text-caption-12 text-secondary-900">
              {symptom}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SeverityPicker({
  symptom,
  step,
  steps,
  current,
  onPick,
}: {
  symptom: Symptom;
  step: number;
  steps: number;
  current?: Severity;
  onPick: (severity: Severity) => void;
}) {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col items-center gap-3.5 text-center">
        <p className="text-caption-12 text-secondary-300">
          Step {step} of {steps}
        </p>
        <span className="flex rounded-[14px] bg-[#F59E0B]/[0.125]">
          <SymptomArt
            symptom={symptom}
            large
            className="h-[69px] w-[75px] rounded-[12.75px]"
          />
        </span>
        <div className="flex h-[63px] flex-col gap-[3.5px]">
          <h3 className="text-title-20 text-secondary-900">{symptom}</h3>
          <p className="text-body-16 text-secondary-300">
            How severe is this side effect?
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {SEVERITIES.map((severity) => {
          const { text, icon, tint } = LEVELS[severity];
          const on = severity === current;
          return (
            <button
              key={severity}
              type="button"
              aria-pressed={current ? on : undefined}
              onClick={() => onPick(severity)}
              className={cn(
                "flex gap-2 rounded-card bg-white text-left transition-colors hover:bg-bg-section",
                on
                  ? "border-2 border-info-500 p-[14px]"
                  : "border border-neutral-300 p-[15px]",
              )}
            >
              <span className="flex py-1">
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-control",
                    tint,
                  )}
                >
                  <Icon src={`/icons/compliance/log/${icon}`} size={24} />
                </span>
              </span>
              <span className="flex flex-col">
                <span className="text-body-16-bold text-neutral-900">
                  {severity}
                </span>
                <span className="text-body-14 text-secondary-300">{text}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function NoteField({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor="side-effect-note"
        className="text-body-14 text-secondary-900"
      >
        Add Note
      </label>
      <div className="flex flex-col gap-1">
        <textarea
          id="side-effect-note"
          value={value}
          maxLength={NOTE_LIMIT}
          aria-describedby="side-effect-note-count"
          onChange={(event) => onChange(event.target.value)}
          placeholder="How are you feeling? Any additional details..."
          className="h-[195px] resize-none rounded-[4px] border border-neutral-300 bg-white px-[11px] py-[7px] text-body-16 text-secondary-900 outline-none placeholder:text-[#9EB6C9] focus-visible:border-info-500 lg:h-[148px]"
        />
        <span
          id="side-effect-note-count"
          className="self-end text-[10px] leading-3 text-neutral-700"
        >
          {value.length}/{NOTE_LIMIT}
        </span>
      </div>
    </div>
  );
}

export function PrimaryAction({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button type="button" className="w-full" onClick={onClick}>
      {children}
    </Button>
  );
}
