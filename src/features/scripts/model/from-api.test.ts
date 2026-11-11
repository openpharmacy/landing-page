import { describe, expect, it } from "vitest";

import type { ApiScript, Escripts } from "@/lib/api/op/scripts";

import sample from "./__fixtures__/escripts.json";
import {
  avatarClass,
  countdown,
  displayName,
  expiryDate,
  formLabel,
  groupScripts,
  isoDate,
  scriptId,
  toScript,
  toScriptDetails,
  type MappingContext,
} from "./from-api";
import type { MedicationScript, Script } from "./script";

const data = sample as Escripts;
const byToken = (token: string) => {
  const script = data.scripts.find((s) => s.prescription_dspid === token);
  if (!script) throw new Error(`no ${token} in the sample`);
  return script;
};
const CHART = byToken("3R34GTPXTTQ35BBBV7-1");
const ASL_REPEAT = byToken("16XW4Q3GBGXT381PVA");
const ASL_HIDDEN = byToken("21KR32BYRQXGY0CBJA");
const ORIGINAL = byToken("21KR32J3Y51XKM1XK7");
const REPEAT = byToken("1XPR357KWQXMPN88R8");
const CANCELLED = byToken("21KR32PXTYXH9N3QG8");
const CEASED = byToken("21KR32176HKTVK17F7");
const MEDCHART = byToken("31KR320BPVFK6NXTX2-1");

const ctx: MappingContext = {
  today: "2026-11-06",
  ownName: "Optest One",
};
const medication = (api: ApiScript, context = ctx) =>
  toScript(api, context) as MedicationScript;

describe("the sample", () => {
  it("has the API's 62 fields on every script", () => {
    for (const script of data.scripts) {
      expect(Object.keys(script)).toHaveLength(62);
    }
  });
});

describe("scriptId", () => {
  it("is 16 hex characters of the token's SHA-256, never the token", () => {
    const id = scriptId("21KR32J3Y51XKM1XK7");
    expect(id).toMatch(/^[0-9a-f]{16}$/);
    expect(scriptId("21KR32J3Y51XKM1XK7")).toBe(id);
    expect(scriptId("1XPR357KWQXMPN88R8")).not.toBe(id);
    expect(id).not.toContain("21KR32");
  });
});

describe("dates", () => {
  it("reads the API's dd-mm-yyyy", () => {
    expect(isoDate("05-11-2026")).toBe("2026-11-05");
    expect(isoDate("2026-11-05")).toBeNull();
    expect(isoDate(null)).toBeNull();
  });

  it("takes the API's expiry date when there is one", () => {
    expect(expiryDate(ORIGINAL)).toBe("2027-03-19");
    expect(expiryDate(REPEAT)).toBe("2027-01-19");
  });

  it("adds 6 months for Schedule 8, 12 for other schedules, nothing without one", () => {
    const issued = { ...ORIGINAL, medication_expiration_date: null };
    expect(expiryDate({ ...issued, schedule_number: "8" })).toBe("2026-09-19");
    expect(expiryDate({ ...issued, schedule_number: "4" })).toBe("2027-03-19");
    expect(
      expiryDate({
        ...issued,
        schedule_number: "8",
        authored_on: "31-08-2026",
      }),
    ).toBe("2027-02-28");
    expect(expiryDate(CHART)).toBeNull();
    expect(expiryDate(CANCELLED)).toBeNull();
  });

  it("counts down in days within 30 days (red), else in months", () => {
    expect(countdown("2026-10-20", "2026-10-13")).toEqual({
      left: "7 days left",
      date: "Expires Oct 20",
      soon: true,
    });
    expect(countdown("2027-04-02", "2026-10-13")).toEqual({
      left: "6 months left",
      date: "Expires Apr 2, 2027",
      soon: false,
    });
    expect(countdown("2026-11-07", "2026-11-06")?.left).toBe("1 day left");
    expect(countdown("2026-11-05", "2026-11-06")).toBeUndefined();
  });
});

