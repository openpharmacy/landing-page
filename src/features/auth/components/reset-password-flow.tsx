"use client";

import { ArrowLeft, Check, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { passwordRules } from "../model/schema";
import { OtpInput } from "./otp-input";
import { PasswordInput } from "./password-input";
import { PinPad } from "./pin-pad";

type Step = "email" | "otp" | "password" | "pin" | "done";

const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

/**
 * Forgot-password wizard (Figma `251:3818` → `251:3872` → `251:4397` →
 * `251:4444` → `251:4634`). UI-only — reuses the sign-up OTP / password rules /
 * PIN pad. No backend (see docs/api-gaps.md).
 */
export function ResetPasswordFlow() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  let content: ReactNode;
  switch (step) {
    case "otp":
      content = (
        <OtpStep
          email={email}
          onBack={() => setStep("email")}
          onNext={() => setStep("password")}
        />
      );
      break;
    case "password":
      content = (
        <PasswordStep
          onBack={() => setStep("otp")}
          onNext={() => setStep("pin")}
        />
      );
      break;
    case "pin":
      content = (
        <PinStep
          onBack={() => setStep("password")}
          onComplete={() => setStep("done")}
        />
      );
      break;
    case "done":
      content = <DoneStep />;
      break;
    default:
      content = (
        <EmailStep
          email={email}
          setEmail={setEmail}
          onNext={() => setStep("otp")}
        />
      );
  }

  // `key` per step remounts the wrapper so the fade replays on each step change.
  return (
    <div key={step} className="animate-page-fade">
      {content}
    </div>
  );
}

function StepHeader({
  back,
  title,
  subtitle,
}: {
  back: ReactNode;
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      {back}
      <div className="flex flex-col gap-2">
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          {title}
        </h1>
        {subtitle && (
          <p className="text-body-16 text-secondary-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/sign-in"
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

function EmailStep({
  email,
  setEmail,
  onNext,
}: {
  email: string;
  setEmail: (value: string) => void;
  onNext: () => void;
}) {
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (isEmail(email)) onNext();
  }
  return (
    <div className="flex flex-col gap-8">
      <StepHeader
        back={<BackLink />}
        title="Reset Your Password"
        subtitle="Enter your email address and we'll send you a link to reset your password."
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-[23px]">
        <div className="flex flex-col gap-2">
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            type="email"
            autoComplete="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!isEmail(email)}
        >
          Send Reset Email
        </Button>
      </form>
    </div>
  );
}

function OtpStep({
  email,
  onBack,
  onNext,
}: {
  email: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div className="flex flex-col gap-8">
      <StepHeader
        back={<BackButton onClick={onBack} />}
        title="Reset Email Sent!"
        subtitle={
          <>
            We&apos;ve sent a 4-digit verification code to{" "}
            <span className="text-secondary-900">{email || "your email"}</span>.
            Enter it below to continue.
          </>
        }
      />
      <div className="flex flex-col gap-[23px]">
        <OtpInput onChange={setCode} />
        <p className="text-center text-body-14 font-semibold text-secondary-900">
          {seconds > 0 ? (
            `Didn't receive the code? Resend in ${seconds}s`
          ) : (
            <button
              type="button"
              onClick={() => setSeconds(30)}
              className="text-info-500 hover:underline"
            >
              Didn&apos;t receive the code? Resend
            </button>
          )}
        </p>
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={code.length < 4}
          onClick={onNext}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function PasswordStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const rulesPass = passwordRules.every((rule) => rule.test(password));
  const matches = password.length > 0 && password === confirm;

  return (
    <div className="flex flex-col gap-8">
      <StepHeader
        back={<BackButton onClick={onBack} />}
        title="Set new Password"
      />
      <div className="flex flex-col gap-[23px]">
        <div className="flex flex-col gap-2">
          <Label htmlFor="new-password">New Password</Label>
          <PasswordInput
            id="new-password"
            autoComplete="new-password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {passwordRules.map((rule) => {
                const ok = rule.test(password);
                return (
                  <span
                    key={rule.id}
                    className="flex items-center gap-1 text-body-14 text-secondary-500"
                  >
                    {ok ? (
                      <Check
                        className="size-[18px] shrink-0 text-success-500"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <X
                        className="size-[18px] shrink-0 text-error-500"
                        strokeWidth={2.5}
                      />
                    )}
                    {rule.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <PasswordInput
            id="confirm-password"
            autoComplete="new-password"
            placeholder="Enter password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={!rulesPass || !matches}
          onClick={onNext}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}

function PinStep({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <BackButton onClick={onBack} />
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Set a PIN
          </h1>
          <p className="text-body-16 text-secondary-500">
            Enter a 4-digit PIN to keep your account secure
          </p>
        </div>
        <PinPad onComplete={onComplete} />
      </div>
    </div>
  );
}

function DoneStep() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Icon src="/icons/checkout/confirmed-tick.svg" size={120} />
      <div className="flex flex-col gap-2">
        <h1 className="text-h3-30 text-secondary-900 lg:text-display-32">
          All set!
        </h1>
        <p className="text-body-16 text-secondary-500">
          Your password and PIN have been updated successfully. You can now log
          in securely.
        </p>
      </div>
      <Button asChild size="lg" className="w-full">
        <Link href="/sign-in">Log in</Link>
      </Button>
    </div>
  );
}
