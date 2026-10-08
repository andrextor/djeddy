# Action first, less text: plan

Spec: [`specs/2026-10-08-action-first-design.md`](../specs/2026-10-08-action-first-design.md) · Branch: `feat/action-first` (from `main` at `9cdb5ed`, v0.3.0) · Status: **approved 2026-10-08, done**

## How every task is checked

1. **`pnpm ci:check` passes.**
2. **390 px pass, then 1024 and 1440 px.** Use the iframe screenshot method.
3. **Page height at 390 px** (`scrollHeight`) is recorded before task 2 and after task 6.

## Tasks

1. **`docs: action-first spec and plan`.** Commits the spec and this plan, renamed to `ok-`.
2. **`refactor(headings): smaller desktop titles, no leads`.**
   - `SectionHeading.astro`: drop the `lead` prop; the desktop `h2` goes to 56 px.
   - Remove `lead=` from Videos, Services and Process.
3. **`feat(process): icon tiles, short steps and a WhatsApp button`.**
   - `site.ts`: `included` becomes `readonly { icon: IconName; label: string }[]`, with 4 items. The test fixture follows.
   - `Icon.astro`: add `speaker`, `light`, `music`, `pin`.
   - `Process.astro`: rewritten as described in the spec.
4. **`feat(faq): shorter answers and an ask-me button`.**
   - `site.ts`: the `faq` answers are cut to 1–2 lines.
   - Iván asked mid-implementation to remove whatever isn't needed. The questions on sound/lighting and on how to book repeat the Process tiles, the steps and Contact, so they are dropped and 3 questions remain. Proof and Testimonials stay: they render nothing until Eddy sends real data.
   - `Faq.astro`: *"¿Otra pregunta?"* + a WhatsApp button.
   - Check: the JSON-LD has 3 questions.
5. **`feat(contact): one panel, one action`.**
   - `Contact.astro`: a centered panel, a large WhatsApp button, and text links (phone, email, Instagram).
   - Check: `mailto:` and the Instagram link work.
6. **`feat(events): one-line descriptions`.**
   - `services.json`: shorter descriptions.
   - `content.config.ts`: `description` gets `max(60)`.
   - Check: a 61-char description fails the build.
7. **`chore(release): 0.4.0`.**
   - `CHANGELOG.md`: a `Changed` entry for the shorter sections and the extra WhatsApp buttons.
   - `package.json`: version 0.4.0.
   - The plan records the page-height result.

## Result

- `pnpm ci:check` passes.
- Page height at 390 px went from **5355 px to about 4270 px** (−20 %).

**Changes Iván asked for during review,** all on this branch:

1. **The FAQ section was removed** (task 4 had first cut it to 3 questions). This also removed `site.faq`, the `FAQPage` JSON-LD, the "Preguntas" nav link and the `plus` icon.
2. **The floating WhatsApp button became `ContactDock.astro`,** following Iván's reference image. On desktop it's a right-edge tab with "CONECTA", every social network and WhatsApp. On phones it's a bottom bar: a vertical dock covered the hero text at 390 px. The unused `pulse` animation and `--overlay-light` token were deleted, and the footer gained bottom padding so the bar doesn't cover its last line.
3. **Weddings merged into the private-parties card** ("Bodas y fiestas privadas", with the existing photo). No wedding photo exists, and the empty gradient card looked broken. Events went back to 3 columns on desktop.
4. **A "Creado por Landak Studio ↗" credit was added to the footer,** as in neoteam-social-run. It uses the new `--landak-500` primitive and `--color-credit` token (#7c5cff, 4.7:1 on the footer background).

Checks:

- A 61-character event description fails the build with `Too big: expected string to have <=60 characters`.
- `QuoteButton.astro` (new) is the single WhatsApp CTA that Process and Contact share.

**Screenshot note:** fixed elements don't render in the iframe screenshot method. The dock was checked with a direct 500 px screenshot.

**Found, not fixed (out of scope):** `pnpm check:content` fails before and after this branch. `src/data/site.ts` imports image assets through the `@/` alias, and plain Node can't resolve them (`ERR_MODULE_NOT_FOUND: @/assets`). That needs its own small fix plan.
