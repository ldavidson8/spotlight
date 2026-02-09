## Purpose

Short, focused instructions for AI coding agents working in the Movie Spotlight SvelteKit app.

## Quick checklist for common tasks

- Dev server: `npm run dev` (uses Vite with `--host`).
- Build: `npm run build`; preview: `npm run preview`.
- Typecheck: `npm run check` (runs `svelte-check` using the repo tsconfig).
- Unit tests: `npm run test:unit` (Vitest). End-to-end: `npm run test:e2e` (Playwright).
- Format/lint: `npm run format` and `npm run lint`.

## High-level architecture notes

- SvelteKit app (see `svelte.config.js`) using `@sveltejs/adapter-node` by default.
- Vite configuration and test projects are in `vite.config.ts` (two Vitest projects: `client` - browser via Playwright; `server` - node).
- Routes follow SvelteKit +file conventions under `src/routes` (examples: `routes/movie/[id]/+page.svelte`, `routes/genres/+page.svelte`).
- UI primitives are under `src/lib/components/ui/*` and exported via `index.ts` barrels; top-level components like `Header.svelte` and `Footer.svelte` live at `src/lib/components` and are used in `src/routes/+layout.svelte`.

## Important conventions & patterns (concrete examples)

- Server queries: use `$app/server` `query()` utilities. Example: `src/routes/data.remote.ts` exports `getPopularMovies`, `getMovieById`.
- Validation: zod (and sometimes `valibot`) is used to define and parse API responses. See `src/routes/data.remote.ts` for `MoviesResponseSchema` and `MovieDetailsSchema`.
- Environment: server code reads secrets from SvelteKit env (example: `env.TMDB_BEARER_TOKEN` in `data.remote.ts`). Ensure this bearer token is present in the environment when running server code or tests that hit TMDB.
- Fetching: remote TMDB calls set an `Authorization: Bearer ${env.TMDB_BEARER_TOKEN}` header and expect JSON; errors surface via `error(status, message)` from `@sveltejs/kit`.
- Client/server guards: use `browser` from `$app/environment` before touching `document`/`localStorage` (see `src/lib/stores/theme.svelte.ts`).
- Styling helper: `src/lib/utils.ts` exposes `cn()` which composes `clsx` + `tailwind-merge` — use it for Tailwind class composition.

## Testing quirks to know

- Vitest has two projects configured in `vite.config.ts`: the browser tests include `.svelte.test|spec` in their glob and rely on `vitest-setup-client.ts`.
- Playwright is used for full E2E; see `playwright.config.ts` at repo root. Running `npm run test` will run unit tests then e2e tests.

## Build / CI hints

- `prepare` runs `svelte-kit sync` — keep that in mind for automated environments.
- `svelte-check` relies on `tsconfig.json` present in repo root.

## Files you will look at first

- `package.json` — npm scripts and deps.
- `svelte.config.js` — adapter and experimental flags (`remoteFunctions`, compiler async).
- `vite.config.ts` — Vite plugins, Vitest projects and include/exclude patterns.
- `src/routes/data.remote.ts` — canonical example of server-side fetching, validation, and error handling.
- `src/lib/stores/theme.svelte.ts` — client-only store patterns using `browser`.
- `src/lib/utils.ts` — helper patterns (`cn`, class merging).

## When changing server fetches or schema

- Update the Zod/valibot schemas in `src/routes/data.remote.ts` and adjust tests under `src/**` accordingly.
- If you add new env keys, add them to the environment used by CI/E2E runners; tests assume `TMDB_BEARER_TOKEN` for live network calls.
