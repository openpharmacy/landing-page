"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative size-[18px] shrink-0 rounded-[2px] border-2 border-checkbox-border bg-transparent transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-info-500/30",
        "data-[state=checked]:border data-[state=checked]:bg-info-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="absolute -inset-px">
        <svg viewBox="0 0 18 18" aria-hidden className="size-[18px]">
          <path
            transform="translate(2.438 4.688)"
            d="M13.125 0.938C13.125 1.201 13.008 1.436 12.832 1.611L5.332 9.111C5.156 9.287 4.922 9.375 4.688 9.375C4.424 9.375 4.189 9.287 4.014 9.111L0.264 5.361C0.088 5.186 0 4.951 0 4.688C0 4.16 0.41 3.75 0.938 3.75C1.172 3.75 1.406 3.867 1.582 4.043L4.688 7.119L11.514 0.293C11.689 0.117 11.924 0 12.188 0C12.686 0 13.125 0.41 13.125 0.938Z"
            fill="white"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
