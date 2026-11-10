import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import sample from "@/features/scripts/model/__fixtures__/escripts.json";
import { scriptId } from "@/features/scripts/model/from-api";
import { ApiError } from "@/lib/api/errors";

const h = vi.hoisted(() => ({
  store: new Map<string, string>(),
  options: new Map<string, { httpOnly?: boolean; maxAge?: number }>(),
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      h.store.has(name) ? { value: h.store.get(name) } : undefined,
    set: (name: string, value: string, options = {}) => {
      h.store.set(name, value);
      h.options.set(name, options);
    },
    delete: (name: string) => {
      h.store.delete(name);
    },
  }),
}));

type Call = { path: string; method?: string; body?: unknown };
const api = vi.hoisted(() => ({
  calls: [] as Call[],
  routes: {} as Record<string, (call: Call) => unknown>,
}));
vi.mock("@/lib/api/op/client", () => ({
  jwtExpiry: () => 0,
  opRequest: async (
    path: string,
    options: { method?: string; body?: unknown } = {},
  ) => {
    const call = { path, method: options.method, body: options.body };
    api.calls.push(call);
    const route = api.routes[path];
    if (!route) throw new Error(`unexpected call ${path}`);
    return route(call);
  },
}));

import { POST as add } from "./add/route";
import { POST as archive } from "./archive/route";
import { POST as connect } from "./connect-asl/route";
import { POST as remove } from "./delete/route";
import { POST as hide } from "./hide/route";
import { POST as note } from "./note/route";
import { GET as reauth } from "../auth/expired/route";

const SCRIPTS = sample.scripts;
const ASL = SCRIPTS[0];
const BARCODE = SCRIPTS[3];

