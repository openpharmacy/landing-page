import { describe, expect, it } from "vitest";

import { safeNextPath, withNext } from "./next-path";

describe("safeNextPath", () => {
  it("keeps a path on this site", () => {
    expect(safeNextPath("/scripts")).toBe("/scripts");
    expect(safeNextPath("/account/profile?tab=1")).toBe(
      "/account/profile?tab=1",
    );
  });

  it("rejects missing, absolute and protocol-relative targets", () => {
    expect(safeNextPath(undefined)).toBeNull();
    expect(safeNextPath("")).toBeNull();
    expect(safeNextPath("https://evil.example")).toBeNull();
    expect(safeNextPath("//evil.example")).toBeNull();
    expect(safeNextPath("/\\evil.example")).toBeNull();
  });

  it("rejects targets the browser turns into another site", () => {
    expect(safeNextPath("/\t/evil.example")).toBeNull();
    expect(safeNextPath("/\n/evil.example/x")).toBeNull();
    expect(safeNextPath("/\r\n/evil.example")).toBeNull();
    expect(safeNextPath("/\\/evil.example")).toBeNull();
  });
});

describe("withNext", () => {
  it("appends an encoded next, or leaves the path alone", () => {
    expect(withNext("/sign-in/email", "/scripts/connect-asl")).toBe(
      "/sign-in/email?next=%2Fscripts%2Fconnect-asl",
    );
    expect(withNext("/sign-in/email", null)).toBe("/sign-in/email");
  });

  it("adds to a query the path already has", () => {
    expect(withNext("/sign-in/email?account=last", "/scripts")).toBe(
      "/sign-in/email?account=last&next=%2Fscripts",
    );
  });
});