describe("toScript", () => {
  it("maps an ASL chart-based script", () => {
    expect(toScript(CHART, ctx)).toEqual({
      kind: "medication",
      id: scriptId("3R34GTPXTTQ35BBBV7-1"),
      token: "3R34GTPXTTQ35BBBV7-1",
      status: "active",
      secure: true,
      addedOn: "2026-11-05",
      hidden: false,
      canHide: true,
      canDelete: false,
      patient: "Test2 Patient2",
      name: "simvastatin 40mg TAB",
      form: "40mg tablet",
      detail: "40mg tablet • indefinite repeats",
      tags: [],
      expiresOn: undefined,
      expiry: undefined,
    });
  });

  it("counts the repeats left from the supplies remaining", () => {
    expect(medication(ASL_REPEAT).detail).toBe("40mg tablet • 2 repeats left");
    expect(medication(ORIGINAL).detail).toBe("400mg tablet • 5 repeats left");
    expect(medication(REPEAT).detail).toBe("400mg tablet • 4 repeats left");
    expect(medication({ ...ORIGINAL, supplies_remaining: 2 }).detail).toBe(
      "400mg tablet • 1 repeat left",
    );
  });

  it("labels raw form codes", () => {
    expect(formLabel("TAB")).toBe("tablet");
    expect(formLabel("CAP")).toBe("capsule");
    expect(formLabel("EYE GEL")).toBe("eye gel");
    expect(formLabel("WAFER")).toBe("wafer");
    expect(medication(ASL_HIDDEN).form).toBe("500MG eye gel");
  });

  it("maps a script added by its token, with its patient and countdown", () => {
    const script = medication(ORIGINAL);
    expect(script).toMatchObject({
      secure: false,
      canHide: false,
      canDelete: true,
      patient: "Sylvester Stallone",
      name: "NORFLOXACIN 400mg TAB (NORFLOXACIN (APO))",
      expiresOn: "2027-03-19",
      expiry: {
        left: "4 months left",
        date: "Expires Mar 19, 2027",
        soon: false,
      },
    });
  });

  it("keeps only the token, status and date for non-active scripts", () => {
    expect(toScript(CANCELLED, ctx)).toEqual({
      kind: "token",
      id: scriptId("21KR32PXTYXH9N3QG8"),
      token: "21KR32PXTYXH9N3QG8",
      status: "cancelled",
      secure: false,
      addedOn: "2026-11-05",
      hidden: false,
      canHide: false,
      canDelete: true,
      patient: "Optest One",
    });
    expect(toScript(CEASED, ctx)).toMatchObject({
      kind: "token",
      status: "ceased",
      addedOn: "",
    });
    expect(toScript(MEDCHART, ctx)).toMatchObject({
      kind: "token",
      status: "expired",
    });
  });

  it("hides what the API reports hidden", () => {
    expect(toScript(ASL_HIDDEN, ctx).hidden).toBe(true);
    expect(toScript(CHART, ctx).hidden).toBe(false);
  });

  it("shows no countdown on a script that is not active", () => {
    const expired = medication({ ...ORIGINAL, prescription_status: "expired" });
    expect(expired.expiresOn).toBe("2027-03-19");
    expect(expired.expiry).toBeUndefined();
  });

  it("keeps a status the web does not know, without a countdown", () => {
    const onHold = toScript(
      { ...ORIGINAL, prescription_status: "on-hold" },
      ctx,
    );
    expect(onHold).toMatchObject({ status: "other", statusText: "On hold" });
    expect(onHold.kind === "medication" && onHold.expiry).toBe(undefined);
    expect(
      toScript({ ...CANCELLED, prescription_status: "" }, ctx),
    ).toMatchObject({ status: "other", statusText: "Unknown" });
    expect(
      toScript({ ...CANCELLED, prescription_status: "Cancelled" }, ctx).status,
    ).toBe("cancelled");
  });
});

describe("toScriptDetails", () => {
  it("fills the detail page of a script added by its token", () => {
    expect(toScriptDetails(ORIGINAL)).toEqual({
      form: "Tablet",
      suppliesLeft: "6 supplies",
      quantity: "14 tablets",
      strength: "400mg",
      route: "—",
      prescriber: "Darlene Crawford",
      clinic: "eRx Test Prescibing",
      issueDate: "2026-03-19",
      expiryDate: "2027-03-19",
      doctorNotes: "Take",
      personalNotes: "Take with food (probe test)",
    });
  });

  it("puts a dash where an ASL script has nothing", () => {
    expect(toScriptDetails(CHART)).toEqual({
      form: "Tablet",
      suppliesLeft: "Indefinite",
      quantity: "30 tablets",
      strength: "40mg",
      route: "—",
      prescriber: "Lesley Arthur",
      clinic: null,
      issueDate: "2026-10-08",
      expiryDate: "—",
      doctorNotes: null,
      personalNotes: null,
    });
    expect(toScriptDetails(ASL_HIDDEN).quantity).toBe("30");
    expect(toScriptDetails(CANCELLED).suppliesLeft).toBe("—");
  });
});

describe("names", () => {
  it("title-cases names sent in capitals only", () => {
    expect(displayName("SYLVESTER STALLONE")).toBe("Sylvester Stallone");
    expect(displayName("MARY O'BRIEN-SMITH")).toBe("Mary O'Brien-Smith");
    expect(displayName("Test2 Patient2")).toBe("Test2 Patient2");
    expect(displayName("Darlene McKay")).toBe("Darlene McKay");
  });

  it("gives each name the same avatar colour every time", () => {
    expect(avatarClass("John Smith")).toBe("bg-primary-500");
    expect(avatarClass("Mary Smith")).toBe("bg-[#ff8c42]");
    expect(avatarClass("David Smith")).toBe("bg-[#9b59b6]");
  });
});

describe("groupScripts", () => {
  it("groups by patient, the user's own group first, then in the API's order", () => {
    const scripts: Script[] = data.scripts.map((s) => toScript(s, ctx));
    const groups = groupScripts(scripts, ctx.ownName);
    expect(groups.map((g) => [g.name, g.initials, g.scripts.length])).toEqual([
      ["Optest One", "OO", 3],
      ["Test2 Patient2", "TP", 3],
      ["Sylvester Stallone", "SS", 2],
    ]);
    expect(groups[0].scripts.map((s) => s.token)).toEqual([
      "21KR32PXTYXH9N3QG8",
      "21KR32176HKTVK17F7",
      "31KR320BPVFK6NXTX2-1",
    ]);
  });
});
