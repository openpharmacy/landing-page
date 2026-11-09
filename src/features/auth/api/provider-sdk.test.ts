import { createHash } from "node:crypto";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CANCELLED,
  createNonce,
  loadScript,
  prepareApple,
  prepareGoogle,
} from "./provider-sdk";

type Listener = (n: {
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
}) => void;

function fakeGoogle() {
  const calls: {
    config?: {
      client_id: string;
      nonce: string;
      context: string;
      callback: (r: { credential?: string }) => void;
    };
    listener?: Listener;
  } = {};
  window.google = {
    accounts: {
      id: {
        initialize: (config) => {
          calls.config = config;
        },
        prompt: (listener) => {
          calls.listener = listener;
        },
      },
    },
  };
  return calls;
}

const moment = (skipped: boolean, dismissedReason?: string) => ({
  isSkippedMoment: () => skipped,
  isDismissedMoment: () => dismissedReason !== undefined,
  getDismissedReason: () => dismissedReason ?? "",
});

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
  it("gives Google the hashed nonce and returns the ID token with the raw one", async () => {
    const google = fakeGoogle();
    const prepared = await prepareGoogle("client-1", "signup");
    expect(google.config).toMatchObject({
      client_id: "client-1",
      context: "signup",
    });

    const token = prepared.request();
    google.config!.callback({ credential: "google-id-token" });
    const result = await token;
    expect(result.id_token).toBe("google-id-token");
    expect(google.config!.nonce).toBe(sha256(result.nonce));
  });

  it("reports a prompt Google did not show", async () => {
    const google = fakeGoogle();
    const token = (await prepareGoogle("client-1", "signin")).request();
    google.listener!(moment(true));
    await expect(token).rejects.toThrow("Google sign-in could not open");
  });

  it("treats a closed prompt as cancelled", async () => {
    const google = fakeGoogle();
    const token = (await prepareGoogle("client-1", "signin")).request();
    google.listener!(moment(false, "cancel_called"));
    await expect(token).rejects.toThrow(CANCELLED);
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
