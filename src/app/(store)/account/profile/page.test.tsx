import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

const h = vi.hoisted(() => ({
  getSession: vi.fn(),
  getUserDetails: vi.fn(),
  redirect: vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
}));

vi.mock("next/navigation", () => ({ redirect: h.redirect }));
vi.mock("@/lib/auth/session", () => ({ getSession: h.getSession }));
vi.mock("@/lib/api/op/identity", () => ({
  getUserDetails: h.getUserDetails,
}));

import EditProfilePage from "./page";

type FormProps = {
  user: { firstName: string; lastName: string; email: string };
};

const SESSION = {
  uid: "u-1",
  idToken: "id-1",
  deviceId: "dev-1",
  profile: { email: "a@b.com", name: "Ann", surname: "Lee" },
};

const props = async () =>
  ((await EditProfilePage()) as ReactElement<FormProps>).props;

beforeEach(() => {
  for (const fn of Object.values(h)) fn.mockClear();
  h.getSession.mockResolvedValue(SESSION);
});

describe("Edit Profile page", () => {
  it("prefills from get_user_details", async () => {
    h.getUserDetails.mockResolvedValue({
      first_name: "Eve",
      last_name: "Stone",
      email: "eve@b.com",
    });
    const { user } = await props();
    expect(user).toEqual({
      firstName: "Eve",
      lastName: "Stone",
      email: "eve@b.com",
    });
    expect(h.getUserDetails).toHaveBeenCalledWith(SESSION, "dev-1");
  });

  it("falls back to the session when the API fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    h.getUserDetails.mockRejectedValue(new TypeError("fetch failed"));
    const { user } = await props();
    expect(user).toEqual({
      firstName: "Ann",
      lastName: "Lee",
      email: "a@b.com",
    });
  });

  it("clears a revoked session through the expired route", async () => {
    h.getUserDetails.mockRejectedValue(
      new ApiError({
        status: 403,
        message: "ID token has been revoked",
        code: "http_403",
      }),
    );
    await expect(EditProfilePage()).rejects.toThrow(
      "redirect:/api/auth/expired?next=/account/profile",
    );
  });

  it("sends guests to sign in", async () => {
    h.getSession.mockResolvedValue(null);
    await expect(EditProfilePage()).rejects.toThrow(
      "redirect:/sign-in?next=/account/profile",
    );
    expect(h.getUserDetails).not.toHaveBeenCalled();
  });
});
