import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const WASH =
  "bg-[linear-gradient(135deg,rgb(190_225_252)_0%,rgb(194_221_242)_12.5%,rgb(199_219_234)_25%,rgb(206_219_230)_37.5%,rgb(213_222_229)_50%,rgb(222_227_231)_62.5%,rgb(232_234_236)_75%,rgb(243_243_244)_87.5%,rgb(255_255_255)_100%)]";

export function BackCircle({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full border border-[#8BBDE5] bg-origin-border transition-opacity hover:opacity-80",
        WASH,
        className,
      )}
    >
      <Icon src="/icons/scripts/detail/back.svg" size={24} />
    </Link>
  );
}
