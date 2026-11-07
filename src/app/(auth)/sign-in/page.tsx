import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = { title: "Sign in · Open Pharmacy" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  // Return "Back" to where the user came from (e.g. a product page), else home.
  const { next } = await searchParams;
  const backHref = next && next.startsWith("/") ? next : "/";

  return (
    <AuthSplit hero={<AuthPhotoHero />} backLabel="Back" backHref={backHref}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Welcome back
          </h1>
          <p className="text-body-16 text-secondary-500">
            Log in to your OpenPharmacy account
          </p>
        </div>
        <SignInForm />
      </div>
    </AuthSplit>
  );
}
