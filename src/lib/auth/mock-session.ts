/**
 * Mock session — simulates a real API session until the backend is wired.
 * The final session lives in a (non-httpOnly) cookie so the server can read it
 * and render the right `/` (landing vs. dashboard) without a hydration flash.
 * Pending sign-up data is carried across the multi-step flow in localStorage.
 */
export const MOCK_SESSION_COOKIE = "op_mock_session";
export const ASL_CONNECTED_COOKIE = "op_asl_connected";
export const SCRIPTS_ADDED_COOKIE = "op_scripts_added";
const PENDING_SIGNUP_KEY = "op_pending_signup";
const ONE_WEEK = 60 * 60 * 24 * 7;

export type SessionUser = {
  firstName: string;
  lastName: string;
  email?: string;
};

/** Save the session cookie (client). On the server this is a no-op. */
export function setMockSession(user: SessionUser) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(user));
  document.cookie = `${MOCK_SESSION_COOKIE}=${value}; path=/; max-age=${ONE_WEEK}; samesite=lax`;
}

export function clearMockSession() {
  if (typeof document === "undefined") return;
  document.cookie = `${MOCK_SESSION_COOKIE}=; path=/; max-age=0`;
}

/** Full sign-out: clear the session, the ASL/scripts flags and the cart. */
export function signOut() {
  if (typeof document === "undefined") return;
  for (const name of [
    MOCK_SESSION_COOKIE,
    ASL_CONNECTED_COOKIE,
    SCRIPTS_ADDED_COOKIE,
  ]) {
    document.cookie = `${name}=; path=/; max-age=0`;
  }
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("op_cart");
  }
}

/** Mark the mock ASL as connected so My Scripts shows the synced (grouped) view. */
export function setAslConnected() {
  if (typeof document === "undefined") return;
  document.cookie = `${ASL_CONNECTED_COOKIE}=1; path=/; max-age=${ONE_WEEK}; samesite=lax`;
}

/** Mark that the user has added a script so My Scripts shows the list (not the chooser). */
export function setScriptsAdded() {
  if (typeof document === "undefined") return;
  document.cookie = `${SCRIPTS_ADDED_COOKIE}=1; path=/; max-age=${ONE_WEEK}; samesite=lax`;
}

/** Stash the name/email entered earlier so the PIN step can finalise sign-up. */
export function setPendingSignup(user: SessionUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify(user));
}

/** Read and clear the pending sign-up data. */
export function takePendingSignup(): SessionUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PENDING_SIGNUP_KEY);
  window.localStorage.removeItem(PENDING_SIGNUP_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function initials(user: SessionUser): string {
  return `${user.firstName.at(0) ?? ""}${user.lastName.at(0) ?? ""}`.toUpperCase();
}
