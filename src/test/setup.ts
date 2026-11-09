import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

const realFetch = globalThis.fetch;
beforeEach(() => {
  vi.stubGlobal("fetch", (input: RequestInfo | URL, init?: RequestInit) =>
    String(input) === "/api/auth/me"
      ? Promise.resolve(
          Response.json({ error: "Not authenticated" }, { status: 401 }),
        )
      : realFetch(input, init),
  );
});

afterEach(() => {
  cleanup();
});
