import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import { isMockingEnabled } from "@/config/env";
import { ApiError } from "@/lib/api/errors";
import {
  cookieOptions,
  getSession,
  MYSL_COOKIE,
  type Session,
} from "@/lib/auth/session";

import { opRequest } from "./client";
import { isMyslRejection } from "./respond";
import { scriptId } from "./script-id";
import * as mock from "./mock-scripts";

export type HideBody = {
  id: string;
  resourceType: string;
  subject: { display?: string; reference?: string; patient_reference?: string };
  extension: { url: string; valueBoolean: boolean }[];
};

type Text = string | null;
type Count = number | null;

export type ApiScript = {
  entry_method: string;
  is_chart_based: boolean | null;
  needs_second_pass: boolean | null;
  notes: Text;
  etp_tag: boolean | null;
  is_hidden: boolean | null;
  hide_body: HideBody | null;
  prescription_dspid: string;
  prescription_status: string;
  authored_on: Text;
  administration_route: Text;
  prescribed_quantity: Text;
  max_supply_permitted: Count;
  repeats_allowed: Count;
  schedule_number: Text;
  supply_number: Count;
  supplies_done: Count;
  supplies_remaining: Count;
  patient_instructions: Text;
  medication_added_on: Text;
  medication_name: Text;
  medication_display_name: Text;
  medication_brand_name: Text;
  medication_generic_name: Text;
  medication_form: Text;
  medication_strength: Text;
  medication_expiration_date: Text;
  medication_global_trade_item_number: Text;
  medication_pharmaceutical_benefits_scheme_code: Text;
  medication_snomed_ct_identifier: string[] | null;
  patient_first_name: Text;
  patient_last_name: Text;
  patient_name_year: Text;
  patient_birthdate: Text;
  patient_gender: Text;
  patient_medicare_number: Text;
  patient_racf_id: Text;
  patient_street: Text;
  patient_city: Text;
  patient_state: Text;
  patient_postcode: Text;
  clinic_name: Text;
  clinic_hpio: Text;
  clinic_phone: Text;
  clinic_street: Text;
  clinic_city: Text;
  clinic_state: Text;
  clinic_postcode: Text;
  pharmacy_name: Text;
  pharmacy_hpio: Text;
  pharmacy_phone: Text;
  pharmacy_street: Text;
  pharmacy_city: Text;
  pharmacy_state: Text;
  pharmacy_postcode: Text;
  practitioner_first_name: Text;
  practitioner_last_name: Text;
  practitioner_hpii: Text;
  practitioner_ahpra_registration_number: Text;
  practitioner_medicare_prescriber_number: Text;
  extra: Record<string, unknown> | null;
  prior_prescription_dspid: Text;
};

export type Escripts = {
  uid: string;
  email: string;
  name: string;
  surname: string;
  registration_date?: string;
  scripts: ApiScript[];
  device_id?: string[];
  patient_id: string | null;
};

export type PatientRegistration = {
  p_firstname: string;
  p_lastname: string;
  p_dob: string;
  p_actcode: string;
};

export type TokenExchange = { access_token: string; expires_in: number };

type Message = { detail?: string } | string | null;

const userOf = (session: Session) => ({
  user: { uid: session.uid, idToken: session.idToken },
  deviceId: session.deviceId,
});

export async function fetchEscripts(session: Session): Promise<Escripts> {
  if (isMockingEnabled) return mock.escripts(session);
  const data = await opRequest<Partial<Escripts>>(
    "/user/v1/escripts/",
    userOf(session),
  );
  return {
    ...data,
    uid: data.uid ?? session.uid,
    email: data.email ?? session.profile.email,
    name: data.name ?? session.profile.name,
    surname: data.surname ?? session.profile.surname,
    scripts: data.scripts ?? [],
    patient_id: data.patient_id ?? null,
  };
}

export const getEscripts = cache(async (): Promise<Escripts | null> => {
  const session = await getSession();
  return session ? fetchEscripts(session) : null;
});

export function scriptsToday(): string {
  if (isMockingEnabled) return mock.TODAY;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
  }).format(new Date());
}

const MYSL_MARGIN_MS = 2 * 60_000;

function myslText(raw: string): string | null {
  try {
    const data = JSON.parse(raw) as {
      error_description?: unknown;
      issue?: { details?: { text?: unknown }; diagnostics?: unknown }[];
    };
    const issue = data.issue?.[0];
    const text =
      data.error_description ?? issue?.details?.text ?? issue?.diagnostics;
    return typeof text === "string" && text ? text : null;
  } catch {
    return null;
  }
}

function readable(error: unknown): unknown {
  if (!(error instanceof ApiError)) return error;
  const text = myslText(error.message);
  if (!text) return error;
  return new ApiError({
    message: text,
    status: error.status,
    code: error.code,
    detail: error.detail,
  });
}

