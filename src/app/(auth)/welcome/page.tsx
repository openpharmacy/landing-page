import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { StartScreen } from "@/features/auth/components/start-screen";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Welcome · Open Pharmacy" };

export default async function WelcomePage() {
  if (!(await showHiddenScreens())) notFound();
  if (await getServerSession()) redirect("/home");
  return <StartScreen />;
}
