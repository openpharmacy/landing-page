"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
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
        // Figma: 18x18, unchecked border #B2C4DE, checked fill #269DF9.
        "peer size-[18px] shrink-0 rounded-[4px] border border-checkbox-border bg-white transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-info-500/30",
        "data-[state=checked]:border-info-500 data-[state=checked]:bg-info-500 data-[state=checked]:text-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="size-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
