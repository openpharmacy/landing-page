import { describe, expect, it } from "vitest";

import { formatAddedDate, sortScripts, type Script } from "./script";

const base = {
  secure: false,
  hidden: false,
  canHide: false,
  canDelete: true,
  patient: "John Smith",
};
const med = (
  id: string,
  name: string,
  status: "active" | "expired",
  addedOn: string,
  expiresOn?: string,
): Script => ({
  ...base,
  kind: "medication",
  id,
  token: `2${id.toUpperCase().padEnd(17, "X")}`,
  name,
  form: "",
  detail: "",
  tags: [],
  status,
  addedOn,
  expiresOn,
});
const tokenOnly = (
  id: string,
  token: string,
  status: "cancelled" | "dispensed",
  addedOn: string,
): Script => ({ ...base, kind: "token", id, token, status, addedOn });

const SCRIPTS: Script[] = [
  med("expired", "Amlodipine 5mg", "expired", "2026-03-18"),
  tokenOnly("cancelled", "1F7GK2TQ9MXV4RJ8C3", "cancelled", "2026-09-30"),
  med("later", "Metformin 500mg", "active", "2026-09-04", "2027-04-02"),
  tokenOnly("dispensed", "2RDX7KM4PQ8Z5N3J61", "dispensed", "2026-08-21"),
  med("no-date", "Vitamin D3", "active", "2026-01-02"),
  med("soon", "Amlodipine 5mg", "active", "2026-10-01", "2026-10-20"),
];

const ids = (scripts: Script[]) => scripts.map((s) => s.id);

describe("sortScripts", () => {
  it("puts the soonest expiry first, then undated, expired and token-only scripts", () => {
    expect(ids(sortScripts(SCRIPTS, "expiry"))).toEqual([
      "soon",
      "later",
      "no-date",
      "expired",
      "cancelled",
      "dispensed",
    ]);
  });

  it("puts the most recently added first", () => {
    expect(ids(sortScripts(SCRIPTS, "added"))).toEqual([
      "soon",
      "cancelled",
      "later",
      "dispensed",
      "expired",
      "no-date",
    ]);
  });

  it("sorts by name, or by token when there is no name, keeping ties in order", () => {
    expect(ids(sortScripts(SCRIPTS, "name"))).toEqual([
      "cancelled",
      "dispensed",
      "expired",
      "soon",
      "later",
      "no-date",
    ]);
  });

  it("sorts by status in the Filter By order", () => {
    expect(ids(sortScripts(SCRIPTS, "status"))).toEqual([
      "later",
      "no-date",
      "soon",
      "dispensed",
      "expired",
      "cancelled",
    ]);
  });

  it("puts a status the web does not know last", () => {
    const other: Script = {
      ...base,
      kind: "token",
      id: "other",
      token: "2OTHERXXXXXXXXXXXX",
      status: "other",
      statusText: "On hold",
      addedOn: "",
    };
    expect(ids(sortScripts([other, ...SCRIPTS], "status")).at(-1)).toBe(
      "other",
    );
  });

  it("does not change the input", () => {
    const before = ids(SCRIPTS);
    sortScripts(SCRIPTS, "name");
    expect(ids(SCRIPTS)).toEqual(before);
  });
});

describe("formatAddedDate", () => {
  it("formats a calendar date without a time-zone shift", () => {
    expect(formatAddedDate("2026-09-04")).toBe("Sep 4, 2026");
  });
});
