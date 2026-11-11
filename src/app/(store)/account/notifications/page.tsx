import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { NotificationSettings } from "@/features/account/components/notification-settings";
import { notificationsKey } from "@/features/account/server/notifications-key";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Notifications · Open Pharmacy" };

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in?next=/account/notifications");
  return <NotificationSettings storageKey={notificationsKey(session.uid)} />;
}
