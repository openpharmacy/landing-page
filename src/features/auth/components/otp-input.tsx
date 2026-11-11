"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

export function OtpInput({
  length = 4,
  onChange,
  autoFocus = true,
}: {
  length?: number;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function fill(from: number, text: string) {
    const chars = text
      .replace(/\D/g, "")
      .slice(0, length - from)
      .split("");
    const next = [...digits];
    if (chars.length === 0) {
      next[from] = "";
    } else {
      chars.forEach((char, offset) => {
        next[from + offset] = char;
      });
    }
    setDigits(next);
    onChange(next.join(""));
    if (chars.length > 0) {
      refs.current[Math.min(from + chars.length, length - 1)]?.focus();
    }
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const typed = event.target.value.replace(/\D/g, "");
    const value =
      typed.length === 2 && typed.startsWith(digits[index])
        ? typed.slice(1)
        : typed;
    fill(index, value);
  }

  function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    fill(index, event.clipboardData.getData("text"));
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex justify-center gap-[9px] lg:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={digit}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          autoFocus={autoFocus && index === 0}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={length}
          placeholder="_"
          aria-label={`Digit ${index + 1}`}
          className={cn(
            "h-[72.8px] w-[60.2px] rounded-[9px] border-[0.75px] border-neutral-300 bg-white text-center font-brand text-[24px] font-bold text-neutral-900 caret-transparent outline-none",
            "shadow-[inset_-3px_3px_6px_0_rgb(0_0_0/0.05)] placeholder:font-normal placeholder:text-neutral-300",
            "focus:border-[2.25px] focus:border-info-500 focus:shadow-[inset_-3px_3px_6px_0_rgb(0_0_0/0.05),0_0_0_3px_rgb(38_157_249/0.2)] focus:placeholder:text-secondary-900",
            "lg:h-[97px] lg:w-[80.2px] lg:rounded-card lg:border lg:text-[32px] lg:shadow-[inset_-4px_4px_8px_0_rgb(0_0_0/0.05)]",
            "lg:focus:border-[3px] lg:focus:shadow-[inset_-4px_4px_8px_0_rgb(0_0_0/0.05),0_0_0_4px_rgb(38_157_249/0.2)]",
          )}
        />
      ))}
    </div>
  );
}
