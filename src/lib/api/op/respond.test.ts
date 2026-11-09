import { describe, expect, it } from "vitest";
import { z } from "zod";

import { ApiError } from "@/lib/api/errors";

import { invalidRequest, isInvalidCredentials, isSessionGone } from "./respond";

const error = (status: number, message: string) =>
  new ApiError({ status, message, code: `http_${status}` });

describe("isSessionGone", () => {
  it.each([
    [401, "ID token has expired"],
    [400, "Invalid ID Token"],
    [403, "ID token has been revoked"],
    [406, "Device not registered"],
  ])("%i %s ends the session", (status, message) => {
    expect(isSessionGone(error(status, message))).toBe(true);
  });

  it.each([
    [401, "Could not validate credentials"],
    [401, "Unauthorized access"],
    [400, "Verification Code is invalid or it has expired"],
    [403, "Could not sign out"],
    [500, "Internal Server Error"],
  ])("%i %s keeps it", (status, message) => {
    expect(isSessionGone(error(status, message))).toBe(false);
  });

  it("keeps it for errors of our own", () => {
    expect(isSessionGone(new Error("fetch failed"))).toBe(false);
  });
});

describe("invalidRequest", () => {
  const schema = z.object({ email: z.string().email(), code: z.string() });
  const answer = async (body: unknown) => {
    const parsed = schema.safeParse(body);
    if (parsed.success) throw new Error("expected a failure");
    const res = invalidRequest(parsed.error);
    return { status: res.status, body: await res.json() };
  };

  it("says a bad email is one", async () => {
    expect(await answer({ email: "ann", code: "1" })).toEqual({
      status: 400,
      body: { error: "Enter a valid email" },
    });
  });

  it("calls anything else an invalid request", async () => {
    expect(await answer({ email: "a@b.com" })).toEqual({
      status: 400,
      body: { error: "Invalid request" },
    });
  });
});

describe("isInvalidCredentials", () => {
  it("is the API's wrong email or password answer only", () => {
    expect(
      isInvalidCredentials(
        error(400, "Invalid Credentials. Please try again."),
      ),
    ).toBe(true);
    expect(isInvalidCredentials(error(400, "Account disabled."))).toBe(false);
    expect(
      isInvalidCredentials(error(401, "Could not validate credentials")),
    ).toBe(false);
  });
});
