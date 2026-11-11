"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  isoDate,
  VITAL_LABELS,
  VITAL_TYPES,
  type VitalReading,
  type VitalType,
} from "@/features/compliance/model/vitals";
import {
  useRehydrateVitals,
  useVitalsStore,
} from "@/features/compliance/model/vitals-store";
import {
  useRehydrateSchedules,
  useScheduleStore,
} from "@/features/scheduler/model/store";
import { cn } from "@/lib/utils";

import { ICONS } from "./ui";

type Field = {
  id: string;
  label: string;
  min: number;
  max: number;
};

const FIELDS: Record<VitalType, Field[]> = {
  bloodPressure: [
    { id: "systolic", label: "Systolic", min: 50, max: 250 },
    { id: "diastolic", label: "Diastolic", min: 30, max: 150 },
  ],
  heartRate: [
    { id: "heartRate", label: "Heart Rate (bpm)", min: 30, max: 220 },
  ],
  bloodSugar: [
    { id: "bloodSugar", label: "Blood Sugar (mg/dL)", min: 20, max: 600 },
  ],
  weight: [{ id: "weight", label: "Weight (kg)", min: 20, max: 300 }],
};

const ROW_ICONS: Record<VitalType, string> = {
  bloodPressure: "heart",
  heartRate: "pulse-bold",
  bloodSugar: "drop",
  weight: "weight",
};

const TILES: Record<VitalType, { icon: string; width: number; tint: string }> =
  {
    bloodPressure: { icon: "heart-large", width: 34, tint: "bg-error-500/20" },
    heartRate: { icon: "pulse-large", width: 35, tint: "bg-[#37B5FE]/20" },
    bloodSugar: { icon: "drop", width: 34, tint: "bg-error-500/20" },
    weight: { icon: "weight", width: 34, tint: "bg-primary-500/20" },
  };

function invalidFields(type: VitalType, values: Record<string, string>) {
  return FIELDS[type]
    .filter(({ id, min, max }) => {
      const value = Number(values[id]);
      return !values[id] || Number.isNaN(value) || value < min || value > max;
    })
    .map(({ id }) => id);
}

const nowTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
};

function valuesOf(reading: VitalReading): Record<string, string> {
  return reading.type === "bloodPressure"
    ? {
        systolic: String(reading.systolic),
        diastolic: String(reading.diastolic),
      }
    : { [reading.type]: String(reading.value) };
}

function toReading(
  type: VitalType,
  values: Record<string, string>,
  base: Omit<VitalReading, "type" | "value" | "systolic" | "diastolic">,
): VitalReading {
  return type === "bloodPressure"
    ? {
        ...base,
        type,
        systolic: Number(values.systolic),
        diastolic: Number(values.diastolic),
      }
    : { ...base, type, value: Number(values[type]) };
}

export type RecordVitalsProps = {
  scheduleId?: string;
  date?: string;
  time?: string;
  sideEffects?: boolean;
};

