# DJ Eddy · Landing

Landing page for DJ Eddy (weddings, private parties, corporate events). Built with Astro,
strict TypeScript and pnpm. Specs live in [`docs/`](docs/README.md); the visual source of truth is
the design canvas in [`design/`](design/).

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
