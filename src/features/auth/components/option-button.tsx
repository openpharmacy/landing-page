import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function OptionButton({
  children,
  className: extra,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const className = cn(
    "flex h-[60px] w-full items-center justify-center rounded-control",
    "border border-neutral-300 bg-white text-body-16 text-text",
    "transition-colors hover:bg-bg-app",
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
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
