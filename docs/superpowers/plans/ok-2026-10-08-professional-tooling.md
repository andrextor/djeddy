# Professional tooling: plan

Spec: `docs/superpowers/specs/2026-10-08-professional-tooling-design.md`. Branch: `chore/professional-tooling`. Status: **approved 2026-10-08**.

One commit per task. Each task ends with its own check, and the last one ends with `pnpm ci:check` passing.

Baseline: `shasum dist/index.html` after a clean `pnpm build`, taken before Task 1 and again after Task 5; tasks other than 5 must keep it identical.

---

## Task 1: Spec and plan

- [ ] Commit this spec and plan.
- Commit: `docs: add professional tooling spec and plan`

## Task 2: Agent rules (`AGENTS.md` + `CLAUDE.md`)

- [ ] `AGENTS.md` becomes the rules for every agent:
  - **Workflow**: design → spec → plan → OK → code, with paths and the `ok-` prefix.
  - **Where things live**: a table covering `src/data`, `src/lib`, `src/components`, `docs/`, `docs/superpowers/*`, `design/`, `DESIGN.md`, `.agents/skills/`.
  - **Mobile first.**
  - **Code rules**: English, no `any`, Biome, pnpm only, no dependency changes without approval.
  - **SEO and content rules**: SEO is first-class; content is evergreen.
  - **Checks**: `pnpm ci:check`.
  - **Changelog** and **Git** rules.
- [ ] Replace the `CLAUDE.md` symlink with a real file: the standard header, `@AGENTS.md`, a one-line workflow reminder, then the current Commands and Architecture sections, moved out of `AGENTS.md`.
- Check: `test ! -L CLAUDE.md`; `grep -c '@AGENTS.md' CLAUDE.md` → 1; no rule appears in both files.
- Commit: `docs: agent workflow rules and real CLAUDE.md`

## Task 3: Shared skill

- [ ] Copy `.agents/skills/frontend-design/{SKILL.md,LICENSE.txt}` from `neoteam-social-run`.
- [ ] `skills-lock.json` with the same entry and hash as neoteam.
- Check: `shasum -a 256` of `SKILL.md` matches neoteam's copy.
- Commit: `chore: add frontend-design skill`

## Task 4: `DESIGN.md`

- [ ] Root `DESIGN.md` with the standing rules:
  - 390 px base and `min-width` queries
  - 44 px touch targets
  - semantic color tokens only, no raw colors in components
  - text ≥ 12 px and inputs at 16 px
  - reduced motion respected
  - icons only through `Icon.astro`
  - WCAG 2.2 AA contrast
  - new styles live scoped in the component, with no new global stylesheet
- [ ] It links to `docs/02-design-system.md` for values and to `design/*.dc.html` as the visual source of truth.
- Check: every token named in `DESIGN.md` exists in `src/styles/tokens.css` (grep). The Color section is a stub filled in by Task 5.
- Commit: `docs: add DESIGN.md standing rules`

## Task 5: Color palette

- [ ] Before: build and preview, then take headless Chrome screenshots of `/` at 390 and 1440 px (`--window-size`, full page) into the scratchpad.
- [ ] `src/styles/tokens.css`:
  - add the primitives (ink, gold, cream/sand, whatsapp) and the semantic tokens from the spec
  - rewrite gradients and shadows on primitives
  - delete `--border-gold-*`, `--gradient-photo` and `--color-gold*`
- [ ] Replace every raw color literal and every old token in `src/components/*.astro`, `src/styles/global.css` and `src/layouts/BaseLayout.astro` with semantic tokens. Use `color-mix` on a primitive for one-off alphas and `black` in masks. The `theme-color` meta stays as the only literal.
- [ ] Every `:focus-visible` uses `--color-focus`.
- [ ] `src/lib/design-tokens.test.ts`: fails if a hex, `rgb()` or `hsl()` literal appears in any `.astro` or `.css` outside `tokens.css` (except the `theme-color` line), and fails if a `var(--x)` references a token not defined in `tokens.css`.
- [ ] `DESIGN.md` "Color" section: the primitives table, the roles table, the contrast table, the forbidden pairs, and the rule "components use semantic tokens only".
- [ ] `docs/02-design-system.md`: replace the Color section with a link to `DESIGN.md`.
- Check:
  - `pnpm test` passes, including the new test, which must fail when a literal is added back on purpose.
  - After screenshots at 390 px first, then 1440 px, match the before set by eye (borders only).
  - `pnpm ci:check` passes.
- Commit: `refactor(design): two-layer color tokens with enforced palette`

## Task 6: Config hardening

- [ ] `.editorconfig`, copied from neoteam.
- [ ] `tsconfig.json`: `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`. Fix whatever they flag; type-only changes.
- [ ] `package.json`: `"lint:fix": "biome check --write ."` and `"ci:check": "pnpm lint && pnpm test && pnpm build"`.
- [ ] `vercel.json`: `"installCommand": "pnpm install --frozen-lockfile"`.
- Check: `pnpm ci:check` passes; `shasum dist/index.html` matches the post-Task 5 build (type-only changes).
- Commit: `chore: stricter tsconfig, editorconfig and ci:check`

## Task 7: CI and release workflows

- [ ] `.github/workflows/ci.yml`:
  - triggers on `pull_request` to `main` (`opened, synchronize, reopened, ready_for_review`) and `push` to `main`
  - drafts skipped
  - `concurrency` keyed on the PR number or ref, with `cancel-in-progress`
  - actions `@v5`
  - single step `pnpm ci:check`
- [ ] `.github/workflows/release.yml`, copied from neoteam (tag + GitHub release from the `CHANGELOG.md` section).
- Check: the CI run on this branch's PR passes; the release job is checked after the merge.
- Commit: `ci: pull request checks and changelog-driven releases`

## Task 8: Changelog and first release

- [ ] `CHANGELOG.md` (Keep a Changelog). `## [Unreleased]` holds this tooling work. `## [0.1.0] - 2026-10-08` summarizes what is live today: the landing with hero, videos, services, contact, WhatsApp button, SEO/JSON-LD, sitemap and robots, and the placeholder release gate (phases 2–6).
- [ ] `package.json` `version` → `0.1.0`.
- [ ] `README.md`: remove the stale `events.json` mention (now `services.json`), add `ci:check` and `lint:fix` to the commands table, and add a "Contributing" line pointing to `AGENTS.md`.
- Check: `pnpm ci:check` passes; the awk snippet from `release.yml` extracts a non-empty `0.1.0` section locally.
- Commit: `chore(release): 0.1.0`

---

## After this plan (Iván)

- Push the branch and open the PR; CI must pass before merging.
- GitHub → Settings → Branches: protect `main` (require PR + `ci` check).
- Once merged, `release.yml` publishes `v0.1.0`.
