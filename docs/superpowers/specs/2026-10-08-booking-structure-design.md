# Booking-focused page structure: design

Benchmark and gap analysis: [`audits/2026-10-08-design-benchmark.md`](../audits/2026-10-08-design-benchmark.md).

## Problem

The page looks professional, but it doesn't sell like the event-DJ sites that win bookings:

- **It offers no proof.** There are no numbers, no testimonials and no ratings.
- **The `h1` doesn't name the offer or the city.**
- **The best video is cropped.** The 9:16 event clip sits in a 16:9-ish card, and a music video comes first.
- **Event cards lead nowhere.** None of them has an action.
- **Buyers' questions go unanswered:** what's included, how booking works, travel and music requests.
- **Weddings are missing,** although they are the largest event-DJ market and `docs/00` lists them.

## Decisions (Iván, 2026-10-08)

- **Full structure:** every section from the audit. The visual identity (black/gold, Sora/Manrope, beams, glass) stays as it is.
- **Add weddings** as a fourth event type and as an SEO keyword.
- **No price.** Every quote goes through WhatsApp.
- **The hero keeps the photo.** No video loop, to protect LCP on 4G.

## New page order

| # | Section | Component | Change |
|---|---------|-----------|--------|
| — | Hero + marquee | `Hero.astro` | `h1` names the offer and the city; the lead is cut to about 2 lines on mobile; "Bodas" goes into the marquee |
| — | Proof strip | `Proof.astro` (new) | 3 stats under the hero; hidden while there are none |
| 01 | Eventos | `Services.astro` | 4 types (adds weddings); every card opens WhatsApp prefilled with that type |
| 02 | En acción | `Videos.astro` | 9:16 cards, any number of videos, real-event clip first |
| 03 | Cómo trabajo | `Process.astro` (new) | "What's included" list + 3 booking steps |
| 04 | Testimonios | `Testimonials.astro` (new) | Quotes with first name and event type; hidden while there are none |
| 05 | Preguntas | `Faq.astro` (new) | Native `<details>` accordion + `FAQPage` JSON-LD |
| 06 | Contacto | `Contact.astro` | WhatsApp message becomes a short template (type, date, city, guests) |

The nav becomes Eventos · Videos · Preguntas · Contacto. Events now come before videos, because a visitor first needs to see that their kind of event is covered.

### Content rules

- **No invented facts.** Every new piece of copy comes from what the site already claims: own sound and lighting, salsa clásica y romántica, crossover, sets built with the client's music, base in Cali, travel across Colombia, same-day reply.
- **Missing facts hide their block.** Facts that only Eddy can give (stats, testimonials, payment terms, booking lead time) live in `src/data/site.ts` as arrays that start **empty**, and a section or strip with no data doesn't render. The live site (currently deployed with `pnpm build`) therefore never shows `[PLACEHOLDER]` text. `docs/07` lists what to send.
- **Stats must stay true over time:** "+N eventos", "N años", "5 ciudades". Never "temporada 2026".
- **No rating markup.** Self-published reviews aren't eligible for review rich results on a business's own site, so `AggregateRating` and `Review` JSON-LD are left out. Testimonials are plain content.

### Data model (`src/data/site.ts`)

```ts
stats: readonly { value: string; label: string }[]            // [] until Eddy confirms
testimonials: readonly { quote: string; name: string; event: string }[]  // []
included: readonly string[]                                    // filled from existing claims
faq: readonly { question: string; answer: string }[]           // only answerable ones
videos: readonly Video[]                                       // was a fixed pair
```

The process steps are fixed UX copy, so they stay inside `Process.astro`, as the marquee items stay inside `Hero`. The weddings entry goes in `services.json` with no image, so it uses the existing gradient fallback until a photo arrives as `evento-4.webp`.

### WhatsApp messages

`src/lib/whatsapp.ts` gains `buildQuoteMessage(eventType?: string)`. It returns:

> Hola Eddy, quiero cotizar {tipo | un evento}.
> Fecha:
> Ciudad:
> Invitados:

It is pure and tested. The event cards pass their title, and Contact, Header and the floating button pass nothing.

### FAQ (first version, answerable today)

1. ¿Viajas fuera de Cali? (base Cali, travel cities, rest of Colombia)
2. ¿Llevas sonido e iluminación? (yes, own equipment)
3. ¿Qué música pones? (salsa clásica y romántica, crossover, read the floor)
4. ¿Puedo pedir canciones? (the set is built with your music and your guests')
5. ¿Cómo reservo? (WhatsApp with date, city and type; proposal the same day)

Payment terms and booking lead time are added once Eddy answers.

## Alternatives rejected

- **A muted video loop in the hero.** Rejected by Iván, because it costs LCP on 4G.
- **A "desde" price.** Rejected by Iván.
- **`[PLACEHOLDER]` strings for stats and testimonials.** They would show up on the live site, because Vercel builds with `pnpm build`. Empty arrays plus hidden sections fail safe.
- **New content collections** for FAQ and testimonials. A typed array in `site.ts` is enough for 3–6 items.
- **A sticky bottom booking bar.** The floating WhatsApp button already does that job.
- **An enquiry form.** It needs a backend, and WhatsApp is the conversion goal (`docs/00`).

## Constraints

- **No new dependencies and no new JavaScript.** The accordion is `<details name="faq">` (exclusive by default since Baseline 2024). Every new section is plain HTML and CSS.
- **Colors only through semantic tokens** (the test enforces it). A new role goes into `tokens.css` and `DESIGN.md`.
- **SEO:**
  - one `h1`; each new section uses an `h2` from `SectionHeading`;
  - `keywords` and `tagline` add weddings, and the tagline stays ≤ 155 chars;
  - JSON-LD adds `FAQPage` built from `site.faq`;
  - Lighthouse mobile stays ≥ 95 in all four categories.
- **Accessibility:**
  - stats use a `<dl>`;
  - testimonials use `<blockquote>` + `<cite>`;
  - every new link and summary is ≥ 44 px tall and shows `:focus-visible`.
- `SectionHeading`'s `index` type widens to `'01'…'06'`.

## Mobile (390 px first)

- **Hero:** the `h1` is two display lines and the lead stays within about 3 lines. The WhatsApp CTA and the top of the photo are visible without scrolling on a 390×844 screen.
- **Proof:** 3 stats in one row (value in display font, label ≤ 2 lines at 12 px).
- **Events:** the existing row cards gain a full-width "Cotizar" link. The whole card stays a single tap target.
- **Videos:**
  - cards are 9:16 at about 240 px wide, in a sideways row that snaps into place, with the next card peeking in;
  - the tap facade stays, so nothing loads until tapped;
  - horizontal videos play with `object-fit: contain`.
- **Process:** the included items form a single-column check list; the steps are a numbered vertical list.
- **Testimonials:** a sideways row that snaps, one quote per screen width minus the peek.
- **FAQ:** full-width `<summary>` rows, ≥ 44 px tall.
- **Desktop (≥ 1024 px):**
  - videos become a 3–4 column grid;
  - Process uses two columns;
  - testimonials use a 3-column grid.

## Out of scope

- Eddy's real content: stats, testimonials, more clips, a wedding photo, payment and lead-time answers. `docs/07` lists them.
- Switching Vercel to `pnpm build:release`. That's a separate decision, because it blocks deploys until `sampleData = false`.
- Visual identity changes, light theme, pricing, forms, multi-language.
