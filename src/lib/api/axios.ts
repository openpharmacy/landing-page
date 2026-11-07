import axios, { type InternalAxiosRequestConfig } from "axios";

import { toApiError } from "./errors";
import { resolveApiBaseUrl } from "./gateway";

export const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 30_000,
  headers: { "Accept-Language": "en" },
});

// In-memory bearer token (browser). Set by the auth store after sign-in; it
// mirrors the httpOnly session cookie for direct browser -> API calls.
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
);
