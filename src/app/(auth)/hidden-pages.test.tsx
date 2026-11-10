import { beforeEach, describe, expect, it, vi } from "vitest";

import BiometricSignInPage from "./sign-in/biometric/page";
import PinSignInPage from "./sign-in/pin/page";
import QuickSignInPage from "./sign-in/quick/page";
import SignUpBiometricsPage from "./sign-up/biometrics/page";
import SplashPage from "./splash/page";
import WelcomePage from "./welcome/page";

const flag = vi.hoisted(() => ({
  on: false,
  lastUser: { name: "Ann Lee", email: "ann@b.com" } as null | {
    name: string;
    email: string;
  },
}));
vi.mock("@/lib/features", () => ({
  showHiddenScreens: async () => flag.on,
}));
vi.mock("@/features/auth/server/quick-login-user", () => ({
  quickLoginUser: async () => flag.lastUser,
}));
vi.mock("@/lib/auth/get-session", () => ({
  getServerSession: async () => null,
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
  redirect: (to: string) => {
    throw new Error(`REDIRECT ${to}`);
  },
}));

const searchParams = Promise.resolve({});
const PAGES = {
  "/sign-up/biometrics": () => SignUpBiometricsPage({ searchParams }),
  "/sign-in/quick": () => QuickSignInPage({ searchParams }),
  "/sign-in/pin": () => PinSignInPage({ searchParams }),
  "/sign-in/biometric": () => BiometricSignInPage({ searchParams }),
  "/welcome": () => WelcomePage(),
  "/splash": () => SplashPage(),
};

describe("hidden auth pages", () => {
  beforeEach(() => {
    flag.on = false;
    flag.lastUser = { name: "Ann Lee", email: "ann@b.com" };
  });

  it.each(Object.entries(PAGES))(
    "%s is not found while hidden",
    async (_, page) => {
      await expect(page()).rejects.toThrow("NOT_FOUND");
    },
  );

  it.each(Object.entries(PAGES))("%s renders when shown", async (_, page) => {
    flag.on = true;
    await expect(page()).resolves.toBeTruthy();
  });

  it.each([
    ["/sign-in/quick", () => QuickSignInPage({ searchParams })],
    ["/sign-in/pin", () => PinSignInPage({ searchParams })],
    ["/sign-in/biometric", () => BiometricSignInPage({ searchParams })],
  ])(
    "%s goes to the email form when nobody signed in here yet",
    async (_, page) => {
      flag.on = true;
      flag.lastUser = null;
      await expect(page()).rejects.toThrow("REDIRECT /sign-in/email");
    },
  );

  it("keeps ?next= on the way to the email form", async () => {
    flag.on = true;
    flag.lastUser = null;
    await expect(
      QuickSignInPage({ searchParams: Promise.resolve({ next: "/scripts" }) }),
    ).rejects.toThrow("REDIRECT /sign-in/email?next=%2Fscripts");
  });

  it("shows the last user on the quick login", async () => {
    flag.on = true;
    const page = await QuickSignInPage({ searchParams });
    expect(JSON.stringify(page.props.children.props)).toContain("ann@b.com");
  });
});
