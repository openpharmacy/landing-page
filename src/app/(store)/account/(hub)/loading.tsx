import { AccountHomeSkeleton } from "@/features/account/components/account-home-skeleton";
import { getSession } from "@/lib/auth/session";

export default async function Loading() {
  const session = await getSession();
  return (
    <AccountHomeSkeleton banner={session?.profile.emailVerified === false} />
  );
}
