"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const PIN_LENGTH = 4;
const DIGIT_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

export type PinPadKey = "" | "0" | "back" | "fingerprint";
const BOTTOM_KEYS: PinPadKey[] = ["", "0", "back"];

const KEY_LABELS: Record<string, string> = {
  back: "Delete",
  fingerprint: "Log in with fingerprint",
};

const KEY_WASH =
  "bg-[linear-gradient(223.7deg,rgb(92_180_248/0.3)_-12.9%,rgb(92_180_248/0.192)_0.42%,rgb(92_180_248/0.108)_13.74%,rgb(92_180_248/0.048)_27.06%,rgb(92_180_248/0.012)_40.38%,rgb(92_180_248/0)_53.7%)]";

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

function longestRepeat(value: string) {
  let max = 1;
  let cur = 1;
  for (let i = 1; i < value.length; i += 1) {
    cur = value[i] === value[i - 1] ? cur + 1 : 1;
    max = Math.max(max, cur);
  }
  return max;
}

export function PinPad({
  onComplete,
  dotsClassName,
  bottomKeys = BOTTOM_KEYS,
  onFingerprint,
  showRules = true,
  footer,
}: {
  onComplete: (pin: string) => void;
  dotsClassName?: string;
  bottomKeys?: PinPadKey[];
  onFingerprint?: () => void;
  showRules?: boolean;
  footer?: ReactNode;
}) {
  const [pin, setPin] = useState("");

  const consecutiveOk = longestSequence(pin) <= 3;
  const repeatedOk = longestRepeat(pin) <= 2;
  const invalid = pin.length === PIN_LENGTH && (!consecutiveOk || !repeatedOk);

  const press = useCallback(
    (key: string) => {
      if (key === "fingerprint") {
        onFingerprint?.();
      } else if (key === "back") {
        setPin((p) => p.slice(0, -1));
      } else if (/^[0-9]$/.test(key)) {
        setPin((p) => (p.length >= PIN_LENGTH ? p : p + key));
      }
    },
    [onFingerprint],
  );

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
      <div
        className={cn(
          "flex h-[35px] items-center gap-6",
          invalid && "animate-shake",
          dotsClassName,
        )}
      >
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
          {[...DIGIT_ROWS, bottomKeys].map((row, r) => (
            <div key={r} className="flex justify-center gap-3">
              {row.map((key, c) =>
                key === "" ? (
                  <span key={c} className="size-20" />
                ) : (
                  <button
                    key={c}
                    type="button"
                    onClick={() => press(key)}
                    disabled={key === "back" && pin.length === 0}
                    aria-label={KEY_LABELS[key] ?? key}
                    className={cn(
                      "flex size-20 items-center justify-center rounded-full border border-neutral-300 bg-white text-h4-24 text-neutral-900",
                      KEY_WASH,
                      "enabled:hover:border-info-500 enabled:hover:inset-ring enabled:hover:inset-ring-info-500 enabled:active:border-info-500 enabled:active:inset-ring enabled:active:inset-ring-info-500",
                    )}
                  >
                    {key === "back" ? (
                      <Icon src="/icons/auth/backspace.svg" size={24} />
                    ) : key === "fingerprint" ? (
                      <Icon src="/icons/auth/fingerprint.svg" size={32} />
                    ) : (
                      key
                    )}
                  </button>
                ),
              )}
            </div>
          ))}
        </div>

        {showRules && (
          <div className="flex flex-col gap-1 text-center">
            <PinRule
              label="Max 3 consecutive digits"
              ok={consecutiveOk}
              checked={consecutiveOk && pin.length >= 3}
            />
            <PinRule
              label="Max 2 repeated digits"
              ok={repeatedOk}
              checked={repeatedOk && pin.length === PIN_LENGTH}
            />
          </div>
        )}
        {footer}
      </div>
    </div>
  );
}

function PinRule({
  label,
  ok,
  checked,
}: {
  label: string;
  ok: boolean;
  checked: boolean;
}) {
  return (
    <p
      className={cn(
        "relative mx-auto w-fit text-body-14",
        ok ? "text-secondary-900" : "text-error-500",
      )}
    >
      {label}
      {checked && (
        <Icon
          src="/icons/auth/rule-check.svg"
          size={18}
          className="absolute top-0 left-[calc(100%+4px)]"
        />
      )}
    </p>
  );
}
