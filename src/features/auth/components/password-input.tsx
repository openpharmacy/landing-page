"use client";

import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

/** White password field with a show/hide eye toggle (Figma auth password input). */
export function PasswordInput({
  id,
  registration,
  invalid,
  ...props
}: {
  id: string;
  /** react-hook-form registration; omit to use the input as a controlled field. */
  registration?: UseFormRegisterReturn;
  invalid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-control border bg-white px-3 py-4 transition-colors",
        "focus-within:ring-2 focus-within:ring-info-500/30",
        invalid
          ? "border-error-500 focus-within:border-error-500"
          : "border-neutral-300 focus-within:border-info-500",
      )}
    >
      <input
        id={id}
        type={show ? "text" : "password"}
        {...registration}
        {...props}
        className="w-full bg-transparent text-body-16-bold text-secondary-900 outline-none placeholder:font-normal placeholder:text-[#9EB6C9]"
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="shrink-0 text-neutral-700 transition-colors hover:text-secondary-500"
      >
        {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}