const post = (body: unknown) =>
  new Request("http://localhost/api/scripts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

const apiError = (status: number, message: string, detail?: unknown) =>
  new ApiError({ status, message, code: `http_${status}`, detail });

const calls = (path: string) => api.calls.filter((c) => c.path === path);
const EXCHANGE = "/government/v1/token-exchange";
const ESCRIPTS = "/user/v1/escripts/";

beforeEach(() => {
  h.store.clear();
  h.options.clear();
  h.store.set("op_session", "id-1");
  h.store.set("op_uid", "u-1");
  h.store.set("op_device", "dev-1");
  h.store.set(
    "op_user",
    JSON.stringify({ email: "a@b.com", name: "Ann", surname: "Lee" }),
  );
  api.calls = [];
  api.routes = {
    [EXCHANGE]: () => ({ access_token: "mysl-1", expires_in: 3600 }),
    [ESCRIPTS]: () => ({ ...sample, uid: "u-1" }),
  };
});
afterEach(() => vi.restoreAllMocks());

describe("every scripts route", () => {
  it("asks to sign in without a session", async () => {
    h.store.delete("op_session");
    const res = await add(post({ token: "21KR32J3Y51XKM1XK7" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
    expect(api.calls).toEqual([]);
  });

  it("clears the session when the API has revoked it", async () => {
    api.routes["/government/v1/barcode/medication-request"] = () => {
      throw apiError(403, "ID token has been revoked");
    };
    const res = await add(post({ token: "21KR32J3Y51XKM1XK7" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
    expect(h.store.has("op_session")).toBe(false);
    expect(h.store.has("op_mysl")).toBe(false);
  });
});

describe("POST /api/scripts/add", () => {
  it("gets a MySL token, keeps it in an httpOnly cookie and adds the token", async () => {
    api.routes["/government/v1/barcode/medication-request"] = () => ({
      detail: "Medication(s) from SCID added successfully",
    });
    const res = await add(post({ token: " 21kr32j3y51xkm1xk7 " }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    expect(calls(EXCHANGE)).toEqual([
      { path: EXCHANGE, method: "POST", body: undefined },
    ]);
    expect(calls("/government/v1/barcode/medication-request")[0].body).toEqual({
      access_token: "mysl-1",
      code: "21KR32J3Y51XKM1XK7",
    });
    expect(h.store.get("op_mysl")).toMatch(/^u-1:\d+:mysl-1$/);
    expect(h.options.get("op_mysl")).toMatchObject({
      httpOnly: true,
      maxAge: 3600,
    });

    await add(post({ token: "1XPR357KWQXMPN88R8" }));
    expect(calls(EXCHANGE)).toHaveLength(1);
  });

  it("does not use another user's MySL token", async () => {
    h.store.set("op_mysl", `u-2:${Date.now() + 3_600_000}:mysl-other`);
    api.routes["/government/v1/barcode/medication-request"] = () => null;
    await add(post({ token: "21KR32J3Y51XKM1XK7" }));
    expect(calls(EXCHANGE)).toHaveLength(1);
    expect(
      calls("/government/v1/barcode/medication-request")[0].body,
    ).toMatchObject({ access_token: "mysl-1" });
  });

  it("renews a MySL token that MySL refuses, once", async () => {
    h.store.set("op_mysl", `u-1:${Date.now() + 3_600_000}:mysl-stale`);
    let first = true;
    api.routes["/government/v1/barcode/medication-request"] = () => {
      if (first) {
        first = false;
        throw apiError(
          401,
          '{"resourceType":"OperationOutcome","issue":[{"details":{"text":"Unauthorized Access"}}]}',
        );
      }
      return null;
    };
    const res = await add(post({ token: "21KR32J3Y51XKM1XK7" }));
    expect(res.status).toBe(200);
    expect(calls(EXCHANGE)).toHaveLength(1);
    expect(h.store.get("op_session")).toBe("id-1");
  });

  it("refuses a token the API would refuse, before calling it", async () => {
    const res = await add(post({ token: "31KR320BPVFK6NXTX2" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "A token that starts with 3 includes a hyphen",
    });
    expect(api.calls).toEqual([]);
  });

  it("passes the API's message on", async () => {
    api.routes["/government/v1/barcode/medication-request"] = () => {
      throw apiError(404, "eScript Token not found");
    };
    const res = await add(post({ token: "21KR32AAAAAAAAAAAA" }));
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "eScript Token not found" });
  });
});

describe("POST /api/scripts/connect-asl", () => {
  const form = {
    firstName: "Test",
    lastName: "Patient",
    dob: "08/02/1991",
    activationCode: "AB1-CD2E",
  };

  it("registers the patient, pulls the ASL and counts its active scripts", async () => {
    api.routes["/government/v1/mysl/medication-request"] = () => ({
      detail: "Medication(s) from ASL added successfully",
    });
    const res = await connect(post(form));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ activeScripts: 3 });
    expect(calls(EXCHANGE)[0].body).toEqual({
      p_firstname: "Test",
      p_lastname: "Patient",
      p_dob: "8/2/1991",
      p_actcode: "AB1-CD2E",
    });
    expect(calls("/government/v1/mysl/medication-request")[0].body).toEqual({
      access_token: "mysl-1",
    });
  });

  it("reuses a patient already on file", async () => {
    api.routes[EXCHANGE] = (call) => {
      if (call.body) throw apiError(400, "Patient id already exists");
      return { access_token: "mysl-2", expires_in: 3600 };
    };
    api.routes["/government/v1/mysl/medication-request"] = () => null;
    const res = await connect(post(form));
    expect(res.status).toBe(200);
    expect(calls(EXCHANGE).map((c) => c.body === undefined)).toEqual([
      false,
      true,
    ]);
    expect(calls("/government/v1/mysl/medication-request")[0].body).toEqual({
      access_token: "mysl-2",
    });
  });

  it("answers with the stored list when the pull fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    api.routes["/government/v1/mysl/medication-request"] = () => {
      throw apiError(500, "Internal Server Error");
    };
    const res = await connect(post(form));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ activeScripts: 3 });
  });

  it("shows MySL's own sentence when no patient matches", async () => {
    api.routes[EXCHANGE] = () => {
      throw apiError(
        400,
        '{"error":"not_found","error_description":"Patient could not be found."}',
      );
    };
    const res = await connect(post(form));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Patient could not be found." });
  });

  it("checks the activation code first", async () => {
    const res = await connect(
      post({ ...form, activationCode: "ASL-1234-5678" }),
    );
    expect(res.status).toBe(400);
    expect(api.calls).toEqual([]);
  });
});

describe("POST /api/scripts/hide", () => {
  it("sends the stored hide_body as the PUT expects it, then pulls the ASL", async () => {
    api.routes["/government/v1/mysl/visibility-status"] = () => ({
      detail: "Medication hidden status changed successfully",
    });
    api.routes["/government/v1/mysl/medication-request"] = () => ({
      detail: "Medication(s) from ASL added successfully",
    });
    const id = scriptId(ASL.prescription_dspid);
    const res = await hide(post({ id, hidden: true }));
    expect(res.status).toBe(200);

    const [put] = calls("/government/v1/mysl/visibility-status");
    expect(put.method).toBe("PUT");
    const { hide_body, access_token } = put.body as {
      hide_body: Record<string, unknown>;
      access_token: string;
    };
    expect(access_token).toBe("mysl-1");
    expect(hide_body).toEqual({
      id: ASL.hide_body?.id,
      resourceType: "MedicationRequest",
      subject: {
        display: "Patient2, Test2",
        reference: ASL.hide_body?.subject.patient_reference,
      },
      extension: [
        {
          url: "http://fhir.medicationknowledge.com.au/StructureDefinition/is-hidden",
          valueBoolean: true,
        },
      ],
    });
    const paths = api.calls.map((c) => c.path);
    expect(
      paths.indexOf("/government/v1/mysl/medication-request"),
    ).toBeGreaterThan(paths.indexOf("/government/v1/mysl/visibility-status"));
    expect(h.store.has("op_hidden")).toBe(false);
  });

  it("shows a hidden script again: the same body with valueBoolean false, then a pull", async () => {
    api.routes["/government/v1/mysl/visibility-status"] = () => null;
    api.routes["/government/v1/mysl/medication-request"] = () => null;
    const res = await hide(
      post({ id: scriptId(ASL.prescription_dspid), hidden: false }),
    );
    expect(res.status).toBe(200);
    const [put] = calls("/government/v1/mysl/visibility-status");
    const { hide_body } = put.body as {
      hide_body: { extension: { valueBoolean: boolean }[] };
    };
    expect(hide_body.extension[0].valueBoolean).toBe(false);
    expect(calls("/government/v1/mysl/medication-request")).toHaveLength(1);
  });

  it("needs to know whether to hide or show", async () => {
    const res = await hide(post({ id: scriptId(ASL.prescription_dspid) }));
    expect(res.status).toBe(400);
    expect(api.calls).toEqual([]);
  });

  it("still answers 200 when the pull after the hide fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    api.routes["/government/v1/mysl/visibility-status"] = () => null;
    api.routes["/government/v1/mysl/medication-request"] = () => {
      throw apiError(500, "Internal Server Error");
    };
    const res = await hide(
      post({ id: scriptId(ASL.prescription_dspid), hidden: true }),
    );
    expect(res.status).toBe(200);
  });

  it("refuses a script that is not from the ASL", async () => {
    const res = await hide(
      post({ id: scriptId(BARCODE.prescription_dspid), hidden: true }),
    );
    expect(res.status).toBe(400);
    expect(calls("/government/v1/mysl/visibility-status")).toEqual([]);
  });

  it("copes with a user the API sends no scripts for", async () => {
    api.routes[ESCRIPTS] = () => ({ uid: "u-1", email: "a@b.com" });
    const res = await hide(
      post({ id: scriptId(ASL.prescription_dspid), hidden: true }),
    );
    expect(res.status).toBe(404);
  });

  it("answers 404 for an id the user does not have", async () => {
    const res = await hide(post({ id: "0123456789abcdef", hidden: true }));
    expect(res.status).toBe(404);
  });
});

describe("POST /api/scripts/archive", () => {
  const ARCHIVED = "op_archived";
  const aslId = scriptId(ASL.prescription_dspid);
  const barcodeId = scriptId(BARCODE.prescription_dspid);
  const send = (id: string, archived: boolean) =>
    archive(post({ id, archived }));

  it("keeps the user's archived ids in an httpOnly cookie", async () => {
    expect((await send(aslId, true)).status).toBe(200);
    expect(h.store.get(ARCHIVED)).toBe(`u-1:${aslId}`);
    expect(h.options.get(ARCHIVED)).toMatchObject({
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 400,
    });
    await send(barcodeId, true);
    expect(h.store.get(ARCHIVED)).toBe(`u-1:${aslId}.${barcodeId}`);
    await send(aslId, true);
    expect(h.store.get(ARCHIVED)).toBe(`u-1:${barcodeId}.${aslId}`);

    await send(barcodeId, false);
    expect(h.store.get(ARCHIVED)).toBe(`u-1:${aslId}`);
    await send(aslId, false);
    expect(h.store.has(ARCHIVED)).toBe(false);
    expect(new Set(api.calls.map((c) => c.path))).toEqual(new Set([ESCRIPTS]));
  });

  it("drops the ids of scripts the user no longer has, and another user's list", async () => {
    h.store.set(ARCHIVED, `u-1:0123456789abcdef.${barcodeId}`);
    await send(aslId, true);
    expect(h.store.get(ARCHIVED)).toBe(`u-1:${barcodeId}.${aslId}`);

    h.store.set(ARCHIVED, `u-2:${barcodeId}`);
    await send(aslId, true);
    expect(h.store.get(ARCHIVED)).toBe(`u-1:${aslId}`);
  });

  it("answers 404 for an id the user does not have", async () => {
    const res = await send("0123456789abcdef", true);
    expect(res.status).toBe(404);
    expect(h.store.has(ARCHIVED)).toBe(false);
  });

  it("takes opaque ids and a flag only", async () => {
    expect((await send(BARCODE.prescription_dspid, true)).status).toBe(400);
    expect((await archive(post({ id: aslId }))).status).toBe(400);
    expect(api.calls).toEqual([]);
  });

  it("needs a live session", async () => {
    api.routes[ESCRIPTS] = () => {
      throw apiError(403, "ID token has been revoked");
    };
    const res = await send(aslId, true);
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ signIn: true });
    expect(h.store.has("op_session")).toBe(false);
    expect(h.store.has(ARCHIVED)).toBe(false);
  });
});

