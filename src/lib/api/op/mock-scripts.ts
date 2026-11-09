import "server-only";

import { cookies } from "next/headers";

import { ApiError } from "@/lib/api/errors";
import { scriptId } from "@/lib/api/op/script-id";
import {
  ASL_CONNECTED_COOKIE,
  SCRIPTS_ADDED_COOKIE,
} from "@/lib/auth/mock-session";
import type { Session } from "@/lib/auth/session";

import type {
  ApiScript,
  Escripts,
  HideBody,
  PatientRegistration,
  TokenExchange,
} from "./scripts";

export const TODAY = "2026-10-13";

const ONE_WEEK = 60 * 60 * 24 * 7;

const BLANK: Omit<ApiScript, "prescription_dspid" | "prescription_status"> = {
  entry_method: "barcode",
  is_chart_based: false,
  needs_second_pass: false,
  notes: null,
  etp_tag: true,
  is_hidden: null,
  hide_body: null,
  authored_on: null,
  administration_route: null,
  prescribed_quantity: null,
  max_supply_permitted: null,
  repeats_allowed: null,
  schedule_number: null,
  supply_number: null,
  supplies_done: null,
  supplies_remaining: null,
  patient_instructions: null,
  medication_added_on: null,
  medication_name: null,
  medication_display_name: null,
  medication_brand_name: null,
  medication_generic_name: null,
  medication_form: null,
  medication_strength: null,
  medication_expiration_date: null,
  medication_global_trade_item_number: null,
  medication_pharmaceutical_benefits_scheme_code: null,
  medication_snomed_ct_identifier: [],
  patient_first_name: null,
  patient_last_name: null,
  patient_name_year: null,
  patient_birthdate: null,
  patient_gender: null,
  patient_medicare_number: null,
  patient_racf_id: null,
  patient_street: null,
  patient_city: null,
  patient_state: null,
  patient_postcode: null,
  clinic_name: null,
  clinic_hpio: null,
  clinic_phone: null,
  clinic_street: null,
  clinic_city: null,
  clinic_state: null,
  clinic_postcode: null,
  pharmacy_name: null,
  pharmacy_hpio: null,
  pharmacy_phone: null,
  pharmacy_street: null,
  pharmacy_city: null,
  pharmacy_state: null,
  pharmacy_postcode: null,
  practitioner_first_name: null,
  practitioner_last_name: null,
  practitioner_hpii: null,
  practitioner_ahpra_registration_number: null,
  practitioner_medicare_prescriber_number: null,
  extra: {},
  prior_prescription_dspid: null,
};

const script = (
  prescription_dspid: string,
  prescription_status: string,
  fields: Partial<ApiScript> = {},
): ApiScript => ({
  ...BLANK,
  prescription_dspid,
  prescription_status,
  ...fields,
});

const hideBody = (id: string, display: string): HideBody => ({
  id,
  subject: { display, patient_reference: `Patient/${id.slice(0, 8)}` },
  extension: [
    {
      url: "http://fhir.medicationknowledge.com.au/StructureDefinition/is-hidden",
      valueBoolean: true,
    },
  ],
  resourceType: "MedicationRequest",
});

const fromAsl = (id: string, display: string): Partial<ApiScript> => ({
  entry_method: "mysl",
  is_hidden: false,
  hide_body: hideBody(id, display),
});

const JOHN: Partial<ApiScript> = {
  patient_first_name: "John",
  patient_last_name: "Smith",
  patient_name_year: "John Smith (1980)",
};
const MARY: Partial<ApiScript> = {
  patient_first_name: "Mary",
  patient_last_name: "Smith",
  patient_name_year: "Mary Smith (1985)",
};
const DAVID: Partial<ApiScript> = {
  patient_first_name: "David",
  patient_last_name: "Smith",
  patient_name_year: "David Smith (2010)",
};

const PRESCRIPTION: Partial<ApiScript> = {
  medication_form: "TAB",
  prescribed_quantity: "30.0",
  administration_route: "Oral",
  authored_on: "01-10-2024",
  practitioner_first_name: "Sarah",
  practitioner_last_name: "Johnson",
  clinic_name: "Melbourne Medical Centre",
  notes:
    "• Take with food to reduce stomach upset\n• Monitor blood sugar levels",
  patient_instructions: [
    "Take with meals to reduce stomach upset.",
    "Swallow the tablet whole with a glass of water — do     not crush or chew.",
    "Check kidney function before starting",
  ].join("\n"),
  repeats_allowed: 5,
};

const METFORMIN: Partial<ApiScript> = {
  ...PRESCRIPTION,
  medication_name: "Metformin 500mg",
  medication_display_name: "metformin",
  medication_strength: "500mg",
  medication_expiration_date: "02-04-2027",
  supply_number: 3,
  supplies_remaining: 3,
  medication_added_on: "04-09-2026",
};
const AMLODIPINE: Partial<ApiScript> = {
  ...PRESCRIPTION,
  medication_name: "Amlodipine 5mg",
  medication_display_name: "amlodipine",
  medication_strength: "5mg",
  supply_number: 5,
  supplies_remaining: 1,
  medication_added_on: "18-03-2026",
};

