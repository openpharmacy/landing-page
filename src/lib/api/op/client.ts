import "server-only";

import { apiConfig } from "@/config/server-env";
import { ApiError } from "@/lib/api/errors";

export type UserAuth = { uid: string; idToken: string };

type RequestOptions = {
  method?: "GET" | "POST" | "PUT";
  body?: unknown;
  deviceId?: string;
  user?: UserAuth;
  clientId?: string;
};

const TIMEOUT_MS = 30_000;
const APP_TOKEN_MARGIN_MS = 5 * 60_000;

let appToken: { value: string; expiresAt: number } | null = null;
let appTokenRequest: Promise<string> | null = null;

async function requestAppToken(): Promise<string> {
  const { origin, username, password } = apiConfig();
  const res = await fetch(`${origin}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new ApiError({
      message: "Could not authenticate the app with the API",
      status: 502,
      code: "app_token",
      detail: res.status,
    });
  }
  const { access_token } = (await res.json()) as { access_token: string };
  appToken = { value: access_token, expiresAt: jwtExpiry(access_token) };
  return access_token;
}

async function getAppToken(fresh = false): Promise<string> {
  if (
    !fresh &&
    appToken &&
    appToken.expiresAt - Date.now() > APP_TOKEN_MARGIN_MS
  ) {
    return appToken.value;
  }
  appTokenRequest ??= requestAppToken().finally(() => {
    appTokenRequest = null;
  });
  return appTokenRequest;
}

export function jwtExpiry(token: string): number {
  try {
    const payload = token.split(".")[1] ?? "";
    const { exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: number };
    return typeof exp === "number" ? exp * 1000 : 0;
  } catch {
    return 0;
  }
}

function detailMessage(detail: unknown, fallback: string): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const messages = detail
      .map((d) =>
        d && typeof d === "object" && "msg" in d ? String(d.msg) : "",
      )
      .filter(Boolean);
    if (messages.length) return messages.join("; ");
  }
  return fallback;
}

export async function opRequest<T>(
  path: string,
  { method = "GET", body, deviceId, user, clientId }: RequestOptions = {},
): Promise<T> {
  const { origin, conformanceId } = apiConfig();

  async function send(fresh: boolean) {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "X-App-Token": await getAppToken(fresh),
      "x-conformance-id": conformanceId,
    };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (deviceId) headers["x-device-id"] = deviceId;
    if (clientId) headers["x-client-id"] = clientId;
    if (user) {
      headers.Authorization = `Bearer ${user.idToken}`;
      headers["x-client-id"] = user.uid;
    }
    return fetch(`${origin}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  }

  let res = await send(false);
  let data = await readBody(res);
  if (res.status === 401 && isAppTokenRejection(data)) {
    res = await send(true);
    data = await readBody(res);
  }

  if (!res.ok) {
    const detail =
      data && typeof data === "object" && "detail" in data
        ? (data as { detail: unknown }).detail
        : data;
    throw new ApiError({
      message: detailMessage(detail, res.statusText || "Request failed"),
      status: res.status,
      code: `http_${res.status}`,
      detail,
    });
  }
  return data as T;
}

async function readBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function isAppTokenRejection(data: unknown) {
  return (
    !!data &&
    typeof data === "object" &&
    (data as { detail?: unknown }).detail === "Could not validate credentials"
  );
}
