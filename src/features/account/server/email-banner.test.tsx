import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ getSession: vi.fn() }));
vi.mock("@/lib/auth/session", () => ({ getSession: h.getSession }));

import { VerifyEmailBanner } from "../components/verify-email-banner";
import { verifyEmailBanner } from "./email-banner";

const withFlag = (emailVerified?: boolean) => ({
  uid: "u-1",
  idToken: "id-1",
  deviceId: "dev-1",
  profile: { email: "a@b.com", name: "Ann", surname: "Lee", emailVerified },
});

beforeEach(() => h.getSession.mockReset());

describe("verifyEmailBanner", () => {
  it("shows the banner while the email is not verified", async () => {
    h.getSession.mockResolvedValue(withFlag(false));
    const banner = await verifyEmailBanner("/home");
    expect(banner?.type).toBe(VerifyEmailBanner);
    expect(banner?.props).toEqual({ returnTo: "/home" });
  });

  it("shows nothing once verified, for older cookies or without a session", async () => {
    for (const session of [withFlag(true), withFlag(undefined), null]) {
      h.getSession.mockResolvedValue(session);
      expect(await verifyEmailBanner("/home")).toBeNull();
    }
  });
});
