"use client";

import { ArrowLeft, CircleCheck, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { setAslConnected } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";

import { AslSetupForm } from "./asl-setup-form";

const BULLETS = [
  "Your Active Script List is a secure, national registry of all your current prescriptions and repeats",
  "Access your scripts from any participating pharmacy without carrying paper prescriptions",
  "Track repeats, expiry dates, and control which pharmacies can access your medication history",
];

type Step = "intro" | "setup" | "success";

/**
 * Connect-ASL wizard (Figma `161:2680` → `161:2741` → `161:2813`). There is no
 * ASL backend yet (docs/api-gaps.md), so this is a UI-only mock: the setup form
 * validates locally, then a faked success "Go to My Scripts" flips the mock
 * `op_asl_connected` flag so My Scripts renders the synced (grouped) view.
 */
export function ConnectAslFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");

  function finish() {
    setAslConnected();
    router.push("/scripts");
    router.refresh();
  }

  if (step === "success") {
    return (
      <Shell key={step}>
        <div className="flex flex-col items-center gap-6 text-center">
          <SuccessBadge />
          <div className="flex flex-col">
            <h1 className="text-h4-24 text-secondary-700 lg:text-display-32">
              ASL Successfully Linked!
            </h1>
            <p className="text-body-16 text-secondary-500">
              Your Active Script List is now connected
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[23px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <StatRow
                icon={<FileText className="size-6 text-white" />}
                iconClass="bg-primary-500"
                label="Active Scripts Found"
                value="4"
                valueClass="text-h4-24 text-primary-500"
              />
              <StatRow
                icon={<ShieldCheck className="size-6 text-[#21B23F]" />}
                iconClass="bg-success-500/15"
                label="Connection Status"
                value="Secure & Active"
                valueClass="text-subtitle-18-bold text-[#21B23F]"
              />
            </div>
            <p className="text-body-14 text-secondary-500">
              Your scripts are now synced with the official ASL registry. You
              can manage pharmacy access, order refills, and track your
              medications from your dashboard.
            </p>
          </div>
          <Button type="button" size="lg" className="w-full" onClick={finish}>
            Go to My Scripts
          </Button>
        </div>
      </Shell>
    );
  }

  if (step === "setup") {
    return (
      <Shell key={step}>
        <Header
          back={<BackButton onClick={() => setStep("intro")} />}
          title="Let's set Up Your ASL"
          subtitle="Enter your DOB and activation code."
        />
        <AslSetupForm onContinue={() => setStep("success")} />
      </Shell>
    );
  }

  // intro
  return (
    <Shell key={step}>
      <Header
        back={<BackLink href="/scripts" />}
        title="Connect ASL"
        subtitle="Connect your Active Script List to manage all your prescriptions in one place"
      />
      <div className="flex flex-col gap-4 rounded-card-lg border border-[#E5E7EB] bg-white px-6 pt-6 pb-12">
        <h2 className="text-subtitle-18-bold text-secondary-900">
          What is ASL?
        </h2>
        <ul className="flex flex-col gap-3">
          {BULLETS.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-success-500" />
              <span className="text-body-14 text-text">{bullet}</span>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          size="lg"
          className="w-full"
          onClick={() => setStep("setup")}
        >
          Connect ASL Now
        </Button>
      </div>
    </Shell>
  );
}

/** 570px centred column shared by every step. */
function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[570px] animate-page-fade px-4 py-8">
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}

function Header({
  back,
  title,
  subtitle,
}: {
  back: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      {back}
      <div className="flex flex-col">
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          {title}
        </h1>
        <p className="text-body-16 text-secondary-300">{subtitle}</p>
      </div>
    </div>
  );
}

function BackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
    >
      <ArrowLeft className="size-5" />
      Back
    </Link>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
    >
      <ArrowLeft className="size-5" />
      Back
    </button>
  );
}

function StatRow({
  icon,
  iconClass,
  label,
  value,
  valueClass,
}: {
  icon: ReactNode;
  iconClass: string;
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-card border border-neutral-300 bg-white p-6">
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-control",
          iconClass,
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-body-16 text-[#1C232A]">{label}</span>
        <span className={valueClass}>{value}</span>
      </div>
    </div>
  );
}

/** Green success circle with a check and an overlapping blue security shield. */
function SuccessBadge() {
  return (
    <div className="relative size-28">
      <div className="flex size-28 items-center justify-center rounded-full bg-success-500/15">
        <CircleCheck className="size-16 text-success-500" strokeWidth={1.8} />
      </div>
      <span className="absolute right-0 bottom-1 flex size-9 items-center justify-center rounded-full bg-primary-500 ring-4 ring-bg-app">
        <ShieldCheck className="size-5 text-white" />
      </span>
    </div>
  );
}
