import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SignUpOptions } from "@/features/auth/components/sign-up-options";
import { safeNextPath } from "@/features/auth/model/next-path";

export const metadata: Metadata = { title: "Sign up · Open Pharmacy" };

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNextPath((await searchParams).next);

  return (
    <AuthSplit
      hero={<AuthPhotoHero photoUnderCircles />}
      top="chooser"
      mobileMinHeight="min-h-[600px]"
    >
      <SignUpOptions next={next} />
    </AuthSplit>
  );
}
