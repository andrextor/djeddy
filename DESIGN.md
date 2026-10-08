# DESIGN.md

Design system for the DJ Eddy landing page. Values live in code (`src/styles/tokens.css`). This file holds the **roles and standing rules**. The measured typography, spacing, radius, effects and motion tables are in [`docs/02-design-system.md`](docs/02-design-system.md). The visual source of truth is the canvas in `design/`: `Main.dc.html` (desktop 1440), `Mobile.dc.html` (390) and `Tipografia.dc.html`.

Direction: dark, warm, nocturnal. Black ink, gold light and cream text, like a booth lit by stage beams. The site is **dark-only**.

## Standing rules

1. **Mobile first.** Base styles target 390 px. One breakpoint, `@media (min-width: 1024px)`, adds the desktop layout. In between, the mobile layout scales fluidly with `clamp()`.
2. **Touch targets ≥ 44×44 px** (`--tap-min`). No hover-only interaction: every hover effect is decoration, never the only way to reach something.
3. **Colors only through semantic tokens** (see *Color*). Components never contain a hex, `rgb()` or `hsl()` literal, and never use a primitive (`--gold-500`) where a role exists. A test enforces this.
4. **Text size:** body and meta text ≥ 12 px. Only the uppercase labels listed in `docs/02` (eyebrows, video tags) go down to 10–11 px, and they always use bold weight with wide tracking.
5. **Contrast:** WCAG 2.2 AA. Use only the text/background pairs in the contrast table.
6. **Motion** uses the named animations in `docs/02` (`rise`, `fadeRight`, `sway`, `marquee`, `pulse`). With `prefers-reduced-motion: reduce`, nothing animates. The global rule in `global.css` must stay.
7. **Focus:** every interactive element is keyboard-reachable and shows `:focus-visible` in `--color-focus`.
8. **Icons** come only from `src/components/Icon.astro` (24 box, 1.6 stroke, `currentColor`). No emoji and no ad-hoc inline SVG in components.
9. **Typography:** `--font-display` (Sora) for headings, numerals and the wordmark; `--font-body` (Manrope) for everything else. Headings use `text-wrap: balance` and paragraphs use `text-wrap: pretty`.
10. **Styles stay scoped** in the component's `<style>`. Shared utilities (`.glass`, `.grain`, `.beam`, `.card`) live in `global.css`. Don't add new global stylesheets.

## Color

_Defined in Task 5 of `docs/superpowers/plans/ok-2026-10-08-professional-tooling.md`._
