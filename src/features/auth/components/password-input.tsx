"use client";

import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function PasswordInput({
  id,
  registration,
  invalid,
  ...props
}: {
  id: string;
  registration?: UseFormRegisterReturn;
  invalid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div
      className={cn(
        "flex items-center gap-2 border bg-white px-[11px] py-[15px] transition-colors",
        "focus-within:ring-2 focus-within:ring-info-500/30",
        invalid
          ? "rounded-[4px] border-error-500 focus-within:border-error-500"
          : "rounded-control border-neutral-300 focus-within:border-info-500",
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
        className="shrink-0 transition-opacity hover:opacity-70"
      >
        <Icon
          src={show ? "/icons/eye-slash.svg" : "/icons/eye.svg"}
          size={20}
        />
      </button>
    </div>
  );
}
