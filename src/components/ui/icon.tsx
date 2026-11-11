import Image from "next/image";

import { cn } from "@/lib/utils";

export function Icon({
  src,
  alt = "",
  size = 24,
  className,
  loading,
}: {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("inline-block shrink-0", className)}
      loading={loading}
      unoptimized
    />
  );
}
