import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import sample from "@/features/scripts/model/__fixtures__/escripts.json";
import { ApiError } from "@/lib/api/errors";

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

type Call = { path: string; method?: string; body?: unknown };
const api = vi.hoisted(() => ({
  calls: [] as Call[],
  routes: {} as Record<string, (call: Call) => unknown>,
}));
vi.mock("@/lib/api/op/client", () => ({
  jwtExpiry: () => 0,
  opRequest: async (
    path: string,
    options: { method?: string; body?: unknown } = {},
  ) => {
    const call = { path, method: options.method, body: options.body };
    api.calls.push(call);
    const route = api.routes[path];
    if (!route) throw new Error(`unexpected call ${path}`);
    return route(call);
  },
}));

import { POST } from "./route";

const EXCHANGE = "/government/v1/token-exchange";
const ESCRIPTS = "/user/v1/escripts/";
const PULL = "/government/v1/mysl/medication-request";
const REFRESH = "/user/v1/refresh/";

const ASL_ONLY = sample.scripts.filter((s) => s.entry_method === "mysl");
const TOKEN_ONLY = sample.scripts.filter((s) => s.entry_method === "barcode");

const sync = () =>
  POST(new Request("http://localhost/api/scripts/sync", { method: "POST" }));
const paths = () => api.calls.map((c) => c.path);
const apiError = (status: number, message: string) =>
  new ApiError({ status, message, code: `http_${status}` });

let lists: unknown[];

beforeEach(() => {
  h.store.clear();
  h.options.clear();
  h.store.set("op_session", "id-1");
  h.store.set("op_uid", "u-1");
  h.store.set("op_device", "dev-1");
  h.store.set(
    "op_user",
    JSON.stringify({ email: "a@b.com", name: "Ann", surname: "Lee" }),
  );
  api.calls = [];
  lists = [];
  api.routes = {
    [EXCHANGE]: () => ({ access_token: "mysl-1", expires_in: 3600 }),
    [ESCRIPTS]: () => lists.shift() ?? { ...sample, uid: "u-1" },
    [PULL]: () => ({ detail: "Medication(s) from ASL added successfully" }),
    [REFRESH]: () => "SCID Scripts updated successfully",
  };
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("POST /api/scripts/sync", () => {
  it("pulls the ASL, then refreshes the scripts, with the MySL token", async () => {
    const res = await sync();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ updated: false });
    expect(paths()).toEqual([ESCRIPTS, EXCHANGE, PULL, REFRESH, ESCRIPTS]);
    const body = (path: string) => api.calls.find((c) => c.path === path)?.body;
    expect(body(PULL)).toEqual({ access_token: "mysl-1" });
    expect(body(REFRESH)).toEqual({ access_token: "mysl-1" });
    expect(api.calls.find((c) => c.path === REFRESH)?.method).toBe("POST");
  });

  it("answers updated when the list changed", async () => {
    const changed = structuredClone(sample);
    changed.scripts[3].prescription_status = "dispensed";
    lists = [{ ...sample }, changed];
    expect(await (await sync()).json()).toEqual({ updated: true });
  });

  it("does not count a different order as a change", async () => {
    lists = [
      { ...sample },
      { ...sample, scripts: [...sample.scripts].reverse() },
    ];
    expect(await (await sync()).json()).toEqual({ updated: false });
  });

  it("refreshes after the pull without token scripts too: it fills in ASL details", async () => {
    api.routes[ESCRIPTS] = () => ({ ...sample, scripts: ASL_ONLY });
    await sync();
    expect(paths()).toEqual([ESCRIPTS, EXCHANGE, PULL, REFRESH, ESCRIPTS]);
  });

  it("pulls and refreshes for a connected patient with no scripts yet", async () => {
    api.routes[ESCRIPTS] = () => ({ ...sample, scripts: [] });
    await sync();
    expect(paths()).toEqual([ESCRIPTS, EXCHANGE, PULL, REFRESH, ESCRIPTS]);
  });

  it("takes the refresh's 404 as nothing left to refresh", async () => {
    api.routes[REFRESH] = () => {
      throw apiError(404, "User has no scripts");
    };
    const res = await sync();
    expect(await res.json()).toEqual({ updated: false });
    expect(console.error).not.toHaveBeenCalled();
  });

  it("only refreshes the token scripts without an ASL patient", async () => {
    api.routes[ESCRIPTS] = () => ({
      ...sample,
      scripts: TOKEN_ONLY,
      patient_id: null,
    });
    await sync();
    expect(paths()).toEqual([ESCRIPTS, EXCHANGE, REFRESH, ESCRIPTS]);
  });

  it("calls nothing more for a user without scripts", async () => {
    api.routes[ESCRIPTS] = () => ({ uid: "u-1", email: "a@b.com" });
    expect(await (await sync()).json()).toEqual({ updated: false });
    expect(paths()).toEqual([ESCRIPTS]);
  });

  it("asks to sign in without a session", async () => {
    h.store.delete("op_session");
    const res = await sync();
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
    expect(api.calls).toEqual([]);
  });
});

