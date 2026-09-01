# DJ Eddy · Landing

Landing page for DJ Eddy (weddings, private parties, corporate events). Built with Astro,
strict TypeScript and pnpm. Specs live in [`docs/`](docs/README.md); the visual source of truth is
the design canvas in [`design/`](design/).

## Content

All business data lives in `src/data/site.ts` and `src/data/events.json`. Photos and their exact
filenames are documented in [`docs/07-fotos-y-archivos.md`](docs/07-fotos-y-archivos.md).
`pnpm build` always works (sample data included); `pnpm build:release` refuses to build while any `[PLACEHOLDER]` or sample data remains, so hosting must run that one.

## Deployment

Vercel, linked to this GitHub repository (`vercel.json` holds headers and cache rules). The canonical
URL comes from `SITE_URL` or Vercel's `VERCEL_PROJECT_PRODUCTION_URL`; nothing is hardcoded.

## Requirements

- Node 22 (`.nvmrc`)
- pnpm 10 (`corepack enable`)

## Commands

| Command          | Action                                   |
| ---------------- | ---------------------------------------- |
| `pnpm install`   | Install dependencies                     |
| `pnpm dev`       | Start the dev server                     |
| `pnpm build`     | Type-check and build to `dist/`          |
| `pnpm build:release` | Same, but fails if placeholders or sample data remain (use in hosting) |
| `pnpm preview`   | Preview the production build             |
| `pnpm lint`      | Lint and format check (Biome)            |
| `pnpm format`    | Format the codebase (Biome)              |
| `pnpm typecheck` | `astro check`                            |
| `pnpm test`      | Unit tests (`node:test`)                 |
| `pnpm check:content` | List remaining `[PLACEHOLDER]` values |
