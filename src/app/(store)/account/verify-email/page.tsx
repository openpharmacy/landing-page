import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { VerifyEmailPage } from "@/features/account/components/verify-email-page";
import { safeNextPath, withNext } from "@/features/auth/model/next-path";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Verify your email · Open Pharmacy",
};

const PATH = "/account/verify-email";

function returnPath(next: string | string[] | undefined) {
  const path = safeNextPath(typeof next === "string" ? next : null);
  return path && !path.startsWith(PATH) ? path : "/account";
}

export default async function AccountVerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[]; sent?: string | string[] }>;
}) {
  const params = await searchParams;
  const next = returnPath(params.next);
  const session = await getSession();
  if (!session) redirect(withNext("/sign-in", withNext(PATH, next)));
  if (session.profile.emailVerified !== false) redirect(next);

  return (
    <VerifyEmailPage
      email={session.profile.email}
      next={next}
      sendOnOpen={params.sent !== "1"}
    />
  );
}
