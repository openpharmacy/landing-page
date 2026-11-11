"use client";

import { useState, type ReactNode } from "react";

import { EmailLink } from "@/components/layout/email-link";
import { NoticeDialog } from "@/components/layout/notice-dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

import { SUPPORT_EMAIL, SUPPORT_PHONE } from "../data/support";

const CARD =
  "flex w-full flex-col items-center gap-4 rounded-card bg-white p-4 transition-colors hover:bg-bg-app";

export function ContactSupport() {
  const [chat, setChat] = useState(false);

  return (
    <section
      id="contact"
      className="flex scroll-mt-24 flex-col items-center gap-[38px] rounded-control bg-[#e6f3fd] p-6"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-h4-24 text-secondary-900">
          Can&apos;t find what you&apos;re looking for?
        </h2>
        <p className="text-body-16 text-secondary-300">
          Our support team is here to help 24/7
        </p>
      </div>
      <ul className="flex w-full flex-col gap-4 lg:flex-row">
        <li className="lg:flex-1">
          <button type="button" onClick={() => setChat(true)} className={CARD}>
            <Channel icon="message-text" title="Live Chat">
              Available 24/7
            </Channel>
          </button>
        </li>
        <li className="lg:flex-1">
          <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`} className={CARD}>
            <Channel icon="call" title="Phone">
              {SUPPORT_PHONE}
            </Channel>
          </a>
        </li>
        <li className="lg:flex-1">
          <a href={`mailto:${SUPPORT_EMAIL}`} className={CARD}>
            <Channel icon="sms" title="Email">
              24hr response
            </Channel>
          </a>
        </li>
      </ul>

      {chat && (
        <NoticeDialog
          icon="/icons/help/message-text.svg"
          title="Live chat isn’t available yet"
          action={
            <Button asChild className="w-full">
              <a href={`mailto:${SUPPORT_EMAIL}`}>Email Us</a>
            </Button>
          }
          onClose={() => setChat(false)}
        >
          You can email us at <EmailLink email={SUPPORT_EMAIL} /> instead.
        </NoticeDialog>
      )}
    </section>
  );
}

function Channel({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <span className="flex size-16 items-center justify-center rounded-full bg-info-500/10">
        <Icon src={`/icons/help/${icon}.svg`} size={24} />
      </span>
      <span className="flex flex-col items-center">
        <span className="text-subtitle-18-bold text-neutral-900">{title}</span>
        <span className="text-body-14 text-secondary-300">{children}</span>
      </span>
    </>
  );
}
