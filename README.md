# Open Pharmacy — web portal

The web version of the Open Pharmacy app: sign up and sign in, eScripts and
the Active Script List (ASL), and the account pages. It runs on the Open
Pharmacy API.

The browser only talks to this site. Every API call goes through the site's
own server routes (`src/app/api/*`). The app credentials and the user's tokens
stay on the server, in httpOnly cookies.

## Run it locally

Needs Node 22 (`.nvmrc`) and pnpm 10.

```bash
pnpm install
cp .env.example .env.local    # then fill in the OP_* values
pnpm dev                      # http://localhost:3000
```

## Environment variables

| Variable                             | Needed | What                                                                                                                                               |
| ------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_MOCKING`            | yes    | `disabled` uses the API. `enabled` answers every call with sample data as the design's demo user, with no API calls.                               |
| `OP_API_ORIGIN`                      | yes    | The API's base URL, e.g. the test API on Cloud Run.                                                                                                |
| `OP_APP_USERNAME`, `OP_APP_PASSWORD` | yes    | The app account for `POST /token`. Server-only.                                                                                                    |
| `OP_CONFORMANCE_ID`                  | no     | Sent as `x-conformance-id`. Default `OpenpharmacyApplication\|1.0`.                                                                                |
| `OP_APP_VERSION`                     | no     | Sent to `/user/v1/version/verification`. Default `1.1.0`. When the API answers that it is no longer supported, every page shows "Update required". |
| `HIDDEN_SCREENS`                     | no     | `enabled` shows the screens that are built but hidden (see below). Leave it unset in production.                                                   |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID`       | no     | Google OAuth web client id. Without it the Google button says sign-in is not available yet.                                                        |
| `NEXT_PUBLIC_APPLE_SERVICES_ID`      | no     | Apple Services ID. Same as above for Apple.                                                                                                        |

`NEXT_PUBLIC_*` values are built into the pages, so set them before
`pnpm build` and rebuild after a change. In `.env` files, a `$` in a value
must be written `\$` (Next expands `$NAME`), and a value with `#` must be
quoted.

## Commands

| Command                     | What                                                                         |
| --------------------------- | ---------------------------------------------------------------------------- |
| `pnpm dev`                  | Dev server.                                                                  |
| `pnpm build` / `pnpm start` | Production build and server. `pnpm start` listens on `$PORT` (default 3000). |
| `pnpm lint`                 | ESLint.                                                                      |
| `pnpm typecheck`            | `tsc --noEmit`.                                                              |
| `pnpm test`                 | Unit and component tests (Vitest).                                           |

A commit runs ESLint, Prettier and the type check (husky). Commit messages
follow Conventional Commits.

## Deploy

Any Node host works (Railway, Render, Vercel, a VM):

- Build command `pnpm install && pnpm build`, start command `pnpm start`.
- Set the variables above in the host before the first build.
- Serve it over HTTPS: the session cookies are `Secure` in production.
- Host it near Sydney: the API runs in `australia-southeast1`. `vercel.json`
  pins Vercel functions to `syd1`; other hosts ignore it.

## Google and Apple sign-in

- **Google:** create an OAuth client of type "Web application" in the API's
  Firebase / Google Cloud project. Add the site's origin (and
  `http://localhost:3000` for local tests) to "Authorised JavaScript origins".
  Set its id as `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
- **Apple:** create a Services ID with Sign in with Apple enabled. Add the
  site's domain and `https://<domain>/sign-in` as a Return URL. Set it as
  `NEXT_PUBLIC_APPLE_SERVICES_ID`. Apple needs a real domain over HTTPS, not
  localhost.

The site sends the provider's ID token to `/identity/v1/third_party_auth_login`.

## Hidden screens

Med Scheduler, Compliance, PIN, biometrics, the splash screen and quick login
are built but hidden for now. To see them in one browser, open
`/api/preview?hidden=1` on the site first. `/api/preview?hidden=0` hides them
again. Their data stays in that browser until the API has endpoints for them.

## Where things are

```
src/app/            routes; (marketing) landing and Home, (auth) sign-in and
                    sign-up, (store) scripts, account, help and the hidden screens
src/app/api/        the site's server routes, the only way to the API
src/lib/api/op/     the API client, one module per area, and the mock-mode answers
src/lib/auth/       session cookies
src/proxy.ts        renews the ID token, guards /account, refuses cross-site POSTs
src/features/       one folder per area: components, model, server helpers
src/components/     shared UI and layout
docs/               architecture and API coverage
```

More detail: [docs/architecture.md](docs/architecture.md) and
[docs/api.md](docs/api.md).
