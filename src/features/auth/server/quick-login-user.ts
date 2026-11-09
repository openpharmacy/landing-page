import "server-only";

import { isMockingEnabled } from "@/config/env";
import { DEMO_USER } from "@/lib/api/op/mock-identity";
import { getLastUser, type LastUser } from "@/lib/auth/session";

export async function quickLoginUser(): Promise<LastUser | null> {
  if (isMockingEnabled) return { name: DEMO_USER.name, email: DEMO_USER.email };
  return getLastUser();
}
