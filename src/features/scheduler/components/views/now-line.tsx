import { cn } from "@/lib/utils";

export function NowLine({
  top,
  className,
}: {
  top: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      style={{ top: top - 3 }}
      className={cn(
        "pointer-events-none absolute flex h-1.5 text-info-500 drop-shadow-[0_1px_8px_rgb(92_180_248/0.5)]",
        className,
      )}
    >
      <svg width="5" height="6" viewBox="0 0 5 6" className="shrink-0">
        <path d="M5 2.5 0 .113v5.774L5 3.5z" fill="currentColor" />
      </svg>
      <svg
        height="6"
        className="-mx-px min-w-0 flex-1"
        preserveAspectRatio="none"
      >
        <rect y="2.5" width="100%" height="1" fill="currentColor" />
      </svg>
      <svg width="5" height="6" viewBox="0 0 5 6" className="shrink-0">
        <path d="M0 3.5 5 5.887V.113L0 2.5z" fill="currentColor" />
      </svg>
    </div>
  );
}
