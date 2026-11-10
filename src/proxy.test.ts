import { NextRequest, NextResponse } from "next/server";
import { describe, expect, it, vi } from "vitest";

const identity = vi.hoisted(() => ({ refreshToken: vi.fn() }));
vi.mock("@/lib/api/op/identity", () => identity);

import { SESSION_COOKIES } from "@/lib/auth/session";

import { proxy } from "./proxy";

const idToken = (secondsLeft: number) =>
  `x.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + secondsLeft })).toString("base64url")}.y`;

const PROFILE = JSON.stringify({
  email: "zoe+1@example.com",
  name: 'Zoë "Z" 100%; =',
  surname: "Nguyễn Thị Ánh",
  emailVerified: true,
});

function signedIn(remember?: string, user?: string) {
  const cookies = [
    `op_session=${idToken(60)}`,
    "op_refresh=rt-1",
    "op_uid=u-1",
    "op_device=dev-1",
    ...(remember ? [`op_remember=${remember}`] : []),
    ...(user ? [`op_user=${encodeURIComponent(user)}`] : []),
  ];
  return new NextRequest("http://localhost/home", {
    headers: { cookie: cookies.join("; ") },
  });
}

const forwarded = (res: Response) => {
  const cookies = new NextRequest("http://localhost/", {
    headers: { cookie: res.headers.get("x-middleware-request-cookie") ?? "" },
  }).cookies;
  const set = new NextResponse(null, {
    headers: res.headers
      .getSetCookie()
      .map((line): [string, string] => ["set-cookie", line]),
  }).cookies;
  for (const cookie of set.getAll()) cookies.set(cookie);
  return cookies;
};

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

  it("behind a proxy, compares Origin with the host the browser used", async () => {
    const behind = (headers: Record<string, string>) =>
      proxy(
        new NextRequest("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers,
        }),
      );
    const host = { "x-forwarded-host": "app.example.com" };
    expect(
      (await behind({ ...host, origin: "https://app.example.com" })).status,
    ).toBe(200);
    expect(
      (await behind({ ...host, origin: "https://evil.example" })).status,
    ).toBe(403);
    expect(
      (
        await behind({
          host: "app.example.com",
          origin: "https://app.example.com",
        })
      ).status,
    ).toBe(200);
    expect((await behind({ ...host, origin: "null" })).status).toBe(403);
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

  it("sends guests from the signed-in home to the landing page", async () => {
    const guest = await proxy(new NextRequest("http://localhost/home?x=1"));
    expect(guest.status).toBe(307);
    expect(guest.headers.get("location")).toBe("http://localhost/");
    expect(guest.cookies.get("op_device")?.value).toMatch(/^[0-9a-f-]{36}$/);

    const user = await proxy(
      new NextRequest("http://localhost/home", {
        headers: { cookie: `op_session=${idToken(3600)}` },
      }),
    );
    expect(user.status).toBe(200);

    for (const path of ["/homepage", "/home-x"]) {
      const res = await proxy(new NextRequest(`http://localhost${path}`));
      expect(res.status).toBe(200);
    }
  });

  it("renews the whole session with the lifetime chosen at sign-in", async () => {
    identity.refreshToken.mockResolvedValue({
      userId: "u-1",
      idToken: "id-2",
      refreshToken: "rt-2",
    });
    const values = {
      op_session: "id-2",
      op_refresh: "rt-2",
      op_uid: "u-1",
      op_remember: "1",
    };
    const renewed = [...Object.keys(values), "op_user"];

    const remembered = await proxy(signedIn("1", PROFILE));
    const page = forwarded(remembered);
    for (const [name, value] of Object.entries(values)) {
      expect(remembered.cookies.get(name)?.value).toBe(value);
      expect(page.get(name)?.value).toBe(value);
    }
    for (const name of renewed) {
      expect(remembered.cookies.get(name)?.maxAge).toBe(2592000);
    }

    const browserOnly = await proxy(signedIn("0", PROFILE));
    expect(browserOnly.cookies.get("op_remember")?.value).toBe("0");
    for (const name of renewed) {
      expect(browserOnly.cookies.get(name)?.value).toBeTruthy();
      expect(browserOnly.cookies.get(name)?.maxAge).toBeUndefined();
      expect(browserOnly.cookies.get(name)?.expires).toBeUndefined();
    }

    const legacy = await proxy(signedIn());
    expect(legacy.cookies.get("op_refresh")?.maxAge).toBe(2592000);
    expect(legacy.cookies.get("op_remember")?.value).toBe("1");
    expect(legacy.cookies.get("op_remember")?.maxAge).toBe(2592000);
    expect(legacy.cookies.get("op_user")).toBeUndefined();
  });

  it('keeps the profile in op_user, a "%" included', async () => {
    identity.refreshToken.mockResolvedValue({
      userId: "u-1",
      idToken: "id-2",
      refreshToken: "rt-2",
    });
    const res = await proxy(signedIn("1", PROFILE));
    for (const value of [
      res.cookies.get("op_user")?.value,
      forwarded(res).get("op_user")?.value,
    ]) {
      expect(JSON.parse(value ?? "")).toEqual(JSON.parse(PROFILE));
    }
  });

  it("takes the user id from the refresh answer when it differs", async () => {
    identity.refreshToken.mockResolvedValue({
      userId: "u-2",
      idToken: "id-2",
      refreshToken: "rt-2",
    });
    const res = await proxy(signedIn("1", PROFILE));
    expect(res.cookies.get("op_uid")?.value).toBe("u-2");
    expect(forwarded(res).get("op_uid")?.value).toBe("u-2");
  });

  it("clears every session cookie when the refresh is refused", async () => {
    identity.refreshToken.mockRejectedValue({ status: 400 });
    const res = await proxy(signedIn("0", PROFILE));
    for (const name of SESSION_COOKIES) {
      expect(res.cookies.get(name)?.value).toBe("");
    }
    expect(res.status).toBe(307);
  });
});