describe("the 10-minute throttle", () => {
  it("keeps the time and the user in an httpOnly cookie", async () => {
    const before = Date.now();
    await sync();
    const [uid, at] = (h.store.get("op_sync") ?? "").split(":");
    expect(uid).toBe("u-1");
    expect(Number(at)).toBeGreaterThanOrEqual(before);
    expect(h.options.get("op_sync")).toMatchObject({
      httpOnly: true,
      maxAge: 600,
    });
  });

  it("does not call the API again within 10 minutes", async () => {
    await sync();
    api.calls = [];
    const res = await sync();
    expect(await res.json()).toEqual({ updated: false });
    expect(api.calls).toEqual([]);
  });

  it("syncs again after 10 minutes", async () => {
    h.store.set("op_sync", `u-1:${Date.now() - 10 * 60_000 - 1}`);
    await sync();
    expect(paths()).toContain(PULL);
  });

  it("does not hold another user back", async () => {
    h.store.set("op_sync", `u-2:${Date.now()}`);
    await sync();
    expect(paths()).toContain(PULL);
    expect(h.store.get("op_sync")).toMatch(/^u-1:\d+$/);
  });

  describe("a request during a running sync", () => {
    let release: () => void;
    beforeEach(() => {
      const waiting: (() => void)[] = [];
      release = () => waiting.forEach((done) => done());
      api.routes[REFRESH] = () =>
        new Promise((resolve) => {
          waiting.push(() => resolve("SCID Scripts updated successfully"));
        });
    });
    const refreshes = () => paths().filter((p) => p === REFRESH).length;

    it("waits for it when it comes from the same browser (a reload, a second tab)", async () => {
      const first = sync();
      await vi.waitFor(() => expect(refreshes()).toBe(1));
      h.store.delete("op_sync");
      const second = sync();
      release();
      const [a, b] = await Promise.all([first, second]);
      expect(b.status).toBe(200);
      expect(await b.json()).toEqual(await a.json());
      expect(refreshes()).toBe(1);
      expect(h.store.get("op_sync")).toMatch(/^u-1:\d+$/);
    });

    it("does not wait for another browser's", async () => {
      const first = sync();
      await vi.waitFor(() => expect(refreshes()).toBe(1));
      h.store.delete("op_sync");
      h.store.set("op_device", "dev-2");
      const second = sync();
      await vi.waitFor(() => expect(refreshes()).toBe(2));
      release();
      await Promise.all([first, second]);
    });
  });

  it("holds back after a failed sync too", async () => {
    api.routes[PULL] = () => {
      throw apiError(500, "Internal Server Error");
    };
    api.routes[REFRESH] = api.routes[PULL];
    await sync();
    api.calls = [];
    await sync();
    expect(api.calls).toEqual([]);
  });
});

describe("failures", () => {
  it("still refreshes the scripts when the ASL pull fails", async () => {
    api.routes[PULL] = () => {
      throw apiError(500, "Internal Server Error");
    };
    const res = await sync();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ updated: false });
    expect(paths()).toEqual([ESCRIPTS, EXCHANGE, PULL, REFRESH, ESCRIPTS]);
    expect(console.error).toHaveBeenCalledWith(
      "Script sync: the ASL pull failed",
      expect.any(ApiError),
    );
  });

  it("answers from the pull when the refresh fails", async () => {
    api.routes[REFRESH] = () => {
      throw apiError(500, "Internal Server Error");
    };
    const changed = structuredClone(sample);
    changed.scripts[0].is_hidden = true;
    lists = [{ ...sample }, changed];
    const res = await sync();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ updated: true });
    expect(console.error).toHaveBeenCalledWith(
      "Script sync: the refresh failed",
      expect.any(ApiError),
    );
  });

  it("does not reload the list when both calls fail", async () => {
    api.routes[PULL] = () => {
      throw apiError(500, "Internal Server Error");
    };
    api.routes[REFRESH] = api.routes[PULL];
    expect(await (await sync()).json()).toEqual({ updated: false });
    expect(paths()).toEqual([ESCRIPTS, EXCHANGE, PULL, REFRESH]);
  });

  it("answers not updated when the list cannot be loaded", async () => {
    api.routes[ESCRIPTS] = () => {
      throw new TypeError("fetch failed");
    };
    const res = await sync();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ updated: false });
    expect(paths()).toEqual([ESCRIPTS]);
  });

  it("skips both calls when MySL gives no token", async () => {
    api.routes[EXCHANGE] = () => {
      throw apiError(502, "Bad Gateway");
    };
    const res = await sync();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ updated: false });
    expect(paths()).not.toContain(PULL);
    expect(paths()).not.toContain(REFRESH);
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  it("renews a MySL token that MySL refuses", async () => {
    h.store.set("op_mysl", `u-1:${Date.now() + 3_600_000}:mysl-stale`);
    api.routes[REFRESH] = (call) => {
      if ((call.body as { access_token: string }).access_token === "mysl-1") {
        return "SCID Scripts updated successfully";
      }
      throw apiError(
        401,
        '{"resourceType":"OperationOutcome","issue":[{"details":{"text":"Unauthorized Access"}}]}',
      );
    };
    api.routes[ESCRIPTS] = () => ({ ...sample, patient_id: null });
    const res = await sync();
    expect(res.status).toBe(200);
    expect(paths()).toEqual([ESCRIPTS, REFRESH, EXCHANGE, REFRESH, ESCRIPTS]);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("ends the session when the API has revoked it", async () => {
    api.routes[PULL] = () => {
      throw apiError(403, "ID token has been revoked");
    };
    const res = await sync();
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
    expect(h.store.has("op_session")).toBe(false);
    expect(paths()).not.toContain(REFRESH);
  });
});

describe("mock mode", () => {
  it("answers not updated at once", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_MOCKING", "enabled");
    vi.resetModules();
    const { POST: mockPost } = await import("./route");
    h.store.set("op_session", "demo");
    const res = await mockPost(
      new Request("http://localhost/api/scripts/sync", { method: "POST" }),
    );
    expect(await res.json()).toEqual({ updated: false });
    expect(api.calls).toEqual([]);
    expect(h.store.has("op_sync")).toBe(false);
  });
});
