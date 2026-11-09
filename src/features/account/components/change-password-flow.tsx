"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/features/auth/components/password-input";
import { PasswordRules } from "@/features/auth/components/password-rules";
import { PinPad } from "@/features/auth/components/pin-pad";
import { useAuthActions } from "@/features/auth/hooks/use-auth-actions";
import { passwordRules } from "@/features/auth/model/schema";
import { ApiError } from "@/lib/api/errors";
import { cn } from "@/lib/utils";
import { useShowHidden } from "@/providers/hidden-screens";

import { changePassword, errorMessage, isSignedOut } from "../api/account-api";

type Step = "form" | "pin" | "done";

const card =
  "lg:rounded-card-lg lg:border lg:border-[#e5e7eb] lg:bg-white lg:px-[23px] lg:pt-[23px] lg:pb-[47px]";

export function ChangePasswordFlow() {
  const showHidden = useShowHidden();
  const [step, setStep] = useState<Step>("form");

  let content: ReactNode;
  switch (step) {
    case "pin":
      content = (
        <PinStep
          onBack={() => setStep("form")}
          onComplete={() => setStep("done")}
        />
      );
      break;
    case "done":
      content = <DoneStep withPin={showHidden} />;
      break;
    default:
      content = (
        <FormStep onNext={() => setStep(showHidden ? "pin" : "done")} />
      );
  }

  return (
    <div
      key={step}
      className={cn(
        "mx-auto w-full animate-page-fade px-4 pt-[17px] lg:max-w-[572px] lg:pt-6 lg:pr-0 lg:pb-20 lg:pl-[2px]",
        step === "form" ? "pb-[14px]" : "min-h-[652px] pb-8 lg:min-h-0",
        step === "done" && "max-lg:pt-[130px]",
      )}
    >
      {content}
    </div>
  );
}

const backClass =
  "w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500";
const arrow = (
  <Icon src="/icons/account/arrow-left.svg" size={20} loading="eager" />
);

function Back({ href, onClick }: { href?: string; onClick?: () => void }) {
  const desktop = cn(backClass, "hidden lg:inline-flex");
  return (
    <>
      <Link href="/home" className={cn(backClass, "inline-flex lg:hidden")}>
        {arrow}
        Back to home
      </Link>
      {href ? (
        <Link href={href} className={desktop}>
          {arrow}
          Back
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={desktop}>
          {arrow}
          Back
        </button>
      )}
    </>
  );
}

function StepHeader({
  back,
  title,
  subtitle,
}: {
  back: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-8 lg:gap-4">
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

type FormErrors = { current?: string; password?: string; form?: string };

const PATH = "/account/settings/password";

function FormStep({ onNext }: { onNext: () => void }) {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const rulesPass = passwordRules.every((rule) => rule.test(password));
  const matches = password.length > 0 && password === confirm;
  const valid = current.length > 0 && rulesPass && matches;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!valid || saving) return;
    setErrors({});
    setSaving(true);
    try {
      await changePassword({
        currentPassword: current,
        newPassword: password,
        newPasswordConfirmation: confirm,
      });
      onNext();
    } catch (error) {
      setSaving(false);
      if (isSignedOut(error)) {
        router.push(`/sign-in?next=${PATH}`);
        router.refresh();
        return;
      }
      setErrors(fieldFor(error));
    }
  }

  async function forgotPassword(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    await signOut().catch(() => {});
    router.push("/forgot-password");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-8">
      <StepHeader
        back={<Back href="/account/settings" />}
        title="Set New Password"
      />
      <form
        onSubmit={onSubmit}
        className={cn("flex flex-col gap-[23px]", card)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="current-password">Current Password</Label>
          <div className="flex flex-col gap-1">
            <PasswordInput
              id="current-password"
              autoComplete="current-password"
              placeholder="Enter password"
              value={current}
              invalid={Boolean(errors.current)}
              onChange={(e) => {
                setCurrent(e.target.value);
                setErrors((prev) => ({ ...prev, current: undefined }));
              }}
            />
            {errors.current && <FieldError>{errors.current}</FieldError>}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="new-password">New Password</Label>
          <div className="flex flex-col gap-1">
            <PasswordInput
              id="new-password"
              autoComplete="new-password"
              placeholder="Enter password"
              value={password}
              invalid={Boolean(errors.password)}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </div>
          {password.length > 0 && <PasswordRules value={password} />}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <PasswordInput
            id="confirm-password"
            autoComplete="new-password"
            placeholder="Enter password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <Link
          href="/forgot-password"
          onClick={forgotPassword}
          className="w-fit text-body-14 font-bold text-primary-500 hover:underline"
        >
          Forgot Password?
        </Link>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!valid || saving}
        >
          Change Password
        </Button>
        {errors.form && <FieldError>{errors.form}</FieldError>}
      </form>
    </div>
  );
}

function fieldFor(error: unknown): FormErrors {
  const message = errorMessage(error);
  if (
    error instanceof ApiError &&
    (error.status === 400 || error.status === 422)
  ) {
    return /invalid credentials/i.test(message)
      ? { current: message }
      : { password: message };
  }
  return { form: message };
}

function FieldError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-caption-12 text-error-500">
      {children}
    </p>
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
        back={<Back onClick={onBack} />}
        title="Set a PIN"
        subtitle="Enter a 4-digit PIN to keep your account secure"
      />
      <div className={card}>
        <PinPad onComplete={onComplete} dotsClassName="max-lg:hidden" />
      </div>
    </div>
  );
}

function DoneStep({ withPin }: { withPin: boolean }) {
  return (
    <div className={cn("flex flex-col items-center gap-8 text-center", card)}>
      <Icon src="/icons/auth/tick-circle.svg" size={120} />
      <div className="flex flex-col gap-2">
        <h1 className="text-display-32 text-secondary-900">All set!</h1>
        <p className="text-body-16 text-secondary-500">
          {withPin
            ? "Your password and PIN have been updated successfully. You can now log in securely."
            : "Your password has been updated successfully. Use it the next time you log in."}
        </p>
      </div>
      <Button asChild size="lg" className="w-full">
        <Link href="/account">Log in</Link>
      </Button>
    </div>
  );
}
