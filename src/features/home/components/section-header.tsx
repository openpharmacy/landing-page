import Link from "next/link";

import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  href,
  className,
  titleClassName,
  linkClassName,
}: {
  title: string;
  href: string;
  className?: string;
  titleClassName?: string;
  linkClassName?: string;
}) {
  return (
    <div
      className={cn("flex h-6 items-center justify-between gap-4", className)}
    >
      <h2
        className={cn(
          "text-subtitle-18-bold text-secondary-900 lg:text-[24px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <Link
        href={href}
        className={cn(
          "text-body-16 text-info-500 hover:underline",
          linkClassName,
        )}
      >
        View all
      </Link>
    </div>
  );
}
