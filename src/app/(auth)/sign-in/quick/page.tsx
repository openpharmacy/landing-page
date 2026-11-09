import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { QuickLogin } from "@/features/auth/components/quick-login";
import { safeNextPath, withNext } from "@/features/auth/model/next-path";
import { quickLoginUser } from "@/features/auth/server/quick-login-user";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Log in · Open Pharmacy" };

export default async function QuickSignInPage({
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
      top="chooser"
      showMobileBack={false}
      mobileBare
    >
      <QuickLogin name={user.name} email={user.email} next={next} />
    </AuthSplit>
  );
}
