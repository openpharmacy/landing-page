const ORIGIN = "http://next.invalid";

export function safeNextPath(next: string | null | undefined): string | null {
  if (!next || !next.startsWith("/")) return null;
  try {
    const url = new URL(next, ORIGIN);
    return url.origin === ORIGIN ? url.pathname + url.search + url.hash : null;
  } catch {
    return null;
  }
}

export function withNext(path: string, next: string | null): string {
  if (!next) return path;
  return `${path}${path.includes("?") ? "&" : "?"}next=${encodeURIComponent(next)}`;
}

export const LAST_USER_SIGN_IN = "/sign-in/email?account=last";
