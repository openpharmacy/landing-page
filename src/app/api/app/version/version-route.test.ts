import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { ApiError as ApiErrorClass } from "@/lib/api/errors";

const api = vi.hoisted(() => ({ request: vi.fn() }));
vi.mock("@/lib/api/op/client", () => ({ opRequest: api.request }));

let ApiError: typeof ApiErrorClass;
const failure = (status: number, message = "x") =>
  new ApiError({ message, status, code: `http_${status}` });
const outdated = () =>
  failure(426, "Application is not up to date. Please update");

async function load() {
  vi.resetModules();
  ({ ApiError } = await import("@/lib/api/errors"));
  return (await import("./route")).GET;
}

beforeEach(() => {
  api.request.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("GET /api/app/version", () => {
  it("asks the API with the web's version, 1.1.0 by default", async () => {
    api.request.mockResolvedValueOnce(null);
    const GET = await load();
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ version: "1.1.0", outdated: false });
    expect(api.request).toHaveBeenCalledWith(
      "/user/v1/version/verification?version=1.1.0",
    );
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("reports outdated on a 426", async () => {
    vi.stubEnv("OP_APP_VERSION", "1.0.0");
    const GET = await load();
    api.request.mockRejectedValueOnce(outdated());
    expect(await (await GET()).json()).toEqual({
      version: "1.0.0",
      outdated: true,
    });
  });

  it("keeps the answer for 10 minutes", async () => {
    vi.useFakeTimers({ now: new Date("2026-11-06T10:00:00Z") });
    const GET = await load();
    api.request.mockRejectedValue(outdated());
    await GET();
    vi.setSystemTime(new Date("2026-11-06T10:09:59Z"));
    expect(await (await GET()).json()).toMatchObject({ outdated: true });
    expect(api.request).toHaveBeenCalledTimes(1);
    vi.setSystemTime(new Date("2026-11-06T10:10:01Z"));
    await GET();
    expect(api.request).toHaveBeenCalledTimes(2);
  });

  it("asks once for requests that arrive together", async () => {
    let answer: (value: null) => void = () => {};
    api.request.mockReturnValueOnce(
      new Promise((resolve) => {
        answer = resolve;
      }),
    );
    const GET = await load();
    const both = Promise.all([GET(), GET()]);
    answer(null);
    await both;
    expect(api.request).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["a network error", () => new TypeError("fetch failed")],
    ["a refused app token", () => failure(502)],
    ["a server error", () => failure(500)],
    ["a rejected version string", () => failure(422)],
  ])("never locks anyone out on %s", async (_, error) => {
    const GET = await load();
    api.request.mockRejectedValueOnce(error());
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ version: "1.1.0", outdated: false });
    expect(console.error).toHaveBeenCalled();
  });

  it("asks again a minute after a failed check", async () => {
    vi.useFakeTimers({ now: new Date("2026-11-06T10:00:00Z") });
    const GET = await load();
    api.request.mockRejectedValueOnce(new TypeError("fetch failed"));
    api.request.mockRejectedValueOnce(outdated());
    await GET();
    vi.setSystemTime(new Date("2026-11-06T10:01:01Z"));
    expect(await (await GET()).json()).toMatchObject({ outdated: true });
    expect(api.request).toHaveBeenCalledTimes(2);
  });

  it("is never outdated in mock mode, without calling the API", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_MOCKING", "enabled");
    vi.stubEnv("OP_APP_VERSION", "0.0.1");
    const GET = await load();
    expect(await (await GET()).json()).toEqual({
      version: "0.0.1",
      outdated: false,
    });
    expect(api.request).not.toHaveBeenCalled();
  });
});
