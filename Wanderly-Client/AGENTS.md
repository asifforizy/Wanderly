<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderly-client

Next.js 16.4 App Router frontend for the Express API in `../Wanderly-Server` (same git repo). There is no root `package.json`; run commands from each app's directory.

## Commands

- `npm run dev` (port 3000), `npm run build`, `npm start`, `npm run lint`.
- No test or typecheck scripts. Typecheck with `npx next typegen && npx tsc --noEmit`; stale `.next` types otherwise produce false errors.
- Known baseline: `tsc` currently fails on the empty `app/(auth)/forget-password/page.tsx`, and lint has one pre-existing warning in `components/shared/navbar.tsx` — don't attribute these to your change.
- On Windows PowerShell with script execution disabled, use `npm.cmd` / `npx.cmd`.
- Git history uses `client:` / `server:` commit prefixes; the repo has no CI workflows.

## Architecture

- Route groups: `app/(auth)` for auth pages, `app/(public)` for the public site, `app/dashboard` for protected pages. `app/dashboard/layout.tsx` guards on the `accessToken` cookie; there is no middleware.
- Data access is colocated in route-level `_action/` or `_actions/` folders and `service/`. Server actions fetch `${process.env.BACKEND_API_URL}/api/v1/...` directly; there is no Next API proxy.
- Auth: Express issues `accessToken`/`refreshToken`; login and Google server actions copy them into httpOnly cookies on the Next origin. Protected requests forward `Authorization: Bearer <token>` and `Cookie` via `app/dashboard/_action/get-auth-headers.ts`.
- API responses are `{ success, data, message }`. List payloads are either `data: []` or `data: { data, meta }`; normalize both (see `app/(public)/destinations/_action/get-destination.ts`).
- `types/destination.ts` is the client-side contract; server validation lives in `Wanderly-Server/src/modules/destination/destination.validation.ts`.
- `BACKEND_API_URL` is server-only (no `NEXT_PUBLIC_` prefix). Browser config is limited to `NEXT_PUBLIC_GOOGLE_CLIENT_ID`. Both live in `.env`, which is not committed.

## Next.js 16 caching

- `next.config.ts` enables `cacheComponents` and `partialPrefetching`: data is dynamic by default, so use `"use cache"` / `cacheLife` / `cacheTag`, and wrap uncached reads in `<Suspense>` for prerendered routes. Read `node_modules/next/dist/docs/01-app/` before changing caching behavior.
- Profile data uses `cache: "force-cache"`, `revalidate: 86400`, and tag `my-profile` (`service/getMe.ts`). Invalidate it with `updateTag("my-profile")` (`service/refresh-profile.ts`) and `revalidateTag("my-profile", "max")` on logout.

## UI conventions

- Tailwind v4 is configured CSS-first in `app/globals.css`; there is no `tailwind.config`. Turbopack uses `@tailwindcss/turbopack` via `next.config.ts`.
- shadcn components use Base UI (`@base-ui/react`), not Radix. `Button` uses Base UI props: `render={<Link ... />}` with `nativeButton={false}`, not `asChild`.
- Import `cn` from `@/lib/utils`; it re-exports the `cn` package (a clsx + tailwind-merge replacement).
- Folder naming is inconsistent (`_action` vs `_actions`), and the route `/reset-passwordd` is intentionally misspelled. Match existing paths instead of renaming them.

## Related server (`../Wanderly-Server`)

- `npm run dev` runs `tsx watch src/server.ts`; it connects PostgreSQL and Redis before listening.
- Prisma 7 uses `prisma7.config.ts`, a multi-file schema in `prisma/schema/`, and generates into `prisma/generated/prisma` (gitignored). Run `npx prisma generate` after schema edits.
- Routes: `/api/v1/auth/*` and `/api/v1/destinations/*`; bearer/cookie auth middleware is `src/middleware/checkAuth.ts`. Server `APP_URL` controls CORS and must match the browser origin if the API is called directly from the browser.
