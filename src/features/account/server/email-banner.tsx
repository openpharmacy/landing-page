import "server-only";

import { getSession } from "@/lib/auth/session";

import { VerifyEmailBanner } from "../components/verify-email-banner";

export async function verifyEmailBanner(returnTo: string) {
  const session = await getSession();
  if (session?.profile.emailVerified !== false) return null;
  return <VerifyEmailBanner key="verify-email" returnTo={returnTo} />;
}
