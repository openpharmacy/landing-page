import Image from "next/image";

import { cn } from "@/lib/utils";

/** Renders a Figma-exported SVG/PNG icon from /public. `unoptimized` keeps SVGs
 *  pixel-identical to Figma (no optimizer reprocessing). */
export function Icon({
  src,
  alt = "",
  size = 24,
  className,
}: {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("inline-block shrink-0", className)}
      unoptimized
    />
  );
}
