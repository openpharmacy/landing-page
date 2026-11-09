import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

const h = vi.hoisted(() => ({
  escripts: vi.fn(),
  archived: [] as string[],
}));

vi.mock("@/lib/api/op/scripts", () => ({
  getEscripts: h.escripts,
  scriptsToday: () => "2026-11-06",
}));
vi.mock("../server/archive", () => ({
  readArchived: async () => h.archived,
}));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new Error(`REDIRECT ${url}`);
  },
}));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
  cache: <T>(fn: T) => fn,
}));

import sample from "./__fixtures__/escripts.json";
import { scriptsForPage } from "./load";

beforeEach(() => {
  h.escripts.mockReset();
  h.archived = [];
});

describe("scriptsForPage", () => {
  it("maps the user's scripts, with the user's own name", async () => {
    h.escripts.mockResolvedValue(sample);
    const { scripts, error } = await scriptsForPage("/scripts");
    expect(error).toBeNull();
    expect(scripts?.ownName).toBe("Optest One");
    expect(scripts?.scripts).toHaveLength(sample.scripts.length);
    expect(scripts?.scripts[5]).toMatchObject({
      kind: "token",
      patient: "Optest One",
    });
  });

  it("keeps the archived ids of scripts the user still has", async () => {
    h.escripts.mockResolvedValue(sample);
    const [first, second] = (await scriptsForPage("/scripts")).scripts!.scripts;
    h.archived = [second.id, "0123456789abcdef", first.id];
    const { scripts } = await scriptsForPage("/scripts");
    expect(scripts?.archived).toEqual([second.id, first.id]);
  });

  it("is null when nobody is signed in", async () => {
    h.escripts.mockResolvedValue(null);
    expect(await scriptsForPage("/scripts")).toEqual({
      scripts: null,
      error: null,
    });
  });

  it("sends an ended session to sign in, back to the page", async () => {
    h.escripts.mockRejectedValue(
      new ApiError({
        message: "ID token has been revoked",
        status: 403,
        code: "http_403",
      }),
    );
    await expect(scriptsForPage("/scripts/detail?id=ab")).rejects.toThrow(
      `REDIRECT /api/auth/expired?next=${encodeURIComponent("/scripts/detail?id=ab")}`,
    );
  });

  it("sends an unknown device to sign in again", async () => {
    h.escripts.mockRejectedValue(
      new ApiError({ message: "Invalid device ID", status: 406, code: "x" }),
    );
    await expect(scriptsForPage("/scripts")).rejects.toThrow(
      "REDIRECT /api/auth/expired?next=%2Fscripts",
    );
  });

  it("returns the message to show when the API fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    h.escripts.mockRejectedValue(
      new ApiError({ message: "Script not Found", status: 404, code: "x" }),
    );
    expect(await scriptsForPage("/scripts")).toEqual({
      scripts: null,
      error: "Script not Found",
    });
    h.escripts.mockRejectedValue(new Error("fetch failed"));
    expect((await scriptsForPage("/scripts")).error).toBe(
      "The service is not available right now. Please try again.",
    );
  });
});
