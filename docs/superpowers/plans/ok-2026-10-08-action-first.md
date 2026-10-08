# Action first, less text: plan

Spec: [`specs/2026-10-08-action-first-design.md`](../specs/2026-10-08-action-first-design.md) · Branch: `feat/action-first` (from `main` at `9cdb5ed`, v0.3.0) · Status: **approved 2026-10-08**

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
   - `Faq.astro`: *"¿Otra pregunta?"* + a WhatsApp button.
   - Check: the JSON-LD still has 5 questions.
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
