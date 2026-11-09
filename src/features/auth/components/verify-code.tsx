"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/errors";

import {
  needsSignIn,
  resendVerificationEmail,
  verifyEmail,
} from "../api/auth-api";
import { withNext } from "../model/next-path";
import { OtpInput } from "./otp-input";

const CODE_LENGTH = 4;
const UNAVAILABLE = "The service is not available right now. Please try again.";

export function VerifyCode({
  onVerified,
  returnTo,
  sendOnOpen = false,
}: {
  onVerified: () => void;
  returnTo: string;
  sendOnOpen?: boolean;
}) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const sent = useRef(false);

  function fail(cause: unknown) {
    if (needsSignIn(cause)) {
      router.push(withNext("/sign-in", returnTo));
      router.refresh();
      return;
    }
    setError(cause instanceof ApiError ? cause.message : UNAVAILABLE);
  }

  const sendFirstCode = useEffectEvent(() => {
    resendVerificationEmail().catch(fail);
  });
  useEffect(() => {
    if (!sendOnOpen || sent.current) return;
    sent.current = true;
    sendFirstCode();
  }, [sendOnOpen]);

  async function onVerify() {
    setError(null);
    setVerifying(true);
    try {
      await verifyEmail(code);
      onVerified();
    } catch (cause) {
      setVerifying(false);
      fail(cause);
    }
  }

  async function onResend() {
    setError(null);
    setResending(true);
    try {
      await resendVerificationEmail();
    } catch (cause) {
      fail(cause);
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-[23px] text-center">
      <div className="flex flex-col gap-1">
        <OtpInput
          onChange={(value) => {
            setCode(value);
            setError(null);
          }}
        />
        {error && (
          <p role="alert" className="text-caption-12 text-error-500">
            {error}
          </p>
        )}
      </div>
      <Button
        type="button"
        size="lg"
        disabled={code.length < CODE_LENGTH || verifying}
        className="w-full"
        onClick={onVerify}
      >
        Verify Email
      </Button>
      <p className="text-body-14 text-secondary-500">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          disabled={resending}
          onClick={onResend}
          className="font-semibold text-info-500 hover:underline"
        >
          Resend
        </button>
      </p>
    </div>
  );
}
