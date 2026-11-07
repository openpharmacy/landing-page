import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { initials, type SessionUser } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";

import { LogoutButton } from "./logout-button";

const MENU = [
  {
    icon: "/icons/account/edit-profile.svg",
    title: "Edit Profile",
    desc: "Update your personal information",
    href: "/account/profile",
  },
  {
    icon: "/icons/account/addresses.svg",
    title: "Shipping Addresses",
    desc: "Manage your delivery locations",
    href: "/account/addresses",
  },
  {
    icon: "/icons/account/payment.svg",
    title: "Payment Methods",
    desc: "Add or update payment cards",
    href: "/account/payment",
  },
  {
    icon: "/icons/account/orders.svg",
    title: "My Orders",
    desc: "Keep track of your orders",
    href: "/account/orders",
  },
  {
    icon: "/icons/account/notifications.svg",
    title: "Notifications",
    desc: "Manage your notification preferences",
    href: "/account/notifications",
  },
  {
    icon: "/icons/account/privacy.svg",
    title: "Privacy & Security",
    desc: "Control your privacy settings",
    href: "#",
  },
  {
    icon: "/icons/account/help.svg",
    title: "Help & Support",
    desc: "Get help with the app",
    href: "#",
  },
];

/** Account hub (Figma `173:2709`). */
export function AccountHome({ user }: { user: SessionUser }) {
  const name = `${user.firstName} ${user.lastName}`.trim() || "John Smith";
  const email = user.email ?? "john.smith@gmail.com";

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-8">
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          Account
        </h1>

        {/* Profile summary — avatar+name row then spread stats on mobile;
            avatar-left / stats-right on desktop. */}
        <div className="flex flex-col gap-6 rounded-card-lg border border-[#E5E7EB] bg-white px-6 py-8 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-info-500 text-h4-24 font-bold text-white">
              {initials(user)}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-title-20 text-[#101828]">{name}</span>
              <span className="text-body-16 text-secondary-300">{email}</span>
            </div>
          </div>
          <div className="flex justify-around lg:justify-start lg:gap-12">
            <Stat value="12" label="Active Scripts" />
            <Stat value="48" label="Total Orders" />
          </div>
        </div>

        {/* Settings */}
        <div className="flex flex-col gap-4">
          <h2 className="text-title-20 text-secondary-900">Settings</h2>
          <div className="overflow-hidden rounded-card-lg border border-[#E5E7EB] bg-white">
            {MENU.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-5 py-5 transition-colors hover:bg-bg-app",
                  index < MENU.length - 1 && "border-b border-[#E5E7EB]",
                )}
              >
                <Icon src={item.icon} size={48} className="shrink-0" />
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-body-16-bold text-[#101828]">
                    {item.title}
                  </span>
                  <span className="text-body-14 text-secondary-300">
                    {item.desc}
                  </span>
                </div>
                <ChevronRight className="size-5 shrink-0 text-secondary-300" />
              </Link>
            ))}
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-display-32 text-info-500">{value}</span>
      <span className="text-body-14 whitespace-nowrap text-secondary-300">
        {label}
      </span>
    </div>
  );
}
