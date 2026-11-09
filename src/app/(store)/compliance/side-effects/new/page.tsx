import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { HomeBackdrop } from "@/features/compliance/components/log/home-backdrop";
import { RecordSideEffects } from "@/features/compliance/components/log/record-side-effects";
import {
  parseDoseRef,
  signInHref,
  type SearchParams,
} from "@/features/compliance/components/log/route-params";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = {
  title: "Record Side Effects · Open Pharmacy",
};

export default async function RecordSideEffectsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const params = await searchParams;
  const user = await getServerSession();
  if (!user) redirect(signInHref("/compliance/side-effects/new", params));

  return (
    <>
      <HomeBackdrop user={user} />
      <RecordSideEffects dose={parseDoseRef(params)} />
    </>
  );
}