async function tokenExchange(
  session: Session,
  registration?: PatientRegistration,
): Promise<TokenExchange> {
  try {
    if (isMockingEnabled) return await mock.tokenExchange(registration);
    return await opRequest<TokenExchange>("/government/v1/token-exchange", {
      method: "POST",
      body: registration,
      ...userOf(session),
    });
  } catch (error) {
    throw readable(error);
  }
}

function readMysl(raw: string | undefined, uid: string) {
  if (!raw) return null;
  const [owner, expiresAt, ...rest] = raw.split(":");
  const token = rest.join(":");
  if (owner !== uid || !token) return null;
  return { token, expiresAt: Number(expiresAt) };
}

async function storeMysl(session: Session, exchange: TokenExchange) {
  const expiresAt = Date.now() + exchange.expires_in * 1000;
  (await cookies()).set(
    MYSL_COOKIE,
    `${session.uid}:${expiresAt}:${exchange.access_token}`,
    cookieOptions(exchange.expires_in),
  );
  return exchange.access_token;
}

async function myslToken(session: Session, fresh = false): Promise<string> {
  const stored = readMysl(
    (await cookies()).get(MYSL_COOKIE)?.value,
    session.uid,
  );
  if (!fresh && stored && stored.expiresAt - Date.now() > MYSL_MARGIN_MS) {
    return stored.token;
  }
  return storeMysl(session, await tokenExchange(session));
}

async function withMysl<T>(
  session: Session,
  call: (token: string) => Promise<T>,
): Promise<T> {
  try {
    try {
      return await call(await myslToken(session));
    } catch (error) {
      if (!isMyslRejection(error)) throw error;
      return await call(await myslToken(session, true));
    }
  } catch (error) {
    throw readable(error);
  }
}

export async function connectPatient(
  session: Session,
  registration: PatientRegistration,
): Promise<void> {
  let exchange: TokenExchange;
  try {
    exchange = await tokenExchange(session, registration);
  } catch (error) {
    const known =
      error instanceof ApiError &&
      error.status === 400 &&
      /already exists/i.test(error.message);
    if (!known) throw error;
    exchange = await tokenExchange(session);
  }
  await storeMysl(session, exchange);
}

const post = (session: Session, body: unknown) => ({
  method: "POST" as const,
  body,
  ...userOf(session),
});

export function pullAslScripts(session: Session): Promise<Message> {
  if (isMockingEnabled) return mock.pullAslScripts();
  return withMysl(session, (access_token) =>
    opRequest(
      "/government/v1/mysl/medication-request",
      post(session, { access_token }),
    ),
  );
}

export async function refreshScripts(session: Session): Promise<Message> {
  if (isMockingEnabled) return mock.ok();
  try {
    return await withMysl(session, (access_token) =>
      opRequest("/user/v1/refresh/", post(session, { access_token })),
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export function addScriptByToken(
  session: Session,
  code: string,
): Promise<Message> {
  if (isMockingEnabled) return mock.addScriptByToken(code);
  return withMysl(session, (access_token) =>
    opRequest(
      "/government/v1/barcode/medication-request",
      post(session, { access_token, code }),
    ),
  );
}

const IS_HIDDEN_URL =
  "http://fhir.medicationknowledge.com.au/StructureDefinition/is-hidden";

export function visibilityBody(stored: HideBody, hidden: boolean): HideBody {
  const { patient_reference, ...subject } = stored.subject;
  const [first, ...others] = stored.extension ?? [];
  return {
    ...stored,
    subject: { ...subject, reference: subject.reference ?? patient_reference },
    extension: [
      { url: first?.url ?? IS_HIDDEN_URL, valueBoolean: hidden },
      ...others,
    ],
  };
}

export async function setScriptHidden(
  session: Session,
  script: ApiScript & { hide_body: HideBody },
  hidden: boolean,
): Promise<void> {
  if (isMockingEnabled) {
    return mock.setHidden(
      session.uid,
      scriptId(script.prescription_dspid),
      hidden,
    );
  }
  await withMysl(session, (access_token) =>
    opRequest("/government/v1/mysl/visibility-status", {
      ...post(session, {
        hide_body: visibilityBody(script.hide_body, hidden),
        access_token,
      }),
      method: "PUT",
    }),
  );
  await pullAslScripts(session).catch((error: unknown) => {
    console.error("ASL pull after a visibility change failed", error);
  });
}

export function updateScriptNote(
  session: Session,
  scid: string,
  notes: string,
): Promise<Message> {
  if (isMockingEnabled) return mock.ok();
  return opRequest(
    "/government/v1/mysl/update-scid-note",
    post(session, { scid, notes }),
  );
}

export function deleteScript(session: Session, scid: string): Promise<Message> {
  if (isMockingEnabled) return mock.deleteScript(session.uid, scid);
  return opRequest("/user/v1/script/delete", post(session, { scid }));
}
