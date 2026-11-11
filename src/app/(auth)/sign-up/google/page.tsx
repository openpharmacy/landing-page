import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isMockingEnabled } from "@/config/env";
import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { GoogleProfileForm } from "@/features/auth/components/google-profile-form";
import { safeNextPath } from "@/features/auth/model/next-path";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Complete your profile · Open Pharmacy",
};

export default async function GoogleSignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ first?: string; last?: string; next?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/sign-up");
  const params = await searchParams;
  const { first, last } = isMockingEnabled ? params : {};

  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      showBack={false}
      showMobileBack
      mobileMinHeight="min-h-[722px]"
    >
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
          firstName={first || session.profile.name}
          lastName={last || session.profile.surname}
          next={safeNextPath(params.next)}
        />
      </div>
    </AuthSplit>
  );
}
