"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { HiddenBanner } from "./hidden-banner";
import { HideScriptModal } from "./hide-script-modal";
import { ScriptActionsMenu } from "./script-actions-menu";
import { SecurityShield } from "./security-shield";

// Detail section icons (Figma-exported squares — exact glyphs/colours).
const DETAIL_ICON = {
  tablet: "/icons/scripts/detail/tablet.svg",
  personalNotes: "/icons/scripts/detail/personal-notes.svg",
  doctorNotes: "/icons/scripts/detail/doctor-notes.svg",
  information: "/icons/scripts/detail/information.svg",
  paper: "/icons/scripts/detail/paper.svg",
  edit: "/icons/scripts/detail/edit.svg",
};

// Static mock prescription details (no backend yet — see docs/api-gaps.md).
const PERSONAL_NOTES = [
  "• Take with food to reduce stomach upset",
  "• Monitor blood sugar levels",
];
const DOCTOR_NOTES = [
  "Take with meals to reduce stomach upset.",
  "Swallow the tablet whole with a glass of water — do not crush or chew.",
  "Check kidney function before starting",
];

type ScriptDetailProps = {
  name: string;
  status: "active" | "expired";
  variant: "asl" | "paper";
  tags: string[];
  hidden: boolean;
};

// Remembers the "Don't show this again" choice for the Hide confirmation.
const HIDE_CONFIRM_KEY = "op_hide_confirm_dismissed";

