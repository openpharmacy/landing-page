"use client";

import { ArrowLeft, CircleCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { connectAsl } from "../api/scripts-api";
import type { AslSetup } from "../model/validation";
import { AslSetupForm } from "./asl-setup-form";
import { BackCircle } from "./back-circle";

const BULLETS = [
  "Your Active Script List is a secure, national registry of all your current prescriptions and repeats",
  "Access your scripts from any participating pharmacy without carrying paper prescriptions",
  "Track repeats, expiry dates, and control which pharmacies can access your medication history",
];

type Step = "intro" | "setup" | "success";

export function ConnectAslFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("intro");
  const [found, setFound] = useState(0);

  async function connect(values: AslSetup): Promise<string | null> {
    try {
      const { activeScripts } = await connectAsl(values);
      setFound(activeScripts);
      setStep("success");
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : "Could not connect";
    }
  }

  function finish() {
    router.push("/scripts");
    router.refresh();
  }

  if (step === "success") {
    return (
      <Shell key={step} className="gap-8 lg:pt-[84px]">
        <div className="flex flex-col items-center gap-6 text-center">
          <SuccessBadge />
          <div className="flex flex-col">
            <h1 className="text-display-32 text-secondary-700">
              ASL Successfully Linked!
            </h1>
            <p className="text-body-16 text-secondary-500">
              Your Active Script List is now connected
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[23px]">
          <div className="flex min-h-[339px] flex-col gap-6 lg:min-h-0">
            <div className="flex flex-col gap-3">
              <StatRow
                icon={<Icon src="/icons/scripts/detail/paper.svg" size={44} />}
                label="Active Scripts Found"
                value={String(found)}
                valueClass="text-primary-500"
              />
              <StatRow
                icon={
                  <span className="flex size-11 items-center justify-center rounded-control bg-success-500/20">
                    <Icon src="/icons/scripts/asl/shield-green.svg" size={24} />
                  </span>
                }
                label="Connection Status"
                value="Secure & Active"
                valueClass="text-success-500"
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
      <Shell key={step} className="gap-8">
        <Header
          back={
            <>
              <BackLink
                onClick={() => setStep("intro")}
                className="hidden lg:inline-flex"
              />
              <button
                type="button"
                onClick={() => setStep("intro")}
                aria-label="Back"
                className="my-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-900/8 transition-colors hover:bg-neutral-900/12 lg:hidden"
              >
                <Icon src="/icons/scripts/asl/back.svg" size={24} />
              </button>
            </>
          }
          title="Let's set Up Your ASL"
          subtitle="Enter your DOB and activation code."
        />
        <AslSetupForm onContinue={connect} />
      </Shell>
    );
  }

  return (
    <Shell key={step} className="gap-9 lg:gap-8">
      <Header
        back={
          <>
            <BackLink href="/scripts" className="hidden lg:inline-flex" />
            <BackCircle
              href="/scripts"
              label="Back"
              className="my-1 lg:hidden"
            />
          </>
        }
        title="Connect ASL"
        subtitle="Connect your Active Script List to manage all your prescriptions in one place"
      />
      <div className="flex flex-col gap-4 rounded-card-lg border border-[#E5E7EB] bg-white px-[23px] pt-[23px] pb-[47px]">
        <h2 className="text-subtitle-18-bold text-black">What is ASL?</h2>
        <ul className="flex min-h-[413px] flex-col gap-3 lg:min-h-[150px]">
          {BULLETS.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <CircleCheck className="size-5 shrink-0 text-success-500" />
              <span className="text-body-14 text-secondary-700">{bullet}</span>
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

function Shell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-[774px] w-full max-w-[602px] animate-page-fade flex-col px-4 pt-[17px] lg:min-h-0 lg:pt-6 lg:pr-[15px] lg:pl-[17px]",
        className,
      )}
    >
      {children}
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
    <div className="flex items-start gap-4 lg:flex-col lg:gap-0">
      {back}
      <div className="flex min-w-0 flex-1 flex-col">
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          {title}
        </h1>
        <p className="text-body-14 text-secondary-300 lg:text-body-16">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

const BACK_LINK =
  "w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500";

function BackLink({
  href,
  onClick,
  className,
}: {
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const content = (
    <>
      <ArrowLeft className="size-5" />
      Back
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cn(BACK_LINK, className)}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(BACK_LINK, className)}
    >
      {content}
    </button>
  );
}

function StatRow({
  icon,
  label,
  value,
  valueClass,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-card border border-neutral-300 bg-white p-[23px]">
      {icon}
      <div className="flex flex-col">
        <span className="text-body-16 text-neutral-900">{label}</span>
        <span className={cn("text-h4-24", valueClass)}>{value}</span>
      </div>
    </div>
  );
}

function SuccessBadge() {
  return (
    <div className="relative size-28">
      <div className="flex size-28 items-center justify-center rounded-full bg-success-500/20">
        <CircleCheck className="size-16 text-success-500" />
      </div>
      <span className="absolute right-0 bottom-0 flex size-9 items-center justify-center rounded-full bg-primary-500">
        <Icon src="/icons/scripts/asl/shield-white.svg" size={24} />
      </span>
    </div>
  );
}
