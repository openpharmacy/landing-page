import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  groupScripts,
  toScript,
  toScriptDetails,
} from "@/features/scripts/model/from-api";
import type { MedicationScript } from "@/features/scripts/model/script";
import type { Session } from "@/lib/auth/session";

const h = vi.hoisted(() => ({ store: new Map<string, string>() }));
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      h.store.has(name) ? { value: h.store.get(name) } : undefined,
    set: (name: string, value: string) => {
      h.store.set(name, value);
    },
    delete: (name: string) => {
      h.store.delete(name);
    },
  }),
}));

import * as mock from "./mock-scripts";

const session: Session = {
  uid: "demo",
  idToken: "demo",
  deviceId: "",
  profile: { email: "john.smith@gmail.com", name: "John", surname: "Smith" },
};

async function mapped() {
  const data = await mock.escripts(session);
  const context = { today: mock.TODAY, ownName: "John Smith" };
  return { data, scripts: data.scripts.map((s) => toScript(s, context)) };
}

beforeEach(() => h.store.clear());

describe("mock scripts", () => {
  it("has none for a new user", async () => {
    const { data } = await mapped();
    expect(data.scripts).toEqual([]);
    expect(data.patient_id).toBeNull();
  });

  it("maps the synced list to what the frames draw", async () => {
    h.store.set("op_asl_connected", "1");
    const { data, scripts } = await mapped();
    expect(data.patient_id).not.toBeNull();
    const groups = groupScripts(scripts, "John Smith");
    expect(groups.map((g) => [g.name, g.initials, g.avatarClass])).toEqual([
      ["John Smith", "JS", "bg-primary-500"],
      ["Mary Smith", "MS", "bg-[#ff8c42]"],
      ["David Smith", "DS", "bg-[#9b59b6]"],
    ]);
    const [metformin, amlodipine] = groups[0].scripts as MedicationScript[];
    expect(metformin).toMatchObject({
      name: "Metformin 500mg",
      detail: "500mg tablet • 2 repeats left",
      secure: true,
      expiry: { left: "6 months left", date: "Expires Apr 2, 2027" },
    });
    expect(amlodipine).toMatchObject({
      status: "expired",
      detail: "5mg tablet • 0 repeats left",
    });
    expect(groups[1].scripts[0]).toMatchObject({
      secure: false,
      expiry: { left: "7 days left", date: "Expires Oct 20", soon: true },
    });
    expect(groups[2].scripts.map((s) => [s.kind, s.status])).toEqual([
      ["token", "dispensed"],
      ["token", "deferred"],
      ["token", "disabled"],
      ["token", "ceased"],
      ["token", "cancelled"],
    ]);
    expect(toScriptDetails(data.scripts[0])).toMatchObject({
      form: "Tablet",
      quantity: "30 tablets",
      strength: "500mg",
      route: "Oral",
      clinic: "Melbourne Medical Centre",
      issueDate: "2024-10-01",
    });
  });

  it("has the two scripts added by their token", async () => {
    h.store.set("op_scripts_added", "1");
    const { scripts } = await mapped();
    expect(scripts.map((s) => [s.secure, s.status])).toEqual([
      [false, "active"],
      [false, "expired"],
    ]);
  });

  it("shows the list once a script is added or the ASL is pulled", async () => {
    await mock.addScriptByToken("21KR32J3Y51XKM1XK7");
    expect(h.store.get("op_scripts_added")).toBe("1");
    await mock.pullAslScripts();
    expect(h.store.get("op_asl_connected")).toBe("1");
  });

  it("finds no patient for the activation code 0000-000", async () => {
    await expect(
      mock.tokenExchange({
        p_firstname: "John",
        p_lastname: "Smith",
        p_dob: "1/1/1980",
        p_actcode: "0000-000",
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("marks the scripts hidden in mock mode", async () => {
    h.store.set("op_asl_connected", "1");
    const { scripts } = await mapped();
    const [first, second] = scripts;
    await mock.setHidden("demo", first.id, true);
    const after = (await mapped()).scripts;
    expect(after[0].hidden).toBe(true);
    expect(after[1].hidden).toBe(second.hidden);
    await mock.setHidden("demo", first.id, false);
    expect((await mapped()).scripts[0].hidden).toBe(first.hidden);
  });

  it("deletes the scripts added by their token until one is added again", async () => {
    h.store.set("op_scripts_added", "1");
    const [first, second] = (await mapped()).scripts;
    await mock.deleteScript("demo", first.token);
    expect((await mapped()).scripts.map((s) => s.id)).toEqual([second.id]);
    await mock.addScriptByToken("21KR32J3Y51XKM1XK7");
    expect((await mapped()).scripts).toHaveLength(2);
  });

  it("refuses to delete an ASL script, as the API does", async () => {
    h.store.set("op_asl_connected", "1");
    const [metformin] = (await mapped()).scripts;
    await expect(
      mock.deleteScript("demo", metformin.token),
    ).rejects.toMatchObject({ status: 400 });
  });
});
