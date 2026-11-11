import { HomeSkeleton } from "@/features/home/components/home-skeleton";
import { getSession } from "@/lib/auth/session";

export default async function HomeLoading() {
  const session = await getSession();
  return <HomeSkeleton banner={session?.profile.emailVerified === false} />;
}
