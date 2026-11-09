import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";
import { withNext } from "@/features/auth/model/next-path";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Verify your email · Open Pharmacy",
};

export default async function VerifyEmailPage() {
  const session = await getSession();
  if (!session) redirect(withNext("/sign-in", "/sign-up/verify"));

  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      backHref="/sign-up/email"
      backLabel="Back"
      mobileMinHeight="min-h-[565px]"
    >
      <VerifyEmailForm email={session.profile.email} />
    </AuthSplit>
  );
}
