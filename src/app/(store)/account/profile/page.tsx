import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { EditProfileForm } from "@/features/account/components/edit-profile-form";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Edit Profile · Open Pharmacy" };

export default async function EditProfilePage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/profile");
  return <EditProfileForm user={user} />;
}
