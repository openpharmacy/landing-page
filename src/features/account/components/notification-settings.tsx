"use client";

import { ArrowLeft, Bell, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Channel = "email" | "push" | "sms";
type Prefs = Record<Channel, boolean>;

const CHANNELS: { key: Channel; label: string; icon: typeof Mail }[] = [
  { key: "email", label: "Email", icon: Mail },
  { key: "push", label: "Push", icon: Bell },
  { key: "sms", label: "SMS", icon: MessageSquare },
];

const ROWS: {
  title: string;
  desc: string;
  defaults: Prefs;
}[] = [
  {
    title: "Order Updates",
    desc: "Get notified about order status, delivery, and pickup information",
    defaults: { email: true, push: true, sms: false },
  },
  {
    title: "Prescription Reminders",
    desc: "Reminders to take your medication and refill prescriptions",
    defaults: { email: true, push: false, sms: true },
  },
  {
    title: "Promotions & Offers",
    desc: "Special deals, discounts, and promotional offers",
    defaults: { email: true, push: false, sms: true },
  },
  {
    title: "Health Tips",
    desc: "Wellness advice and health-related information",
    defaults: { email: false, push: true, sms: true },
  },
  {
    title: "Account Security",
    desc: "Login alerts and security notifications",
    defaults: { email: true, push: false, sms: false },
  },
];

/** Notifications (Figma `258:3679`). UI-only — preferences live in local state. */
export function NotificationSettings() {
  const [prefs, setPrefs] = useState<Prefs[]>(ROWS.map((r) => r.defaults));

  function toggle(rowIndex: number, channel: Channel) {
    setPrefs((all) =>
      all.map((row, i) =>
        i === rowIndex ? { ...row, [channel]: !row[channel] } : row,
      ),
    );
  }

  return (
    <div className="mx-auto w-full max-w-[670px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-6">
        <Link
          href="/account"
          className="inline-flex w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
        >
          <ArrowLeft className="size-5" />
          Back
        </Link>
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          Notifications
        </h1>

        {/* Channel legend — desktop only (mobile labels each toggle inline). */}
        <div className="hidden flex-wrap items-center justify-between gap-4 rounded-card-lg border border-[#E5E7EB] bg-white px-6 py-5 lg:flex">
          <span className="text-body-16-bold text-[#101828]">
            Notification Channels
          </span>
          <div className="flex items-center">
            {CHANNELS.map((c) => (
              <span
                key={c.key}
                className="flex w-16 items-center justify-center gap-1.5 text-body-14 text-text-muted"
              >
                <c.icon className="size-4" />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Preference rows */}
        <div className="overflow-hidden rounded-card-lg border border-[#E5E7EB] bg-white">
          {ROWS.map((row, index) => (
            <div
              key={row.title}
              className={cn(
                "flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center",
                index < ROWS.length - 1 && "border-b border-[#E5E7EB]",
              )}
            >
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-body-16-bold text-[#101828]">
                  {row.title}
                </span>
                <span className="text-body-14 text-secondary-500">
                  {row.desc}
                </span>
              </div>
              {/* Mobile: toggles row + labels row (spread). Desktop: `lg:contents`
                  unwraps the toggles into w-16 columns aligned with the legend. */}
              <div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row lg:gap-0">
                <div className="flex justify-between lg:contents">
                  {CHANNELS.map((c) => (
                    <span key={c.key} className="flex justify-center lg:w-16">
                      <Toggle
                        on={prefs[index]![c.key]}
                        onToggle={() => toggle(index, c.key)}
                        label={`${row.title} ${c.label}`}
                      />
                    </span>
                  ))}
                </div>
                <div className="flex justify-between lg:hidden">
                  {CHANNELS.map((c) => (
                    <span
                      key={c.key}
                      className="flex items-center gap-2 text-body-14 text-text-muted"
                    >
                      <c.icon className="size-4" />
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-info-500" : "bg-[#D1D5DC]",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all",
          on ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}
