# Professional tooling: design

## Problem

djeddy already has the technical base (Biome, strict TypeScript, `node:test`, CI, security headers with CSP). It lacks process. Changes land on `main` with commit messages like "Update site.ts" and "deploy vercel", nothing records why a change was made, there is no version history (still `0.0.1`), and agents get no working rules beyond the command list. `neoteam-social-run` solved all of this and has worked well, so we copy its practices, adapted to a static landing page.

## Decision

Adopt from neoteam-social-run:

1. **Agent workflow in `AGENTS.md`**: design → spec → plan → Iván's OK → code. Specs, plans and audits go in `docs/superpowers/{specs,plans,audits}/`, and a plan gets the `ok-` prefix once approved. Trivial fixes may skip the spec, never the OK.
2. **Git rules:** never commit to `main`, one branch per plan, one commit per task, Conventional Commits.
3. **Changelog + SemVer:** `CHANGELOG.md` follows Keep a Changelog. `.github/workflows/release.yml` tags `vX.Y.Z` and publishes a GitHub release when `package.json` carries a version that has a changelog section and no tag yet.
4. **CI:** runs on pull requests to `main` (drafts skipped, a new push cancels the previous run) and on pushes to `main`. A single `pnpm ci:check` (lint + test + build, where build already includes `astro check`) is the definition of done.
5. **Shared skill:** `.agents/skills/frontend-design/` copied from neoteam (source `anthropics/skills`), pinned in `skills-lock.json`. `CLAUDE.md` becomes a real file that imports `@AGENTS.md` and holds the architecture notes, replacing the current symlink.
6. **`DESIGN.md`**: the standing rules (mobile first at 390 px, 44 px touch targets, tokens over raw values, a single icon source, text ≥ 12 px, reduced motion). It points to `docs/02-design-system.md` for token values instead of duplicating them.
7. **Config hardening:**
   - `.editorconfig`.
   - Stricter `tsconfig`: `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`.
   - `installCommand: pnpm install --frozen-lockfile` in `vercel.json`.
   - `lint:fix` and `ci:check` scripts.
8. **Audits:** code reviews are written to `docs/superpowers/audits/` and never left only in chat.
9. **Color palette, fully defined** (details below).

## Color palette

### Current state

`src/styles/tokens.css` has 34 color tokens, but the palette has leaked outside it:

- **~50 raw color literals** live outside `tokens.css`: in `Hero` (20), `Services` (7), `global.css` (9), `Videos` (5), and `Contact`, `Footer`, `Header`, `Marquee`, `WhatsAppButton`, `BaseLayout`. Nearly all of them are gold or background colors at some opacity, typed by hand as `rgba(212, 175, 55, x)` or `rgba(7, 6, 4, x)`.
- **Tokens name values instead of roles.** There are seven border tokens, `--border-gold-14` through `--border-gold-35`. Four of them are used once and one is never used.
- **Dead tokens:** `--border-gold-18`, `--gradient-photo`. `--color-gold-deep` is never used as a token, yet `Hero` hardcodes its value.
- **Two homes for the palette:** `docs/02-design-system.md` and `tokens.css` can drift apart, and contrast results are only recorded loosely in `docs/05`.

### Decision: two layers, colors only in `tokens.css`

**1. Primitives:** the raw palette, the only place a hex value appears. Components never use these directly.

| Scale | Tokens |
|-------|--------|
| Ink (backgrounds) | `--ink-950` #050403 · `--ink-900` #070604 · `--ink-850` #0a0806 · `--ink-800` #0c0a07 · `--ink-750` #0d0b08 |
| Gold (brand) | `--gold-300` #f1d67a · `--gold-400` #e6c463 · `--gold-500` #d4af37 · `--gold-600` #b8922a · `--gold-700` #9a7a1e |
| Cream (text) | `--cream-100` #f4efe4 · `--cream-200` #e6dcc3 · `--sand-400` #b8b0a0 · `--sand-600` #8a8272 |
| Brand third-party | `--whatsapp-500` #25d366 |

