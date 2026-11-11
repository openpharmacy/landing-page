import { beforeEach, describe, expect, it, vi } from "vitest";

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
  verifyEmail: vi.fn(),
  sendVerificationEmail: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  resetPassword: vi.fn(),
  thirdPartyLogin: vi.fn(),
  changeUserDetails: vi.fn(),
  checkEmailVerification: vi.fn(),
}));
vi.mock("@/lib/api/op/identity", () => api);

import { POST as apple } from "./apple/route";
import { GET as emailStatus } from "./email-status/route";
import { POST as forgotPassword } from "./forgot-password/route";
import { POST as google } from "./google/route";
import { POST as resendVerification } from "./resend-verification/route";
import { POST as resetPassword } from "./reset-password/route";
import { POST as verifyEmail } from "./verify-email/route";

function post(body: unknown) {
  return new Request("http://localhost/api/auth", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const apiError = (status: number, message: string) =>
  new ApiError({ status, message, code: `http_${status}` });

function signedIn(email = "ann@b.com", emailVerified?: boolean) {
  h.store.set("op_session", "id-1");
  h.store.set("op_refresh", "rt-1");
  h.store.set("op_uid", "u-1");
  h.store.set(
    "op_user",
    JSON.stringify({ email, name: "Ann", surname: "Lee", emailVerified }),
  );
}

const profileCookie = () => JSON.parse(h.store.get("op_user") ?? "null");

beforeEach(() => {
  h.store.clear();
  h.store.set("op_device", "dev-1");
  for (const fn of Object.values(api)) fn.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("POST /api/auth/verify-email", () => {
  it("answers 401 without a session, flagged to sign in", async () => {
    const res = await verifyEmail(post({ code: "1234" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
    expect(api.verifyEmail).not.toHaveBeenCalled();
  });

  it("checks the code against the signed-in user's email and marks it verified", async () => {
    signedIn("ann@b.com", false);
    api.verifyEmail.mockResolvedValue(null);
    const res = await verifyEmail(post({ code: "4821" }));
    expect(res.status).toBe(204);
    expect(api.verifyEmail).toHaveBeenCalledWith("ann@b.com", "4821");
    expect(profileCookie()).toEqual({
      email: "ann@b.com",
      name: "Ann",
      surname: "Lee",
      emailVerified: true,
    });
  });

  it("passes a wrong or expired code on with the API's message", async () => {
    signedIn("ann@b.com", false);
    api.verifyEmail.mockRejectedValue(
      apiError(400, "Verification Code is invalid or it has expired"),
    );
    const res = await verifyEmail(post({ code: "0000" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Verification Code is invalid or it has expired",
    });
    expect(profileCookie().emailVerified).toBe(false);
  });

  it("rejects anything but 4 digits", async () => {
    signedIn();
    expect((await verifyEmail(post({ code: "12a4" }))).status).toBe(400);
    expect((await verifyEmail(post({ code: "12345" }))).status).toBe(400);
    expect(api.verifyEmail).not.toHaveBeenCalled();
  });
});

describe("GET /api/auth/email-status", () => {
  it("answers 401 without a session", async () => {
    expect((await emailStatus()).status).toBe(401);
    expect(api.checkEmailVerification).not.toHaveBeenCalled();
  });

  it("marks the session verified when the API says so", async () => {
    signedIn("ann@b.com", false);
    api.checkEmailVerification.mockResolvedValue({ email_verified: true });
    const res = await emailStatus();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ emailVerified: true });
    expect(api.checkEmailVerification).toHaveBeenCalledWith(
      expect.objectContaining({ uid: "u-1", idToken: "id-1" }),
      "dev-1",
    );
    expect(profileCookie().emailVerified).toBe(true);
  });

  it("keeps an unverified session as it is", async () => {
    signedIn("ann@b.com", false);
    const before = h.store.get("op_user");
    api.checkEmailVerification.mockResolvedValue({ email_verified: false });
    expect(await (await emailStatus()).json()).toEqual({
      emailVerified: false,
    });
    expect(h.store.get("op_user")).toBe(before);
  });

  it("marks a session unverified when the API says so", async () => {
    signedIn();
    api.checkEmailVerification.mockResolvedValue({ email_verified: false });
    await emailStatus();
    expect(profileCookie().emailVerified).toBe(false);
  });

  it("clears an ended session and answers 401", async () => {
    signedIn("ann@b.com", false);
    api.checkEmailVerification.mockRejectedValue(
      apiError(403, "ID token has been revoked"),
    );
    expect((await emailStatus()).status).toBe(401);
    expect(h.store.has("op_session")).toBe(false);
    expect(h.store.has("op_user")).toBe(false);
  });

  it("answers 502 and keeps the session when the API is unreachable", async () => {
    signedIn("ann@b.com", false);
    api.checkEmailVerification.mockRejectedValue(new TypeError("fetch failed"));
    expect((await emailStatus()).status).toBe(502);
    expect(profileCookie().emailVerified).toBe(false);
  });
});

describe("POST /api/auth/resend-verification", () => {
  it("answers 401 without a session, flagged to sign in", async () => {
    const res = await resendVerification();
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
  });

  it("sends a new code to the signed-in user's email", async () => {
    signedIn();
    api.sendVerificationEmail.mockResolvedValue({ detail: "sent" });
    expect((await resendVerification()).status).toBe(204);
    expect(api.sendVerificationEmail).toHaveBeenCalledWith("ann@b.com");
  });

  it("answers 502 without details when the API is unreachable", async () => {
    signedIn();
    api.sendVerificationEmail.mockRejectedValue(new TypeError("fetch failed"));
    expect((await resendVerification()).status).toBe(502);
  });
});

describe("POST /api/auth/forgot-password", () => {
  it("asks the API to email a code", async () => {
    api.sendPasswordResetEmail.mockResolvedValue({ detail: "generic" });
    const res = await forgotPassword(post({ email: " ann@b.com " }));
    expect(res.status).toBe(204);
    expect(api.sendPasswordResetEmail).toHaveBeenCalledWith("ann@b.com");
  });

  it("rejects an invalid email without calling the API", async () => {
    const res = await forgotPassword(post({ email: "ann" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Enter a valid email" });
    expect(api.sendPasswordResetEmail).not.toHaveBeenCalled();
  });
});

describe("POST /api/auth/reset-password", () => {
  const body = {
    email: "ann@b.com",
    code: "4821",
    password: "newpass7",
    passwordConfirmation: "newpass7",
  };

  it("resets with the code and the new password", async () => {
    api.resetPassword.mockResolvedValue({ detail: "Password Changed" });
    const res = await resetPassword(post(body));
    expect(res.status).toBe(204);
    expect(api.resetPassword).toHaveBeenCalledWith({
      email: "ann@b.com",
      verification_code: "4821",
      password: "newpass7",
      password_confirmation: "newpass7",
    });
  });

  it("ends this browser's session when it is the same account", async () => {
    signedIn("Ann@B.com");
    api.resetPassword.mockResolvedValue(null);
    await resetPassword(post(body));
    expect(h.store.has("op_session")).toBe(false);
    expect(h.store.get("op_device")).toBe("dev-1");
  });

  it("keeps another account's session", async () => {
    signedIn("other@b.com");
    api.resetPassword.mockResolvedValue(null);
    await resetPassword(post(body));
    expect(h.store.get("op_session")).toBe("id-1");
  });

  it("answers a malformed code as an invalid request", async () => {
    const res = await resetPassword(post({ ...body, code: "12" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid request" });
    expect(api.resetPassword).not.toHaveBeenCalled();
  });

  it("flags a wrong or expired code as a code error", async () => {
    api.resetPassword.mockRejectedValue(
      apiError(400, "Verification Code is invalid or it has expired"),
    );
    const res = await resetPassword(post(body));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Verification Code is invalid or it has expired",
      field: "code",
    });
  });

  it("passes password errors on without a field", async () => {
    api.resetPassword.mockRejectedValueOnce(
      apiError(400, "New password can not be one of your last 4 passwords"),
    );
    let res = await resetPassword(post(body));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "New password can not be one of your last 4 passwords",
    });

    api.resetPassword.mockRejectedValueOnce(
      apiError(422, "The password must be at least 7 characters long"),
    );
    res = await resetPassword(post(body));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "The password must be at least 7 characters long",
    });
  });

  it("rejects a malformed body", async () => {
    const res = await resetPassword(post({ ...body, code: "12" }));
    expect(res.status).toBe(400);
    expect(api.resetPassword).not.toHaveBeenCalled();
  });
});

describe("POST /api/auth/google and /api/auth/apple", () => {
  const auth = {
    uid: "u-9",
    idToken: "id-9",
    refreshToken: "rt-9",
    email_verified: true,
    email: "g@b.com",
    name: "Gail",
    surname: "Ng",
    is_new_user: true,
  };

  it("signs in with the Google ID token and stores the session", async () => {
    api.thirdPartyLogin.mockResolvedValue(auth);
    const res = await google(post({ id_token: "tok", nonce: "n-1" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      user: { id: "u-9", email: "g@b.com", name: "Gail Ng" },
      isNewUser: true,
    });
    expect(api.thirdPartyLogin).toHaveBeenCalledWith(
      { provider: "google", id_token: "tok", nonce: "n-1" },
      "dev-1",
    );
    expect(h.store.get("op_session")).toBe("id-9");
    expect(h.store.get("op_refresh")).toBe("rt-9");
    expect(h.store.get("op_uid")).toBe("u-9");
    expect(profileCookie()).toEqual({
      email: "g@b.com",
      name: "Gail",
      surname: "Ng",
      emailVerified: true,
    });
  });

  it("keeps an unverified provider email unverified", async () => {
    api.thirdPartyLogin.mockResolvedValue({ ...auth, email_verified: false });
    await apple(post({ id_token: "tok" }));
    expect(profileCookie().emailVerified).toBe(false);
  });

  it("passes Apple's first-time name on", async () => {
    api.thirdPartyLogin.mockResolvedValue({ ...auth, is_new_user: false });
    const res = await apple(
      post({ id_token: "tok", nonce: "n-1", name: "Gail", surname: "Ng" }),
    );
    expect((await res.json()).isNewUser).toBe(false);
    expect(api.thirdPartyLogin).toHaveBeenCalledWith(
      {
        provider: "apple",
        id_token: "tok",
        nonce: "n-1",
        name: "Gail",
        surname: "Ng",
      },
      "dev-1",
    );
  });

  it("answers 401 with the API's text for a refused token", async () => {
    api.thirdPartyLogin.mockRejectedValue(
      apiError(400, "Invalid Credentials. Please try again."),
    );
    const res = await google(post({ id_token: "bad" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      error: "Invalid Credentials. Please try again.",
    });
    expect(h.store.has("op_session")).toBe(false);
  });

  it("answers 403 for a disabled account", async () => {
    api.thirdPartyLogin.mockRejectedValue(
      apiError(
        400,
        "Account disabled. Email hello@openpharmacy.com to enable your account.",
      ),
    );
    expect((await google(post({ id_token: "tok" }))).status).toBe(403);
  });

  it("rejects a body without a token", async () => {
    expect((await google(post({ nonce: "n" }))).status).toBe(400);
    expect(api.thirdPartyLogin).not.toHaveBeenCalled();
  });

  it("keeps the session for 30 days: the choosers have no Remember me", async () => {
    h.store.set("op_remember", "0");
    api.thirdPartyLogin.mockResolvedValue(auth);
    await google(post({ id_token: "tok" }));
    expect(h.store.get("op_remember")).toBe("1");
  });
});
