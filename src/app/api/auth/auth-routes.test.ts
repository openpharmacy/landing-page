import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

const h = vi.hoisted(() => ({
  store: new Map<string, string>(),
  maxAge: new Map<string, number | undefined>(),
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      h.store.has(name) ? { value: h.store.get(name) } : undefined,
    set: (name: string, value: string, options?: { maxAge?: number }) => {
      h.store.set(name, value);
      h.maxAge.set(name, options?.maxAge);
    },
    delete: (name: string) => {
      h.store.delete(name);
    },
  }),
}));

const api = vi.hoisted(() => ({
  signin: vi.fn(),
  signup: vi.fn(),
  signout: vi.fn(),
  sendVerificationEmail: vi.fn(),
}));
vi.mock("@/lib/api/op/identity", () => api);

import { NextRequest } from "next/server";

import { GET as expired } from "./expired/route";
import { POST as login } from "./login/route";
import { POST as logout } from "./logout/route";
import { GET as me } from "./me/route";
import { POST as register } from "./register/route";

function post(body: unknown) {
  return new Request("http://localhost/api/auth", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const auth = {
  uid: "u-1",
  idToken: "id-1",
  refreshToken: "rt-1",
  email_verified: false,
  email: "a@b.com",
  name: "Ann",
  surname: "Lee",
};

const apiError = (status: number, message: string) =>
  new ApiError({ status, message, code: `http_${status}` });

beforeEach(() => {
  h.store.clear();
  h.maxAge.clear();
  h.store.set("op_device", "dev-1");
  for (const fn of Object.values(api)) fn.mockReset();
});
afterEach(() => vi.restoreAllMocks());

describe("POST /api/auth/login", () => {
  it("stores the tokens in cookies and returns the user only", async () => {
    api.signin.mockResolvedValue(auth);
    const res = await login(post({ email: "a@b.com", password: "secret12" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      user: { id: "u-1", email: "a@b.com", name: "Ann Lee" },
    });
    expect(api.signin).toHaveBeenCalledWith(
      { email: "a@b.com", password: "secret12" },
      "dev-1",
    );
    expect(h.store.get("op_session")).toBe("id-1");
    expect(h.store.get("op_refresh")).toBe("rt-1");
    expect(h.store.get("op_uid")).toBe("u-1");
    expect(JSON.parse(h.store.get("op_user") ?? "{}")).toEqual({
      email: "a@b.com",
      name: "Ann",
      surname: "Lee",
      emailVerified: false,
    });
  });

  it("signs in with a pasted email trimmed", async () => {
    api.signin.mockResolvedValue(auth);
    const res = await login(
      post({ email: " a@b.com  ", password: "secret12" }),
    );
    expect(res.status).toBe(200);
    expect(api.signin).toHaveBeenCalledWith(
      { email: "a@b.com", password: "secret12" },
      "dev-1",
    );
  });

  it("keeps the API's email_verified in the session profile", async () => {
    api.signin.mockResolvedValue({ ...auth, email_verified: true });
    await login(post({ email: "a@b.com", password: "secret12" }));
    expect(JSON.parse(h.store.get("op_user") ?? "{}").emailVerified).toBe(true);
  });

  it("answers 401 for wrong credentials and sets no cookie", async () => {
    api.signin.mockRejectedValue(
      apiError(400, "Invalid Credentials. Please try again."),
    );
    const res = await login(post({ email: "a@b.com", password: "x" }));
    expect(res.status).toBe(401);
    expect(h.store.has("op_session")).toBe(false);
  });

  it("keeps the status and text of any other refusal", async () => {
    api.signin.mockRejectedValue(apiError(400, "Something else went wrong"));
    const res = await login(post({ email: "a@b.com", password: "secret12" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Something else went wrong" });

    api.signin.mockRejectedValue(
      apiError(422, "String should have at most 256 characters"),
    );
    const long = await login(post({ email: "a@b.com", password: "secret12" }));
    expect(long.status).toBe(422);
  });

  it("does not call a refused app token a wrong password", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    api.signin.mockRejectedValue(
      apiError(401, "Could not validate credentials"),
    );
    const res = await login(post({ email: "a@b.com", password: "secret12" }));
    expect(res.status).toBe(502);
  });

  it("keeps the session for 30 days, or the browser session when asked", async () => {
    api.signin.mockResolvedValue(auth);
    await login(post({ email: "a@b.com", password: "secret12" }));
    expect(h.maxAge.get("op_session")).toBe(60 * 60 * 24 * 30);
    expect(h.store.get("op_remember")).toBe("1");

    await login(
      post({ email: "a@b.com", password: "secret12", remember: false }),
    );
    for (const name of ["op_session", "op_refresh", "op_uid", "op_user"]) {
      expect(h.maxAge.get(name)).toBeUndefined();
    }
    expect(h.store.get("op_remember")).toBe("0");
  });

  it("remembers who signed in, for the quick login", async () => {
    api.signin.mockResolvedValue(auth);
    await login(post({ email: "a@b.com", password: "secret12" }));
    expect(JSON.parse(h.store.get("op_last_user") ?? "null")).toEqual({
      name: "Ann Lee",
      email: "a@b.com",
    });
  });

  it("answers 403 for a disabled account", async () => {
    api.signin.mockRejectedValue(
      apiError(
        400,
        "Account disabled. Email hello@openpharmacy.com to enable your account.",
      ),
    );
    const res = await login(post({ email: "a@b.com", password: "secret12" }));
    expect(res.status).toBe(403);
  });

  it("answers 502 without details when the API is unreachable", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    api.signin.mockRejectedValue(new TypeError("fetch failed"));
    const res = await login(post({ email: "a@b.com", password: "secret12" }));
    expect(res.status).toBe(502);
  });

  it("rejects a malformed body with 400", async () => {
    const res = await login(post({ email: "not-an-email", password: "x" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Enter a valid email" });
    const noPassword = await login(post({ email: "a@b.com" }));
    expect(await noPassword.json()).toEqual({ error: "Invalid request" });
    expect(api.signin).not.toHaveBeenCalled();
  });
});

describe("POST /api/auth/register", () => {
  const body = {
    email: "a@b.com",
    password: "secret12",
    passwordConfirmation: "secret12",
    name: "Ann",
    surname: "Lee",
  };

  it("signs up, signs in and asks for the verification email", async () => {
    api.signup.mockResolvedValue(auth);
    api.sendVerificationEmail.mockResolvedValue(null);
    const res = await register(post(body));
    expect(res.status).toBe(201);
    expect(api.signup).toHaveBeenCalledWith(
      {
        name: "Ann",
        surname: "Lee",
        email: "a@b.com",
        password: "secret12",
        password_confirmation: "secret12",
      },
      "dev-1",
    );
    expect(api.sendVerificationEmail).toHaveBeenCalledWith("a@b.com");
    expect(h.store.get("op_session")).toBe("id-1");
    expect(JSON.parse(h.store.get("op_user") ?? "{}").emailVerified).toBe(
      false,
    );
    expect(h.store.get("op_remember")).toBe("1");
  });

  it("signs up with a pasted email trimmed", async () => {
    api.signup.mockResolvedValue(auth);
    api.sendVerificationEmail.mockResolvedValue(null);
    const res = await register(post({ ...body, email: " a@b.com  " }));
    expect(res.status).toBe(201);
    expect(api.signup).toHaveBeenCalledWith(
      expect.objectContaining({ email: "a@b.com" }),
      "dev-1",
    );
    expect(api.sendVerificationEmail).toHaveBeenCalledWith("a@b.com");
  });

  it("answers 409 when the email is taken", async () => {
    api.signup.mockRejectedValue(
      apiError(400, "An account with this email already exists"),
    );
    const res = await register(post(body));
    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({
      error: "An account with this email already exists",
    });
  });

  it("rejects a malformed body with 400", async () => {
    const res = await register(post({ email: "a@b.com" }));
    expect(res.status).toBe(400);
  });
});

describe("GET /api/auth/me", () => {
  it("returns 401 without a session", async () => {
    expect((await me()).status).toBe(401);
  });

  it("returns the user from the session cookies", async () => {
    h.store.set("op_session", "id-1");
    h.store.set("op_uid", "u-1");
    h.store.set(
      "op_user",
      JSON.stringify({ email: "a@b.com", name: "Ann", surname: "Lee" }),
    );
    const res = await me();
    expect(await res.json()).toEqual({
      user: { id: "u-1", email: "a@b.com", name: "Ann Lee" },
    });
  });
});

describe("POST /api/auth/logout", () => {
  it("signs out at the API and clears the session cookies", async () => {
    h.store.set("op_session", "id-1");
    h.store.set("op_uid", "u-1");
    h.store.set("op_user", JSON.stringify({ email: "a@b.com" }));
    api.signout.mockResolvedValue(null);
    const res = await logout();
    expect(res.status).toBe(204);
    expect(api.signout).toHaveBeenCalled();
    expect(h.store.has("op_session")).toBe(false);
    expect(h.store.get("op_device")).toBe("dev-1");
  });

  it("clears the sync throttle too and keeps the last user", async () => {
    h.store.set("op_session", "id-1");
    h.store.set("op_uid", "u-1");
    h.store.set("op_user", JSON.stringify({ email: "a@b.com" }));
    h.store.set("op_sync", "u-1:1");
    h.store.set("op_remember", "0");
    h.store.set(
      "op_last_user",
      JSON.stringify({ name: "A", email: "a@b.com" }),
    );
    api.signout.mockResolvedValue(null);
    await logout();
    expect(h.store.has("op_sync")).toBe(false);
    expect(h.store.has("op_remember")).toBe(false);
    expect(h.store.has("op_last_user")).toBe(true);
  });

  it("still clears the cookies when the API call fails", async () => {
    h.store.set("op_session", "id-1");
    h.store.set("op_uid", "u-1");
    h.store.set("op_user", JSON.stringify({ email: "a@b.com" }));
    api.signout.mockRejectedValue(apiError(403, "ID token has been revoked"));
    expect((await logout()).status).toBe(204);
    expect(h.store.has("op_session")).toBe(false);
  });
});

describe("GET /api/auth/expired", () => {
  const visit = (headers: Record<string, string>) => {
    h.store.set("op_session", "id-1");
    h.store.set("op_uid", "u-1");
    return expired(
      new NextRequest("http://localhost/api/auth/expired?next=/account", {
        headers,
      }),
    );
  };

  it("clears the session for this site's pages and sends them to sign in", async () => {
    const res = await visit({ "sec-fetch-site": "same-origin" });
    expect(res.headers.get("location")).toBe(
      "http://localhost/sign-in?next=%2Faccount",
    );
    expect(h.store.has("op_session")).toBe(false);
  });

  it("does not sign anyone out from another site", async () => {
    await visit({ "sec-fetch-site": "cross-site" });
    expect(h.store.has("op_session")).toBe(true);
  });

  it("without Sec-Fetch-Site, trusts only this site's Referer", async () => {
    await visit({ referer: "https://evil.example/page" });
    expect(h.store.has("op_session")).toBe(true);
    await visit({});
    expect(h.store.has("op_session")).toBe(true);
    await visit({ referer: "http://localhost/account/profile" });
    expect(h.store.has("op_session")).toBe(false);
  });
});
