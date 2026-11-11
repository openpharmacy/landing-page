"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import { newId } from "@/features/scheduler/model/id";
import type { Schedule } from "@/features/scheduler/model/schedule";
import {
  loadSchedules,
  useRehydrateSchedules,
  useScheduleStore,
} from "@/features/scheduler/model/store";

import { detailsHref, schedulerHref } from "../views/links";
import { useSchedulesHydrated } from "../views/use-clock";
import { AddTime } from "./add-time";
import { ColourStep } from "./colour-step";
import {
  DEFAULT_TIME,
  draftFromSchedule,
  localDate,
  newDraft,
  toSchedule,
  type Draft,
} from "./draft";
import type { PickableScript } from "./existing-scripts";
import { AddMedicationSkeleton } from "./flow-skeleton";
import { NoteStep } from "./note-step";
import { ScheduleForm } from "./schedule-form";
import { ScriptsStep } from "./scripts-step";
import { FlowShell, StepHeader } from "./shell";
import { SourceStep } from "./source-step";

type Step = "source" | "scripts" | "form" | "time" | "note" | "colour";
type Start = { step: Step; draft: Draft; fromScripts: boolean };

type Props = {
  scripts: PickableScript[];
  date: string | null;
  time: string | null;
};

export function AddMedicationFlow({
  script,
  edit,
  ...props
}: Props & {
  script?: string | null;
  edit?: string | null;
}) {
  useRehydrateSchedules();
  const hydrated = useSchedulesHydrated();
  const editing = useScheduleStore((s) =>
    edit ? s.schedules.find((item) => item.id === edit) : undefined,
  );

  if (edit) {
    if (!hydrated) return <AddMedicationSkeleton />;
    if (!editing) return <Missing date={props.date} />;
    return (
      <Flow
        {...props}
        editing={editing}
        start={{
          step: "form",
          draft: draftFromSchedule(editing),
          fromScripts: false,
        }}
      />
    );
  }

  const picked = script
    ? props.scripts.find((item) => item.id === script)
    : undefined;
  const draft = newDraft(props.time);
  return (
    <Flow
      {...props}
      start={
        picked
          ? {
              step: "form",
              draft: {
                ...draft,
                name: picked.name,
                form: picked.form,
                scriptId: picked.id,
              },
              fromScripts: true,
            }
          : { step: "source", draft, fromScripts: false }
      }
    />
  );
}

