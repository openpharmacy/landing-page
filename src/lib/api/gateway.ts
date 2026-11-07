import { env } from "@/config/env";

/**
 * Resolve the API base URL per runtime.
 *
 * - Browser: the same-origin proxy (`NEXT_PUBLIC_API_BASE_URL` = `/api/backend`),
 *   which `next.config.ts` rewrites to the backend — avoids CORS.
 * - Server (RSC / route handlers): call the backend origin directly; CORS does
 *   not apply off the browser.
 *
 * This is the single seam to swap in a real API gateway later.
 */
export function resolveApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return process.env.BACKEND_ORIGIN ?? "http://localhost:8000";
  }
  return env.NEXT_PUBLIC_API_BASE_URL;
}
