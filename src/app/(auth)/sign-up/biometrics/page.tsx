import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { BiometricOptIn } from "@/features/auth/components/biometric-opt-in";
import { safeNextPath, withNext } from "@/features/auth/model/next-path";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = {
  title: "Biometric login · Open Pharmacy",
};

export default async function SignUpBiometricsPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const next = safeNextPath((await searchParams).next);
  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      showBack={false}
      mobileMinHeight="min-h-[733px]"
    >
      <BiometricOptIn href={withNext("/sign-up/done", next)} />
    </AuthSplit>
  );
}
