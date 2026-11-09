import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { BiometricOptIn } from "@/features/auth/components/biometric-opt-in";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = {
  title: "Biometric login · Open Pharmacy",
};

export default async function SignUpBiometricsPage() {
  if (!(await showHiddenScreens())) notFound();
  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      showBack={false}
      mobileMinHeight="min-h-[733px]"
    >
      <BiometricOptIn href="/sign-up/done" />
    </AuthSplit>
  );
}
