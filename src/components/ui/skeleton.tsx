import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("rounded-[18px] bg-[#E4EAF4]", className)} />;
}

export function SkeletonPage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("animate-pulse", className)}
      role="status"
      aria-label="Loading"
    >
      {children}
    </div>
  );
}
