import { http, HttpResponse } from "msw";

/**
 * Logged-out product browsing for the Landing page. The real
 * `GET /api/v1/products` requires a JWT, so anonymous browsing has no backing
 * endpoint yet — this mock fills the gap. See `docs/api-gaps.md`. Fleshed out
 * with realistic catalog data in Pass 2.
 */
export const productHandlers = [
  http.get("*/public/products", () => {
    return HttpResponse.json({ count: 0, results: [] });
  }),
];
