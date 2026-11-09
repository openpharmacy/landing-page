import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

const h = vi.hoisted(() => ({ store: new Map<string, string>() }));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      h.store.has(name) ? { value: h.store.get(name) } : undefined,
    set: (name: string, value: string) => {
      h.store.set(name, value);
    },
    delete: (name: string) => {
      h.store.delete(name);
    },
  }),
}));

const api = vi.hoisted(() => ({
  changeUserDetails: vi.fn(),
  changeEmail: vi.fn(),
  sendVerificationEmail: vi.fn(),
  changePassword: vi.fn(),
  deleteAccount: vi.fn(),
  deactivateAccount: vi.fn(),
}));
vi.mock("@/lib/api/op/identity", () => api);

import { POST as deactivate } from "./deactivate/route";
import { POST as remove } from "./delete/route";
import { POST as changeEmail } from "./email/route";
import { POST as password } from "./password/route";
import { POST as profile } from "./profile/route";

const PROFILE = {
  email: "a@b.com",
  name: "Ann",
  surname: "Lee",
  emailVerified: true,
};
const USER = { uid: "u-1", idToken: "id-1" };

function post(body?: unknown) {
  return new Request("http://localhost/api/account", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

const apiError = (status: number, message: string) =>
  new ApiError({ status, message, code: `http_${status}` });

function signIn() {
  h.store.set(
    "op_last_user",
    JSON.stringify({ name: "Ann Lee", email: "a@b.com" }),
  );
  h.store.set("op_session", "id-1");
  h.store.set("op_refresh", "rt-1");
  h.store.set("op_uid", "u-1");
  h.store.set("op_user", JSON.stringify(PROFILE));
  h.store.set("op_mysl", "mysl-1");
}

const signedOut = () =>
  ["op_session", "op_refresh", "op_uid", "op_user", "op_mysl"].every(
    (name) => !h.store.has(name),
  );

beforeEach(() => {
  h.store.clear();
  h.store.set("op_device", "dev-1");
  for (const fn of Object.values(api)) fn.mockReset();
});
afterEach(() => vi.restoreAllMocks());

describe("POST /api/account/profile", () => {
  it("saves the trimmed names and updates the session profile", async () => {
    signIn();
    api.changeUserDetails.mockResolvedValue({
      detail: "User details have been updated successfully",
    });
    const res = await profile(post({ name: " Eve ", surname: "Stone" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      user: { id: USER.uid, email: "a@b.com", name: "Eve Stone" },
    });
    expect(api.changeUserDetails).toHaveBeenCalledWith(
      { name: "Eve", surname: "Stone" },
      expect.objectContaining(USER),
      "dev-1",
    );
    expect(JSON.parse(h.store.get("op_user") ?? "{}")).toEqual({
      ...PROFILE,
      name: "Eve",
      surname: "Stone",
    });
  });

  it("rejects a missing or blank name with 400 and calls nothing", async () => {
    signIn();
    for (const body of [{ name: "Eve" }, { name: "  ", surname: "Stone" }]) {
      expect((await profile(post(body))).status).toBe(400);
    }
    expect(api.changeUserDetails).not.toHaveBeenCalled();
  });

  it("answers 401 without a session, flagged to sign in", async () => {
    const res = await profile(post({ name: "Eve", surname: "Stone" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
    expect(api.changeUserDetails).not.toHaveBeenCalled();
  });

  it("passes the API's message through and keeps the profile", async () => {
    signIn();
    api.changeUserDetails.mockRejectedValue(
      apiError(422, "String should have at most 255 characters"),
    );
    const res = await profile(post({ name: "Eve", surname: "Stone" }));
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({
      error: "String should have at most 255 characters",
    });
    expect(JSON.parse(h.store.get("op_user") ?? "{}")).toEqual(PROFILE);
  });

  it("clears the session when the token was revoked", async () => {
    signIn();
    api.changeUserDetails.mockRejectedValue(
      apiError(403, "ID token has been revoked"),
    );
    const res = await profile(post({ name: "Eve", surname: "Stone" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
    expect(signedOut()).toBe(true);
    expect(h.store.get("op_device")).toBe("dev-1");
  });

  it("keeps the session, unflagged, when the API refuses our app token", async () => {
    signIn();
    api.changeUserDetails.mockRejectedValue(
      apiError(401, "Could not validate credentials"),
    );
    const res = await profile(post({ name: "Eve", surname: "Stone" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      error: "Could not validate credentials",
    });
    expect(signedOut()).toBe(false);
  });

  it("clears the session when the device is no longer registered", async () => {
    signIn();
    api.changeUserDetails.mockRejectedValue(apiError(406, "Invalid device ID"));
    expect(
      (await profile(post({ name: "Eve", surname: "Stone" }))).status,
    ).toBe(401);
    expect(signedOut()).toBe(true);
  });

  it("answers 502 without details when the API is unreachable", async () => {
    signIn();
    vi.spyOn(console, "error").mockImplementation(() => {});
    api.changeUserDetails.mockRejectedValue(new TypeError("fetch failed"));
    const res = await profile(post({ name: "Eve", surname: "Stone" }));
    expect(res.status).toBe(502);
    expect(h.store.get("op_session")).toBe("id-1");
  });
});

describe("POST /api/account/password", () => {
  const body = {
    currentPassword: "Old-pass7",
    newPassword: "New-pass8",
    newPasswordConfirmation: "New-pass8",
  };

  it("stores the new tokens in the same response and keeps the profile", async () => {
    signIn();
    api.changePassword.mockResolvedValue({
      uid: "u-1",
      idToken: "id-2",
      refreshToken: "rt-2",
      email_verified: true,
    });
    const res = await password(post(body));
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(api.changePassword).toHaveBeenCalledWith(
      {
        current_password: "Old-pass7",
        new_password: "New-pass8",
        new_password_confirmation: "New-pass8",
      },
      expect.objectContaining(USER),
      "dev-1",
    );
    expect(h.store.get("op_session")).toBe("id-2");
    expect(h.store.get("op_refresh")).toBe("rt-2");
    expect(h.store.get("op_uid")).toBe("u-1");
    expect(JSON.parse(h.store.get("op_user") ?? "{}")).toEqual(PROFILE);
    expect(h.store.get("op_mysl")).toBe("mysl-1");
  });

  it("takes the email flag from the answer", async () => {
    signIn();
    api.changePassword.mockResolvedValue({
      uid: "u-1",
      idToken: "id-2",
      refreshToken: "rt-2",
      email_verified: false,
    });
    await password(post(body));
    expect(JSON.parse(h.store.get("op_user") ?? "{}")).toEqual({
      ...PROFILE,
      emailVerified: false,
    });
  });

  it("passes a wrong current password through and keeps the session", async () => {
    signIn();
    api.changePassword.mockRejectedValue(apiError(400, "Invalid Credentials"));
    const res = await password(post(body));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid Credentials" });
    expect(h.store.get("op_session")).toBe("id-1");
  });

  it("passes the last-4 rule and the API's password rules through", async () => {
    signIn();
    api.changePassword.mockRejectedValueOnce(
      apiError(400, "New password can not be one of your last 4 passwords"),
    );
    api.changePassword.mockRejectedValueOnce(
      apiError(422, "The password must be at least 7 characters long"),
    );
    const first = await password(post(body));
    expect(first.status).toBe(400);
    expect(await first.json()).toEqual({
      error: "New password can not be one of your last 4 passwords",
    });
    const second = await password(post(body));
    expect(second.status).toBe(422);
    expect(await second.json()).toEqual({
      error: "The password must be at least 7 characters long",
    });
  });

  it("clears the session when the token was revoked", async () => {
    signIn();
    api.changePassword.mockRejectedValue(
      apiError(403, "ID token has been revoked"),
    );
    expect((await password(post(body))).status).toBe(401);
    expect(signedOut()).toBe(true);
  });

  it("rejects a malformed body with 400", async () => {
    signIn();
    const res = await password(post({ currentPassword: "x" }));
    expect(res.status).toBe(400);
    expect(api.changePassword).not.toHaveBeenCalled();
  });

  it("answers 401 without a session", async () => {
    expect((await password(post(body))).status).toBe(401);
    expect(api.changePassword).not.toHaveBeenCalled();
  });
});

describe("POST /api/account/email", () => {
  const body = { email: " new@b.com ", password: "secret12" };
  const tokens = {
    uid: "u-1",
    idToken: "id-2",
    refreshToken: "rt-2",
    email_verified: false,
  };

  it("changes the email, stores the new tokens and sends a code to the new address", async () => {
    signIn();
    api.changeEmail.mockResolvedValue(tokens);
    api.sendVerificationEmail.mockResolvedValue(null);
    const res = await changeEmail(post(body));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      user: { id: "u-1", email: "new@b.com", name: "Ann Lee" },
    });
    expect(api.changeEmail).toHaveBeenCalledWith(
      {
        current_email: "a@b.com",
        new_email: "new@b.com",
        password: "secret12",
      },
      expect.objectContaining(USER),
      "dev-1",
    );
    expect(h.store.get("op_session")).toBe("id-2");
    expect(h.store.get("op_refresh")).toBe("rt-2");
    expect(JSON.parse(h.store.get("op_user") ?? "{}")).toEqual({
      ...PROFILE,
      email: "new@b.com",
      emailVerified: false,
    });
    expect(h.store.get("op_mysl")).toBe("mysl-1");
    expect(api.sendVerificationEmail).toHaveBeenCalledWith("new@b.com");
    expect(api.changeEmail.mock.invocationCallOrder[0]).toBeLessThan(
      api.sendVerificationEmail.mock.invocationCallOrder[0],
    );
  });

  it("still answers 200 when the code could not be sent", async () => {
    signIn();
    vi.spyOn(console, "error").mockImplementation(() => {});
    api.changeEmail.mockResolvedValue(tokens);
    api.sendVerificationEmail.mockRejectedValue(new TypeError("fetch failed"));
    expect((await changeEmail(post(body))).status).toBe(200);
    expect(h.store.get("op_session")).toBe("id-2");
  });

  it("passes a wrong password through and keeps the session", async () => {
    signIn();
    api.changeEmail.mockRejectedValue(
      apiError(400, "Invalid Credentials. Please try again."),
    );
    const res = await changeEmail(post(body));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Invalid Credentials. Please try again.",
    });
    expect(h.store.get("op_session")).toBe("id-1");
    expect(JSON.parse(h.store.get("op_user") ?? "{}")).toEqual(PROFILE);
    expect(api.sendVerificationEmail).not.toHaveBeenCalled();
  });

  it("passes an email in use through", async () => {
    signIn();
    const taken =
      "Could not change the email. Please try again or contact hello@openpharmacy.com.";
    api.changeEmail.mockRejectedValue(apiError(400, taken));
    const res = await changeEmail(post(body));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: taken });
  });

  it("refuses the current address, in any case, without calling the API", async () => {
    signIn();
    const res = await changeEmail(post({ ...body, email: "A@B.com" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "This is already your email address.",
    });
    expect(api.changeEmail).not.toHaveBeenCalled();
  });

  it("rejects a malformed email or a missing password with 400", async () => {
    signIn();
    for (const bad of [
      { ...body, email: "not-an-email" },
      { email: "new@b.com" },
      { ...body, password: "" },
    ]) {
      expect((await changeEmail(post(bad))).status).toBe(400);
    }
    expect(api.changeEmail).not.toHaveBeenCalled();
  });

  it("answers 401 without a session", async () => {
    expect((await changeEmail(post(body))).status).toBe(401);
    expect(api.changeEmail).not.toHaveBeenCalled();
  });

  it("clears the session when the token was revoked", async () => {
    signIn();
    api.changeEmail.mockRejectedValue(
      apiError(403, "ID token has been revoked"),
    );
    expect((await changeEmail(post(body))).status).toBe(401);
    expect(signedOut()).toBe(true);
  });
});

describe("POST /api/account/delete", () => {
  it("deletes the account and signs the browser out", async () => {
    signIn();
    api.deleteAccount.mockResolvedValue({ detail: "User Deleted" });
    const res = await remove();
    expect(res.status).toBe(204);
    expect(api.deleteAccount).toHaveBeenCalledWith(
      expect.objectContaining(USER),
      "dev-1",
    );
    expect(signedOut()).toBe(true);
    expect(h.store.get("op_device")).toBe("dev-1");
    expect(h.store.has("op_last_user")).toBe(false);
  });

  it("keeps the session when the API refuses", async () => {
    signIn();
    api.deleteAccount.mockRejectedValue(apiError(400, "User not found"));
    const res = await remove();
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "User not found" });
    expect(h.store.get("op_session")).toBe("id-1");
  });

  it("answers 401 without a session", async () => {
    expect((await remove()).status).toBe(401);
    expect(api.deleteAccount).not.toHaveBeenCalled();
  });
});

describe("POST /api/account/deactivate", () => {
  it("deactivates the account and signs the browser out", async () => {
    signIn();
    api.deactivateAccount.mockResolvedValue(null);
    expect((await deactivate()).status).toBe(204);
    expect(api.deactivateAccount).toHaveBeenCalledWith(
      expect.objectContaining(USER),
      "dev-1",
    );
    expect(signedOut()).toBe(true);
    expect(h.store.has("op_last_user")).toBe(false);
  });

  it('treats the test API\'s 403 "Could not sign out" as done', async () => {
    signIn();
    api.deactivateAccount.mockRejectedValue(
      apiError(403, "Could not sign out"),
    );
    expect((await deactivate()).status).toBe(204);
    expect(signedOut()).toBe(true);
  });

  it("keeps the session on any other 403", async () => {
    signIn();
    api.deactivateAccount.mockRejectedValue(apiError(403, "Forbidden"));
    const res = await deactivate();
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "Forbidden" });
    expect(h.store.get("op_session")).toBe("id-1");
  });

  it("clears the session when the token was revoked", async () => {
    signIn();
    api.deactivateAccount.mockRejectedValue(
      apiError(403, "ID token has been revoked"),
    );
    expect((await deactivate()).status).toBe(401);
    expect(signedOut()).toBe(true);
  });
});
