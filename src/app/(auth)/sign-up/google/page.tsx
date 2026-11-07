import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { GoogleProfileForm } from "@/features/auth/components/google-profile-form";

export const metadata: Metadata = {
  title: "Complete your profile · Open Pharmacy",
};

export default async function GoogleSignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ first?: string; last?: string }>;
}) {
  const { first, last } = await searchParams;
  return (
    <AuthSplit hero={<AuthPhotoHero />} showBack={false}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Let&apos;s set you up
          </h1>
          <p className="text-body-16 text-secondary-500">
            Create your account to get started with OpenPharmacy
          </p>
        </div>
        <GoogleProfileForm
          firstName={first || "Cody"}
          lastName={last || "Banks"}
        />
      </div>
    </AuthSplit>
  );
}
