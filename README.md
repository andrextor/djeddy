# DJ Eddy · Landing

Landing page for DJ Eddy (weddings, private parties, corporate events). Built with Astro,
strict TypeScript and pnpm. Specs live in [`docs/`](docs/README.md); the visual source of truth is
the design canvas in [`design/`](design/).

## Content

All business data lives in `src/data/site.ts` and `src/data/events.json`. Photos and their exact
filenames are documented in [`docs/07-fotos-y-archivos.md`](docs/07-fotos-y-archivos.md).
`pnpm build` fails while any `[PLACEHOLDER]` remains; use `pnpm build:draft` meanwhile.

## Requirements

- Node 22 (`.nvmrc`)
- pnpm 10 (`corepack enable`)

## Commands

| Command          | Action                                   |
| ---------------- | ---------------------------------------- |
| `pnpm install`   | Install dependencies                     |
| `pnpm dev`       | Start the dev server                     |
| `pnpm build`     | Type-check and build to `dist/`          |
| `pnpm preview`   | Preview the production build             |
| `pnpm lint`      | Lint and format check (Biome)            |
| `pnpm format`    | Format the codebase (Biome)              |
| `pnpm typecheck` | `astro check`                            |
| `pnpm test`      | Unit tests (`node:test`)                 |
| `pnpm build:draft` | Build while client data is still missing |
| `pnpm check:content` | List remaining `[PLACEHOLDER]` values |
