import Image from "next/image";

import { cn } from "@/lib/utils";

import type { CategorySlug } from "../data/help-content";

const BADGES: Record<
  CategorySlug,
  { icon: string; width?: number; tint: string }
> = {
  "prescriptions-scripts": {
    icon: "capsule",
    width: 21,
    tint: "bg-primary-500/10",
  },
  "orders-delivery": { icon: "box", tint: "bg-success-500/10" },
  "payments-billing": { icon: "card", tint: "bg-[#ad46ff]/10" },
  "account-security": { icon: "security", tint: "bg-[#ff6900]/10" },
  "profile-settings": { icon: "profile", tint: "bg-[#f6339a]/10" },
  "general-information": { icon: "message-question", tint: "bg-[#00bba7]/10" },
};

export function CategoryBadge({
  category,
  className,
}: {
  category: CategorySlug;
  className?: string;
}) {
  const badge = BADGES[category];
  return (
    <span
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-card",
        badge.tint,
        className,
      )}
    >
      <Image
        src={`/icons/help/${badge.icon}.svg`}
        alt=""
        width={badge.width ?? 24}
        height={24}
        unoptimized
      />
    </span>
  );
}
