import "server-only";

import { isMockingEnabled } from "@/config/env";

import { opRequest, type UserAuth } from "./client";
import * as mock from "./mock-identity";

export type AuthResponse = {
  uid: string;
  idToken: string;
  refreshToken: string;
  email_verified: boolean;
  email: string;
  name: string;
  surname: string;
  registration_date?: string;
  is_new_user?: boolean;
};

export type TokenResponse = {
  uid: string;
  idToken: string;
  refreshToken: string;
  email_verified: boolean;
};

export type RefreshResponse = {
  userId: string;
  idToken: string;
  refreshToken: string;
};

export type UserDetails = {
  first_name: string;
  last_name: string;
  email: string;
};

type Message = { detail?: string } | string | null;

const post = <T>(
  path: string,
  body: unknown,
  extra: { deviceId?: string; user?: UserAuth } = {},
) => opRequest<T>(path, { method: "POST", body, ...extra });

export function signup(
  input: {
    name: string;
    surname: string;
    email: string;
    password: string;
    password_confirmation: string;
  },
  deviceId: string,
): Promise<AuthResponse> {
  if (isMockingEnabled) return mock.signup(input);
  return post("/identity/v1/signup", input, { deviceId });
}

export function signin(
  input: { email: string; password: string },
  deviceId: string,
): Promise<AuthResponse> {
  if (isMockingEnabled) return mock.signin(input);
  return post("/identity/v1/signin", input, { deviceId });
}

export function thirdPartyLogin(
  input: {
    provider: "google" | "apple";
    id_token: string;
    nonce?: string;
    name?: string;
    surname?: string;
  },
  deviceId: string,
): Promise<AuthResponse> {
  if (isMockingEnabled) return mock.thirdPartyLogin();
  return post("/identity/v1/third_party_auth_login", input, { deviceId });
}

export function refreshToken(
  refresh_token: string,
  uid: string,
  deviceId: string,
): Promise<RefreshResponse> {
  if (isMockingEnabled) return mock.refreshToken();
  return opRequest("/identity/v1/refresh-token", {
    method: "POST",
    body: { refresh_token },
    deviceId,
    clientId: uid,
  });
}

export function signout(user: UserAuth, deviceId: string): Promise<Message> {
  if (isMockingEnabled) return Promise.resolve(null);
  return post("/identity/v1/signout", undefined, { user, deviceId });
}

export function sendVerificationEmail(email: string): Promise<Message> {
  if (isMockingEnabled) return Promise.resolve(null);
  return post("/identity/v1/send-verification-email", { email });
}

export function verifyEmail(
  email: string,
  verification_code: string,
): Promise<Message> {
  if (isMockingEnabled) return mock.verifyCode(verification_code);
  return post("/identity/v1/verify-email", { email, verification_code });
}

export function checkEmailVerification(
  user: UserAuth,
  deviceId: string,
): Promise<{ email_verified: boolean }> {
  if (isMockingEnabled) return Promise.resolve({ email_verified: true });
  return post("/identity/v1/check-email-verification", undefined, {
    user,
    deviceId,
  });
}

export function sendPasswordResetEmail(email: string): Promise<Message> {
  if (isMockingEnabled) return Promise.resolve(null);
  return post("/identity/v1/send-password-reset-email", { email });
}

export function resetPassword(input: {
  email: string;
  verification_code: string;
  password: string;
  password_confirmation: string;
}): Promise<Message> {
  if (isMockingEnabled) return mock.verifyCode(input.verification_code);
  return post("/identity/v1/reset-password", input);
}

export function getUserDetails(
  user: UserAuth,
  deviceId: string,
): Promise<UserDetails> {
  if (isMockingEnabled) return mock.userDetails();
  return opRequest("/user/v1/get_user_details", { user, deviceId });
}

export function changeUserDetails(
  input: { name: string; surname: string },
  user: UserAuth,
  deviceId: string,
): Promise<Message> {
  if (isMockingEnabled) return Promise.resolve(null);
  return post("/identity/v1/change_user_details", input, { user, deviceId });
}

export function changePassword(
  input: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  },
  user: UserAuth,
  deviceId: string,
): Promise<TokenResponse> {
  if (isMockingEnabled) return mock.changePassword(input.current_password);
  return post("/identity/v1/change-password", input, { user, deviceId });
}

export function changeEmail(
  input: { current_email: string; new_email: string; password: string },
  user: UserAuth,
  deviceId: string,
): Promise<TokenResponse> {
  if (isMockingEnabled) return mock.changeEmail(input.new_email);
  return post("/identity/v1/change-email", input, { user, deviceId });
}

export function deleteAccount(
  user: UserAuth,
  deviceId: string,
): Promise<Message> {
  if (isMockingEnabled) return Promise.resolve(null);
  return post("/identity/v1/delete_account", undefined, { user, deviceId });
}

export function deactivateAccount(
  user: UserAuth,
  deviceId: string,
): Promise<Message> {
  if (isMockingEnabled) return Promise.resolve(null);
  return post("/identity/v1/deactivate_account", undefined, {
    user,
    deviceId,
  });
}
