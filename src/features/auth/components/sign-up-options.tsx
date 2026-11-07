"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { GoogleAccountModal, type GoogleAccount } from "./google-account-modal";
import { OrDivider } from "./or-divider";
import { AppleIcon, EnvelopeIcon, GoogleIcon } from "./social-icons";

/**
 * Sign-up method chooser (Figma "Let's set you up"). Google opens a mock
 * account chooser (no real OAuth yet); Apple is unavailable; email goes to the
 * form. See docs/api-gaps.md.
 */
export function SignUpOptions() {
  const router = useRouter();
  const [notice, setNotice] = useState<string | null>(null);
  const [googleOpen, setGoogleOpen] = useState(false);

  function onPickGoogleAccount(account: GoogleAccount | null) {
    setGoogleOpen(false);
    if (account) {
      const params = new URLSearchParams({
        first: account.first,
        last: account.last,
      });
      router.push(`/sign-up/google?${params.toString()}`);
    } else {
      router.push("/sign-up/google");
    }
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Let&apos;s set you up
          </h1>
          <p className="text-body-16 text-secondary-500">
            Create your account to get started with OpenPharmacy
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <OptionButton onClick={() => setGoogleOpen(true)}>
            <GoogleIcon />
            Sign up with Google
          </OptionButton>
          <OptionButton
            onClick={() => setNotice("Social sign-up isn't available yet.")}
          >
            <AppleIcon className="size-5 text-secondary-900" />
            Sign up with Apple
          </OptionButton>
          {notice && <p className="text-body-14 text-error-500">{notice}</p>}
        </div>

        <OrDivider />

        <div className="flex flex-col gap-[23px]">
          <OptionButton href="/sign-up/email">
            <EnvelopeIcon className="size-5 text-secondary-900" />
            Sign up email
          </OptionButton>
          <p className="text-center text-body-14 text-secondary-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-info-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <GoogleAccountModal
        open={googleOpen}
        onClose={() => setGoogleOpen(false)}
        onSelect={onPickGoogleAccount}
      />
    </>
  );
}

/** White outline button (radius 8) used for each sign-up method. */
function OptionButton({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const className = cn(
    "flex h-[60px] w-full items-center justify-center gap-3 rounded-control",
    "border border-neutral-300 bg-white text-body-16 text-text",
    "transition-colors hover:bg-bg-app",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
