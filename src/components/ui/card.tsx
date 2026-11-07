import type * as React from "react";

import { cn } from "@/lib/utils";

/** Figma card: radius 12, 1px Neutral/300 border, white fill, ambient shadow, padding 24. */
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-card border border-neutral-300 bg-card p-6 text-card-foreground shadow-card",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-h4-24 text-secondary-900", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}
