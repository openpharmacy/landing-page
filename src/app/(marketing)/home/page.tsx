import type { Metadata } from "next";

import { LoggedInHome } from "@/features/home/components/logged-in-home";
import { LoggedOutHome } from "@/features/home/components/logged-out-home";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Home · Open Pharmacy" };

export default async function HomePage() {
  // The dashboard for signed-in users; a greeting + log-in prompt otherwise.
  const user = await getServerSession();
  return user ? <LoggedInHome user={user} /> : <LoggedOutHome />;
}