/** Script detail page (Figma `161:3130` ASL / `161:3258` manual). */
export function ScriptDetail({
  name,
  status,
  variant,
  tags,
  hidden: initialHidden,
}: ScriptDetailProps) {
  const strength = name.match(/(\d+(?:\.\d+)?\s*mg)/i)?.[1] ?? "—";
  const [hidden, setHidden] = useState(initialHidden);
  const [hideModalOpen, setHideModalOpen] = useState(false);

  // Mirrors the script-card flow: skip the confirmation if the user dismissed it.
  function requestHide() {
    const dismissed =
      typeof window !== "undefined" &&
      window.localStorage.getItem(HIDE_CONFIRM_KEY) === "1";
    if (dismissed) setHidden(true);
    else setHideModalOpen(true);
  }

  function confirmHide(dontShowAgain: boolean) {
    if (dontShowAgain && typeof window !== "undefined") {
      window.localStorage.setItem(HIDE_CONFIRM_KEY, "1");
    }
    setHideModalOpen(false);
    setHidden(true);
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[870px] px-4 py-8">
        <div className="flex flex-col gap-9">
          {/* Header — name/status row, then a full-width actions row on mobile. */}
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-8">
            <div className="flex items-start gap-3">
              <Link
                href="/scripts"
                aria-label="Back to My Scripts"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#8BBDE5] bg-primary-500/10 text-secondary-900 transition-colors hover:bg-primary-500/20"
              >
                <ArrowLeft className="size-5" />
              </Link>
              <div className="flex flex-col">
                <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
                  {name}
                </h1>
                {variant === "asl" ? (
                  <p className="flex items-center gap-1.5 text-body-16 text-secondary-300">
                    <SecurityShield className="size-4 text-success-500" />
                    Synced with official ASL registry
                  </p>
                ) : (
                  <p className="text-body-16 text-secondary-300">
                    Manual script
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-full items-center gap-3 lg:w-auto">
              <Button type="button" size="lg" className="flex-1 lg:flex-none">
                Refill
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="flex-1 lg:flex-none"
              >
                Schedule
              </Button>
              <ScriptActionsMenu
                onHide={requestHide}
                triggerClassName="flex size-14 shrink-0 items-center justify-center rounded-card border border-neutral-300 bg-white text-secondary-900 transition-colors hover:bg-bg-app"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Prescription source */}
            {variant === "asl" ? (
              <Card className="items-center gap-[15px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-card border-2 border-info-500/25 p-4">
                    <Image
                      src="/images/scripts/qr-sample.webp"
                      alt="Digital prescription QR code"
                      width={151}
                      height={149}
                      unoptimized
                      className="size-[151px]"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-[10px] leading-[18px] text-secondary-500">
                      QR Code for Digital Prescription
                    </span>
                    <span className="text-caption-12 text-secondary-500">
                      Token: 2PPMFK9JTN79538539
                    </span>
                  </div>
                </div>
                {hidden && <HiddenBanner />}
              </Card>
            ) : (
              <Card className="items-center gap-2 py-8 text-center">
                <Icon src={DETAIL_ICON.paper} size={44} />
                <h2 className="text-subtitle-18-bold text-secondary-500">
                  Paper Prescription
                </h2>
                <p className="text-body-14 text-secondary-300">
                  Physical copy required when dispensing.
                </p>
                {hidden && <HiddenBanner />}
              </Card>
            )}

            {/* Medication form + quantities */}
            <Card className="gap-[15px]">
              <CardHead
                icon={<Icon src={DETAIL_ICON.tablet} size={44} />}
                title="Tablet"
                right={
                  <span
                    className={cn(
                      "rounded-[5px] px-1 py-1 text-caption-12-bold text-white",
                      status === "active" ? "bg-[#219A55]" : "bg-[#B93B2F]",
                    )}
                  >
                    {status === "active" ? "Active" : "Expired"}
                  </span>
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <Stat label="Supplies Left:" value="15 tablets" />
                <Stat label="Total Quantity:" value="30 tablets" />
                <Stat label="Strength:" value={strength} />
                <Stat label="Route:" value="Oral" />
              </div>
            </Card>

            {/* Personal notes */}
            <Card className="gap-[15px]">
              <CardHead
                icon={<Icon src={DETAIL_ICON.personalNotes} size={44} />}
                title="Personal Notes"
                right={
                  <button
                    type="button"
                    aria-label="Edit notes"
                    className="transition-opacity hover:opacity-70"
                  >
                    <Icon src={DETAIL_ICON.edit} size={24} />
                  </button>
                }
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-full bg-[#EFF6FF] px-2 py-1 text-caption-12-bold text-info-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-4">
                {PERSONAL_NOTES.map((note) => (
                  <p key={note} className="text-body-14 text-secondary-900">
                    {note}
                  </p>
                ))}
              </div>
            </Card>

            {/* Doctor's notes */}
            <Card className="gap-[15px]">
              <CardHead
                icon={<Icon src={DETAIL_ICON.doctorNotes} size={44} />}
                title="Doctor's Notes"
              />
              <div className="flex flex-col gap-0.5">
                {DOCTOR_NOTES.map((note) => (
                  <p key={note} className="text-body-14 text-secondary-900">
                    {note}
                  </p>
                ))}
              </div>
            </Card>

            {/* Information */}
            <Card className="gap-[15px]">
              <CardHead
                icon={<Icon src={DETAIL_ICON.information} size={44} />}
                title="Information"
              />
              <div className="flex flex-col gap-1">
                <span className="text-body-14 text-secondary-300">
                  Prescribed By:
                </span>
                <div className="flex flex-col">
                  <span className="text-body-14 text-[#1C232A]">
                    Dr. Sarah Johnson
                  </span>
                  <span className="text-body-14 text-secondary-300">
                    Melbourne Medical Centre
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <InfoDate label="Issue Date:" value="2024-10-01" />
                <InfoDate label="Expiry Date:" value="2024-12-15" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {hideModalOpen && (
        <HideScriptModal
          onConfirm={confirmHide}
          onClose={() => setHideModalOpen(false)}
        />
      )}
    </>
  );
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-card border border-[#E5E7EB] bg-white p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardHead({
  icon,
  title,
  right,
}: {
  icon: ReactNode;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-body-16-bold text-secondary-500">{title}</h2>
      </div>
      {right}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[6px] border border-neutral-300 bg-bg-app px-3 py-4">
      <span className="text-caption-12 text-secondary-500">{label}</span>
      <span className="text-body-14 font-bold text-secondary-500">{value}</span>
    </div>
  );
}

function InfoDate({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <span className="text-body-14 text-secondary-300">{label}</span>
      <span className="text-body-14 text-[#1C232A]">{value}</span>
    </div>
  );
}
