import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AddScriptForm } from "@/features/scripts/components/add-script-form";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Add a script · Open Pharmacy" };

export default async function AddScriptPage() {
  // Adding a script is a logged-in action; bounce anonymous visitors to sign-in.
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/scripts/add");

  return <AddScriptForm />;
}
