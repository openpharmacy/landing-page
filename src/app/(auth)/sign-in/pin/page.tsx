import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { PinSignIn } from "@/features/auth/components/pin-sign-in";
import { safeNextPath, withNext } from "@/features/auth/model/next-path";
import { quickLoginUser } from "@/features/auth/server/quick-login-user";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Enter your PIN · Open Pharmacy" };

export default async function PinSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const next = safeNextPath((await searchParams).next);
  const user = await quickLoginUser();
  if (!user) redirect(withNext("/sign-in/email", next));

  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      backHref={withNext("/sign-in/quick", next)}
      backLabel="Back"
      showMobileBack={false}
      mobileBare
    >
      <PinSignIn email={user.email} next={next} />
    </AuthSplit>
  );
}
