# Action first, less text: design

Follows [`2026-10-08-booking-structure-design.md`](2026-10-08-booking-structure-design.md) and [`2026-10-08-new-videos-design.md`](2026-10-08-new-videos-design.md).

## Problem

Iván reviewed v0.3.0: "veo mucho texto… la idea es más ir a la acción." The sections explain instead of pushing the visitor to WhatsApp:

- **Cómo trabajo:**
  - two large cards hold 5 long check items and 3 steps with a sentence each;
  - there's a lead next to the title;
  - there is no button.
- **Preguntas:**
  - the answers run 2–3 lines;
  - on desktop the left column is empty under the title;
  - there's no way to ask anything else.
- **Contacto:**
  - WhatsApp shows up twice (button + row);
  - the long email address and "Base" are information, not actions;
  - the panel is tall.
- **Eventos:** descriptions take 3–4 lines on every card.
- **Section headings:** 68 px on desktop, each with a lead that says little ("Un set distinto…", "Lo que se siente…").

The footer stays as it is (Iván: "se ve bien").

## Decision

**Rule for every section: a title, at most one short line, and an action.**

1. **Cómo trabajo** (`Process.astro`):
   - **"Qué incluye"** becomes 4 icon tiles with 2–3 words each, kept in data as `{ icon, label }`:
     - Sonido propio;
     - Iluminación;
     - Tu música;
     - Todo Colombia.

     These are the same claims as today, compressed. "Lectura de pista" becomes the section's one line.
   - **"Cómo reservar"** becomes 3 short steps in a row with arrows on desktop and stacked on mobile: *Escríbeme* → *Propuesta el mismo día* → *A bailar*. Each step is only its title.
   - The section **ends with the gold WhatsApp button**.
   - The cards and the lead are removed.
2. **Preguntas** (`Faq.astro`):
   - The left column (and, on mobile, the end of the list) gets *"¿Otra pregunta?"* and a WhatsApp button.
   - Answers are cut to 1–2 short lines in `site.faq`. The FAQ JSON-LD follows automatically.
3. **Contacto** (`Contact.astro`) becomes a single centered panel:
   - "Reserva tu fecha.";
   - *"Te respondo el mismo día."*;
   - a large WhatsApp button;
   - under it, a quiet row of text links: the phone number, *Correo* and *Instagram*.

   The three row cards are removed. The base city already appears in the hero, the FAQ and the footer.
4. **Eventos** (`services.json`): each description becomes one line. The schema enforces `max(60)` on `description`, so they can't grow back.
5. **Headings** (`SectionHeading.astro`):
   - the desktop `h2` goes from 68 px to 56 px;
   - the leads are removed from Videos, Eventos and Process;
   - the `lead` prop is dropped, since nothing uses it.

New copy only shortens claims the site already makes. Nothing new is promised.

## Alternatives rejected

- **Removing "Cómo trabajo" entirely.** The 3 steps lower the barrier to the first WhatsApp message, and the 4 tiles answer "¿llevas equipo?" at a glance.
- **Hiding the floating WhatsApp button over the contact panel.** It needs JavaScript (IntersectionObserver), and the overlap is cosmetic.
- **Collapsing event descriptions behind a tap.** Tap-to-read is still text; one line is better.

## Constraints

- **No new JavaScript, no dependencies, no new color tokens.** 4 new icons go in `Icon.astro` (speaker, light, music, map-pin), in the same 24-px stroke style.
- **SEO:**
  - the `h1` and the section `h2`s don't change;
  - FAQ JSON-LD is still produced from `site.faq`;
  - the keywords live in titles, the hero and JSON-LD, so shorter body copy doesn't remove any of them.
- Every new button is ≥ 44 px tall, opens WhatsApp with `buildQuoteMessage()`, and shows `:focus-visible`.

## Mobile (390 px first)

- **Process:** the 4 tiles form a 2×2 grid (icon above the label). The steps stack vertically, each with a number. Then a full-width WhatsApp button.
- **FAQ:** the list, then *"¿Otra pregunta?"* + a full-width button.
- **Contact:** a centered panel, a full-width button, and the links on one wrapping line under it.
- **Events:** the cards get shorter (title + one line + "Cotizar").
- **Target:** the whole page is noticeably shorter at 390 px. Measure `scrollHeight` before and after and record it in the plan.

## Out of scope

- The footer.
- The hero.
- The presentation-video section (Iván: "dejémoslo así por el momento").
- Content still pending from Eddy (`docs/07`).
