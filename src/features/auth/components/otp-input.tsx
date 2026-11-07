"use client";

import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";

/** Auto-advancing N-digit numeric code input (Figma OTP boxes). */
export function OtpInput({
  length = 4,
  onChange,
}: {
  length?: number;
  onChange: (value: string) => void;
}) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function update(index: number, char: string) {
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    onChange(next.join(""));
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const char = event.target.value.replace(/\D/g, "").slice(-1);
    update(index, char);
    if (char && index < length - 1) refs.current[index + 1]?.focus();
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
    <div className="flex justify-center gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={digit}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          inputMode="numeric"
          maxLength={1}
          placeholder="_"
          aria-label={`Digit ${index + 1}`}
          className="h-[97px] w-20 rounded-card border border-neutral-300 bg-white text-center font-brand text-[32px]/[27px] font-bold text-secondary-900 caret-transparent transition-colors outline-none placeholder:text-neutral-300 focus:border-info-500 focus:ring-2 focus:ring-info-500/40 focus:placeholder:text-secondary-900"
        />
      ))}
    </div>
  );
}
