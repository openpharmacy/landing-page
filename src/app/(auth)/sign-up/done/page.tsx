import type { Metadata } from "next";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SignUpDone } from "@/features/auth/components/sign-up-done";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "All set · Open Pharmacy" };

export default async function SignUpDonePage() {
  const [user, withPin] = await Promise.all([
    getServerSession(),
    showHiddenScreens(),
  ]);
  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      showBack={false}
      mobileMinHeight="min-h-[733px]"
    >
      <SignUpDone withPin={withPin} href={user ? "/home" : "/sign-in"} />
    </AuthSplit>
  );
}
