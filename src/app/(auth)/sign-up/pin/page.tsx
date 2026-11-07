import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SetPinForm } from "@/features/auth/components/set-pin-form";

export const metadata: Metadata = { title: "Set a PIN · Open Pharmacy" };

export default function SetPinPage() {
  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      backHref="/sign-up/verify"
      backLabel="Back"
    >
      <SetPinForm />
    </AuthSplit>
  );
}
