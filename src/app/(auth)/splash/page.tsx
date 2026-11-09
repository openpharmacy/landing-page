import { notFound } from "next/navigation";

import { SplashScreen } from "@/features/auth/components/splash-screen";
import { showHiddenScreens } from "@/lib/features";

export default async function SplashPage() {
  if (!(await showHiddenScreens())) notFound();
  return <SplashScreen />;
}
