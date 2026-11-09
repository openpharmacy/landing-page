import { needsSignIn } from "@/features/auth/api/auth-api";
import { ApiError } from "@/lib/api/errors";

const UNAVAILABLE = "The service is not available right now. Please try again.";

async function post(path: string, body?: unknown): Promise<void> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: "POST",
      headers:
        body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({ message: UNAVAILABLE, status: 0, code: "network" });
  }
  if (res.ok) return;
  const data: unknown = await res.json().catch(() => null);
  const error =
    data && typeof data === "object" && "error" in data
      ? (data as { error: unknown }).error
      : null;
  throw new ApiError({
    message: typeof error === "string" ? error : UNAVAILABLE,
    status: res.status,
    code: `http_${res.status}`,
    detail: data,
  });
}

export function updateProfile(input: { name: string; surname: string }) {
  return post("/api/account/profile", input);
}

export function changeEmail(input: { email: string; password: string }) {
  return post("/api/account/email", input);
}

export function changePassword(input: {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}) {
  return post("/api/account/password", input);
}

export function deleteAccount() {
  return post("/api/account/delete");
}

export function deactivateAccount() {
  return post("/api/account/deactivate");
}

export function isSignedOut(error: unknown) {
  return needsSignIn(error);
}

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : UNAVAILABLE;
}
