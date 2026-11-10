import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { GET } from "./route";

const visit = (query: string) =>
  GET(new NextRequest(`http://localhost:8080/api/preview${query}`));

describe("GET /api/preview", () => {
  it("shows the hidden screens and goes home on this site's address", () => {
    const res = visit("?hidden=1");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("/");
    expect(res.cookies.get("op_hidden_screens")?.value).toBe("1");
  });

  it("hides them again", () => {
    const res = visit("?hidden=0");
    expect(res.headers.get("location")).toBe("/");
    expect(res.headers.get("set-cookie")).toMatch(/op_hidden_screens=;/);
  });
});
