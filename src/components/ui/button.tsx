import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-card outline-none transition-[color,background-color,opacity] focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-primary text-white hover:opacity-95 disabled:bg-gradient-primary-40 disabled:opacity-100",
        secondary:
          "border border-secondary-500 bg-white text-secondary-500 hover:bg-secondary-500/5",
        outline:
          "border border-neutral-300 bg-white text-secondary-900 hover:bg-bg-app",
        destructive:
          "bg-error-500 text-white hover:opacity-95 disabled:bg-error-500/40 disabled:opacity-100",
        ghost: "text-secondary-500 hover:bg-secondary-500/5",
        link: "text-info-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "text-body-16-bold px-6 py-4",
        sm: "text-body-14 font-bold rounded-control px-4 py-2",
        lg: "text-body-16-bold px-6 py-4",
        icon: "size-11",
      },
    },
    compoundVariants: [
      {
        variant: ["secondary", "outline"],
        size: ["default", "lg"],
        className: "px-[23px] py-[15px]",
      },
      {
        variant: ["secondary", "outline"],
        size: "sm",
        className: "px-[15px] py-[7px]",
      },
    ],
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
