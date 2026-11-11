"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useShowHidden } from "@/providers/hidden-screens";

import {
  errorField,
  requestPasswordReset,
  resetPassword,
} from "../api/auth-api";
import { passwordRules } from "../model/schema";
import { OtpInput } from "./otp-input";
import { PasswordInput } from "./password-input";
import { PasswordRules } from "./password-rules";
import { PinPad } from "./pin-pad";

type Step = "email" | "otp" | "password" | "pin" | "done";

const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

const message = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export function ResetPasswordFlow() {
  const showHidden = useShowHidden();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function submitPassword(): Promise<string | null> {
    try {
      await resetPassword({
        email: email.trim(),
        code,
        password,
        passwordConfirmation: confirm,
      });
    } catch (error) {
      if (errorField(error) !== "code") return message(error);
      setCodeError(message(error));
      setStep("otp");
      return null;
    }
    setStep(showHidden ? "pin" : "done");
    return null;
  }

  let content: ReactNode;
  switch (step) {
    case "otp":
      content = (
        <OtpStep
          email={email}
          initialError={codeError}
          onResend={() => requestPasswordReset(email.trim())}
          onBack={() => setStep("email")}
          onNext={(value) => {
            setCode(value);
            setCodeError(null);
            setStep("password");
          }}
        />
      );
      break;
    case "password":
      content = (
        <PasswordStep
          password={password}
          setPassword={setPassword}
          confirm={confirm}
          setConfirm={setConfirm}
          onBack={() => setStep("otp")}
          onSubmit={submitPassword}
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
      content = <DoneStep withPin={showHidden} />;
      break;
    default:
      content = (
        <EmailStep
          email={email}
          setEmail={setEmail}
          onNext={() => {
            setCodeError(null);
            setStep("otp");
          }}
        />
      );
  }

  return (
    <div
      key={step}
      className={cn(
        "animate-page-fade",
        (step === "pin" || step === "done") && "max-lg:min-h-[603px]",
        step === "done" &&
          "max-lg:pt-[113px] lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center",
      )}
    >
      {content}
    </div>
  );
}

const backClass =
  "w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500";

function HomeLink() {
  return (
    <Link href="/" className={cn(backClass, "inline-flex lg:hidden")}>
      <ArrowLeft className="size-5" />
      Back to home
    </Link>
  );
}

function BackLink() {
  return (
    <>
      <HomeLink />
      <Link
        href="/sign-in/email"
        className={cn(backClass, "hidden lg:inline-flex")}
      >
        <ArrowLeft className="size-5" />
        Back
      </Link>
    </>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <HomeLink />
      <button
        type="button"
        onClick={onClick}
        className={cn(backClass, "hidden lg:inline-flex")}
      >
        <ArrowLeft className="size-5" />
        Back
      </button>
    </>
  );
}

function StepHeader({
  back,
  title,
  subtitle,
  className,
}: {
  back: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      {back}
      <div className={cn("flex flex-col gap-2", className)}>
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

function EmailStep({
  email,
  setEmail,
  onNext,
}: {
  email: string;
  setEmail: (value: string) => void;
  onNext: () => void;
}) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isEmail(email) || sending) return;
    setError(null);
    setSending(true);
    try {
      await requestPasswordReset(email.trim());
    } catch (cause) {
      setSending(false);
      setError(message(cause));
      return;
    }
    onNext();
  }
  return (
    <div className="flex flex-col gap-8">
      <StepHeader
        back={<BackLink />}
        title="Reset Your Password"
        subtitle={
          <span className="lg:whitespace-nowrap">
            Enter your email address and we’ll send you a link to reset your
            password.
          </span>
        }
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-[23px]">
        <div className="flex flex-col gap-2">
          <Label htmlFor="reset-email">Email</Label>
          <div className="flex flex-col gap-1">
            <Input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="Enter email"
              value={email}
              aria-invalid={Boolean(error)}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
            />
            {error && <FieldError>{error}</FieldError>}
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!isEmail(email) || sending}
        >
          Send Reset Email
        </Button>
      </form>
    </div>
  );
}

