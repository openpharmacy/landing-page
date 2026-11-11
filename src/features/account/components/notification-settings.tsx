"use client";

import { useSyncExternalStore } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import {
  DEFAULT_PREFS,
  readPrefs,
  savePrefs,
  subscribePrefs,
  togglePref,
  type Channel,
  type Prefs,
  type Topic,
} from "../model/notification-prefs";
import { BackLink } from "./back-link";

const CHANNELS: {
  key: Channel;
  label: string;
  icon: string;
  mobileWidth: string;
}[] = [
  {
    key: "email",
    label: "Email",
    icon: "/icons/account/mail.svg",
    mobileWidth: "w-[58px]",
  },
  {
    key: "push",
    label: "Push",
    icon: "/icons/account/bell.svg",
    mobileWidth: "w-[55px]",
  },
  {
    key: "sms",
    label: "SMS",
    icon: "/icons/account/message.svg",
    mobileWidth: "w-[52px]",
  },
];

const TOPICS: Record<Topic, { title: string; desc: string }> = {
  orders: {
    title: "Order Updates",
    desc: "Get notified about order status, delivery, and pickup information",
  },
  reminders: {
    title: "Prescription Reminders",
    desc: "Reminders to take your medication and refill prescriptions",
  },
  promotions: {
    title: "Promotions & Offers",
    desc: "Special deals, discounts, and promotional offers",
  },
  tips: {
    title: "Health Tips",
    desc: "Wellness advice and health-related information",
  },
  security: {
    title: "Account Security",
    desc: "Login alerts and security notifications",
  },
};
const DESKTOP_TOPICS: Topic[] = ["reminders", "promotions", "tips", "security"];
const MOBILE_TOPICS: Topic[] = [
  "orders",
  "reminders",
  "promotions",
  "tips",
  "security",
];

export function NotificationSettings({ storageKey }: { storageKey: string }) {
  const prefs = useSyncExternalStore(
    subscribePrefs,
    () => readPrefs(storageKey),
    () => DEFAULT_PREFS,
  );

  function toggle(topic: Topic, channel: Channel) {
    savePrefs(storageKey, togglePref(prefs, topic, channel));
  }

  return (
    <div className="mx-auto w-full px-4 pt-[17px] pb-[38px] lg:max-w-[572px] lg:pt-6 lg:pr-0 lg:pb-20 lg:pl-[2px]">
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-1 lg:gap-4">
          <BackLink />
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Notifications
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="hidden items-center justify-between gap-1 rounded-card-lg border border-[#e5e7eb] bg-white p-[23px] lg:flex">
            <span className="text-body-16-bold text-[#101828]">
              Notification Channels
            </span>
            <div className="flex items-center gap-8">
              {CHANNELS.map((c) => (
                <ChannelLabel key={c.key} channel={c} />
              ))}
            </div>
          </div>

          <PreferenceList
            topics={DESKTOP_TOPICS}
            prefs={prefs}
            onToggle={toggle}
            className="hidden lg:flex"
          />
          <PreferenceList
            topics={MOBILE_TOPICS}
            prefs={prefs}
            onToggle={toggle}
            className="lg:hidden"
          />
        </div>
      </div>
    </div>
  );
}

function PreferenceList({
  topics,
  prefs,
  onToggle,
  className,
}: {
  topics: Topic[];
  prefs: Prefs;
  onToggle: (topic: Topic, channel: Channel) => void;
  className: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-card-lg border border-[#e5e7eb] bg-white py-[23px]",
        className,
      )}
    >
      {topics.map((topic, index) => {
        const { title, desc } = TOPICS[topic];
        return (
          <div
            key={topic}
            className={cn(
              "flex flex-col gap-4 px-[23px] lg:flex-row lg:items-center",
              index < topics.length - 1 &&
                "border-b border-[#e5e7eb] pb-[11px]",
            )}
          >
            <div className="flex max-w-[289px] flex-col gap-1 lg:max-w-none lg:flex-1">
              <span className="text-body-16-bold text-[#101828]">{title}</span>
              <span className="text-body-14 leading-6 text-text-muted">
                {desc}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between lg:w-[217px]">
                {CHANNELS.map((c) => (
                  <Toggle
                    key={c.key}
                    on={prefs[topic][c.key]}
                    onToggle={() => onToggle(topic, c.key)}
                    label={`${title} ${c.label}`}
                  />
                ))}
              </div>
              <div className="flex justify-between lg:hidden">
                {CHANNELS.map((c) => (
                  <ChannelLabel
                    key={c.key}
                    channel={c}
                    className={c.mobileWidth}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChannelLabel({
  channel,
  className,
}: {
  channel: (typeof CHANNELS)[number];
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-body-14 text-text-muted",
        className,
      )}
    >
      <Icon src={channel.icon} size={16} />
      {channel.label}
    </span>
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
        on ? "bg-info-500" : "bg-[#d1d5dc]",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white transition-all",
          on ? "left-6" : "left-0.5",
        )}
      />
    </button>
  );
}
