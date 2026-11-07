# API Gaps — Figma flows vs. backend (FastAPI)

The backend (`../backend`) is incomplete. This table tracks which UI flows have a
real endpoint, which are mocked (MSW), and which still need backend work. Update
the **Status** as endpoints ship: `live` → real, `mocked` → MSW + typed contract,
`missing` → no contract yet.

**Gap-handling pattern:** define a zod contract in `features/*/model`, expose it
via `features/*/api` exactly as if real, back it with an MSW handler in
`src/mocks/handlers`. When the backend ships, delete the handler — no call-site change.

| Figma flow                               | Needed endpoint                     | Backend status                                | FE handling                                              |
| ---------------------------------------- | ----------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| Email sign up / sign in                  | `POST /auth/signup`, `/auth/signin` | **live**                                      | real (via proxy)                                         |
| Current user                             | `GET /auth/me`                      | **live**                                      | real; hydrates the session                               |
| Google sign-in                           | `POST /auth/google`                 | **live** (503 if server unconfigured)         | real; hide/disable button on 503                         |
| Apple sign-in                            | `POST /auth/apple`                  | **missing**                                   | button disabled / "coming soon"                          |
| Forgot password                          | `POST /auth/forgot-password`        | **missing**                                   | UI + MSW mock                                            |
| Email verification                       | `POST /auth/verify-email`           | **missing**                                   | UI + MSW (later)                                         |
| OTP / numeric pad                        | `POST /auth/otp`                    | **missing**                                   | UI only                                                  |
| **Logged-out product browse** (Landing)  | public products (no JWT)            | **missing** — `/api/v1/products` requires JWT | MSW `*/public/products`; **recommend a public endpoint** |
| Product search / detail / barcode / scid | `GET /api/v1/products*`             | **live** (JWT)                                | real, authenticated                                      |
| Pharmacies list / detail / inventory     | `GET /api/v1/pharmacies*`           | **live** (JWT)                                | real, authenticated                                      |
| Cart                                     | _none_                              | **missing**                                   | greenfield contract + MSW                                |
| Checkout / Orders / "Order confirmed"    | _none_                              | **missing**                                   | greenfield contract + MSW                                |
| Scripts / ASL prescription upload        | _none_                              | **missing** (only a Minfos diagnostic proxy)  | UI + MSW; flag clinical/legal handling                   |
| Account update / addresses               | `PATCH /auth/me`, addresses         | **missing** (only `GET /auth/me`)             | read-only profile for now                                |
| Notifications (header bell)              | _none_                              | **missing**                                   | mock; future websocket (`lib/realtime`)                  |

## Infrastructure / cross-cutting gaps

- **CORS — critical.** The backend has **no `CORSMiddleware`**, so browsers can't
  call it directly. Dev is covered by the same-origin rewrite proxy
  (`/api/backend/*` in `next.config.ts`). **Production must add CORS** to the Fly
  app (allow the web origin) or route all browser traffic through our route handlers.
- **No refresh token.** JWT is HS256, 24h hard expiry, no rotation. On 401 the FE
  clears the session and redirects to sign-in (no silent refresh possible).
- **Signup pharmacy picker — chicken-and-egg.** `signup` accepts a `pharmacy_id`
  validated against `pharmacies`, but `GET /api/v1/pharmacies` is JWT-gated, so a
  pre-account picker can't load the list. Needs a public pharmacies endpoint or
  dropping the picker from signup.
- **Pagination has no total count.** `GET /api/v1/products` returns `count` = the
  length of the **current page**, not the grand total — so "load more" works, but
  numbered pagination cannot show total pages.
