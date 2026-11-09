"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import type { Intake } from "@/features/scheduler/model/schedule";
import { cn } from "@/lib/utils";

import {
  doseLabel,
  formProblems,
  FREQUENCY_OPTIONS,
  LIMITS,
  REMIND_OPTIONS,
  splitTime,
  timeLabel,
  WEEKDAYS,
  type Draft,
  type FrequencyKind,
} from "./draft";
import { ListMenu } from "./list-menu";
import { Stepper } from "./stepper";

type Update = (patch: Partial<Draft>) => void;

export function ScheduleForm({
  draft,
  update,
  onAddTime,
  onNext,
}: {
  draft: Draft;
  update: Update;
  onAddTime: () => void;
  onNext: () => void;
}) {
  const [menu, setMenu] = useState<"frequency" | "remind" | null>(null);
  const [tried, setTried] = useState(false);
  const frequencyRef = useRef<HTMLButtonElement>(null);
  const remindRef = useRef<HTMLButtonElement>(null);
  const problems = formProblems(draft);

  function next() {
    if (problems.name || problems.days) {
      setTried(true);
      return;
    }
    if (problems.intakes) {
      onAddTime();
      return;
    }
    onNext();
  }

  const frequency = FREQUENCY_OPTIONS.find((f) => f.kind === draft.frequency);
  const remind = REMIND_OPTIONS.find(
    (r) => r.minutes === draft.remindMinutesBefore,
  );

  return (
    <div className="flex flex-col gap-[23px] pt-6 pb-6 max-lg:px-[15px] lg:px-6 lg:pb-9 [&>*]:max-lg:max-w-[358px]">
      <Field label="Medication Name" htmlFor="medication-name">
        <Input
          id="medication-name"
          value={draft.name}
          onChange={(event) => update({ name: event.target.value })}
          aria-invalid={tried && problems.name}
          autoComplete="off"
          maxLength={100}
        />
      </Field>

      <Field label="Frequency">
        <SelectButton
          ref={frequencyRef}
          open={menu === "frequency"}
          onClick={() => setMenu(menu === "frequency" ? null : "frequency")}
          label="Frequency"
        >
          {frequency?.value}
        </SelectButton>
        {menu === "frequency" && (
          <ListMenu
            anchor={frequencyRef}
            label="Frequency"
            options={FREQUENCY_OPTIONS.map((f) => ({
              value: f.kind,
              label: f.option,
            }))}
            value={draft.frequency}
            onPick={(kind: FrequencyKind) => {
              update({ frequency: kind });
              setMenu(null);
            }}
            onClose={() => setMenu(null)}
          />
        )}
      </Field>

      {draft.frequency === "weekdays" && (
        <Field label="Choose Days">
          <div
            role="group"
            aria-label="Choose Days"
            className="grid grid-cols-4 gap-2"
          >
            {WEEKDAYS.map(({ day, label }) => {
              const on = draft.days.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    update({
                      days: on
                        ? draft.days.filter((d) => d !== day)
                        : [...draft.days, day],
                    })
                  }
                  className={cn(
                    "flex h-16 items-center justify-center rounded-[10px] border text-[14px] leading-[17px] transition-colors",
                    on
                      ? "bg-info-500 font-extrabold text-white"
                      : "bg-primary-500/10 font-bold text-info-500",
                    tried && problems.days
                      ? "border-error-500"
                      : "border-info-500",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Field>
      )}

      {(draft.frequency === "everyDays" ||
        draft.frequency === "everyWeeks") && (
        <Box>
          {draft.frequency === "everyDays" ? (
            <Stepper
              label="Repeat Every"
              value={draft.everyDays}
              unit="days"
              {...LIMITS.everyDays}
              onChange={(everyDays) => update({ everyDays })}
            />
          ) : (
            <Stepper
              label="Repeat Every"
              value={draft.everyWeeks}
              unit="weeks"
              {...LIMITS.everyWeeks}
              onChange={(everyWeeks) => update({ everyWeeks })}
            />
          )}
        </Box>
      )}

      <Field label="Time">
        {draft.intakes.map((intake, index) => (
          <IntakeRow
            key={`${intake.time}-${index}`}
            intake={intake}
            onRemove={() =>
              update({ intakes: draft.intakes.filter((_, i) => i !== index) })
            }
          />
        ))}
        <button
          type="button"
          onClick={onAddTime}
          className="relative h-[54.5px] w-full shrink-0 rounded-card border-2 border-info-500 bg-[#37b5fe1a] transition-colors hover:bg-[#37b5fe26]"
        >
          <span className="absolute top-[15.2px] left-[122.4px] flex">
            <Icon src="/icons/scheduler/add/plus-blue.svg" size={20} />
          </span>
          <span className="absolute top-[14.4px] left-[149.4px] text-body-16-bold text-info-500">
            Add time
          </span>
        </button>
      </Field>

      <Field label="Remind Me">
        <SelectButton
          ref={remindRef}
          open={menu === "remind"}
          onClick={() => setMenu(menu === "remind" ? null : "remind")}
          label="Remind Me"
        >
          {remind?.label}
        </SelectButton>
        {menu === "remind" && (
          <ListMenu
            anchor={remindRef}
            label="Remind Me"
            options={REMIND_OPTIONS.map((r) => ({
              value: r.minutes,
              label: r.label,
            }))}
            value={draft.remindMinutesBefore}
            onPick={(minutes: number | null) => {
              update({ remindMinutesBefore: minutes });
              setMenu(null);
            }}
            onClose={() => setMenu(null)}
          />
        )}
      </Field>

      <div className="relative flex h-[38px] items-center gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={draft.cycle}
          aria-labelledby="cycle-label"
          onClick={() => update({ cycle: !draft.cycle })}
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-[6px] border-2 transition-colors",
            draft.cycle
              ? "border-[#37b5fe] bg-info-500"
              : "border-[#b8c0c9] bg-white",
          )}
        >
          {draft.cycle && (
            <Icon
              src="/icons/scheduler/add/tick.svg"
              size={14}
              className="h-[11px]"
            />
          )}
        </button>
        <span className="flex items-center gap-1">
          <span
            id="cycle-label"
            className="text-[14px] leading-[21px] text-secondary-900"
          >
            Add cycle pattern
          </span>
          <InfoTip label="About cycle patterns">
            Take the medication for a number of weeks, then skip it for a number
            of weeks. The pattern repeats from the day the schedule starts.
          </InfoTip>
        </span>
      </div>

      {draft.cycle && (
        <Box className="gap-4">
          <Stepper
            label="Take for:"
            value={draft.takeWeeks}
            unit={draft.takeWeeks === 1 ? "week" : "weeks"}
            {...LIMITS.takeWeeks}
            onChange={(takeWeeks) => update({ takeWeeks })}
          />
          <Stepper
            label="Then skip:"
            value={draft.skipWeeks}
            unit={draft.skipWeeks === 1 ? "week" : "weeks"}
            {...LIMITS.skipWeeks}
            onChange={(skipWeeks) => update({ skipWeeks })}
          />
          <div className="flex flex-col">
            <span className="text-[14px] leading-6 font-bold text-secondary-900">
              Preview:
            </span>
            <div className="flex flex-col gap-3.5 py-4">
              <Weeks count={draft.takeWeeks} taken />
              <Weeks count={draft.skipWeeks} />
              <span className="text-[12px] leading-[18px] text-[#a0b3ca]">
                (repeats)
              </span>
            </div>
          </div>
        </Box>
      )}

      <Button type="button" onClick={next} className="w-full">
        Next
      </Button>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  const Label = htmlFor ? "label" : "span";
  return (
    <div className="relative flex flex-col gap-2">
      <Label htmlFor={htmlFor} className="text-label-14 text-secondary-500">
        {label}
      </Label>
      {children}
    </div>
  );
}

function SelectButton({
  ref,
  open,
  onClick,
  label,
  children,
}: {
  ref: React.Ref<HTMLButtonElement>;
  open: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label={`${label}: ${String(children ?? "")}`}
      onClick={onClick}
      className="flex h-14 w-full items-center rounded-control border border-neutral-300 bg-white pr-[11px] pl-[11px] text-left text-body-16-bold text-secondary-900"
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <Icon
        src="/icons/scheduler/add/chevron.svg"
        size={20}
        className={cn(
          "transition-transform",
          open ? "-rotate-90" : "rotate-90",
        )}
      />
    </button>
  );
}

function Box({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-control border border-neutral-300 bg-white px-[15px] pt-[15px] pb-[23px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IntakeRow({
  intake,
  onRemove,
}: {
  intake: Intake;
  onRemove: () => void;
}) {
  return (
    <div className="flex h-[72px] items-center gap-6 rounded-[7px] border border-neutral-300 bg-white px-[15px]">
      <TimePill time={intake.time} />
      <span className="min-w-0 flex-1 text-body-16-bold text-secondary-900">
        {doseLabel(intake)}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${timeLabel(intake.time)}`}
        className="flex shrink-0 transition-opacity hover:opacity-70"
      >
        <Icon
          src="/icons/scheduler/add/remove.svg"
          size={15}
          className="h-6 w-[15px]"
        />
      </button>
    </div>
  );
}

export function TimePill({ time }: { time: string }) {
  const { clock, period } = splitTime(time);
  return (
    <span className="flex h-[35px] shrink-0 items-center justify-center gap-1.5 rounded-[10px] bg-neutral-300 px-2 text-[16px] leading-[19.2px]">
      <span className="font-medium text-secondary-900">{clock}</span>
      <span className="text-secondary-500">{period}</span>
    </span>
  );
}

function InfoTip({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const open = pinned || hovered;

  useEffect(() => {
    if (!open) return;
    tip.current?.scrollIntoView?.({ block: "nearest" });
    const close = () => {
      setPinned(false);
      setHovered(false);
    };
    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) close();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      close();
    }
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setPinned((v) => !v)}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setHovered(false);
        }}
        onBlur={() => setPinned(false)}
        className="flex rounded-full transition-opacity hover:opacity-70"
      >
        <Icon src="/icons/scheduler/add/info.svg" size={16} />
      </button>
      {open && (
        <span
          ref={tip}
          id={id}
          role="tooltip"
          className="absolute top-full left-0 z-10 mt-1 w-full max-w-[320px] rounded-control border border-neutral-300 bg-white p-[11px] text-[12px] leading-[18px] text-secondary-900 shadow-card"
        >
          {children}
        </span>
      )}
    </>
  );
}

function Weeks({ count, taken = false }: { count: number; taken?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-3.5">
      {Array.from({ length: count }, (_, week) => (
        <div key={week} className="flex gap-1">
          {Array.from({ length: 7 }, (_, day) => (
            <span
              key={day}
              className={cn(
                "size-2 rounded-full",
                taken ? "bg-[#37b5fe]" : "border border-[#b8c0c9]",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
