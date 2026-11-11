import { createHash } from "node:crypto";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CANCELLED,
  createNonce,
  loadScript,
  prepareApple,
  prepareGoogle,
} from "./provider-sdk";

function fakeGoogle() {
  const calls: {
    config?: {
      client_id: string;
      nonce: string;
      context: string;
      ux_mode: string;
      callback: (r: { credential?: string }) => void;
    };
    rendered?: { parent: HTMLElement; options: Record<string, unknown> };
  } = {};
  window.google = {
    accounts: {
      id: {
        initialize: (config) => {
          calls.config = config;
        },
        renderButton: (parent, options) => {
          calls.rendered = { parent, options };
        },
      },
    },
  };
  return calls;
}

const sha256 = (value: string) =>
  createHash("sha256").update(value).digest("hex");

afterEach(() => {
  delete window.google;
  delete window.AppleID;
});

describe("createNonce", () => {
  it("returns a random value and its SHA-256", async () => {
    const a = await createNonce();
    const b = await createNonce();
    expect(a.raw).toMatch(/^[0-9a-f]{64}$/);
    expect(a.raw).not.toBe(b.raw);
    expect(a.hashed).toBe(sha256(a.raw));
  });
});

describe("loadScript", () => {
  it("adds each script once", () => {
    const src = "https://example.test/sdk.js";
    void loadScript(src);
    void loadScript(src);
    expect(document.querySelectorAll(`script[src="${src}"]`)).toHaveLength(1);
  });
});

describe("prepareGoogle", () => {
  it("draws Google's button, which opens Google's window", async () => {
    const google = fakeGoogle();
    const button = await prepareGoogle("client-1", "signup", vi.fn());
    expect(google.config).toMatchObject({
      client_id: "client-1",
      context: "signup",
      ux_mode: "popup",
    });

    const parent = document.createElement("div");
    button.render(parent, 345);
    expect(google.rendered?.parent).toBe(parent);
    expect(google.rendered?.options).toMatchObject({
      text: "signup_with",
      width: 345,
    });
  });

  it("gives Google the hashed nonce and passes on the ID token with the raw one", async () => {
    const google = fakeGoogle();
    const onToken = vi.fn();
    await prepareGoogle("client-1", "signin", onToken);
    google.config!.callback({ credential: "google-id-token" });
    const token = onToken.mock.calls[0][0];
    expect(token.id_token).toBe("google-id-token");
    expect(google.config!.nonce).toBe(sha256(token.nonce));
  });

  it("ignores an answer without a credential", async () => {
    const google = fakeGoogle();
    const onToken = vi.fn();
    await prepareGoogle("client-1", "signin", onToken);
    google.config!.callback({});
    expect(onToken).not.toHaveBeenCalled();
  });
});

describe("prepareApple", () => {
  function fakeApple(signIn: () => Promise<unknown>) {
    const init = vi.fn();
    window.AppleID = {
      auth: { init, signIn: signIn as never },
    };
    return init;
  }

  it("opens Apple's popup and returns the token, nonce and first-time name", async () => {
    const init = fakeApple(async () => ({
      authorization: { id_token: "apple-id-token" },
      user: { name: { firstName: "Gail", lastName: "Ng" } },
    }));
    const prepared = await prepareApple("services-1");
    const config = init.mock.calls[0][0];
    expect(config).toMatchObject({
      clientId: "services-1",
      usePopup: true,
      scope: "name email",
    });

    const result = await prepared.request();
    expect(result).toEqual({
      id_token: "apple-id-token",
      nonce: expect.any(String),
      name: "Gail",
      surname: "Ng",
    });
    expect(config.nonce).toBe(sha256(result.nonce));
  });

  it("treats a closed popup as cancelled", async () => {
    fakeApple(() => Promise.reject({ error: "popup_closed_by_user" }));
    const prepared = await prepareApple("services-1");
    await expect(prepared.request()).rejects.toThrow(CANCELLED);
  });

  it("reports any other failure", async () => {
    fakeApple(() => Promise.reject({ error: "invalid_client" }));
    const prepared = await prepareApple("services-1");
    await expect(prepared.request()).rejects.toThrow("Apple sign-in failed");
  });
});