function OtpStep({
  email,
  initialError,
  onResend,
  onBack,
  onNext,
}: {
  email: string;
  initialError: string | null;
  onResend: () => Promise<void>;
  onBack: () => void;
  onNext: (code: string) => void;
}) {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState(initialError);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  async function resend() {
    if (resending) return;
    setError(null);
    setResending(true);
    try {
      await onResend();
      setSeconds(30);
    } catch (cause) {
      setError(message(cause));
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <StepHeader
        back={<BackButton onClick={onBack} />}
        title={
          <>
            <span className="lg:hidden">Reset Your Password</span>
            <span className="hidden lg:inline">Reset Email Sent!</span>
          </>
        }
        subtitle={
          <>
            We’ve sent a 4-digit verification code to {email || "your email"}.
            <br />
            Enter it below to continue.
          </>
        }
      />
      <div className="flex flex-col items-center gap-[23px]">
        <div className="flex flex-col items-center gap-1">
          <OtpInput
            onChange={(value) => {
              setCode(value);
              setError(null);
            }}
          />
          {error && <FieldError className="text-center">{error}</FieldError>}
        </div>
        <button
          type="button"
          disabled={seconds > 0 || resending}
          onClick={resend}
          className="hidden h-14 items-center px-6 text-body-16-bold text-secondary-500 lg:flex"
        >
          {seconds > 0
            ? `Didn’t receive the code? Resend in ${seconds}s`
            : "Didn’t receive the code? Resend"}
        </button>
        <p className="text-center text-body-14 text-secondary-500 lg:hidden">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            disabled={seconds > 0 || resending}
            onClick={resend}
            className="font-semibold text-info-500 hover:underline disabled:text-secondary-300 disabled:no-underline"
          >
            {seconds > 0 ? `Resend in ${seconds}s` : "Resend"}
          </button>
        </p>
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={code.length < 4}
          onClick={() => onNext(code)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function PasswordStep({
  password,
  setPassword,
  confirm,
  setConfirm,
  onBack,
  onSubmit,
}: {
  password: string;
  setPassword: (value: string) => void;
  confirm: string;
  setConfirm: (value: string) => void;
  onBack: () => void;
  onSubmit: () => Promise<string | null>;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rulesPass = passwordRules.every((rule) => rule.test(password));
  const matches = password.length > 0 && password === confirm;

  async function submit() {
    setError(null);
    setSaving(true);
    const failure = await onSubmit();
    if (failure) {
      setSaving(false);
      setError(failure);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <StepHeader
        back={<BackButton onClick={onBack} />}
        className="lg:min-h-[72px]"
        title={
          <>
            <span className="lg:hidden">Set New Password</span>
            <span className="hidden lg:inline">Set new Password</span>
          </>
        }
      />
      <div className="flex flex-col gap-[23px]">
        <div className="flex flex-col gap-2">
          <Label htmlFor="new-password">
            <span className="lg:hidden">Password</span>
            <span className="hidden lg:inline">New Password</span>
          </Label>
          <div className="flex flex-col gap-1">
            <PasswordInput
              id="new-password"
              autoComplete="new-password"
              placeholder="Enter password"
              value={password}
              invalid={Boolean(error)}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
            />
            {error && <FieldError>{error}</FieldError>}
          </div>
          {password.length > 0 && <PasswordRules value={password} />}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm-password">
            <span className="lg:hidden">Confirm New Password</span>
            <span className="hidden lg:inline">Confirm Password</span>
          </Label>
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
          disabled={!rulesPass || !matches || saving}
          onClick={submit}
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
      <StepHeader
        back={<BackButton onClick={onBack} />}
        title="Set a PIN"
        subtitle="Enter a 4-digit PIN to keep your account secure"
        className="lg:text-center"
      />
      <PinPad onComplete={onComplete} dotsClassName="max-lg:hidden" />
    </div>
  );
}

function DoneStep({ withPin }: { withPin: boolean }) {
  return (
    <div className="flex w-full max-w-[480px] flex-col items-center gap-8 text-center">
      <Icon src="/icons/auth/tick-circle.svg" size={120} />
      <div className="flex flex-col gap-2">
        <h1 className="text-display-32 text-secondary-900">All set!</h1>
        <p className="text-body-16 text-secondary-500">
          {withPin
            ? "Your password and PIN have been updated successfully. You can now log in securely."
            : "Your password has been updated successfully. You can now log in securely."}
        </p>
      </div>
      <Button asChild size="lg" className="w-full">
        <Link href="/sign-in">Log in</Link>
      </Button>
    </div>
  );
}

function FieldError({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p role="alert" className={cn("text-caption-12 text-error-500", className)}>
      {children}
    </p>
  );
}
