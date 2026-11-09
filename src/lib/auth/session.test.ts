import { beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({
  store: new Map<string, string>(),
  options: new Map<string, { httpOnly?: boolean; maxAge?: number }>(),
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      h.store.has(name) ? { value: h.store.get(name) } : undefined,
    set: (name: string, value: string, options = {}) => {
      h.store.set(name, value);
      h.options.set(name, options);
    },
    delete: (name: string) => {
      h.store.delete(name);
    },
  }),
}));

import {
  clearSession,
  forgetLastUser,
  getLastUser,
  getSession,
  sessionMaxAge,
  writeProfile,
  writeSession,
} from "./session";

const auth = {
  uid: "u-1",
  idToken: "id-1",
  refreshToken: "rt-1",
  email: "a@b.com",
  name: "Ann",
  surname: "Lee",
};

const profile = () => JSON.parse(h.store.get("op_user") ?? "null");

beforeEach(() => {
  h.store.clear();
  h.options.clear();
});

const THIRTY_DAYS = 60 * 60 * 24 * 30;
const SESSION = ["op_session", "op_refresh", "op_uid", "op_user"];

describe("session profile: emailVerified", () => {
  it("is written from the API's email_verified", async () => {
    await writeSession({ ...auth, email_verified: false });
    expect(profile()).toEqual({
      email: "a@b.com",
      name: "Ann",
      surname: "Lee",
      emailVerified: false,
    });
    await writeSession({ ...auth, email_verified: true });
    expect(profile().emailVerified).toBe(true);
  });

  it("reads back as written", async () => {
    await writeSession({ ...auth, email_verified: false });
    expect((await getSession())?.profile.emailVerified).toBe(false);
    await writeProfile({
      ...(await getSession())!.profile,
      emailVerified: true,
    });
    expect((await getSession())?.profile.emailVerified).toBe(true);
  });

  it("counts a cookie written before the flag as verified", async () => {
    h.store.set("op_session", "id-1");
    h.store.set("op_uid", "u-1");
    h.store.set(
      "op_user",
      JSON.stringify({ email: "a@b.com", name: "Ann", surname: "Lee" }),
    );
    expect((await getSession())?.profile.emailVerified).toBe(true);
  });
});

describe("session lifetime: Remember me", () => {
  const verified = { ...auth, email_verified: true };
  const maxAges = () => SESSION.map((name) => h.options.get(name)?.maxAge);

  it("keeps a remembered session for 30 days", async () => {
    await writeSession(verified, { remember: true });
    expect(maxAges()).toEqual([
      THIRTY_DAYS,
      THIRTY_DAYS,
      THIRTY_DAYS,
      THIRTY_DAYS,
    ]);
    expect(h.store.get("op_remember")).toBe("1");
  });

  it("ends an unremembered session with the browser", async () => {
    await writeSession(verified, { remember: false });
    expect(maxAges()).toEqual([undefined, undefined, undefined, undefined]);
    expect(h.store.get("op_remember")).toBe("0");
    expect(h.options.get("op_remember")?.maxAge).toBeUndefined();
    expect(h.options.get("op_session")?.httpOnly).toBe(true);
  });

  it("keeps the earlier choice when new tokens arrive", async () => {
    await writeSession(verified, { remember: false });
    h.options.clear();
    await writeSession({ ...verified, idToken: "id-2" });
    expect(maxAges()).toEqual([undefined, undefined, undefined, undefined]);
    await writeProfile({ email: "a@b.com", name: "Eve", surname: "Lee" });
    expect(h.options.get("op_user")?.maxAge).toBeUndefined();
  });

  it("counts a session from before the flag as remembered", async () => {
    await writeSession(verified);
    expect(maxAges()).toEqual([
      THIRTY_DAYS,
      THIRTY_DAYS,
      THIRTY_DAYS,
      THIRTY_DAYS,
    ]);
    expect(sessionMaxAge(undefined)).toBe(THIRTY_DAYS);
    expect(sessionMaxAge("1")).toBe(THIRTY_DAYS);
    expect(sessionMaxAge("0")).toBeUndefined();
  });
});

describe("the last user, for the quick login", () => {
  it("is written with the session and kept at sign-out", async () => {
    await writeSession({ ...auth, email_verified: true }, { remember: true });
    h.store.set("op_sync", "u-1:1");
    h.store.set("op_mysl", "u-1:2:t");
    await clearSession();
    for (const name of [...SESSION, "op_sync", "op_mysl", "op_remember"]) {
      expect(h.store.has(name)).toBe(false);
    }
    expect(await getLastUser()).toEqual({ name: "Ann Lee", email: "a@b.com" });
    expect(h.options.get("op_last_user")).toMatchObject({ httpOnly: true });
  });

  it("follows a change of name", async () => {
    await writeSession({ ...auth, email_verified: true });
    await writeProfile({ email: "a@b.com", name: "Eve", surname: "Stone" });
    expect((await getLastUser())?.name).toBe("Eve Stone");
  });

  it("lasts only the browser session when the user was not remembered", async () => {
    await writeSession({ ...auth, email_verified: true }, { remember: false });
    expect(h.options.get("op_last_user")?.maxAge).toBeUndefined();
  });

  it("is forgotten after the account is closed", async () => {
    await writeSession({ ...auth, email_verified: true });
    await forgetLastUser();
    expect(await getLastUser()).toBeNull();
  });

  it("ignores a malformed cookie", async () => {
    for (const raw of ["", "{", '{"name":"A"}', '{"email":""}']) {
      h.store.set("op_last_user", raw);
      expect(await getLastUser()).toBeNull();
    }
  });
});