describe("POST /api/scripts/delete", () => {
  it("deletes by the script's token", async () => {
    const id = scriptId(BARCODE.prescription_dspid);
    api.routes["/user/v1/script/delete"] = () => ({
      detail: "Medication deleted successfully",
    });
    const res = await remove(post({ id }));
    expect(res.status).toBe(200);
    expect(calls("/user/v1/script/delete")[0].body).toEqual({
      scid: "21KR32J3Y51XKM1XK7",
    });
  });

  it("takes a deleted script out of the archive, so it comes back unarchived", async () => {
    const id = scriptId(BARCODE.prescription_dspid);
    const aslId = scriptId(ASL.prescription_dspid);
    api.routes["/user/v1/script/delete"] = () => ({
      detail: "Medication deleted successfully",
    });
    h.store.set("op_archived", `u-1:${id}.${aslId}`);
    expect((await remove(post({ id }))).status).toBe(200);
    expect(h.store.get("op_archived")).toBe(`u-1:${aslId}`);

    h.store.set("op_archived", `u-1:${id}`);
    await remove(post({ id }));
    expect(h.store.has("op_archived")).toBe(false);
  });

  it("keeps the archive when the API refuses the delete", async () => {
    const id = scriptId(ASL.prescription_dspid);
    api.routes["/user/v1/script/delete"] = () => {
      throw apiError(400, "Script from active list script cannot be deleted");
    };
    h.store.set("op_archived", `u-1:${id}`);
    expect((await remove(post({ id }))).status).toBe(400);
    expect(h.store.get("op_archived")).toBe(`u-1:${id}`);
  });

  it("passes on the API's refusal for an ASL script", async () => {
    api.routes["/user/v1/script/delete"] = () => {
      throw apiError(400, "Script from active list script cannot be deleted");
    };
    const res = await remove(post({ id: scriptId(ASL.prescription_dspid) }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Script from active list script cannot be deleted",
    });
  });

  it("takes opaque ids only", async () => {
    const res = await remove(post({ id: "21KR32J3Y51XKM1XK7" }));
    expect(res.status).toBe(400);
    expect(api.calls).toEqual([]);
  });
});

