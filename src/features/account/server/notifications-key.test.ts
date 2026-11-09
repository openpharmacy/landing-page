import { describe, expect, it } from "vitest";

import { notificationsKey } from "./notifications-key";

describe("notificationsKey", () => {
  it("is one key per user, without the raw id", () => {
    const key = notificationsKey("4b1e0c2a-user");
    expect(key).toMatch(/^op_notifications:[0-9a-f]{16}$/);
    expect(key).not.toContain("4b1e0c2a");
    expect(notificationsKey("4b1e0c2a-user")).toBe(key);
    expect(notificationsKey("another-user")).not.toBe(key);
  });
});
