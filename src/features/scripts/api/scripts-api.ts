import { ApiError } from "@/lib/api/errors";

import type { AslSetup } from "../model/validation";

const UNAVAILABLE = "The service is not available right now. Please try again.";

async function scriptsRequest<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api/scripts/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError({ message: UNAVAILABLE, status: 0, code: "network" });
  }
  const data: unknown = await res.json().catch(() => null);
  const error =
    data && typeof data === "object" && "error" in data
      ? String((data as { error: unknown }).error)
      : UNAVAILABLE;

  if (res.status === 401 && (data as { signIn?: boolean } | null)?.signIn) {
    const here = `${window.location.pathname}${window.location.search}`;
    window.location.assign(`/sign-in?next=${encodeURIComponent(here)}`);
  }
  if (!res.ok) {
    throw new ApiError({
      message: error,
      status: res.status,
      code: `http_${res.status}`,
    });
  }
  return data as T;
}

export const errorText = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const addScript = (token: string) => scriptsRequest("add", { token });

export const connectAsl = (input: AslSetup) =>
  scriptsRequest<{ activeScripts: number }>("connect-asl", input);

export const setScriptHidden = (id: string, hidden: boolean) =>
  scriptsRequest("hide", { id, hidden });

export const setScriptArchived = (id: string, archived: boolean) =>
  scriptsRequest("archive", { id, archived });

export const deleteScript = (id: string) => scriptsRequest("delete", { id });

export const saveNotes = (id: string, notes: string) =>
  scriptsRequest("note", { id, notes });
