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

All values live in `src/styles/tokens.css`, in two layers. `src/lib/design-tokens.test.ts` fails the build if a color literal appears anywhere else or if a `var()` points to an undefined token.

### Primitives

These are the only raw values. Components never reference them directly.

| Scale | Tokens |
|-------|--------|
| Ink (backgrounds) | `--ink-950` #050403 · `--ink-900` #070604 · `--ink-850` #0a0806 · `--ink-800` #0c0a07 · `--ink-750` #0d0b08 · `--ink-700` #14110c |
| Gold (brand light) | `--gold-300` #f1d67a · `--gold-400` #e6c463 · `--gold-500` #d4af37 · `--gold-600` #b8922a · `--gold-700` #9a7a1e |
| Cream / sand (text) | `--cream-100` #f4efe4 · `--cream-200` #e6dcc3 · `--sand-400` #b8b0a0 · `--sand-600` #8a8272 |
| Fixed | `--whatsapp-500` #25d366 (brand-mandated) · `--white` · `--black` |

The warm dark stops that only exist inside gradients (#12100b … #2a2216) stay inside their gradient tokens.

### Semantic tokens: what components use

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Page | `--color-bg` | ink-900 | Page background; base for ink overlays |
| | `--color-bg-elevated` | ink-800 | Top of the hero gradient |
| | `--color-bg-footer` | ink-950 | Footer |
| Surfaces | `--color-surface` | ink-700 · 55 % | Glass panels (with blur) |
| | `--color-surface-solid` | ink-700 · 92 % | Glass fallback without `backdrop-filter` |
| | `--color-surface-row` | white · 3 % | Contact rows, menu items |
| | `--color-media-bg` | black | Letterbox behind `<video>` |
| Text | `--color-text` | cream-100 | Headings, primary copy |
| | `--color-text-muted` | sand-400 | Body paragraphs, nav links |
| | `--color-text-dim` | sand-600 | Copyright, fine print (≥ 12 px) |
| | `--color-text-badge` | cream-200 | Hero badge |
| | `--color-text-accent` | gold-400 | Second line of the hero headline |
| Accent | `--color-accent` | gold-500 | Links, eyebrows, icons, primary buttons |
| | `--color-accent-light` | gold-300 | Hover of accent elements |
| | `--color-accent-dark` | gold-600 | Section index numerals |
| | `--color-on-accent` | ink-900 | Text and icons on gold |
| | `--color-focus` | gold-500 | Every `:focus-visible` outline |
| WhatsApp | `--color-whatsapp` | whatsapp-500 | Floating button, "available" dot |
| | `--color-on-whatsapp` | ink-900 | Icon/text on green |
| | `--overlay-light` | white · 28 % | Icon disc inside the green button |
| Borders | `--border-subtle` | gold · 16 % | Dividers, quiet outlines |
| | `--border-default` | gold · 22 % | Cards, glass, marquee |
| | `--border-strong` | gold · 35 % | Photo frame, hover outlines, footer wordmark stroke |
| | `--border-hover` | gold · 70 % | `.card:hover` |
| Glows | `--glow-accent` | gold · 22 % | Radial light in hero and contact |
| | `--glow-accent-strong` | gold · 35 % | Headline text-shadow, photo base glow |
| | `--glow-deep` | gold-700 · 28 % | Lower-right hero light (desktop) |
| Gradients | `--gradient-gold` | gold 300→500→600 | Gold CTAs |
| | `--gradient-beam` | gold 300/500, fading | Stage beams |
| | `--gradient-card`, `--gradient-card-alt` | warm ink | Video cards |
| | `--gradient-row`, `--gradient-row-alt` | warm ink | Service rows (mobile) |
| | `--gradient-event-a`, `--gradient-event-b` | warm ink | Service cards |
| Scrims | `--scrim-photo`, `--scrim-video`, `--scrim-card` | ink fading in | Legibility over photos and video posters |
| Shadows | `--shadow-card`, `--shadow-photo`, `--shadow-float` | black | Depth |
| | `--shadow-cta`, `--shadow-cta-sm` | gold · 25 % | Glow under gold CTAs |

**One-off alphas** that don't match a role are mixed in the component from a *semantic* token, for example `color-mix(in srgb, var(--color-accent) 6%, transparent)` for the hero grid. When the same mix shows up a second time, promote it to a token here. Masks use the `black` keyword, because only alpha matters there. The `<meta name="theme-color">` value in `BaseLayout.astro` mirrors `--ink-900` and is the only literal allowed outside `tokens.css`.

### Contrast (WCAG 2.2 AA, on `--color-bg`)

| Foreground | Ratio | Allowed for |
|------------|------:|-------------|
| `--color-text` | 17.7 | anything |
| `--color-text-badge` | 14.8 | anything |
| `--color-accent-light` | 14.1 | anything |
| `--color-text-accent` | 12.0 | anything |
| `--color-accent` | 9.6 | anything |
| `--color-text-muted` | 9.4 | anything |
| `--color-text-dim` | 5.3 | text ≥ 12 px |
| `--color-on-accent` on `--color-accent` | 9.6 | buttons, tags |
| `--color-on-whatsapp` on `--color-whatsapp` | 10.2 | floating button |

**Forbidden:** white on WhatsApp green (2.0), and the canvas's original #6f685c for text (3.7). The canvas's #6f685c is why `--color-text-dim` was raised to sand-600. Text over photos always sits on a scrim.
