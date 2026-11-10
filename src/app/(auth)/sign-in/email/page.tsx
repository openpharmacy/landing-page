import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { safeNextPath, withNext } from "@/features/auth/model/next-path";
import { quickLoginUser } from "@/features/auth/server/quick-login-user";

export const metadata: Metadata = {
  title: "Sign in with email · Open Pharmacy",
};

export default async function SignInEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; account?: string }>;
}) {
  const params = await searchParams;
  const next = safeNextPath(params.next);
  const lastUser = params.account === "last" ? await quickLoginUser() : null;

  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      backLabel="Back"
      mobileBackLabel="Back to home"
      backHref={withNext("/sign-in", next)}
      mobileBackHref="/"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Welcome back
          </h1>
          <p className="text-body-16 text-secondary-500">
            Log in to your OpenPharmacy account
          </p>
        </div>
        <SignInForm defaultEmail={lastUser?.email} next={next} />
      </div>
    </AuthSplit>
  );
}