export function RecordVitals({
  scheduleId,
  date,
  time,
  sideEffects = false,
}: RecordVitalsProps) {
  const router = useRouter();
  useRehydrateSchedules();
  useRehydrateVitals();
  const medication = useScheduleStore(
    (state) => state.schedules.find((s) => s.id === scheduleId)?.name,
  );
  const addReadings = useVitalsStore((state) => state.addReadings);

  const [chosen, setChosen] = useState<VitalType[]>([]);
  const [step, setStep] = useState(-1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [invalid, setInvalid] = useState<string[]>([]);
  const saved = useRef(false);

  function exitHref(recorded: boolean) {
    if (!scheduleId) return "/compliance/vitals";
    const params = new URLSearchParams({ schedule: scheduleId });
    if (date) params.set("date", date);
    if (time) params.set("time", time);
    if (sideEffects) params.set("sideEffects", "1");
    if (recorded) params.set("vitals", "1");
    return `/compliance/dose/taken?${params}`;
  }
  const cancel = () => router.push(exitHref(false));

  function toggle(type: VitalType) {
    setChosen((current) =>
      current.includes(type)
        ? current.filter((t) => t !== type)
        : VITAL_TYPES.filter((t) => t === type || current.includes(t)),
    );
  }

  function next() {
    if (step === -1) {
      if (chosen.length === 0) cancel();
      else setStep(0);
      return;
    }
    const bad = invalidFields(chosen[step], values);
    setInvalid(bad);
    if (bad.length) return;
    if (step < chosen.length - 1) {
      setStep(step + 1);
      return;
    }
    if (saved.current) return;
    saved.current = true;
    const recordedAt = nowTime();
    const day = date ?? isoDate(new Date());
    addReadings(
      chosen.map((type) =>
        toReading(type, values, {
          id: `vital-${type}-${day}-${recordedAt}-${Date.now()}`,
          date: day,
          time: recordedAt,
          scheduleId,
          medication,
        }),
      ),
    );
    router.push(exitHref(true));
  }

  const back = () => {
    if (step === -1) cancel();
    else setStep(step - 1);
  };

  return (
    <VitalsDialog
      title="Record Side Effects"
      subtitle="Select vitals to record"
      onBack={back}
      onClose={cancel}
      onCancel={cancel}
      onContinue={next}
    >
      {step === -1 ? (
        <div className="flex flex-col gap-9">
          {medication && (
            <p className="flex h-14 items-center gap-1 rounded-[10px] bg-bg-app px-4 text-[14px] leading-6 text-secondary-300">
              After Taking <span className="font-bold">{medication}</span>
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {VITAL_TYPES.map((type) => {
              const checked = chosen.includes(type);
              return (
                <li key={type}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggle(type)}
                    className="flex h-[72px] w-full items-center gap-2 rounded-card border border-neutral-300 bg-white px-[15px] text-left transition-colors hover:border-primary-500"
                  >
                    <Icon src={`${ICONS}/${ROW_ICONS[type]}.svg`} size={24} />
                    <span className="flex-1 text-body-16-bold text-neutral-900">
                      {VITAL_LABELS[type]}
                    </span>
                    <span className="flex size-4 items-center justify-center rounded-full border border-footer-text">
                      {checked && (
                        <span className="size-2.5 rounded-full bg-primary-500" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <ValueStep
          type={chosen[step]}
          step={step}
          steps={chosen.length}
          values={values}
          invalid={invalid}
          onChange={(id, value) => setValues((v) => ({ ...v, [id]: value }))}
        />
      )}
    </VitalsDialog>
  );
}

export function EditVital({ readingId }: { readingId: string }) {
  const router = useRouter();
  useRehydrateVitals();
  const reading = useVitalsStore((state) =>
    state.readings.find((r) => r.id === readingId),
  );
  const hydrated = useVitalsStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated && !reading) router.replace("/compliance/vitals");
  }, [hydrated, reading, router]);

  return reading ? <EditVitalForm reading={reading} /> : null;
}

function EditVitalForm({ reading }: { reading: VitalReading }) {
  const router = useRouter();
  const updateReading = useVitalsStore((state) => state.updateReading);
  const [values, setValues] = useState(() => valuesOf(reading));
  const [invalid, setInvalid] = useState<string[]>([]);
  const done = () => router.push("/compliance/vitals");

  function save() {
    const bad = invalidFields(reading.type, values);
    setInvalid(bad);
    if (bad.length) return;
    const { type, ...base } = reading;
    updateReading(toReading(type, values, base));
    done();
  }

  const [y, m, d] = reading.date.split("-").map(Number);
  const subtitle = new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <VitalsDialog
      title={`Edit ${VITAL_LABELS[reading.type]}`}
      subtitle={subtitle}
      continueLabel="Save"
      onBack={done}
      onClose={done}
      onCancel={done}
      onContinue={save}
    >
      <ValueStep
        type={reading.type}
        values={values}
        invalid={invalid}
        onChange={(id, value) => setValues((v) => ({ ...v, [id]: value }))}
      />
    </VitalsDialog>
  );
}

function ValueStep({
  type,
  step,
  steps,
  values,
  invalid,
  onChange,
}: {
  type: VitalType;
  step?: number;
  steps?: number;
  values: Record<string, string>;
  invalid: string[];
  onChange: (id: string, value: string) => void;
}) {
  const tile = TILES[type];
  const fields = FIELDS[type];
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col items-center gap-3.5">
        {step !== undefined && steps !== undefined && (
          <span className="text-caption-12 text-secondary-300">
            Step {step + 1} of {steps}
          </span>
        )}
        <span
          className={cn(
            "flex size-[70px] items-center justify-center rounded-[14px]",
            tile.tint,
          )}
        >
          <Icon src={`${ICONS}/${tile.icon}.svg`} size={tile.width} />
        </span>
        <h3 className="h-[63px] text-title-20 text-secondary-900">
          {VITAL_LABELS[type]}
        </h3>
      </div>
      <div className="flex gap-4">
        {fields.map((field) => {
          const bad = invalid.includes(field.id);
          return (
            <div key={field.id} className="flex min-w-0 flex-1 flex-col gap-2">
              <label
                htmlFor={field.id}
                className="text-body-14 text-secondary-900"
              >
                {field.label}
              </label>
              <Input
                id={field.id}
                inputMode="decimal"
                autoComplete="off"
                value={values[field.id] ?? ""}
                aria-invalid={bad || undefined}
                aria-describedby={bad ? `${field.id}-error` : undefined}
                onChange={(event) => onChange(field.id, event.target.value)}
                className="h-14 rounded-[4px] py-0 text-neutral-900"
              />
              {bad && (
                <p
                  id={`${field.id}-error`}
                  className="text-body-14 text-error-500"
                >
                  Enter a value from {field.min} to {field.max}.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VitalsDialog({
  title,
  subtitle,
  continueLabel = "Continue",
  onBack,
  onClose,
  onCancel,
  onContinue,
  children,
}: {
  title: string;
  subtitle: string;
  continueLabel?: string;
  onBack: () => void;
  onClose: () => void;
  onCancel: () => void;
  onContinue: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vitals-dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-white lg:flex lg:items-center lg:justify-center lg:bg-black/60 lg:p-4"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
        className="flex min-h-full flex-col bg-white lg:min-h-0 lg:w-[448px] lg:rounded-card"
      >
        <div className="flex h-[97px] shrink-0 items-center gap-4 border-b border-neutral-300 px-6">
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="flex size-8 shrink-0 items-center justify-center rounded-[23px] bg-[#1C232A]/8 transition-opacity hover:opacity-80"
          >
            <Icon src={`${ICONS}/back-mobile.svg`} size={24} />
          </button>
          <div className="flex min-w-0 flex-1 flex-col">
            <h2
              id="vitals-dialog-title"
              className="text-h4-24 whitespace-nowrap text-secondary-900"
            >
              {title}
            </h2>
            <p className="text-caption-12 text-secondary-300">{subtitle}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="size-6 shrink-0 transition-opacity hover:opacity-70"
          >
            <Icon src={`${ICONS}/close.svg`} size={24} />
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-9 px-6 pt-6 pb-[53px] lg:justify-start lg:pb-9">
          {children}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {continueLabel}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
