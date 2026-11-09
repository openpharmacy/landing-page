import { redirect } from "next/navigation";

import { Landing } from "@/features/home/components/landing";
import { getServerSession } from "@/lib/auth/get-session";

export default async function LandingPage() {
  const user = await getServerSession();
  if (user) redirect("/home");
  return <Landing />;
}
