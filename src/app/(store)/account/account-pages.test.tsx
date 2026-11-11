import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({
  user: null as null | { firstName: string; lastName: string },
  session: null as null | {
    uid: string;
    profile?: { emailVerified?: boolean };
  },
}));
vi.mock("@/lib/auth/get-session", () => ({
  getServerSession: async () => h.user,
}));
vi.mock("@/lib/auth/session", () => ({ getSession: async () => h.session }));
vi.mock("next/navigation", () => ({
  redirect: (to: string) => {
    throw new Error(`REDIRECT ${to}`);
  },
}));

import AccountLoading from "./(hub)/loading";
import NotificationsPage from "./notifications/page";
import PrivacySecurityPage from "./privacy/page";

beforeEach(() => {
  h.user = null;
  h.session = null;
});

describe("/account/privacy", () => {
  it("sends a guest to sign in and back", async () => {
    await expect(PrivacySecurityPage()).rejects.toThrow(
      "REDIRECT /sign-in?next=/account/privacy",
    );
  });

  it("links the password, the account and both privacy pages", async () => {
    h.user = { firstName: "Ann", lastName: "Lee" };
    const page = (await PrivacySecurityPage()) as ReactElement<{
      title: string;
      backHref: string;
      rows: { href: string; title: string }[];
    }>;
    expect(page.props.title).toBe("Privacy & Security");
    expect(page.props.backHref).toBe("/account");
    expect(page.props.rows.map((row) => [row.title, row.href])).toEqual([
      ["Change Password", "/account/settings/password"],
      ["Account Management", "/account/settings/management"],
      [
        "How we protect your prescriptions",
        "/help/prescriptions-scripts/prescription-privacy-and-security",
      ],
      ["Privacy Policy", "/privacy"],
    ]);
  });
});

describe("/account/notifications", () => {
  it("keys the choices by the signed-in user", async () => {
    h.session = { uid: "u-1" };
    const one = (await NotificationsPage()) as ReactElement<{
      storageKey: string;
    }>;
    h.session = { uid: "u-2" };
    const two = (await NotificationsPage()) as ReactElement<{
      storageKey: string;
    }>;
    expect(one.props.storageKey).toMatch(/^op_notifications:[0-9a-f]{16}$/);
    expect(one.props.storageKey).not.toBe(two.props.storageKey);
  });
});

describe("/account while it loads", () => {
  const banner = async () =>
    ((await AccountLoading()) as ReactElement<{ banner: boolean }>).props
      .banner;

  it("keeps room for the verify banner while the email is unverified", async () => {
    h.session = { uid: "u-1", profile: { emailVerified: false } };
    expect(await banner()).toBe(true);
    h.session = { uid: "u-1", profile: { emailVerified: true } };
    expect(await banner()).toBe(false);
  });
});
