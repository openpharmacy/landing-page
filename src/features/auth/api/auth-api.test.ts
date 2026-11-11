import { afterEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

import {
  errorField,
  getMe,
  logout,
  needsSignIn,
  resetPassword,
  signIn,
  signInWithProvider,
  verifyEmail,
} from "./auth-api";

function mockFetch(status: number, body: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(
      async () =>
        new Response(JSON.stringify(body), {
          status,
          headers: { "content-type": "application/json" },
        }),
    ),
  );
}

const USER = { id: "u1", email: "a@b.com", name: "A" };

afterEach(() => vi.unstubAllGlobals());

describe("auth-api", () => {
  it("signIn returns the user on success", async () => {
    mockFetch(200, { user: USER });
    const user = await signIn({ email: "a@b.com", password: "x" });
    expect(user.id).toBe("u1");
  });

  it("signIn sends the Remember me choice", async () => {
    mockFetch(200, { user: USER });
    await signIn({ email: "a@b.com", password: "x", remember: false });
    const [, init] = vi.mocked(fetch).mock.calls[0];
    expect(JSON.parse(String(init?.body))).toEqual({
      email: "a@b.com",
      password: "x",
      remember: false,
    });
  });

  it("logout says whether the site signed out, failed or did not answer", async () => {
    mockFetch(200, null);
    expect(await logout()).toBe("done");
    mockFetch(500, null);
    expect(await logout()).toBe("failed");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    expect(await logout()).toBe("unreachable");
  });

  it("needsSignIn only for a 401 the route flags", () => {
    const error = (status: number, detail: unknown) =>
      new ApiError({ status, message: "x", code: "x", detail });
    expect(needsSignIn(error(401, { signIn: true }))).toBe(true);
    expect(needsSignIn(error(401, { error: "Could not validate" }))).toBe(
      false,
    );
    expect(needsSignIn(error(403, { signIn: true }))).toBe(false);
    expect(needsSignIn(new Error("x"))).toBe(false);
  });

  it("signIn throws ApiError with the server message on failure", async () => {
    mockFetch(401, { error: "Invalid email or password" });
    await expect(
      signIn({ email: "a@b.com", password: "x" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "Invalid email or password",
    });
  });

  it("getMe returns null when unauthenticated", async () => {
    mockFetch(401, { error: "Not authenticated" });
    expect(await getMe()).toBeNull();
  });

  it("getMe returns the user when authenticated", async () => {
    mockFetch(200, { user: USER });
    expect((await getMe())?.id).toBe("u1");
  });

  it("signInWithProvider posts to the provider's route and reads isNewUser", async () => {
    mockFetch(200, { user: USER, isNewUser: true });
    const result = await signInWithProvider("apple", { id_token: "t" });
    expect(result).toEqual({ user: USER, isNewUser: true });
    expect(fetch).toHaveBeenCalledWith("/api/auth/apple", expect.anything());
  });

  it("verifyEmail sends only the code", async () => {
    mockFetch(200, null);
    await verifyEmail("4821");
    const [path, init] = vi.mocked(fetch).mock.calls[0];
    expect(path).toBe("/api/auth/verify-email");
    expect(JSON.parse(String(init?.body))).toEqual({ code: "4821" });
  });

  it("errorField reads the field a route flagged", async () => {
    mockFetch(400, { error: "Verification Code is invalid", field: "code" });
    const error = await resetPassword({
      email: "a@b.com",
      code: "0000",
      password: "x",
      passwordConfirmation: "x",
    }).catch((e: unknown) => e);
    expect(errorField(error)).toBe("code");
    expect(errorField(new Error("x"))).toBeNull();
  });
});
