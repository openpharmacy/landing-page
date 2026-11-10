import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthPhotoHero } from "@/features/auth/components/auth-photo-hero";
import { AuthSplit } from "@/features/auth/components/auth-split";
import { SetPinForm } from "@/features/auth/components/set-pin-form";
import { safeNextPath, withNext } from "@/features/auth/model/next-path";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Set a PIN · Open Pharmacy" };

export default async function SetPinPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const next = safeNextPath((await searchParams).next);
  return (
    <AuthSplit
      hero={<AuthPhotoHero />}
      backHref={withNext("/sign-up/verify", next)}
      backLabel="Back"
      mobileMinHeight="min-h-[733px]"
    >
      <SetPinForm next={next} />
    </AuthSplit>
  );
}
