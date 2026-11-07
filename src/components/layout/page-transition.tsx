import type { ReactNode } from "react";

/**
 * Fades a route's content in on navigation. Rendered from `template.tsx`, which
 * remounts on every navigation so the fade replays.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="animate-page-fade">{children}</div>;
}
