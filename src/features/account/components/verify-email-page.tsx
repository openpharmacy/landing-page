"use client";

import { useRouter } from "next/navigation";

import { VerifyCode } from "@/features/auth/components/verify-code";
import { withNext } from "@/features/auth/model/next-path";

import { SettingsPage } from "./settings-page";

export function VerifyEmailPage({
  email,
  next,
  sendOnOpen,
}: {
  email: string;
  next: string;
  sendOnOpen: boolean;
}) {
  const router = useRouter();

  return (
    <SettingsPage
      backHref={next}
      title="Verify your email"
      subtitle={
        <>
          We&apos;ve sent a 4-digit verification code to{" "}
          <span className="inline-block max-w-full font-bold wrap-anywhere">
            {email}.
          </span>
          <br />
          Enter it below to continue.
        </>
      }
    >
      <div className="lg:rounded-card-lg lg:border lg:border-[#e5e7eb] lg:bg-white lg:px-[23px] lg:pt-[23px] lg:pb-[47px]">
        <VerifyCode
          sendOnOpen={sendOnOpen}
          returnTo={withNext("/account/verify-email", next)}
          onVerified={() => {
            router.push(next);
            router.refresh();
          }}
        />
      </div>
    </SettingsPage>
  );
}