The warm dark stops used only inside gradients (#12100b … #33291a) stay inside the gradient tokens and are not promoted to the scale.

**2. Semantic tokens:** what components use, named by role.

| Role | Tokens |
|------|--------|
| Backgrounds | `--color-bg`, `--color-bg-elevated`, `--color-bg-footer`, `--color-surface`, `--color-surface-row`, `--color-surface-solid` (the 0.92 menu panel) |
| Text | `--color-text`, `--color-text-muted`, `--color-text-dim`, `--color-text-badge`, `--color-text-accent` (headline second line) |
| Accent | `--color-accent` (gold-500), `--color-accent-light`, `--color-accent-dark`, `--color-on-accent` (ink on gold) |
| Borders | `--border-subtle` (gold 16%), `--border-default` (gold 22%), `--border-strong` (gold 35%) |
| Overlays / glows | `--overlay-scrim` (ink 85%), `--overlay-soft` (ink 55%), `--glow-accent` (gold 22%), `--glow-deep` (gold-700 28%) |
| Focus | `--color-focus` (gold-500, used by every `:focus-visible`) |
| WhatsApp | `--color-whatsapp`, `--color-on-whatsapp` |
| Gradients / shadows | existing `--gradient-*` and `--shadow-*`, rewritten to reference primitives |

Opacity variants are built with `color-mix(in srgb, var(--gold-500) 22%, transparent)` inside `tokens.css`. This is Baseline 2023, so no fallback is needed. One-off alphas that don't match a role, such as a single glow, use `color-mix` on a semantic token inside the component, never `rgba()` with typed numbers.

**Visual change (accepted):** the seven gold border alphas (14, 16, 18, 20, 22, 25, 35 %) collapse into three steps (16, 22, 35 %). A shift of a few percent in alpha on a hairline border can't be seen. Everything else keeps its computed color.

### Contrast (WCAG 2.2 AA, measured on `--color-bg` #070604)

| Pair | Ratio | Allowed for |
|------|------:|-------------|
| `--color-text` | 17.7 | everything |
| `--color-text-badge` | 14.8 | everything |
| `--color-accent-light` | 14.1 | everything |
| `--color-text-accent` | 12.0 | everything |
| `--color-accent` | 9.6 | everything |
| `--color-text-muted` | 9.4 | everything |
| `--color-text-dim` | 5.3 | body text ≥ 12 px (passes AA) |
| `--color-on-accent` on gold | 9.6 | buttons |
| `--color-on-whatsapp` (ink) on green | 10.2 | floating button. White on green is 2.0 and **forbidden** |
| design's #6f685c | 3.7 | **forbidden for text**; it is why `--color-text-dim` was raised |

### Enforcement

`src/lib/design-tokens.test.ts` (runs inside `pnpm test`, so CI catches it) fails if any `.astro` or `.css` file outside `tokens.css` contains a hex, `rgb()` or `hsl()` literal. The only exception is `<meta name="theme-color">`, where CSS variables don't work. Masks use the `black` keyword because only alpha matters there.

### Single source of truth

- `tokens.css` holds the values.
- `DESIGN.md` holds the roles, the contrast table and the rules.
- The color section of `docs/02-design-system.md` is replaced by a link to `DESIGN.md`, so they can't drift apart.

## Alternatives rejected

- **"Every PR is a release" (neoteam's rule).** Too heavy for a landing that rarely changes. Instead, only PRs with user-visible changes bump the version. Docs, tooling and CI changes go under `[Unreleased]` without a bump.
- **Supabase tooling** (`test:db`, docker compose, migrations, edge functions). djeddy is static and has no backend.
- **Moving `docs/00–07` into `docs/superpowers/`.** They are the original product spec and stay where they are. `superpowers/` covers changes from now on.
- **Husky / lint-staged.** CI already gates merges, and a pre-commit hook adds a dependency for a one-person repo.

## Constraints

- No new runtime dependencies. No dev dependencies added either: the skill is plain files.
- No change to the rendered site except the palette task. That task is visually equivalent apart from the border-alpha consolidation, and it is checked with screenshots at 390 px and 1440 px before and after. Every other task keeps `dist/index.html` byte-identical.
- Code in English; docs prose may stay in Spanish, as in `docs/`.
- `main` gets branch protection only through Iván's GitHub settings (out of scope for the repo).

## Mobile

No UI change. `DESIGN.md` makes 390 px the base for all future work.

## Out of scope

- Branch protection rules on GitHub (Iván does this in settings).
- Fixing the pending `[PLACEHOLDER]` data or `sampleData = true`.
- New features or visual changes (beyond the border consolidation).
- A light theme. The site is dark-only by design.
- Spacing, radius and typography tokens. They are already role-named and used consistently.
