"use client";

import Link from "next/link";

import { Icon } from "@/components/ui/icon";

import { useSocialSignIn } from "../hooks/use-social-sign-in";
import { withNext } from "../model/next-path";
import { GoogleAccountModal } from "./google-account-modal";
import { GoogleOverlay } from "./google-overlay";
import { OptionButton } from "./option-button";
import { OrDivider } from "./or-divider";

export function SignInOptions({ next }: { next: string | null }) {
  const social = useSocialSignIn("sign-in", next);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Welcome back
          </h1>
          <p className="text-body-16 text-secondary-500">
            Log in to your OpenPharmacy account
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="group relative rounded-control focus-within:ring-2 focus-within:ring-ring">
            <OptionButton
              covered={social.googleButton !== null}
              className="gap-2 lg:gap-5"
              onClick={() => social.start("google")}
            >
              <Icon src="/icons/auth/google.svg" size={20} />
              Sign in with Google
            </OptionButton>
            <GoogleOverlay button={social.googleButton} />
          </div>
          <OptionButton
            className="gap-2 lg:gap-[15px]"
            onClick={() => social.start("apple")}
          >
            <Icon src="/icons/auth/apple.svg" size={24} />
            Sign in with Apple
          </OptionButton>
          {social.notice && (
            <p className="text-body-14 text-error-500">{social.notice}</p>
          )}
        </div>

        <OrDivider />

        <div className="flex flex-col gap-[23px]">
          <OptionButton
            className="gap-1"
            href={withNext("/sign-in/email", next)}
          >
            <Icon src="/icons/auth/envelope.svg" size={24} />
            Sign in with email
          </OptionButton>
          <p className="text-center text-body-14 text-secondary-500">
            Don’t have an account yet?{" "}
            <Link
              href={withNext("/sign-up", next)}
              className="font-semibold text-info-500 hover:underline"
            >
              Sign up
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
