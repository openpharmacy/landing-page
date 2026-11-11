import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({
  getSession: vi.fn(),
  redirect: vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
}));

vi.mock("next/navigation", () => ({ redirect: h.redirect }));
vi.mock("@/lib/auth/session", () => ({ getSession: h.getSession }));

import AccountVerifyEmailPage from "./page";

type Props = { email: string; next: string; sendOnOpen: boolean };

const session = (emailVerified?: boolean) => ({
  uid: "u-1",
  idToken: "id-1",
  deviceId: "dev-1",
  profile: { email: "a@b.com", name: "Ann", surname: "Lee", emailVerified },
});

const open = (params: Record<string, string | string[]> = {}) =>
  AccountVerifyEmailPage({ searchParams: Promise.resolve(params) });
const props = async (params?: Record<string, string | string[]>) =>
  ((await open(params)) as ReactElement<Props>).props;

beforeEach(() => {
  h.redirect.mockClear();
  h.getSession.mockResolvedValue(session(false));
});

describe("Account › Verify your email page", () => {
  it("verifies the session's email, returns to the account by default", async () => {
    expect(await props()).toEqual({
      email: "a@b.com",
      next: "/account",
      sendOnOpen: true,
    });
  });

  it("keeps `next` on this site and skips the first code after a change", async () => {
    expect(await props({ next: "/account/profile", sent: "1" })).toEqual({
      email: "a@b.com",
      next: "/account/profile",
      sendOnOpen: false,
    });
  });

  it("refuses another site, itself and repeated values as `next`", async () => {
    for (const next of [
      "https://evil.example",
      "//evil.example",
      "/account/verify-email?next=/home",
      ["/home", "/scripts"],
    ]) {
      expect((await props({ next })).next).toBe("/account");
    }
  });

  it("sends a verified user straight on", async () => {
    h.getSession.mockResolvedValue(session(true));
    await expect(open({ next: "/home" })).rejects.toThrow("redirect:/home");
  });

  it("sends guests to sign in, then back here", async () => {
    h.getSession.mockResolvedValue(null);
    await expect(open({ next: "/home" })).rejects.toThrow(
      "redirect:/sign-in?next=%2Faccount%2Fverify-email%3Fnext%3D%252Fhome",
    );
  });
});
