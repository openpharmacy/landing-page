import { beforeEach, describe, expect, it, vi } from "vitest";

import SignInEmailPage from "./sign-in/email/page";
import SignUpBiometricsPage from "./sign-up/biometrics/page";
import SignUpDonePage from "./sign-up/done/page";
import SignUpEmailPage from "./sign-up/email/page";
import GoogleSignUpPage from "./sign-up/google/page";
import SignUpPage from "./sign-up/page";
import SetPinPage from "./sign-up/pin/page";
import VerifyEmailPage from "./sign-up/verify/page";

const h = vi.hoisted(() => ({
  session: null as null | {
    profile: { email: string; name: string; surname: string };
  },
  mock: false,
}));
vi.mock("@/lib/auth/session", () => ({ getSession: async () => h.session }));
vi.mock("@/lib/auth/get-session", () => ({
  getServerSession: async () => h.session,
}));
vi.mock("@/lib/features", () => ({ showHiddenScreens: async () => true }));
vi.mock("@/features/auth/server/quick-login-user", () => ({
  quickLoginUser: async () => null,
}));
vi.mock("@/config/env", () => ({
  get isMockingEnabled() {
    return h.mock;
  },
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
  redirect: (to: string) => {
    throw new Error(`REDIRECT ${to}`);
  },
}));

type Props = {
  firstName?: string;
  lastName?: string;
  email?: string;
  next?: string | null;
  href?: string;
};

function formProps(node: unknown): Props | null {
  if (!node || typeof node !== "object") return null;
  const { props } = node as { props?: Record<string, unknown> };
  if (!props) return null;
  if (["firstName", "email", "next", "href"].some((key) => key in props)) {
    return props as Props;
  }
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  for (const child of children) {
    const found = formProps(child);
    if (found) return found;
  }
  return null;
}

const signedIn = () => {
  h.session = {
    profile: { email: "ann@b.com", name: "Ann", surname: "Lee" },
  };
};

beforeEach(() => {
  h.session = null;
  h.mock = false;
});

const query = (next?: string) => ({
  searchParams: Promise.resolve(next === undefined ? {} : { next }),
});

const OFF_SITE = ["//evil.com", "https://x", "/\\x"];

describe("/sign-up/verify", () => {
  it("sends a guest to sign in and back", async () => {
    await expect(VerifyEmailPage(query())).rejects.toThrow(
      "REDIRECT /sign-in?next=%2Fsign-up%2Fverify",
    );
  });

  it("keeps ?next= inside the way back for a guest", async () => {
    await expect(VerifyEmailPage(query("/scripts"))).rejects.toThrow(
      "REDIRECT /sign-in?next=%2Fsign-up%2Fverify%3Fnext%3D%252Fscripts",
    );
  });

  it("shows the signed-in user's email", async () => {
    signedIn();
    expect(formProps(await VerifyEmailPage(query()))).toEqual({
      email: "ann@b.com",
      next: null,
    });
  });

  it("keeps ?next= on its Back link", async () => {
    signedIn();
    const page = await VerifyEmailPage(query("/scripts"));
    expect(page.props.backHref).toBe("/sign-up/email?next=%2Fscripts");
  });
});

describe("?next= through sign-up", () => {
  const FORMS = Object.entries({
    "/sign-in/email": SignInEmailPage,
    "/sign-up": SignUpPage,
    "/sign-up/email": SignUpEmailPage,
    "/sign-up/verify": VerifyEmailPage,
    "/sign-up/pin": SetPinPage,
  });

  beforeEach(signedIn);

  it.each(FORMS)("%s passes one on this site to its form", async (_, page) => {
    const nextOf = async (next?: string) =>
      formProps(await page(query(next)))?.next;
    expect(await nextOf("/scripts")).toBe("/scripts");
    expect(await nextOf()).toBeNull();
    for (const next of OFF_SITE) {
      expect(await nextOf(next)).toBeNull();
    }
  });

  it("/sign-up/pin keeps it on its Back link", async () => {
    const page = await SetPinPage(query("/scripts"));
    expect(page.props.backHref).toBe("/sign-up/verify?next=%2Fscripts");
  });

  it("/sign-up/biometrics keeps it on the way to the done screen", async () => {
    const href = async (next?: string) =>
      formProps(await SignUpBiometricsPage(query(next)))?.href;
    expect(await href("/scripts")).toBe("/sign-up/done?next=%2Fscripts");
    expect(await href()).toBe("/sign-up/done");
    for (const next of OFF_SITE) {
      expect(await href(next)).toBe("/sign-up/done");
    }
  });
});

describe("/sign-up/done", () => {
  const logIn = async (next?: string) =>
    formProps(await SignUpDonePage(query(next)))?.href;

  it("goes to ?next=, else Home, when signed in", async () => {
    signedIn();
    expect(await logIn("/scripts")).toBe("/scripts");
    expect(await logIn()).toBe("/home");
    for (const next of OFF_SITE) {
      expect(await logIn(next)).toBe("/home");
    }
  });

  it("goes to sign in with ?next= when signed out", async () => {
    expect(await logIn("/scripts")).toBe("/sign-in?next=%2Fscripts");
    expect(await logIn()).toBe("/sign-in");
    for (const next of OFF_SITE) {
      expect(await logIn(next)).toBe("/sign-in");
    }
  });
});

describe("/sign-up/google", () => {
  const params = Promise.resolve({ first: "Cody", last: "Banks" });

  it("sends a guest back to the sign-up chooser", async () => {
    await expect(GoogleSignUpPage({ searchParams: params })).rejects.toThrow(
      "REDIRECT /sign-up",
    );
  });

  it("prefills the name from the session and ignores the URL", async () => {
    signedIn();
    const page = await GoogleSignUpPage({ searchParams: params });
    expect(formProps(page)).toEqual({
      firstName: "Ann",
      lastName: "Lee",
      next: null,
    });
  });

  it("takes the mock chooser's names in mock mode", async () => {
    signedIn();
    h.mock = true;
    const page = await GoogleSignUpPage({ searchParams: params });
    expect(formProps(page)).toEqual({
      firstName: "Cody",
      lastName: "Banks",
      next: null,
    });
  });

  it("passes on a ?next= on this site only", async () => {
    signedIn();
    const page = await GoogleSignUpPage({
      searchParams: Promise.resolve({ next: "/scripts" }),
    });
    expect(formProps(page)?.next).toBe("/scripts");
    const offSite = await GoogleSignUpPage({
      searchParams: Promise.resolve({ next: "//evil.example" }),
    });
    expect(formProps(offSite)?.next).toBeNull();
  });
});
