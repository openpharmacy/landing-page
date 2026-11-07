import { http, HttpResponse } from "msw";

/**
 * Auth endpoints the backend does NOT implement yet — mocked so the UI is
 * buildable today. See `docs/api-gaps.md`. The `*` prefix matches regardless
 * of the `/api/backend` proxy base.
 */
export const authHandlers = [
  // POST /auth/forgot-password — no real endpoint exists.
  http.post("*/auth/forgot-password", async () => {
    return HttpResponse.json({
      message: "If that email exists, a reset link has been sent.",
    });
  }),
];
