import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { DoseTaken } from "@/features/compliance/components/log/dose-taken";
import { HomeBackdrop } from "@/features/compliance/components/log/home-backdrop";
import {
  parseDoseRef,
  signInHref,
  type SearchParams,
} from "@/features/compliance/components/log/route-params";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Dose taken · Open Pharmacy" };

export default async function DoseTakenPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const params = await searchParams;
  const user = await getServerSession();
  if (!user) redirect(signInHref("/compliance/dose/taken", params));

  return (
    <>
      <HomeBackdrop user={user} />
      <DoseTaken dose={parseDoseRef(params)} />
    </>
  );
}
