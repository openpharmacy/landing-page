import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-card outline-none transition-[color,background-color,opacity] focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Figma: 154deg gradient fill, white label, radius 12.
        primary: "bg-gradient-primary text-white shadow-float hover:opacity-95",
        // Figma: white fill, 1px Secondary/500 border, Secondary/500 label.
        secondary:
          "border border-secondary-500 bg-white text-secondary-500 hover:bg-secondary-500/5",
        // Outline on a neutral border (e.g. social buttons on auth).
        outline:
          "border border-neutral-300 bg-white text-secondary-900 hover:bg-bg-app",
        ghost: "text-secondary-500 hover:bg-secondary-500/5",
        link: "text-info-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "text-body-16-bold px-6 py-4",
        sm: "text-body-14 px-4 py-2.5",
        lg: "text-body-16-bold px-8 py-4",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
