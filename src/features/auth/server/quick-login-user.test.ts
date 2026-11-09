import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({
  mock: false,
  lastUser: null as null | { name: string; email: string },
}));
vi.mock("@/config/env", () => ({
  get isMockingEnabled() {
    return h.mock;
  },
}));
vi.mock("@/lib/auth/session", () => ({ getLastUser: async () => h.lastUser }));

import { quickLoginUser } from "./quick-login-user";

beforeEach(() => {
  h.mock = false;
  h.lastUser = null;
});

describe("quickLoginUser", () => {
  it("is the last user signed in on this browser", async () => {
    h.lastUser = { name: "Ann Lee", email: "ann@b.com" };
    expect(await quickLoginUser()).toEqual(h.lastUser);
  });

  it("is nobody before anyone signed in, never the demo user", async () => {
    expect(await quickLoginUser()).toBeNull();
  });

  it("is the design's demo user in mock mode", async () => {
    h.mock = true;
    expect(await quickLoginUser()).toEqual({
      name: "John Smith",
      email: "john.smith@gmail.com",
    });
  });
});
