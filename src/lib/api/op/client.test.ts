import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const jwt = (exp: number) =>
  `h.${Buffer.from(JSON.stringify({ exp })).toString("base64url")}.s`;

function reply(status: number, body: unknown) {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
  });
}

describe("opRequest", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("OP_API_ORIGIN", "https://api.test/");
    vi.stubEnv("OP_APP_USERNAME", "app");
    vi.stubEnv("OP_APP_PASSWORD", "secret");
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  const load = () => import("./client");
  const appToken = () =>
    reply(200, { access_token: jwt(Date.now() / 1000 + 3600) });

  it("sends the app token, conformance id, device and user headers", async () => {
    fetchMock
      .mockResolvedValueOnce(appToken())
      .mockResolvedValueOnce(reply(200, { ok: true }));
    const { opRequest } = await load();

    const data = await opRequest("/user/v1/get_user_details", {
      deviceId: "dev-1",
      user: { uid: "u-1", idToken: "id-1" },
    });

    expect(data).toEqual({ ok: true });
    const [tokenUrl, tokenInit] = fetchMock.mock.calls[0];
    expect(tokenUrl).toBe("https://api.test/token");
    expect(String(tokenInit.body)).toBe("username=app&password=secret");
    const [url, init] = fetchMock.mock.calls[1];
    expect(url).toBe("https://api.test/user/v1/get_user_details");
    expect(init.headers).toMatchObject({
      "X-App-Token": expect.any(String),
      "x-conformance-id": "OpenpharmacyApplication|1.0",
      "x-device-id": "dev-1",
      "x-client-id": "u-1",
      Authorization: "Bearer id-1",
    });
  });

  it("reuses the app token until it is close to expiry", async () => {
    fetchMock
      .mockResolvedValueOnce(appToken())
      .mockImplementation(async () => reply(200, null));
    const { opRequest } = await load();
    await opRequest("/a");
    await opRequest("/b");
    const tokenCalls = fetchMock.mock.calls.filter(([u]) =>
      String(u).endsWith("/token"),
    );
    expect(tokenCalls).toHaveLength(1);
  });

  it("gets a new app token once when the API rejects it", async () => {
    fetchMock
      .mockResolvedValueOnce(appToken())
      .mockResolvedValueOnce(
        reply(401, { detail: "Could not validate credentials" }),
      )
      .mockResolvedValueOnce(appToken())
      .mockResolvedValueOnce(reply(200, { ok: 1 }));
    const { opRequest } = await load();
    await expect(opRequest("/x")).resolves.toEqual({ ok: 1 });
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it("throws the API's detail, joining FastAPI's error lists", async () => {
    fetchMock
      .mockResolvedValueOnce(appToken())
      .mockResolvedValueOnce(
        reply(400, { detail: "Invalid Credentials. Please try again." }),
      )
      .mockResolvedValueOnce(
        reply(422, {
          detail: [{ msg: "Field required" }, { msg: "Too short" }],
        }),
      );
    const { opRequest } = await load();

    const first = await opRequest("/signin").catch((e: unknown) => e);
    expect(first).toMatchObject({
      name: "ApiError",
      status: 400,
      message: "Invalid Credentials. Please try again.",
    });
    const second = await opRequest("/signup").catch((e: Error) => e);
    expect((second as Error).message).toBe("Field required; Too short");
  });

  it("reads a JWT's expiry", async () => {
    const { jwtExpiry } = await load();
    expect(jwtExpiry(jwt(100))).toBe(100_000);
    expect(jwtExpiry("not-a-jwt")).toBe(0);
  });
});
