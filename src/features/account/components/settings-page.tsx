import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";

import { BackLink } from "./back-link";

export function SettingsPage({
  backHref,
  title,
  subtitle,
  children,
}: {
  backHref: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  const heading = (
    <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
      {title}
    </h1>
  );

  return (
    <div className="mx-auto min-h-[891px] w-full px-4 pt-[17px] lg:min-h-0 lg:max-w-[572px] lg:pt-6 lg:pr-0 lg:pb-20 lg:pl-[2px]">
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-1 lg:gap-4">
          <BackLink href={backHref} />
          {subtitle ? (
            <div className="flex flex-col gap-2">
              {heading}
              <p className="text-body-16 text-secondary-500">{subtitle}</p>
            </div>
          ) : (
            heading
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

type Row = { href: string; title: string; desc?: string };

export function SettingsMenu({
  backHref,
  title,
  rows,
}: {
  backHref: string;
  title: string;
  rows: Row[];
}) {
  return (
    <SettingsPage backHref={backHref} title={title}>
      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <SettingsRow key={row.href} {...row} />
        ))}
      </div>
    </SettingsPage>
  );
}

function SettingsRow({ href, title, desc }: Row) {
  return (
    <Link
      href={href}
      prefetch
      className="flex min-h-[95px] items-center gap-4 rounded-card-lg border border-[#e5e7eb] bg-white px-5 py-[21px] transition-colors hover:bg-bg-app"
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="min-h-7 text-subtitle-18-bold text-[#101828]">
          {title}
        </span>
        {desc && <span className="text-body-14 text-text-muted">{desc}</span>}
      </span>
      <Icon src="/icons/account/chevron-right.svg" size={24} />
    </Link>
  );
}
