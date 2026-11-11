import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { initials, type SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";

import { ACCOUNT_COLUMN } from "./account-layout";
import { LogoutButton } from "./logout-button";

const MENU = [
  {
    icon: "edit-profile",
    title: "Edit Profile",
    desc: "Update your personal information",
    href: "/account/profile",
  },
  {
    icon: "notifications",
    title: "Notifications",
    desc: "Manage your notification preferences",
    href: "/account/notifications",
    prefetch: true,
  },
  {
    icon: "privacy",
    title: "Privacy & Security",
    desc: "Control your privacy settings",
    href: "/account/privacy",
    prefetch: true,
    desktopOnly: true,
  },
  {
    icon: "help",
    title: "Help & Support",
    desc: "Get help with the app",
    href: "/help",
    prefetch: true,
  },
  {
    icon: "account",
    title: "Account",
    desc: "Manage your account",
    href: "/account/settings",
    prefetch: true,
  },
];

export function AccountHome({
  user,
  activeScripts,
  banner,
}: {
  user: SessionUser;
  activeScripts: number | null;
  banner?: ReactNode;
}) {
  const name = `${user.firstName} ${user.lastName}`.trim();

  return (
    <div className={ACCOUNT_COLUMN}>
      <div className="flex flex-col gap-6 lg:gap-9">
        <div className="flex flex-col gap-2 lg:gap-9">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Account
          </h1>

          <div className="flex flex-col gap-6 rounded-card-lg border border-[#e5e7eb] bg-white p-8 lg:flex-row lg:items-center">
            <div className="flex min-w-0 items-center gap-4 lg:flex-1">
              <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-info-500 text-h3-30 text-white">
                {initials(user)}
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-h4-24 text-secondary-900">{name}</span>
                {user.email && (
                  <span className="text-body-16 [overflow-wrap:anywhere] text-secondary-500">
                    {emailParts(user.email)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 lg:w-[209px]">
              <span className="text-display-32 text-info-500">
                {activeScripts ?? "—"}
              </span>
              <span className="text-body-14 text-secondary-500">
                Active Scripts
              </span>
            </div>
          </div>
          {banner}
        </div>

        <div className="flex flex-col gap-2 lg:gap-4">
          <h2 className="text-title-20 text-secondary-900">Settings</h2>
          <div className="overflow-hidden rounded-card-lg border border-[#e5e7eb] bg-white">
            {MENU.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                prefetch={item.prefetch}
                className={cn(
                  "flex h-[93px] items-center gap-4 px-5 transition-colors last-of-type:h-[92px] hover:bg-bg-app",
                  index < MENU.length - 1 && "border-b border-[#e5e7eb]",
                  item.desktopOnly && "hidden lg:flex",
                )}
              >
                <Icon src={`/icons/account/${item.icon}.svg`} size={48} />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="h-7 text-subtitle-18-bold text-[#101828]">
                    {item.title}
                  </span>
                  <span className="truncate text-body-14 text-text-muted">
                    {item.desc}
                  </span>
                </span>
                <Icon src="/icons/account/chevron-right.svg" size={24} />
              </Link>
            ))}
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function emailParts(email: string) {
  const at = email.indexOf("@");
  if (at < 0) return email;
  return (
    <>
      {email.slice(0, at)}
      <wbr />
      {email.slice(at)}
    </>
  );
}
