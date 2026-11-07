import type { Metadata } from "next";

import { AuthCarousel } from "@/features/auth/components/auth-carousel";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SignUpOptions } from "@/features/auth/components/sign-up-options";

export const metadata: Metadata = { title: "Sign up · Open Pharmacy" };

export default function SignUpPage() {
  return (
    <AuthSplit hero={<AuthCarousel />}>
      <SignUpOptions />
    </AuthSplit>
  );
}
