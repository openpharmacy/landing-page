"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import {
  SYMPTOMS,
  type Severity,
  type SideEffectEntry,
  type Symptom,
} from "@/features/compliance/model/side-effects";
import { cn } from "@/lib/utils";

import { BackButton, CloseButton, TitleBar } from "./dialog-header";
import { formatLongDate } from "./format";
import { LogDialog } from "./log-dialog";
import {
  MedicationInfo,
  NoteField,
  PrimaryAction,
  SeverityPicker,
  SymptomGrid,
} from "./side-effect-steps";
import { useIsDesktop } from "./use-client-state";

type Step =
  | { kind: "pick" }
  | { kind: "severity"; index: number }
  | { kind: "notes" };

export type SideEffectDraft = Pick<SideEffectEntry, "symptoms" | "note">;

const RECORD_HEADERS: Record<Step["kind"], [string, string]> = {
  pick: ["Record Side Effects", "Select any side effects you experienced"],
  severity: ["Record Side Effects", "Rate the severity"],
  notes: ["Additional Notes", "Add any additional details (optional)"],
};

export function SideEffectFlow({
  mode,
  medication,
  date,
  initial,
  onExit,
  onSave,
}: {
  mode: "record" | "edit";
  medication: string;
  date: string;
  initial?: SideEffectDraft;
  onExit: () => void;
  onSave: (draft: SideEffectDraft) => void;
}) {
  const [step, setStep] = useState<Step>({ kind: "pick" });
  const [selected, setSelected] = useState<Symptom[]>(
    () => initial?.symptoms.map((s) => s.symptom) ?? [],
  );
  const [severities, setSeverities] = useState<
    Partial<Record<Symptom, Severity>>
  >(() =>
    Object.fromEntries(
      (initial?.symptoms ?? []).map((s) => [s.symptom, s.severity]),
    ),
  );
  const [note, setNote] = useState(initial?.note ?? "");
  const [empty, setEmpty] = useState(false);
  const saved = useRef(false);
  const isDesktop = useIsDesktop();

  const symptoms = SYMPTOMS.filter((symptom) => selected.includes(symptom));
  const last = symptoms.length - 1;

  const toggle = (symptom: Symptom) => {
    setEmpty(false);
    setSelected((current) =>
      current.includes(symptom)
        ? current.filter((s) => s !== symptom)
        : [...current, symptom],
    );
  };

  const back = () => {
    if (step.kind === "pick") onExit();
    else if (step.kind === "notes")
      setStep(last >= 0 ? { kind: "severity", index: last } : { kind: "pick" });
    else if (step.index > 0)
      setStep({ kind: "severity", index: step.index - 1 });
    else setStep({ kind: "pick" });
  };

  const rate = (index: number, severity: Severity) => {
    setSeverities((current) => ({ ...current, [symptoms[index]]: severity }));
    setStep(
      index < last ? { kind: "severity", index: index + 1 } : { kind: "notes" },
    );
  };

  const complete = () => {
    if (saved.current) return;
    if (mode === "edit" && symptoms.length === 0 && !note.trim()) {
      setEmpty(true);
      return;
    }
    saved.current = true;
    onSave({
      symptoms: symptoms.map((symptom) => ({
        symptom,
        severity: severities[symptom] ?? "Mild",
      })),
      note: note.trim() || undefined,
    });
  };

  const page = mode === "edit" && !isDesktop;
  const stepKey =
    step.kind === "severity" ? `severity-${step.index}` : step.kind;

  let content: ReactNode;
  if (step.kind === "pick") {
    content = (
      <div className={cn("flex flex-col", page ? "gap-9" : "gap-[23px]")}>
        <MedicationInfo
          label={mode === "record" ? "After Taking" : "Medication:"}
          medication={medication}
          className={page ? "bg-white" : "bg-bg-app"}
        />
        <SymptomGrid selected={selected} onToggle={toggle} />
        <PrimaryAction
          onClick={() =>
            setStep(
              symptoms.length
                ? { kind: "severity", index: 0 }
                : { kind: "notes" },
            )
          }
        >
          Continue
        </PrimaryAction>
      </div>
    );
  } else if (step.kind === "severity") {
    const symptom = symptoms[step.index];
    content = (
      <SeverityPicker
        key={symptom}
        symptom={symptom}
        step={step.index + 1}
        steps={symptoms.length}
        current={severities[symptom]}
        onPick={(severity) => rate(step.index, severity)}
      />
    );
  } else {
    content = (
      <>
        <NoteField
          value={note}
          onChange={(value) => {
            setNote(value);
            setEmpty(false);
          }}
          className={page ? undefined : "flex-1 lg:flex-none"}
        />
        {empty && (
          <p role="alert" className="text-body-14 text-error-500">
            Select a side effect or add a note to save this entry.
          </p>
        )}
        <PrimaryAction onClick={complete}>Complete</PrimaryAction>
      </>
    );
  }

  if (page) {
    return (
      <EditPage date={date} stepKey={stepKey} onBack={back}>
        {step.kind === "notes" ? (
          <div className="flex flex-col gap-[17px]">{content}</div>
        ) : (
          content
        )}
      </EditPage>
    );
  }

  const [title, subtitle] =
    mode === "record"
      ? RECORD_HEADERS[step.kind]
      : ["Edit Side Effect", formatLongDate(date)];

  return (
    <LogDialog label={title} onClose={onExit} focusKey={stepKey}>
      {mode === "record" ? (
        <TitleBar
          title={title}
          subtitle={subtitle}
          onBack={back}
          onClose={onExit}
        />
      ) : (
        <EditTitleBar subtitle={subtitle} onBack={back} onClose={onExit} />
      )}
      <div
        className={cn(
          "flex flex-col px-6 pt-6 pb-9",
          step.kind === "severity" &&
            "flex-1 justify-center-safe max-lg:max-h-[697px] lg:flex-none",
          step.kind === "notes" && "flex-1 gap-[17px] lg:flex-none",
        )}
      >
        {content}
      </div>
    </LogDialog>
  );
}

function EditTitleBar({
  subtitle,
  onBack,
  onClose,
}: {
  subtitle: string;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-neutral-300 p-6">
      <span className="flex py-1">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#8BBDE5] bg-[linear-gradient(135deg,#BEE1FC,#C5DBED_20%,#CFDCE6_40%,#DCE2E6_60%,#ECEDEF_80%,#FFF)] transition-opacity hover:opacity-80"
        >
          <Icon src="/icons/compliance/log/back-secondary.svg" size={24} />
        </button>
      </span>
      <div className="flex w-[305px] shrink-0 flex-col">
        <h2 className="text-title-20 text-secondary-900">Edit Side Effect</h2>
        <p className="text-caption-12 text-secondary-300">{subtitle}</p>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
}

function EditPage({
  date,
  stepKey,
  onBack,
  children,
}: {
  date: string;
  stepKey: string;
  onBack: () => void;
  children: ReactNode;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const firstStep = useRef(stepKey);
  useEffect(() => {
    if (stepKey !== firstStep.current) heading.current?.focus();
  }, [stepKey]);

  return (
    <div className="min-h-[905px] px-4 pt-[17px]">
      <div className="flex flex-col gap-8">
        <div className="flex h-12 items-center gap-4">
          <BackButton onClick={onBack} />
          <div className="flex min-w-0 flex-1 flex-col">
            <h1
              ref={heading}
              tabIndex={-1}
              className="text-h4-24 text-secondary-900 outline-none"
            >
              Edit Side Effect
            </h1>
            <p className="text-caption-12 text-secondary-300">
              {formatLongDate(date)}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
