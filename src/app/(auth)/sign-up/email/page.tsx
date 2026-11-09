import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SignUpEmailForm } from "@/features/auth/components/sign-up-email-form";

export const metadata: Metadata = {
  title: "Sign up with email · Open Pharmacy",
};

export default function SignUpEmailPage() {
  return (
    <AuthSplit hero={<AuthPhotoHero />}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Let&apos;s set you up
          </h1>
          <p className="text-body-16 text-secondary-500">
            Create your account to get started with OpenPharmacy
          </p>
        </div>
        <SignUpEmailForm />
      </div>
    </AuthSplit>
  );
}
