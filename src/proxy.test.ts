import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

const identity = vi.hoisted(() => ({ refreshToken: vi.fn() }));
vi.mock("@/lib/api/op/identity", () => identity);

import { proxy } from "./proxy";

const expiring = () =>
  `x.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 60 })).toString("base64url")}.y`;

function signedIn(remember?: string) {
  const cookies = [
    `op_session=${expiring()}`,
    "op_refresh=rt-1",
    "op_uid=u-1",
    "op_device=dev-1",
    ...(remember ? [`op_remember=${remember}`] : []),
  ];
  return new NextRequest("http://localhost/home", {
    headers: { cookie: cookies.join("; ") },
  });
}

const request = (method: string, headers: Record<string, string> = {}) =>
  new NextRequest("http://localhost/api/auth/login", { method, headers });

describe("proxy", () => {
  it("refuses a cross-site POST to the BFF", async () => {
    const byFetchSite = await proxy(
      request("POST", { "sec-fetch-site": "cross-site" }),
    );
    expect(byFetchSite.status).toBe(403);
    const byOrigin = await proxy(
      request("POST", { origin: "https://evil.example" }),
    );
    expect(byOrigin.status).toBe(403);
  });

  it("lets this site's pages and header-less clients through", async () => {
    const cases: Record<string, string>[] = [
      { "sec-fetch-site": "same-origin" },
      { origin: "http://localhost" },
      {},
    ];
    for (const headers of cases) {
      const res = await proxy(request("POST", headers));
      expect(res.status).toBe(200);
    }
  });

  it("issues a device id on the first request", async () => {
    const res = await proxy(request("GET"));
    expect(res.cookies.get("op_device")?.value).toMatch(/^[0-9a-f-]{36}$/);
    expect(res.cookies.get("op_device")?.httpOnly).toBe(true);
  });

  it("sends guests away from the account pages", async () => {
    const res = await proxy(
      new NextRequest("http://localhost/account/profile"),
    );
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe(
      "http://localhost/sign-in?next=%2Faccount%2Fprofile",
    );
  });

  it("keeps a page's query in next, e.g. which script", async () => {
    const res = await proxy(
      new NextRequest("http://localhost/scripts/detail?id=0a5e21f9c5c32a0b"),
    );
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe(
      "http://localhost/sign-in?next=%2Fscripts%2Fdetail%3Fid%3D0a5e21f9c5c32a0b",
    );
  });

  it("sends guests from the hidden screens to sign in only when they are shown", async () => {
    const hidden = await proxy(new NextRequest("http://localhost/scheduler"));
    expect(hidden.status).toBe(200);
    const shown = await proxy(
      new NextRequest("http://localhost/compliance/vitals", {
        headers: { cookie: "op_hidden_screens=1" },
      }),
    );
    expect(shown.status).toBe(307);
    expect(shown.headers.get("location")).toBe(
      "http://localhost/sign-in?next=%2Fcompliance%2Fvitals",
    );
  });

  it("leaves the public pages and the API alone", async () => {
    for (const path of [
      "/",
      "/help",
      "/sign-in",
      "/scriptsx",
      "/api/scripts/sync",
    ]) {
      const res = await proxy(new NextRequest(`http://localhost${path}`));
      expect(res.status).toBe(200);
    }
  });

  it("renews the tokens with the lifetime chosen at sign-in", async () => {
    identity.refreshToken.mockResolvedValue({
      userId: "u-1",
      idToken: "id-2",
      refreshToken: "rt-2",
    });
    const remembered = await proxy(signedIn("1"));
    expect(remembered.cookies.get("op_session")?.maxAge).toBe(2592000);
    const legacy = await proxy(signedIn());
    expect(legacy.cookies.get("op_refresh")?.maxAge).toBe(2592000);
    const browserOnly = await proxy(signedIn("0"));
    expect(browserOnly.cookies.get("op_session")?.value).toBe("id-2");
    expect(browserOnly.cookies.get("op_session")?.maxAge).toBeUndefined();
    expect(browserOnly.cookies.get("op_refresh")?.maxAge).toBeUndefined();
  });

  it("clears every session cookie when the refresh is refused", async () => {
    identity.refreshToken.mockRejectedValue({ status: 400 });
    const res = await proxy(signedIn("0"));
    for (const name of ["op_session", "op_sync", "op_remember"]) {
      expect(res.cookies.get(name)?.value).toBe("");
    }
  });
});
