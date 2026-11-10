"use client";

import Link from "next/link";

import { Icon } from "@/components/ui/icon";

import { useSocialSignIn } from "../hooks/use-social-sign-in";
import { withNext } from "../model/next-path";
import { GoogleAccountModal } from "./google-account-modal";
import { OptionButton } from "./option-button";
import { OrDivider } from "./or-divider";

export function SignUpOptions({ next }: { next: string | null }) {
  const social = useSocialSignIn("sign-up", next);

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
          <OptionButton
            className="gap-2 lg:gap-[15px]"
            onClick={() => social.start("google")}
          >
            <Icon src="/icons/auth/google.svg" size={20} />
            Sign up with Google
          </OptionButton>
          <OptionButton
            className="gap-2 lg:gap-[11px]"
            onClick={() => social.start("apple")}
          >
            <Icon src="/icons/auth/apple.svg" size={24} />
            Sign up with Apple
          </OptionButton>
          {social.notice && (
            <p className="text-body-14 text-error-500">{social.notice}</p>
          )}
        </div>

        <OrDivider />

        <div className="flex flex-col gap-[23px]">
          <OptionButton
            className="gap-1"
            href={withNext("/sign-up/email", next)}
          >
            <Icon src="/icons/auth/envelope.svg" size={24} />
            Sign up email
          </OptionButton>
          <p className="text-center text-body-14 text-secondary-500">
            Already have an account?{" "}
            <Link
              href={withNext("/sign-in", next)}
              className="font-semibold text-info-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <GoogleAccountModal
        open={social.mockOpen}
        onClose={social.closeMock}
        onSelect={social.pickMockAccount}
      />
    </>
  );
}
