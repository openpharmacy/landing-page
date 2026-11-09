import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";

export type ArticleRow = {
  href: string;
  title: string;
  kicker?: string;
  detail?: ReactNode;
};

export function ArticleList({ rows }: { rows: ArticleRow[] }) {
  return (
    <ul className="overflow-hidden rounded-card-lg border border-[#e5e7eb] bg-white">
      {rows.map((row, index) => (
        <li key={`${row.href}-${index}`}>
          <Link
            href={row.href}
            className={
              row.kicker
                ? "flex items-center gap-4 border-b border-[#e5e7eb] p-5 transition-colors hover:bg-bg-app"
                : "flex min-h-[93px] items-center gap-4 border-b border-[#e5e7eb] px-5 transition-colors hover:bg-bg-app"
            }
          >
            <span
              className={
                row.kicker
                  ? "flex min-w-0 flex-1 flex-col gap-1 min-[390px]:whitespace-nowrap"
                  : "flex min-h-[52px] min-w-0 flex-1 flex-col gap-1 min-[390px]:whitespace-nowrap"
              }
            >
              {row.kicker && (
                <span className="text-caption-12 text-info-500">
                  {row.kicker}
                </span>
              )}
              <span className="min-h-7 text-subtitle-18-bold text-[#101828] min-[390px]:truncate">
                {row.title}
              </span>
              {row.detail && (
                <span className="text-caption-12 text-secondary-300 min-[390px]:truncate">
                  {row.detail}
                </span>
              )}
            </span>
            <Icon src="/icons/help/chevron-right.svg" size={24} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
