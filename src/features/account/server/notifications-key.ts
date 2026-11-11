import "server-only";

import { createHash } from "node:crypto";

export function notificationsKey(uid: string): string {
  const hash = createHash("sha256").update(uid).digest("hex").slice(0, 16);
  return `op_notifications:${hash}`;
}
