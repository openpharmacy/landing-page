"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { joinTime } from "./draft";

const CENTER = { x: 171.5, y: 308.5 };
const RADIUS = 104;
const FACE = 133.5;

const BLUE = "#0a5cf0";

function position(index: number) {
  const angle = (index / 12) * 2 * Math.PI;
  return {
    x: CENTER.x + RADIUS * Math.sin(angle),
    y: CENTER.y - RADIUS * Math.cos(angle),
  };
}

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export function ClockDial({
  value,
  onCancel,
  onOk,
}: {
  value: string;
  onCancel: () => void;
  onOk: (time: string) => void;
}) {
  const [h = 7, m = 0] = value.split(":").map(Number);
  const [hour, setHour] = useState(h % 12 === 0 ? 12 : h % 12);
  const [minute, setMinute] = useState(m);
  const [period, setPeriod] = useState<"AM" | "PM">(h < 12 ? "AM" : "PM");
  const [mode, setMode] = useState<"hour" | "minute">("hour");
  const [typing, setTyping] = useState(false);
  const [scale] = useState(() =>
    Math.min(
      1,
      (window.innerWidth - 32) / 345,
      (window.innerHeight - 32) / 526,
    ),
  );

  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    card.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onCancel();
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onCancel]);

  const marks = mode === "hour" ? HOURS : MINUTES;
  const selected =
    mode === "hour"
      ? HOURS.indexOf(hour)
      : minute % 5 === 0
        ? MINUTES.indexOf(minute)
        : -1;
  const hand = position(selected === -1 ? minute / 5 : selected);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cancel"
        tabIndex={-1}
        onClick={onCancel}
        className="absolute inset-0 cursor-default bg-black/60"
      />
      <div
        ref={card}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Select time"
        className="relative h-[526px] w-[345px] shrink-0 rounded-[27px] bg-white font-brand shadow-[inset_0_0_0_4px_#f4f4f5] outline-none"
        style={scale < 1 ? { transform: `scale(${scale})` } : undefined}
      >
        <p className="absolute top-[21px] left-[27px] text-[13.5px] leading-[20px] text-[#1f2227]">
          Select time
        </p>

        <Segment
          left={28}
          active={mode === "hour"}
          typing={typing}
          label="Hour"
          value={hour}
          min={1}
          max={12}
          onSelect={() => setMode("hour")}
          onType={setHour}
        />
        <span
          aria-hidden
          className="absolute top-[86px] left-[136px] flex h-[28px] w-[6px] flex-col justify-between"
        >
          <span className="size-[6px] rounded-full bg-[#1f2227]" />
          <span className="size-[6px] rounded-full bg-[#1f2227]" />
        </span>
        <Segment
          left={152}
          active={mode === "minute"}
          typing={typing}
          label="Minute"
          value={minute}
          min={0}
          max={59}
          onSelect={() => setMode("minute")}
          onType={setMinute}
        />

        <div
          role="radiogroup"
          aria-label="AM or PM"
          className="absolute top-[57px] left-[265px] flex w-[51px] flex-col gap-[3px]"
        >
          {(["AM", "PM"] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={period === p}
              onClick={() => setPeriod(p)}
              className={cn(
                "flex h-[39px] items-center justify-center rounded-full text-[17px] leading-5",
                period === p
                  ? "bg-[#81b1f9] text-white"
                  : "border border-[#e3e5e7] bg-white text-[#1f2227]",
              )}
            >
              {p}
            </button>
          ))}
        </div>

        {!typing && (
          <div
            aria-label={mode === "hour" ? "Hours" : "Minutes"}
            role="listbox"
            className="pointer-events-none absolute inset-0"
          >
            <span
              aria-hidden
              className="absolute rounded-full bg-[#f9f9f9]"
              style={{
                left: CENTER.x - FACE,
                top: CENTER.y - FACE,
                width: FACE * 2,
                height: FACE * 2,
              }}
            />
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0"
              width={345}
              height={526}
            >
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={hand.x}
                y2={hand.y}
                stroke={BLUE}
                strokeWidth={2}
              />
              <circle cx={CENTER.x} cy={CENTER.y} r={4.5} fill={BLUE} />
            </svg>
            {marks.map((mark, index) => {
              const p = position(index);
              const on = index === selected;
              return (
                <button
                  key={mark}
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => {
                    if (mode === "hour") {
                      setHour(mark);
                      setMode("minute");
                    } else {
                      setMinute(mark);
                    }
                  }}
                  className={cn(
                    "pointer-events-auto absolute flex size-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[17px] leading-5",
                    on ? "bg-[#caddfd] text-[#0a5cf0]" : "text-black",
                  )}
                  style={{ left: p.x, top: p.y }}
                >
                  {mode === "minute" ? String(mark).padStart(2, "0") : mark}
                </button>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() => setTyping(!typing)}
          aria-label={typing ? "Use the dial" : "Type the time"}
          aria-pressed={typing}
          className="absolute top-[476px] left-[26px] flex"
        >
          <Icon src="/icons/scheduler/add/keyboard.svg" size={24} />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-[481px] left-[197px] px-[3px] text-[15px] leading-5 font-medium text-[#0a5cf0]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onOk(joinTime(hour, minute, period))}
          className="absolute top-[481px] left-[288px] px-[3px] text-[15px] leading-5 font-medium text-[#0a5cf0]"
        >
          OK
        </button>
      </div>
    </div>
  );
}

function Segment({
  left,
  active,
  typing,
  label,
  value,
  min,
  max,
  onSelect,
  onType,
}: {
  left: number;
  active: boolean;
  typing: boolean;
  label: string;
  value: number;
  min: number;
  max: number;
  onSelect: () => void;
  onType: (value: number) => void;
}) {
  const className = cn(
    "absolute top-[58px] flex h-[79px] w-[99px] items-center justify-center rounded-[10px] text-center text-[57px] leading-none tracking-[0.02em]",
    active ? "bg-[#dde9fd] text-[#0266ef]" : "bg-[#f5f5f5] text-[#1f2227]",
  );
  const text = String(value).padStart(2, "0");
  if (typing) {
    return (
      <input
        aria-label={label}
        inputMode="numeric"
        value={text}
        onFocus={onSelect}
        onChange={(event) => {
          const n = Number.parseInt(event.target.value.slice(-2), 10);
          if (n >= min && n <= max) onType(n);
        }}
        className={cn(className, "outline-none")}
        style={{ left }}
      />
    );
  }
  return (
    <button
      type="button"
      aria-label={`${label}: ${text}`}
      aria-pressed={active}
      onClick={onSelect}
      className={className}
      style={{ left }}
    >
      {text}
    </button>
  );
}
