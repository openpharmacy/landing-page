import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { ResetPasswordFlow } from "@/features/auth/components/reset-password-flow";

export const metadata: Metadata = {
  title: "Forgot password · Open Pharmacy",
};

export default function ForgotPasswordPage() {
  return (
    <AuthSplit hero={<AuthPhotoHero />} showBack={false}>
      <ResetPasswordFlow />
    </AuthSplit>
  );
}
