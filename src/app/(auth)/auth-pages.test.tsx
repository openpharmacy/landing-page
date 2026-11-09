import { beforeEach, describe, expect, it, vi } from "vitest";

import GoogleSignUpPage from "./sign-up/google/page";
import VerifyEmailPage from "./sign-up/verify/page";

const h = vi.hoisted(() => ({
  session: null as null | {
    profile: { email: string; name: string; surname: string };
  },
  mock: false,
}));
vi.mock("@/lib/auth/session", () => ({ getSession: async () => h.session }));
vi.mock("@/config/env", () => ({
  get isMockingEnabled() {
    return h.mock;
  },
}));
vi.mock("next/navigation", () => ({
  redirect: (to: string) => {
    throw new Error(`REDIRECT ${to}`);
  },
}));

type Props = {
  firstName?: string;
  lastName?: string;
  email?: string;
  next?: string | null;
};

function formProps(node: unknown): Props | null {
  if (!node || typeof node !== "object") return null;
  const { props } = node as { props?: Record<string, unknown> };
  if (!props) return null;
  if ("firstName" in props || "email" in props) return props as Props;
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

describe("/sign-up/verify", () => {
  it("sends a guest to sign in and back", async () => {
    await expect(VerifyEmailPage()).rejects.toThrow(
      "REDIRECT /sign-in?next=%2Fsign-up%2Fverify",
    );
  });

  it("shows the signed-in user's email", async () => {
    signedIn();
    expect(formProps(await VerifyEmailPage())).toEqual({ email: "ann@b.com" });
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
