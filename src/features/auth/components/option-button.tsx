import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function OptionButton({
  children,
  className: extra,
  href,
  onClick,
  covered = false,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  covered?: boolean;
}) {
  const className = cn(
    "flex h-[60px] w-full items-center justify-center rounded-control",
    "border border-neutral-300 bg-white text-body-16 text-text",
    "transition-colors hover:bg-bg-app group-hover:bg-bg-app",
    extra,
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      tabIndex={covered ? -1 : undefined}
      aria-hidden={covered || undefined}
    >
      {children}
    </button>
  );
}
