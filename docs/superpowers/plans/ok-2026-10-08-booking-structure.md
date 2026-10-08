# Booking-focused page structure: plan

Spec: [`specs/2026-10-08-booking-structure-design.md`](../specs/2026-10-08-booking-structure-design.md) · Branch: `feat/booking-structure` (stacked on `chore/professional-tooling`, not yet merged) · Status: **approved 2026-10-08**

## How every task is checked

1. **`pnpm ci:check` passes.**
2. **390 px pass, before desktop.** Headless Chrome can't go narrower than about 500 px, so the page is loaded inside a `<iframe width="390" height="844">` on a scratch page, and screenshots are taken of that. This replaces the "real device pending" gap from the tooling plan.
3. **1440 px pass.**
4. **No layout shift and no horizontal scroll** at either width.

## Tasks

1. **`docs: booking structure spec and plan`.** Commits the audit, the spec and this plan, renamed to `ok-`.
2. **`feat(whatsapp): prefilled quote message`.**
   - `src/lib/whatsapp.ts`: add `buildQuoteMessage(eventType?)`.
   - `src/lib/lib.test.ts`: cover it with and without a type.
   - `site.whatsapp.message` gives way to it in Header, Contact, WhatsAppButton and Hero.
   - Check: open the URLs and confirm the decoded text.
3. **`feat(events): weddings and per-type quote links`.**
   - `src/data/services.json`: a `bodas` entry, `order: 1`; the others shift.
   - `src/data/site.ts`: keywords and tagline add weddings; the tagline stays ≤ 155 chars.
   - `Hero.astro`: the marquee adds "Bodas".
   - `Services.astro`: each card links to WhatsApp with `buildQuoteMessage(title)` and shows a "Cotizar" label. `url` in the schema stays as an override.
   - `docs/07`: add `evento-4.webp`.
   - Check: 4 cards, the weddings card with its gradient fallback, the links' decoded text.
4. **`feat(hero): offer and city in the headline`.**
   - `Hero.astro`: the `h1` names the offer and the city, keeping the two-line treatment; the lead is cut.
   - `index.astro`: the title stays aligned.
   - Check: 390×844 shows the `h1`, the CTA and the top of the photo; one `h1` on the page.
5. **`feat(proof): stats strip`.**
   - `site.ts`: `stats` type, `[]`.
   - `Proof.astro` (new): rendered only when `stats.length > 0`.
   - `index.astro`: placed after Hero.
   - Check: hidden with `[]`; with 3 temporary sample stats it renders correctly at 390 and 1440. Revert the sample before committing.
6. **`feat(videos): vertical clip row`.**
   - `site.ts`: `videos: readonly Video[]`; the event clip comes first.
   - `Videos.astro`: renders N cards at 9:16 and drops the fixed main/secondary pair; "Más clips" stays.
   - `seo.ts` and its test still emit one `VideoObject` per video.
   - Check: neither clip is cropped while playing; facades load nothing before a tap.
7. **`feat(process): included list and booking steps`.**
   - `site.ts`: `included`, from existing claims only.
   - `Process.astro` (new) holds the 3 steps.
   - `SectionHeading` index type widens to `'01'`…`'06'`.
   - `Icon.astro`: adds a `check` icon if missing.
8. **`feat(testimonials): quotes section`.**
   - `site.ts`: `testimonials` type, `[]`.
   - `Testimonials.astro` (new): rendered only when not empty.
   - Check: same as task 5, with temporary sample data reverted.
9. **`feat(faq): questions with FAQPage JSON-LD`.**
   - `site.ts`: `faq`, the 5 answerable questions from the spec.
   - `Faq.astro` (new): `<details name="faq">`.
   - `seo.ts`: `FAQPage` in the graph when `faq` is not empty.
   - `lib.test.ts`: covers it.
   - Check: keyboard open and close; JSON-LD valid in the Schema.org validator.
10. **`feat(layout): section order, nav and indexes`.**
    - `index.astro`: new order.
    - `Header.astro`: nav becomes Eventos · Videos · Preguntas · Contacto.
    - Section indexes become 01–06.
    - `Contact.astro`: uses the quote template.
    - `DESIGN.md`: any new token roles.
    - `docs/07`: lists the content Eddy must send.
    - Check: every anchor scrolls to its section, below the header.
11. **`chore(release): 0.2.0`.**
    - `CHANGELOG.md`: `Added` covers weddings, quote links, proof, process, testimonials and FAQ; `Changed` covers the hero headline, vertical videos and section order.
    - `package.json`: version 0.2.0.
    - Final full check: Lighthouse mobile ≥ 95 in all four categories.
