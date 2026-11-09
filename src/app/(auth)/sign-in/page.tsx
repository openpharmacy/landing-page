import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SignInOptions } from "@/features/auth/components/sign-in-options";
import { safeNextPath } from "@/features/auth/model/next-path";

export const metadata: Metadata = { title: "Sign in · Open Pharmacy" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNextPath((await searchParams).next);

  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      top="chooser"
      mobileMinHeight="min-h-[600px]"
    >
      <SignInOptions next={next} />
    </AuthSplit>
  );
}
