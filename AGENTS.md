# AGENTS.md

Rules for every coding agent (Claude Code, Codex, Cursor, OpenCode, Gemini…) working in this repository. Project owner: Iván Andrés López.

## Workflow: design → spec → plan → OK → code

No code, config or dependency change starts without an approved plan. The order is fixed:

1. **Review the design first.** Before proposing anything that touches UI, read:
   - `DESIGN.md` (design system and its standing rules),
   - the design canvas in `design/` (`Main.dc.html` desktop 1440, `Mobile.dc.html` 390, `Tipografia.dc.html`),
   - the `frontend-design` skill (`.agents/skills/frontend-design/SKILL.md`).

   For non-UI work, still read the relevant constraints: this file, `CLAUDE.md` and the `docs/` parts that cover the area.
2. **Write the spec** at `docs/superpowers/specs/YYYY-MM-DD-<slug>-design.md`: the problem, the decision and why, alternatives rejected, design and security constraints that apply, a *Mobile* section, out of scope.
3. **Write the plan** at `docs/superpowers/plans/YYYY-MM-DD-<slug>.md`: link to the spec, the branch name, numbered tasks (one commit each) naming the exact files, and the checks that prove each task.
4. **Stop and wait for an explicit OK from Iván.** Do not implement in the same turn. Once approved, rename the plan to `ok-YYYY-MM-DD-<slug>.md`.
5. **Implement only what the approved plan says.** If reality diverges from the plan, stop, update the plan and ask again.

Trivial fixes (typo, one-line copy change) may skip the spec, never the OK.

## Where things live

| Path | Content |
|------|---------|
| `src/pages/` | Routes: `index.astro`, `robots.txt.ts` |
| `src/components/` | One `.astro` per page section, plus `Icon.astro` and `SectionHeading.astro` |
| `src/layouts/` | `BaseLayout.astro`: head, SEO meta, fonts, release gate |
| `src/data/` | All business data: `site.ts`, `services.json` |
| `src/lib/` | Pure logic with `node:test` tests next to it (`*.test.ts`) |
| `src/styles/` | `tokens.css` (the only place colors are defined), `global.css` |
| `src/assets/`, `public/` | Optimized images / static files (names fixed by `docs/07-fotos-y-archivos.md`) |
| `scripts/` | Node CLI helpers (`list-placeholders.ts`) |
| `DESIGN.md` | Design system: palette roles, contrast, standing rules |
| `design/` | Design canvas (visual source of truth) |
| `docs/00–07` | Original product spec (Spanish) |
| `docs/superpowers/specs/` | Specs (`…-design.md`) |
| `docs/superpowers/plans/` | Plans; `ok-` prefix once approved |
| `docs/superpowers/audits/` | Code reviews and audits (`YYYY-MM-DD-<topic>.md`) |
| `.agents/skills/` | Skills shared by all agents (pinned in `skills-lock.json`) |

Code reviews are written to `docs/superpowers/audits/`, never only left in chat.

## Mobile first

Most visitors arrive from a phone (Instagram, TikTok, WhatsApp links). Mobile is the primary target:

- Design and build at **390 px first**, then scale up (1024, 1440). Base styles are mobile; `min-width` media queries add desktop.
- Touch targets ≥ 44×44 px (`--tap-min`), no hover-only interactions.
- Every spec has a *Mobile* section; every plan's checks include a pass at 390 px **before** desktop.
- Performance on mid-range phones over 4G counts: no client-side JavaScript or dependency without a cost note.

## SEO and content

- SEO is a first-class requirement (`docs/05-quality.md`): every change keeps titles, meta, JSON-LD, headings hierarchy and Lighthouse scores intact.
- Content is evergreen: no date-bound items (event agendas, "this season" copy) that need someone to update them.
- Business data goes in `src/data/`, never hardcoded in components.

## Code rules

- All code, identifiers, file names and comments in **English**. User-facing copy stays in **Spanish**.
- Comments only for non-obvious logic.
- TypeScript strict (`tsconfig.json`). No `any`: use `unknown` plus type guards or interfaces.
- Biome is the linter and formatter (2 spaces, single quotes, no semicolons). Run `pnpm lint:fix` before committing.
- Colors only through semantic tokens from `src/styles/tokens.css` (enforced by `src/lib/design-tokens.test.ts`).
- pnpm only (`packageManager` is pinned). Never add `package-lock.json` or `yarn.lock`.
- No dependency added, removed or upgraded without approval.
- No new top-level folders without approval.

## Checks

```bash
pnpm ci:check    # lint + test + build (build runs astro check)
```

A task is done when `pnpm ci:check` passes. Say so with the output; if something fails, report it, do not hide it.

## Changelog

- `CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and SemVer.
- Every PR adds its changes under `## [Unreleased]`, in the right group (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`), written for the reader of a release note.
- **Only PRs with visitor-visible changes cut a release** (content, design, SEO, performance). Their last commit, `chore(release): x.y.z`, bumps `package.json` `version` (a `feat` bumps the minor, only fixes bump the patch), renames `## [Unreleased]` to `## [x.y.z] - YYYY-MM-DD` and adds an empty `## [Unreleased]` above it. Docs, tooling and CI PRs stay under `[Unreleased]` until the next release.
- When the PR merges into `main`, `.github/workflows/release.yml` tags `vx.y.z` and publishes a GitHub release with that section as notes. With no matching section, the workflow does nothing.

## Git

- Never commit to `main`. One branch per plan, one commit per task, Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `ci:`…).
