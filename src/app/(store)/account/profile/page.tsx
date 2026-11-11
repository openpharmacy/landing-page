import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isSessionGone } from "@/lib/api/op/respond";
import { EditProfileForm } from "@/features/account/components/edit-profile-form";
import { getUserDetails } from "@/lib/api/op/identity";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Edit Profile · Open Pharmacy" };

const PATH = "/account/profile";

export default async function EditProfilePage() {
  const session = await getSession();
  if (!session) redirect(`/sign-in?next=${PATH}`);

  let user = {
    firstName: session.profile.name,
    lastName: session.profile.surname,
    email: session.profile.email,
  };
  let expired = false;
  try {
    const details = await getUserDetails(session, session.deviceId);
    user = {
      firstName: details.first_name,
      lastName: details.last_name,
      email: details.email,
    };
  } catch (error) {
    expired = isSessionGone(error);
    if (!expired) console.error("Could not load the user details", error);
  }
  if (expired) redirect(`/api/auth/expired?next=${PATH}`);

  return <EditProfileForm user={user} />;
}