describe("POST /api/scripts/note", () => {
  it("saves the notes on the script's token; empty notes clear them", async () => {
    api.routes["/government/v1/mysl/update-scid-note"] = () => ({
      detail: "Notes were successfully updated",
    });
    const id = scriptId(BARCODE.prescription_dspid);
    expect((await note(post({ id, notes: " Take with food " }))).status).toBe(
      200,
    );
    expect((await note(post({ id, notes: "" }))).status).toBe(200);
    expect(
      calls("/government/v1/mysl/update-scid-note").map((c) => c.body),
    ).toEqual([
      { scid: "21KR32J3Y51XKM1XK7", notes: "Take with food" },
      { scid: "21KR32J3Y51XKM1XK7", notes: "" },
    ]);
  });

  it("refuses more than 500 characters", async () => {
    const id = scriptId(BARCODE.prescription_dspid);
    const res = await note(post({ id, notes: "x".repeat(501) }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Notes can be up to 500 characters",
    });
    expect(api.calls).toEqual([]);
  });
});

describe("GET /api/auth/expired", () => {
  const request = (site: string | null) =>
    new NextRequest("http://localhost/api/auth/expired?next=/scripts", {
      headers: site ? { "sec-fetch-site": site } : {},
    });

  it("clears the session and sends the user to sign in, then back", async () => {
    const res = await reauth(request("same-origin"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("/sign-in?next=%2Fscripts");
    expect(h.store.has("op_session")).toBe(false);
  });

  it("signs nobody out from another site's link", async () => {
    const res = await reauth(request("cross-site"));
    expect(res.headers.get("location")).toContain("/sign-in");
    expect(h.store.get("op_session")).toBe("id-1");
  });

  it("keeps the return path on this site", async () => {
    const res = await reauth(
      new NextRequest("http://localhost/api/auth/expired?next=//evil.example"),
    );
    expect(res.headers.get("location")).toBe("/sign-in?next=%2F");
  });
});
