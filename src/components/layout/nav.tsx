import Image from "next/image";

import { cn } from "@/lib/utils";

export type Glyph = { src: string; width: number };

const glyph = (name: string, width = 24): Glyph => ({
  src: `/icons/nav/${name}.svg`,
  width,
});

export const GLYPHS = {
  home: glyph("home"),
  homeMobile: glyph("home-mobile"),
  homeActive: glyph("home-active"),
  capsule: glyph("capsule", 21),
  capsuleMobile: glyph("capsule-mobile", 21),
  capsuleActive: glyph("capsule-active", 21),
  calendar: glyph("calendar"),
  calendarActive: glyph("calendar-active"),
  bell: glyph("bell"),
  profile: glyph("profile"),
  chevronRight: glyph("chevron-right"),
  close: glyph("close"),
};

export const TAB_BAR_HEIGHT =
  "h-[calc(71px+max(16px,env(safe-area-inset-bottom)))]";

export function isNavActive(pathname: string, href: string) {
  if (href === "/" || href === "/home") {
    return pathname === "/" || pathname === "/home";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavGlyph({ glyph: { src, width } }: { glyph: Glyph }) {
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={24}
      unoptimized
      className="shrink-0"
    />
  );
}

export function Avatar({
  initials,
  dim = false,
}: {
  initials: string;
  dim?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full text-caption-12-bold text-white",
        dim ? "bg-info-500/50" : "bg-info-500",
      )}
    >
      {initials}
    </span>
  );
}
