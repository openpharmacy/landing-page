import type * as React from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full rounded-control border border-input bg-white px-[11px] py-[15px] text-body-16-bold text-secondary-900 transition-colors outline-none",
        "placeholder:font-normal placeholder:text-[#9EB6C9]",
        "focus-visible:border-info-500 focus-visible:ring-2 focus-visible:ring-info-500/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-error-500 aria-invalid:focus-visible:ring-error-500/30",
        className,
      )}
      {...props}
    />
  );
}