function Flow({
  scripts,
  date,
  time,
  start,
  editing,
}: Props & { start: Start; editing?: Schedule }) {
  const router = useRouter();
  const addSchedule = useScheduleStore((s) => s.addSchedule);
  const replaceSchedule = useScheduleStore((s) => s.replaceSchedule);
  const [step, setStep] = useState<Step>(start.step);
  const [fromScripts, setFromScripts] = useState(start.fromScripts);
  const [draft, setDraft] = useState<Draft>(start.draft);
  const saving = useRef(false);
  const title = editing ? "Edit Medication" : "Add Medication";

  const update = useCallback(
    (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch })),
    [],
  );

  const detailsPath = editing ? detailsHref(editing.id, date) : null;

  const close = useCallback(() => {
    if (cameFromThisSite()) router.back();
    else if (detailsPath) router.push(detailsPath);
    else router.push(date ? `/scheduler?view=week&date=${date}` : "/scheduler");
  }, [router, date, detailsPath]);

  async function save() {
    if (!draft.colour || saving.current) return;
    saving.current = true;
    const filled = { ...draft, colour: draft.colour };
    if (editing && detailsPath) {
      replaceSchedule(
        toSchedule(filled, { id: editing.id, startDate: editing.startDate }),
      );
      if (cameFromThisSite()) router.back();
      else router.replace(detailsPath);
      return;
    }
    if (!useScheduleStore.persist.hasHydrated()) await loadSchedules();
    const startDate = date ?? localDate(new Date());
    addSchedule(toSchedule(filled, { id: newId(), startDate }));
    router.push(schedulerHref("day", startDate));
  }

  const grey = step === "note" || step === "colour";

  return (
    <FlowShell
      label={title}
      step={step}
      onClose={close}
      tone={grey ? "app" : "white"}
    >
      {step === "source" && (
        <>
          <StepHeader title="Add Medication" variant="choose" onClose={close} />
          <SourceStep
            hasScripts={scripts.length > 0}
            onScripts={() => setStep("scripts")}
            onManual={() => {
              setFromScripts(false);
              update({ name: "", form: undefined, scriptId: undefined });
              setStep("form");
            }}
          />
        </>
      )}

      {step === "scripts" && (
        <>
          <StepHeader
            title="What medication whould you like to add?"
            variant="pick"
            onBack={() => setStep("source")}
            onClose={close}
          />
          <div className="lg:min-h-0 lg:overflow-y-auto">
            <ScriptsStep
              scripts={scripts}
              onPick={(picked) => {
                setFromScripts(true);
                update({
                  name: picked.name,
                  form: picked.form,
                  scriptId: picked.id,
                });
                setStep("form");
              }}
            />
          </div>
        </>
      )}

      {(step === "form" || step === "time") && (
        <div
          className={
            step === "time"
              ? "flex flex-col lg:hidden"
              : "flex flex-col lg:min-h-0"
          }
        >
          <StepHeader
            title={title}
            onBack={
              editing
                ? undefined
                : () => setStep(fromScripts ? "scripts" : "source")
            }
            onClose={close}
          />
          <div className="lg:min-h-0 lg:overflow-y-auto">
            <ScheduleForm
              draft={draft}
              update={update}
              onAddTime={() => setStep("time")}
              onNext={() => setStep("note")}
            />
          </div>
        </div>
      )}

      {step === "time" && (
        <AddTime
          defaultTime={time ?? draft.intakes.at(-1)?.time ?? DEFAULT_TIME}
          taken={draft.intakes.map((intake) => intake.time)}
          onBack={() => setStep("form")}
          onClose={close}
          onAdd={(intake) => {
            update({ intakes: [...draft.intakes, intake] });
            setStep("form");
          }}
        />
      )}

      {step === "note" && (
        <>
          <StepHeader
            title={
              <>
                Add a note
                <span className="font-light italic"> (optional)</span>
              </>
            }
            variant="loose"
            onBack={() => setStep("form")}
            onClose={close}
          />
          <div className="lg:min-h-0 lg:overflow-y-auto">
            <NoteStep
              note={draft.note}
              suggestions={draft.suggestions}
              onNote={(note) => update({ note })}
              onSuggestions={(suggestions) => update({ suggestions })}
              onNext={() => setStep("colour")}
            />
          </div>
        </>
      )}

      {step === "colour" && (
        <>
          <StepHeader
            title="Select a color"
            variant="loose"
            onBack={() => setStep("note")}
            onClose={close}
          />
          <ColourStep
            colour={draft.colour}
            onColour={(colour) => update({ colour })}
            onSave={() => void save()}
          />
        </>
      )}
    </FlowShell>
  );
}

function Missing({ date }: { date: string | null }) {
  const router = useRouter();
  const close = useCallback(
    () => router.push(schedulerHref("day", date)),
    [router, date],
  );
  return (
    <FlowShell label="Edit Medication" step="missing" onClose={close}>
      <StepHeader title="Edit Medication" onClose={close} />
      <p className="px-6 pt-6 pb-9 text-body-16 text-secondary-500 max-lg:px-[23px]">
        This medication is no longer in your schedule.
      </p>
    </FlowShell>
  );
}

function cameFromThisSite() {
  const { navigation } = window as Window & {
    navigation?: { canGoBack: boolean };
  };
  if (navigation) return navigation.canGoBack;
  return (
    window.history.length > 1 &&
    document.referrer.startsWith(`${window.location.origin}/`)
  );
}
