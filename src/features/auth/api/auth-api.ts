import { ApiError } from "@/lib/api/errors";

import { type User, userSchema } from "../model/schema";

type SignInPayload = { email: string; password: string; remember?: boolean };
type SignUpPayload = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  surname: string;
};
type ResetPayload = {
  email: string;
  code: string;
  password: string;
  passwordConfirmation: string;
};
export type Provider = "google" | "apple";
export type ProviderPayload = {
  id_token: string;
  nonce?: string;
  name?: string;
  surname?: string;
};

async function post(path: string, body?: unknown): Promise<unknown> {
  const res = await fetch(path, {
    method: "POST",
    headers:
      body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError({
      message: readError(data),
      status: res.status,
      code: `http_${res.status}`,
      detail: data,
    });
  }
  return data;
}

const readUser = (data: unknown) =>
  userSchema.parse((data as { user: unknown }).user);

export async function signIn(payload: SignInPayload): Promise<User> {
  return readUser(await post("/api/auth/login", payload));
}

export async function signUp(payload: SignUpPayload): Promise<User> {
  return readUser(await post("/api/auth/register", payload));
}

export async function signInWithProvider(
  provider: Provider,
  payload: ProviderPayload,
): Promise<{ user: User; isNewUser: boolean }> {
  const data = await post(`/api/auth/${provider}`, payload);
  return {
    user: readUser(data),
    isNewUser: (data as { isNewUser?: unknown }).isNewUser === true,
  };
}

export async function completeProfile(payload: {
  name: string;
  surname: string;
}): Promise<User> {
  return readUser(await post("/api/account/profile", payload));
}

export async function verifyEmail(code: string): Promise<void> {
  await post("/api/auth/verify-email", { code });
}

export async function resendVerificationEmail(): Promise<void> {
  await post("/api/auth/resend-verification");
}

export async function requestPasswordReset(email: string): Promise<void> {
  await post("/api/auth/forgot-password", { email });
}

export async function resetPassword(payload: ResetPayload): Promise<void> {
  await post("/api/auth/reset-password", payload);
}

export async function getMe(): Promise<User | null> {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  const data: unknown = await res.json().catch(() => null);
  const parsed = userSchema.safeParse((data as { user?: unknown })?.user);
  return parsed.success ? parsed.data : null;
}

export async function getEmailStatus(): Promise<boolean | null> {
  const res = await fetch("/api/auth/email-status").catch(() => null);
  if (!res?.ok) return null;
  const data: unknown = await res.json().catch(() => null);
  const verified = (data as { emailVerified?: unknown } | null)?.emailVerified;
  return typeof verified === "boolean" ? verified : null;
}

export async function logout(): Promise<"done" | "failed" | "unreachable"> {
  try {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    return res.ok ? "done" : "failed";
  } catch {
    return "unreachable";
  }
}

export function needsSignIn(error: unknown): boolean {
  if (!(error instanceof ApiError) || error.status !== 401) return false;
  return (error.detail as { signIn?: unknown } | null)?.signIn === true;
}

export function errorField(error: unknown): string | null {
  if (!(error instanceof ApiError)) return null;
  const detail = error.detail as { field?: unknown } | null;
  return typeof detail?.field === "string" ? detail.field : null;
}

function readError(data: unknown): string {
  if (data && typeof data === "object" && "error" in data) {
    const error = (data as { error: unknown }).error;
    if (typeof error === "string") return error;
  }
  return "Request failed";
}
