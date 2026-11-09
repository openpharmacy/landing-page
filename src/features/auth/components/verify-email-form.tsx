"use client";

import { useRouter } from "next/navigation";

import { useShowHidden } from "@/providers/hidden-screens";

import { VerifyCode } from "./verify-code";

export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const showHidden = useShowHidden();

  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          Verify your email
        </h1>
        <p className="text-body-16 text-secondary-500">
          We&apos;ve sent a 4-digit verification code to{" "}
          <span className="font-bold">{email}.</span>
          <br />
          Enter it below to continue.
        </p>
      </div>

      <VerifyCode
        returnTo="/sign-up/verify"
        onVerified={() => {
          router.push(showHidden ? "/sign-up/pin" : "/sign-up/done");
          router.refresh();
        }}
      />
    </div>
  );
}
