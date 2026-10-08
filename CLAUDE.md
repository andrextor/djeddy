# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

**Mandatory workflow (see AGENTS.md):** read `DESIGN.md`, `design/` and the `frontend-design` skill → write spec → write plan → wait for Iván's explicit OK → implement. **Mobile first** (390 px) in every spec, plan and check. Never implement in the same turn the plan is written.

## Project

Single-page static landing for DJ Eddy (Astro, strict TypeScript, pnpm, Node 22), deployed on Vercel. Page copy is Spanish (`lang="es"`); code stays English.

## Commands

```bash
astro dev --background        # dev server; manage with astro dev stop|status|logs
pnpm lint / pnpm lint:fix     # Biome
pnpm typecheck                # astro check
pnpm test                     # node --test on src/lib/*.test.ts (strip-types, no framework)
node --experimental-strip-types --no-warnings=ExperimentalWarning --test --test-name-pattern="buildJsonLd" src/lib/lib.test.ts   # single test
pnpm build                    # astro check + build; works with sample data, only warns
pnpm build:release            # fails while [PLACEHOLDER] or sampleData = true remain (hosting uses this)
pnpm check:content            # list remaining placeholders
pnpm ci:check                 # lint + test + build
```

## Architecture

- **All business data is in `src/data/site.ts`** (typed `SiteConfig`: contact, WhatsApp, socials, videos, keywords) **and `src/data/services.json`** (an Astro content collection; its Zod schema is in `src/content.config.ts`). Components read from these, so don't hardcode business values in markup.
- **Placeholder / release gate:** any string matching `[UPPER_CASE]` is treated as client data that hasn't arrived yet. `src/lib/placeholders.ts` finds these. `BaseLayout.astro` throws during a build when `RELEASE=1` and placeholders or `sampleData = true` remain. `scripts/list-placeholders.ts` runs the same check from the CLI.
- **SEO:** `src/lib/seo.ts` builds the JSON-LD graph (business + videos), which `src/pages/index.astro` injects. Canonical/OG URLs come from `Astro.site`. That value is resolved in `astro.config.mjs` from `SITE_URL`, then `VERCEL_PROJECT_PRODUCTION_URL`, then localhost. Never hardcode the domain. `robots.txt` is generated in `src/pages/robots.txt.ts`, and the sitemap comes from `@astrojs/sitemap`.
- `src/lib/*.ts` modules are pure, with `.ts` import extensions, so that `node` can test them without Astro. Keep runtime Astro imports (`astro:*`, `@/` alias) out of `src/lib`; only `import type` is allowed, because Node strips it.
- **Styling** is plain CSS scoped per component. All colors live in `src/styles/tokens.css` (primitives → semantic tokens, see `DESIGN.md`); globals are in `src/styles/global.css`. Fonts are self-hosted via Fontsource (Sora, Manrope) and preloaded in the layout. Icons come only from `src/components/Icon.astro`.
- Output is `static`, with stylesheets inlined. `vercel.json` holds the security headers (including CSP) and cache rules; any new external origin (embed, image host) needs a CSP update there.

Astro docs: https://docs.astro.build (routing, components, content collections, styling).
