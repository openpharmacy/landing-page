# Architecture

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) ·
Tailwind v4 · react-hook-form + zod · Zustand · Vitest + Testing Library.

## Request flow

```
browser ──► /api/* route (src/app/api) ──► opRequest (src/lib/api/op/client.ts) ──► Open Pharmacy API
   ▲                    │
   └── JSON, cookies ◄──┘
```

Pages are Server Components that read the API on the server through the same
modules. Client components call the site's routes with `fetch`
(`features/<area>/api/*-api.ts`). The browser never calls the API, never sees
the app token, and has no access to the user's tokens (all cookies are
httpOnly).

`opRequest` adds the headers the API expects:

- `X-App-Token`: the app token from `POST /token`. It is cached per server
  instance, shared by concurrent requests, renewed 5 minutes before it
  expires, and requested again once if the API refuses it.
- `x-conformance-id`, `x-device-id`.
- `Authorization: Bearer <ID token>` and `x-client-id: <uid>` for user calls.

Each call has a 30 s timeout. An API error becomes an `ApiError` with the
API's own message. `respond.ts` turns it into the route's answer: 4xx keeps
the API's text, anything else is a 502 with a generic message.
`isSessionGone` decides when only signing in again helps (expired, invalid
or revoked ID token, unknown device). The route then clears the cookies and
the page sends the user to sign in.

## Session

| Cookie         | Holds                                      | Lifetime                                      |
| -------------- | ------------------------------------------ | --------------------------------------------- |
| `op_session`   | ID token                                   | 30 days, or the browser session (Remember me) |
| `op_refresh`   | refresh token                              | same                                          |
| `op_uid`       | user id                                    | same                                          |
| `op_user`      | name, email, email verified                | same                                          |
| `op_remember`  | `1`, or `0` when Remember me was unticked  | same                                          |
| `op_last_user` | name and email, for the quick login        | 400 days, or the browser session              |
| `op_device`    | device id, created on the first visit      | 400 days                                      |
| `op_mysl`      | MySL access token as `uid:expiresAt:token` | the token's own                               |
| `op_sync`      | when the last background sync started      | 10 minutes                                    |
| `op_archived`  | the user's archived scripts as `uid:id.id` | 400 days                                      |

All are httpOnly, `SameSite=Lax`, and `Secure` in production. Sign-out
clears all but `op_device` and `op_last_user`; deleting or deactivating the
account also clears `op_last_user`. Sign-up, Google/Apple and a sign-in on
the phone layout (it has no Remember me box) keep 30 days.

`src/proxy.ts` runs before every page and route. It:

- refuses POST/PUT/DELETE to `/api/*` from other sites (`Sec-Fetch-Site`, `Origin`);
- creates `op_device`;
- renews the ID token with `/identity/v1/refresh-token` when less than 2
  minutes are left, so the same request already uses the new token, with the
  lifetime chosen at sign-in. If the API refuses the refresh, it clears the
  session;
- sends guests away from `/account/*`.

## Scripts and the ASL

`src/lib/api/op/scripts.ts` reads `/user/v1/escripts/` once per request and
maps it for the pages (`features/scripts/model`). A script page is opened by
an opaque id (the first 16 hex characters of the SHA-256 of the token), so
tokens never appear in URLs. The QR code is drawn on the server as SVG.

ASL calls need a MySL token from `/government/v1/token-exchange`. It is kept
in `op_mysl` until 2 minutes before it expires. If MySL refuses it, a new one
is fetched once.

Hiding or showing an ASL script PUTs the visibility, then pulls the ASL again
so the list shows the API's own state.

The API has no archive, so archived scripts are kept per browser in
`op_archived` (opaque ids only). They leave the main list and show under the
"Archived" filter; deleting a script also takes it out of the archive.

**Background sync.** Opening My Scripts or Home posts `/api/scripts/sync`,
which pulls the ASL and then calls `/user/v1/refresh/`. Only when the list
changed does the page shown by then render again, even if the user has moved
on. The `op_sync` cookie limits this to once every 10 minutes per user. A
reload or a second tab that arrives while a sync runs waits for it.

## Version check

After the page loads, the browser asks `/api/app/version`, which sends
`OP_APP_VERSION` to `/user/v1/version/verification`. If the API answers 426,
every page is covered by "Update required" until it is reloaded. Any other
failure counts as supported. Answers are cached for 10 minutes (60 s after a
failure).

## Mock mode

With `NEXT_PUBLIC_API_MOCKING=enabled`, every module in `src/lib/api/op` takes
its mock branch (`mock-identity.ts`, `mock-scripts.ts`). It answers in the
API's own shapes, as the design's demo user, with no network calls. It exists
to compare the screens with the design and to work without the API. It is
never for production.

## Hidden screens

`showHiddenScreens()` (`src/lib/features.ts`) is true when `HIDDEN_SCREENS=enabled`
or the browser has the `op_hidden_screens` cookie from
`/api/preview?hidden=1`. Hidden pages answer 404 otherwise, and their links
are not rendered.

Med Scheduler and Compliance keep their data in the browser's localStorage
(Zustand stores in `features/scheduler/model` and `features/compliance/model`)
until the API has endpoints for them. Each store saves under
`<name>:<key>`, the key an opaque hash of the user id
(`src/lib/user-storage.ts`), so accounts that share a browser never see each
other's data. The root layout gives the client the signed-in user's key
(`UserKeyProvider`), so a store loads at once; it still asks `/api/auth/me`
and switches if another tab signed in as someone else. After a sign-in or
sign-out in this tab, until the next server render, a store loads nothing
until `/api/auth/me` answers. The data does not leave the browser: another
browser or device starts empty.

The Compliance reports, and the Compliance card on Home, are computed in the
browser from those stores (`features/compliance/model/report.ts`). Only the
refill cards come from the API.

## Folders

| Path                  | What                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `src/app/(marketing)` | landing page and the signed-in Home                                                             |
| `src/app/(auth)`      | sign-in, sign-up, forgot password, and the hidden PIN, biometric and splash screens             |
| `src/app/(store)`     | My Scripts, Account, Help Center, and the hidden Med Scheduler and Compliance                   |
| `src/app/api`         | the site's server routes: `auth`, `account`, `scripts`, `app`, `preview`                        |
| `src/lib/api/op`      | API client, one module per area, mock answers                                                   |
| `src/lib/auth`        | session cookies                                                                                 |
| `src/features/<area>` | components, `api` (calls to the site's routes), `model` (types, zod, mapping), `server` helpers |
| `src/components`      | shared UI (`ui`) and layout (header, footer, drawer)                                            |
| `src/config`          | environment variables, checked with zod                                                         |

## Conventions

- Server data stays on the server; a change re-renders the page with
  `router.refresh()`. Zustand only holds UI state and the local-only stores
  above.
- A click shows a loading screen at once: Home has its own `loading.tsx` and
  the store group a generic one. Pages seen in the last 30 s show again from
  the client cache (`staleTimes` in `next.config.ts`); `router.refresh()`
  empties it, so every change, sign-in, sign-up and sign-out calls it.
- Every value from the design lives in `src/app/globals.css`.
- Tests sit next to the code (`*.test.ts(x)`).
- Conventional Commits in English (commitlint).
