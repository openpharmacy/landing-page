# Open Pharmacy Web — Architecture

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) ·
Tailwind v4 + shadcn/ui · TanStack Query + Axios + Zustand · MSW · Vitest + RTL.

## Folder map (`src/`)

| Path                 | Purpose                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `app/`               | App Router routes (thin). Route groups: `(marketing)` logged-out, `(auth)`, `(shop)` authenticated.    |
| `app/api/`           | Route handlers = the edge to the outside world (auth session cookie, webhook receivers, optional BFF). |
| `components/ui/`     | shadcn primitives.                                                                                     |
| `components/layout/` | Header, Footer, nav, shells.                                                                           |
| `features/<name>/`   | Vertical slices — each owns `api/`, `model/` (types + zod), `stores/`, `components/`, `hooks/`.        |
| `lib/api/`           | Axios client, `gateway.ts` (base-URL resolution), `endpoints.ts`, `errors.ts` (normalization).         |
| `lib/query/`         | Query client factory + query-key registry.                                                             |
| `lib/realtime/`      | WebSocket / socket seam (future, lazy + client-only).                                                  |
| `lib/integrations/`  | Third-party adapters behind interfaces (future).                                                       |
| `config/`            | zod-validated env + app constants.                                                                     |
| `mocks/`             | MSW handlers + worker for endpoints the backend lacks.                                                 |
| `providers/`         | Client providers (TanStack Query, MSW).                                                                |

## Conventions

- **Server state** → TanStack Query. **UI/ephemeral state** → Zustand. Never mirror server data into Zustand.
- Backend paths live in `lib/api/endpoints.ts`; query keys in `lib/query/keys.ts`.
- Errors are normalized to `ApiError { status, code, message, detail }` by the axios response interceptor.
- **CORS:** the browser calls the same-origin proxy `/api/backend/*` (rewritten to the backend in `next.config.ts`); the server calls `BACKEND_ORIGIN` directly. Swap to a real gateway only in `lib/api/gateway.ts`.
- Design tokens: [`docs/design.md`](./design.md) (100% from Figma). Missing endpoints + status: [`docs/api-gaps.md`](./api-gaps.md).
- Commits: **Conventional Commits, written in English** (enforced by commitlint).

## Future surfaces (where each plugs in)

REST → `lib/api` + `features/*/api`. Gateway → `lib/api/gateway.ts`.
Webhooks → `app/api/webhooks/[provider]`. Sockets → `lib/realtime`.
Third-party → `lib/integrations`.
