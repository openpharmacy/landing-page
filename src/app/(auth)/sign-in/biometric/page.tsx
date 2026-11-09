import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Header } from "@/components/layout/header";
import { BiometricPrompt } from "@/features/auth/components/biometric-prompt";
import { safeNextPath, withNext } from "@/features/auth/model/next-path";
import { quickLoginUser } from "@/features/auth/server/quick-login-user";
import { Landing } from "@/features/home/components/landing";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = {
  title: "Verify your identity · Open Pharmacy",
};

export default async function BiometricSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const next = safeNextPath((await searchParams).next);
  const user = await quickLoginUser();
  if (!user) redirect(withNext("/sign-in/email", next));

  return (
    <div className="relative h-dvh overflow-hidden">
      <div inert aria-hidden>
        <Header user={null} />
        <Landing />
      </div>
      <BiometricPrompt email={user.email} next={next} />
    </div>
  );
}
