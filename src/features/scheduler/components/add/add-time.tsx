"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  DOSE_UNITS,
  type DoseUnit,
  type Intake,
} from "@/features/scheduler/model/schedule";
import { cn } from "@/lib/utils";

import { ClockDial } from "./clock-dial";
import { freeTime, HALF_HOURS, LIMITS, timeLabel } from "./draft";
import { ListMenu } from "./list-menu";
import { TimePill } from "./schedule-form";
import { StepHeader } from "./shell";

export function AddTime({
  defaultTime,
  taken,
  onAdd,
  onBack,
  onClose,
}: {
  defaultTime: string;
  taken: string[];
  onAdd: (intake: Intake) => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const [time, setTime] = useState(() => freeTime(defaultTime, taken));
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState<DoseUnit>("Tablet");
  const [menu, setMenu] = useState<"time" | "unit" | null>(null);
  const [dial, setDial] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const timeRow = useRef<HTMLDivElement>(null);
  const timeButton = useRef<HTMLButtonElement>(null);
  const unitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    sheet.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (menu || dial) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (window.matchMedia("(min-width: 1024px)").matches) return;
      event.preventDefault();
      onBack();
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [menu, dial, onBack]);

  const count = Number.parseInt(quantity, 10);
  const valid = count >= LIMITS.quantity.min && count <= LIMITS.quantity.max;
  const clash = taken.includes(time);

  function openTime() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setMenu(menu === "time" ? null : "time");
    } else {
      setDial(true);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onBack}
        className="fixed inset-0 z-50 cursor-default bg-[#131921]/95 lg:hidden"
      />
      <div
        ref={sheet}
        tabIndex={-1}
        role="group"
        aria-label="Add Time"
        className="flex flex-col outline-none max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-50 max-lg:rounded-t-[22px] max-lg:border max-lg:border-neutral-300 max-lg:bg-white max-lg:px-[15px] max-lg:pt-[15px] max-lg:pb-[68px] lg:min-h-0 lg:flex-1"
      >
        <h2 className="text-[17px] leading-6 font-bold text-secondary-900 lg:hidden">
          Add Time
        </h2>
        <div className="max-lg:hidden">
          <StepHeader title="Add Time" onBack={onBack} onClose={onClose} />
        </div>
        <div className="flex flex-col gap-[21px] max-lg:pt-[21px] lg:gap-[23px] lg:overflow-y-auto lg:px-6 lg:pt-6 lg:pb-9">
          <div className="flex flex-col gap-2">
            <div
              ref={timeRow}
              className={cn(
                "flex h-[72px] items-center gap-3 rounded-[7px] border bg-white pr-[7px] pl-[15px]",
                clash ? "border-error-500" : "border-neutral-300",
              )}
            >
              <span className="flex-1 text-[14px] leading-6 font-bold text-secondary-900">
                Select time
              </span>
              <button
                ref={timeButton}
                type="button"
                onClick={openTime}
                aria-haspopup="dialog"
                aria-label={`Time: ${timeLabel(time)}`}
                aria-describedby={clash ? "time-clash" : undefined}
                className="flex"
              >
                <TimePill time={time} />
              </button>
              {menu === "time" && (
                <ListMenu
                  anchor={timeRow}
                  label="Time"
                  options={HALF_HOURS.map((t) => ({
                    value: t,
                    label: timeLabel(t),
                  }))}
                  value={time}
                  onPick={(t: string) => {
                    setTime(t);
                    setMenu(null);
                  }}
                  onClose={() => setMenu(null)}
                />
              )}
            </div>
            {clash && (
              <p
                id="time-clash"
                role="alert"
                className="text-caption-12 text-error-500"
              >
                This medication already has a dose at {timeLabel(time)}. Choose
                another time.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="dose-quantity"
              className="text-[14px] leading-6 font-bold text-secondary-900"
            >
              Dose
            </label>
            <div className="flex gap-2">
              <input
                id="dose-quantity"
                inputMode="numeric"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value.replace(/\D/g, "").slice(0, 2))
                }
                aria-invalid={!valid}
                className="h-14 w-[105px] shrink-0 rounded-[7px] border border-neutral-300 bg-white text-center text-[14px] leading-6 font-bold text-secondary-900 outline-none focus-visible:border-info-500 aria-invalid:border-error-500"
              />
              <button
                ref={unitRef}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={menu === "unit"}
                aria-label={`Unit: ${unit}`}
                onClick={() => setMenu(menu === "unit" ? null : "unit")}
                className="flex h-14 min-w-0 flex-1 items-center gap-0.5 rounded-[7px] border border-neutral-300 bg-white px-[7px] text-left text-[14px] leading-6 font-bold text-secondary-900"
              >
                <span className="flex-1">{unit}</span>
                <Icon src="/icons/scheduler/add/arrow-down.svg" size={16} />
              </button>
              {menu === "unit" && (
                <ListMenu
                  anchor={unitRef}
                  width={248}
                  label="Unit"
                  options={DOSE_UNITS.map((u) => ({ value: u, label: u }))}
                  value={unit}
                  onPick={(u: DoseUnit) => {
                    setUnit(u);
                    setMenu(null);
                  }}
                  onClose={() => setMenu(null)}
                />
              )}
            </div>
          </div>

          <Button
            type="button"
            disabled={!valid || clash}
            onClick={() => onAdd({ time, quantity: count, unit })}
            className="h-[66px] w-full py-0"
          >
            Add
          </Button>
        </div>
      </div>
      {dial && (
        <ClockDial
          value={time}
          onCancel={() => {
            setDial(false);
            timeButton.current?.focus();
          }}
          onOk={(t) => {
            setTime(t);
            setDial(false);
            timeButton.current?.focus();
          }}
        />
      )}
    </>
  );
}
