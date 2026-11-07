import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Centered page container. Figma desktop artboard is 1440 with 120px side
 * gutters; mobile uses a 16px gutter. Keeps the gutter in one place.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 lg:px-[120px]",
        className,
      )}
      {...props}
    />
  );
}
