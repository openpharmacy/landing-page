import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { NotificationSettings } from "@/features/account/components/notification-settings";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Notifications · Open Pharmacy" };

export default async function NotificationsPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/notifications");
  return <NotificationSettings />;
}
