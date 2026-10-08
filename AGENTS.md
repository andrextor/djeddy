# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Single-page static landing for DJ Eddy (Astro, strict TypeScript, pnpm, Node 22). Page copy is in Spanish (`lang="es"`); every identifier, path and file name is in English. SEO is a top priority.

## Commands

- Dev server: `astro dev --background`, managed with `astro dev stop|status|logs`
- `pnpm lint`: Biome check (single quotes, no semicolons, trailing commas, 2 spaces, 100 cols). `pnpm format` writes fixes
- `pnpm test`: `node:test` over `src/lib/*.test.ts`, run through `--experimental-strip-types` (no test framework)
- Single test: `node --experimental-strip-types --no-warnings=ExperimentalWarning --test --test-name-pattern="buildJsonLd" src/lib/lib.test.ts`
- `pnpm typecheck`: `astro check`
- `pnpm build`: typecheck + build; works with sample data and only warns
- `pnpm build:release`: fails while any `[PLACEHOLDER]` remains or `sampleData` is still `true`. Hosting must use this one
- `pnpm check:content`: lists the remaining placeholders

CI (`.github/workflows/ci.yml`) runs lint, test and build.

## Architecture

- **All business data is in `src/data/site.ts`** (typed `SiteConfig`: contact, WhatsApp, socials, videos, keywords) **and `src/data/services.json`** (an Astro content collection; its Zod schema is in `src/content.config.ts`). Components read from these, so don't hardcode business values in markup. The README's mention of `events.json` is out of date.
- **Placeholder / release gate:** any string matching `[UPPER_CASE]` is treated as client data that hasn't arrived yet. `src/lib/placeholders.ts` finds these. `BaseLayout.astro` throws during a build when `RELEASE=1` and placeholders or `sampleData = true` remain. `scripts/list-placeholders.ts` runs the same check from the CLI.
- **SEO:** `src/lib/seo.ts` builds the JSON-LD graph (business + videos), which `src/pages/index.astro` injects. Canonical/OG URLs come from `Astro.site`. That value is resolved in `astro.config.mjs` from `SITE_URL`, then `VERCEL_PROJECT_PRODUCTION_URL`, then localhost. Never hardcode the domain. `robots.txt` is generated in `src/pages/robots.txt.ts`, and the sitemap comes from `@astrojs/sitemap`.
- `src/lib/*.ts` modules are pure, with `.ts` import extensions, so that `node` can test them without Astro. Keep runtime Astro imports (`astro:*`, `@/` alias) out of `src/lib`; only `import type` is allowed, because Node strips it.
- Styling is plain CSS: design tokens are in `src/styles/tokens.css` and globals in `src/styles/global.css`. Fonts are self-hosted via Fontsource (Sora, Manrope) and preloaded in the layout.
- Output is `static`, with stylesheets inlined. Deployed on Vercel (`vercel.json` holds headers and cache rules).

## Specs and design

- `docs/` holds the spec in Spanish, parts 00–07: content model, components, quality/SEO, and the implementation plan. `docs/07-fotos-y-archivos.md` defines the exact image filenames and sizes the client provides.
- The visual source of truth is `design/Main.dc.html` (desktop 1440), `design/Mobile.dc.html` (390) and `design/Tipografia.dc.html`.
- Content must be evergreen: no date-bound items such as event agendas.

Astro docs: https://docs.astro.build (routing, components, content collections, styling).
