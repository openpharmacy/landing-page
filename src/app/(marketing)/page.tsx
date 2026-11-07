import { redirect } from "next/navigation";

import { Landing } from "@/features/home/components/landing";
import { getServerSession } from "@/lib/auth/get-session";

export default async function LandingPage() {
  // `/` is the marketing landing; signed-in users go to the app home.
  const user = await getServerSession();
  if (user) redirect("/home");
  return <Landing />;
}
