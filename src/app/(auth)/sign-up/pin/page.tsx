import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SetPinForm } from "@/features/auth/components/set-pin-form";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Set a PIN · Open Pharmacy" };

export default async function SetPinPage() {
  if (!(await showHiddenScreens())) notFound();
  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      backHref="/sign-up/verify"
      backLabel="Back"
      mobileMinHeight="min-h-[733px]"
    >
      <SetPinForm />
    </AuthSplit>
  );
}
