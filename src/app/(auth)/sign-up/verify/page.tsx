import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";

export const metadata: Metadata = {
  title: "Verify your email · Open Pharmacy",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      backHref="/sign-up/email"
      backLabel="Back"
    >
      <VerifyEmailForm email={email || "your email"} />
    </AuthSplit>
  );
}
