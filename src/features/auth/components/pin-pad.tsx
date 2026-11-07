"use client";

import { Delete } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const PIN_LENGTH = 4;
const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "back"],
];

/** Longest run of digits stepping by ±1 (e.g. 1234 or 4321). */
function longestSequence(value: string) {
  let max = 1;
  let inc = 1;
  let dec = 1;
  for (let i = 1; i < value.length; i += 1) {
    const diff = value.charCodeAt(i) - value.charCodeAt(i - 1);
    if (diff === 1) {
      inc += 1;
      dec = 1;
    } else if (diff === -1) {
      dec += 1;
      inc = 1;
    } else {
      inc = 1;
      dec = 1;
    }
    max = Math.max(max, inc, dec);
  }
  return max;
}

/** Longest run of the same digit (e.g. 111). */
function longestRepeat(value: string) {
  let max = 1;
  let cur = 1;
  for (let i = 1; i < value.length; i += 1) {
    cur = value[i] === value[i - 1] ? cur + 1 : 1;
    max = Math.max(max, cur);
  }
  return max;
}

/**
 * 4-digit PIN keypad with dots + rules (Figma `42:2164`). Calls `onComplete`
 * once a valid PIN is entered; an invalid one flashes red and resets. Rules:
 * max 3 consecutive, max 2 repeated.
 */
export function PinPad({ onComplete }: { onComplete: (pin: string) => void }) {
  const [pin, setPin] = useState("");

  const consecutiveOk = longestSequence(pin) <= 3;
  const repeatedOk = longestRepeat(pin) <= 2;
  const invalid = pin.length === PIN_LENGTH && (!consecutiveOk || !repeatedOk);

  const press = useCallback((key: string) => {
    if (key === "back") {
      setPin((p) => p.slice(0, -1));
    } else if (/^[0-9]$/.test(key)) {
      setPin((p) => (p.length >= PIN_LENGTH ? p : p + key));
    }
  }, []);

  // Allow typing the PIN on a physical keyboard (digits + Backspace).
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Backspace") {
        event.preventDefault();
        press("back");
      } else if (/^[0-9]$/.test(event.key)) {
        press(event.key);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [press]);

  // On a full PIN: complete if valid; otherwise show the red rule briefly,
  // then reset so the user can re-enter without manually deleting.
  useEffect(() => {
    if (pin.length !== PIN_LENGTH) return;
    if (consecutiveOk && repeatedOk) {
      onComplete(pin);
      return;
    }
    const timer = setTimeout(() => setPin(""), 700);
    return () => clearTimeout(timer);
  }, [pin, consecutiveOk, repeatedOk, onComplete]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className={cn("flex gap-6", invalid && "animate-shake")}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "size-[21px] rounded-full border-[3px] border-[#9EB6C9] transition-colors",
              i < pin.length &&
                (invalid
                  ? "border-error-500 bg-error-500"
                  : "border-info-500 bg-info-500"),
            )}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[23px]">
        <div className="flex flex-col gap-3">
          {KEYS.map((row, r) => (
            <div key={r} className="flex justify-center gap-3">
              {row.map((key, c) =>
                key === "" ? (
                  <span key={c} className="size-20" />
                ) : (
                  <button
                    key={c}
                    type="button"
                    onClick={() => press(key)}
                    aria-label={key === "back" ? "Delete" : key}
                    className="flex size-20 items-center justify-center rounded-full border border-neutral-300 bg-white bg-[radial-gradient(circle_at_30%_15%,#5cb4f81a,transparent_62%)] text-h4-24 text-secondary-900 transition active:scale-95"
                  >
                    {key === "back" ? <Delete className="size-6" /> : key}
                  </button>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <p
            className={cn(
              "text-body-14",
              consecutiveOk ? "text-secondary-900" : "text-error-500",
            )}
          >
            Max 3 consecutive digits
          </p>
          <p
            className={cn(
              "text-body-14",
              repeatedOk ? "text-secondary-900" : "text-error-500",
            )}
          >
            Max 2 repeated digits
          </p>
        </div>
      </div>
    </div>
  );
}
