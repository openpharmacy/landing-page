import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SignUpOptions } from "@/features/auth/components/sign-up-options";

export const metadata: Metadata = { title: "Sign up · Open Pharmacy" };

export default function SignUpPage() {
  return (
    <AuthSplit
      hero={<AuthPhotoHero photoUnderCircles />}
      top="chooser"
      mobileMinHeight="min-h-[600px]"
    >
      <SignUpOptions />
    </AuthSplit>
  );
}
