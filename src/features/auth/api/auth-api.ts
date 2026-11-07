import { apiClient } from "@/lib/api/axios";
import { endpoints } from "@/lib/api/endpoints";

import {
  authSessionSchema,
  userSchema,
  type AuthSession,
  type SignInInput,
  type User,
} from "../model/schema";

export async function signIn(input: SignInInput): Promise<AuthSession> {
  const { data } = await apiClient.post(endpoints.auth.signin, input);
  return authSessionSchema.parse(data);
}

export async function signUp(payload: {
  email: string;
  password: string;
  name?: string;
}): Promise<AuthSession> {
  const { data } = await apiClient.post(endpoints.auth.signup, payload);
  return authSessionSchema.parse(data);
}

export async function signInWithGoogle(idToken: string): Promise<AuthSession> {
  const { data } = await apiClient.post(endpoints.auth.google, {
    id_token: idToken,
  });
  return authSessionSchema.parse(data);
}

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get(endpoints.auth.me);
  return userSchema.parse(data);
}
