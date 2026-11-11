import "server-only";

import { ApiError } from "@/lib/api/errors";

import type { AuthResponse, RefreshResponse, UserDetails } from "./identity";

export const DEMO_EMAIL = "john.smith@gmail.com";

const demo = (overrides: Partial<AuthResponse> = {}): AuthResponse => ({
  uid: "demo",
  idToken: "demo",
  refreshToken: "demo",
  email_verified: true,
  email: DEMO_EMAIL,
  name: "John",
  surname: "Smith",
  ...overrides,
});

const invalidCredentials = () =>
  new ApiError({
    message: "Invalid Credentials. Please try again.",
    status: 400,
    code: "http_400",
  });

export async function signup(input: {
  name: string;
  surname: string;
  email: string;
}): Promise<AuthResponse> {
  return demo({
    name: input.name,
    surname: input.surname,
    email: input.email,
    email_verified: false,
  });
}

export async function signin(input: {
  password: string;
}): Promise<AuthResponse> {
  if (input.password.length < 7) throw invalidCredentials();
  return demo();
}

export async function thirdPartyLogin(): Promise<AuthResponse> {
  return demo({ is_new_user: false });
}

export async function refreshToken(): Promise<RefreshResponse> {
  return { userId: "demo", idToken: "demo", refreshToken: "demo" };
}

export async function verifyCode(code: string): Promise<null> {
  if (code === "0000") {
    throw new ApiError({
      message: "Verification Code is invalid or it has expired",
      status: 400,
      code: "http_400",
    });
  }
  return null;
}

export async function userDetails(): Promise<UserDetails> {
  return { first_name: "John", last_name: "Smith", email: DEMO_EMAIL };
}

export async function changePassword(current: string): Promise<AuthResponse> {
  if (current.length < 7) throw invalidCredentials();
  return demo();
}

export async function changeEmail(email: string): Promise<AuthResponse> {
  return demo({ email, email_verified: false });
}

export const DEMO_USER = { id: "demo", email: DEMO_EMAIL, name: "John Smith" };
