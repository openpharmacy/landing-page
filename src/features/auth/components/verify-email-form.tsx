"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { OtpInput } from "./otp-input";

const CODE_LENGTH = 4;

/**
 * Email verification step (Figma 42:3335). There is no verification API yet, so
 * "Verify Email" simply finishes onboarding. The OTP boxes auto-advance.
 */
export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");

  function onVerify() {
    // No verify API yet — advance to the Set-a-PIN step.
    router.push("/sign-up/pin");
  }

  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          Verify your email
        </h1>
        <p className="max-w-[380px] text-body-16 text-secondary-500 lg:max-w-[480px]">
          We&apos;ve sent a 4-digit verification code to{" "}
          <span className="font-bold text-secondary-900">{email}</span>.
          <br />
          Enter it below to continue.
        </p>
      </div>

      <div className="flex w-full flex-col gap-[23px]">
        <OtpInput onChange={setCode} />
        <Button
          type="button"
          size="lg"
          disabled={code.length < CODE_LENGTH}
          className="w-full"
          onClick={onVerify}
        >
          Verify Email
        </Button>
        <p className="text-body-14 text-secondary-500">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            className="font-semibold text-info-500 hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