const ASL_SCRIPTS: ApiScript[] = [
  script("2PPMFK9JTN79538539", "active", {
    ...METFORMIN,
    ...JOHN,
    ...fromAsl("6f1d0c2a9b8e4d7f", "Smith, John"),
  }),
  script("2K4TQ8MV3XPN61RD07", "expired", {
    ...AMLODIPINE,
    ...JOHN,
    ...fromAsl("8a2e5b7c1d3f4a6b", "Smith, John"),
  }),
  script("2W9HC5LR7KTM38QZ14", "active", {
    ...AMLODIPINE,
    ...MARY,
    medication_expiration_date: "20-10-2026",
    medication_added_on: "01-10-2026",
  }),
  script("2RDX7KM4PQ8Z5N3J61", "dispensed", {
    ...DAVID,
    ...fromAsl("3c5e7a9b1d2f4e6a", "Smith, David"),
    medication_added_on: "21-08-2026",
  }),
  script("2JH4WQ9T6LBC2F8M07", "deferred", {
    ...DAVID,
    ...fromAsl("5e7a9c1b3d5f7a9c", "Smith, David"),
    medication_added_on: "08-10-2026",
  }),
  script("2T8NV3XK5RM9QD4P26", "disabled", {
    ...DAVID,
    ...fromAsl("7a9c1e3b5d7f9a1c", "Smith, David"),
    medication_added_on: "12-05-2026",
  }),
  script("2KQ6ZP3M8XW4HB7N15", "ceased", {
    ...DAVID,
    ...fromAsl("9c1e3a5b7d9f1c3e", "Smith, David"),
    medication_added_on: "30-06-2026",
  }),
  script("1F7GK2TQ9MXV4RJ8C3", "cancelled", {
    ...DAVID,
    medication_added_on: "30-09-2026",
  }),
];

const ADDED_SCRIPTS: ApiScript[] = [
  script("2MX8TC4NR6KQ19VB53", "active", { ...METFORMIN, ...JOHN }),
  script("2BV5RK9QM3TW72HC08", "expired", { ...AMLODIPINE, ...JOHN }),
];

function mockScripts(connected: boolean, added: boolean) {
  return connected ? ASL_SCRIPTS : added ? ADDED_SCRIPTS : [];
}

export async function escripts(session: Session): Promise<Escripts> {
  const store = await cookies();
  const connected = store.get(ASL_CONNECTED_COOKIE)?.value === "1";
  const added = store.get(SCRIPTS_ADDED_COOKIE)?.value === "1";
  const hidden = await storedIds(HIDDEN_COOKIE, session.uid);
  const deleted = await storedIds(DELETED_COOKIE, session.uid);
  return {
    uid: session.uid,
    email: session.profile.email,
    name: session.profile.name,
    surname: session.profile.surname,
    scripts: mockScripts(connected, added)
      .filter((s) => !deleted.includes(scriptId(s.prescription_dspid)))
      .map((s) =>
        hidden.includes(scriptId(s.prescription_dspid))
          ? { ...s, is_hidden: true }
          : s,
      ),
    patient_id: connected ? "demo-patient" : null,
  };
}

export const HIDDEN_COOKIE = "op_hidden";
const DELETED_COOKIE = "op_mock_deleted";

async function storedIds(name: string, uid: string): Promise<string[]> {
  const raw = (await cookies()).get(name)?.value ?? "";
  const [owner, ids = ""] = raw.split(":");
  return owner === uid && ids ? ids.split(".") : [];
}

async function storeIds(name: string, uid: string, ids: string[]) {
  (await cookies()).set(name, `${uid}:${ids.join(".")}`, {
    path: "/",
    maxAge: ONE_WEEK,
    sameSite: "lax",
    httpOnly: true,
  });
}

export async function setHidden(uid: string, id: string, hidden: boolean) {
  const ids = (await storedIds(HIDDEN_COOKIE, uid)).filter((o) => o !== id);
  await storeIds(HIDDEN_COOKIE, uid, hidden ? [...ids, id] : ids);
}

export async function deleteScript(uid: string, scid: string) {
  const script = [...ASL_SCRIPTS, ...ADDED_SCRIPTS].find(
    (s) => s.prescription_dspid === scid,
  );
  if (!script) {
    throw new ApiError({
      message: "Script not Found",
      status: 404,
      code: "http_404",
    });
  }
  if (script.entry_method === "mysl") {
    throw new ApiError({
      message: "Script from active list script cannot be deleted",
      status: 400,
      code: "http_400",
    });
  }
  const ids = await storedIds(DELETED_COOKIE, uid);
  await storeIds(DELETED_COOKIE, uid, [...ids, scriptId(scid)]);
  return { detail: "Medication deleted successfully" };
}

async function setFlag(name: string) {
  (await cookies()).set(name, "1", {
    path: "/",
    maxAge: ONE_WEEK,
    sameSite: "lax",
  });
}

export async function tokenExchange(
  registration?: PatientRegistration,
): Promise<TokenExchange> {
  if (registration?.p_actcode === "0000-000") {
    throw new ApiError({
      message:
        '{"error":"not_found","error_description":"Patient could not be found."}',
      status: 400,
      code: "http_400",
    });
  }
  return { access_token: "demo-mysl", expires_in: 3600 };
}

export async function pullAslScripts() {
  await setFlag(ASL_CONNECTED_COOKIE);
  return { detail: "Medication(s) from ASL added successfully" };
}

export async function addScriptByToken(code: string) {
  void code;
  await setFlag(SCRIPTS_ADDED_COOKIE);
  (await cookies()).delete(DELETED_COOKIE);
  return { detail: "Medication(s) from SCID added successfully" };
}

export async function ok() {
  return null;
}
