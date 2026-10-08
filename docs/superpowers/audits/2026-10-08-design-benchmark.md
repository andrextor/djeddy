# Design benchmark: DJ Eddy vs professional DJ sites

Date: 2026-10-08. Scope: page structure, sections, video, conversion. Looked at the built site at 500 px (headless minimum) and 1440 px, plus 12 professional DJ sites.

## Sites studied

**Touring / club DJs:** what they're for is fans, not bookings.

- [Peggy Gou](https://www.peggygou.com): media player as the hero.
- [Fred again..](https://www.fredagain.com): a photo grid.
- [Martin Garrix](https://www.martingarrix.com): tour dates.
- [Keinemusik](https://www.keinemusik.com): releases and news.
- [Diplo](https://www.diplo.com): YouTube thumbnail cards of full 1–2 h sets.

Lesson: consistent, strong imagery; link out to players instead of embedding them.

**Booking-focused event DJs:** the real reference.

- [DJ Will Gill](https://djwillgill.com): review count and press up front, a "Seen on" logo strip, testimonials from named companies.
- [DJ Elio](https://www.djelio.com): "500+ events" and "100+ 5-star reviews", a price range, reels of real weddings.
- [Soulful Sounds](https://www.soulfulsounds.com): a muted video near the top, a short enquiry form.
- [Miami Party DJ](https://www.miamipartydj.com): Latin market. Services by event type (weddings, quinceañeras, corporate, Hora Loca), a 4.9 Google rating, add-ons such as cold sparks and an LED wall.
- [Sunset DJ](https://www.sunsetdj.net): a headline naming the offer and the area, the booking process in steps.
- [London's DJ](https://www.londonsdj.uk): a client logo strip, a named contact promising a reply "within the hour", routing by event type.
- [bodas.net listing](https://www.bodas.net/musica/dj-para-eventos--e29980): the Spanish-speaking buyer's reference. It shows a "Desde 400 €" price, 249 reviews at 4.9, what the wedding pack covers, and an FAQ (travel, 50/50 payment, how far ahead to book).

## Section order that converts for event DJs

hero (offer + place + one CTA) → proof with numbers → event types → short real-event video → what's included → testimonials → process → FAQ → final CTA → footer.

## Where DJ Eddy stands

Current order: hero → marquee → videos (2) → event types (3) → contact → footer, plus a floating WhatsApp button.

| # | Area | Today | Pros do | Gap |
|---|------|-------|---------|-----|
| 1 | **Social proof** | None: no numbers, testimonials, clients or reviews | All booking sites put proof right under the hero | **Biggest gap.** Nothing tells a stranger from TikTok that Eddy is trustworthy |
| 2 | **Hero headline** | `h1` "Enciende tu evento." The offer and the city are only in a 6-line paragraph | Headline says offer + place ("DJ para eventos en Cali") | Weaker for SEO (the `h1` has no keyword), and the long lead pushes the photo below the fold on mobile |
| 3 | **Video format** | Two 16:9 cards. The event clip is **vertical 540×960** and gets cropped. The first video is a 3:39 music video, not an event | Short 9:16 clips of real crowds, the format visitors just came from | The strongest material (a packed floor) is cropped and second in line |
| 4 | **Event types** | 3 cards with no action | Each type has its own CTA, often with a prefilled message | Interest in a card goes nowhere; the visitor has to scroll to contact |
| 5 | **What's included** | One line in the lead ("sonido e iluminación propios") | An explicit list: equipment, lighting, hours, MC, add-ons | Buyers can't compare offers |
| 6 | **Process / FAQ** | None | 3–4 steps plus an FAQ (travel, payment, lead time, song requests) | Unanswered questions mean a WhatsApp chat that never starts |
| 7 | **WhatsApp message** | One generic message ("quiero reservar una fecha") | Asks for type, date, city, guests | Eddy has to ask everything again in the chat |
| 8 | **Weddings** | Not offered. `docs/00` lists "bodas" as a target | The largest event-DJ market | Needs the owner's decision |
| 9 | **Contact** | Good: WhatsApp first, same-day reply promise, base city | Same | Keep |
| 10 | **Floating CTA, performance, a11y** | Floating button, 0 KB of app JS, video facades, AA contrast | Same or worse | Keep. Many pro sites are slower than this one |

Visual identity (black/gold, Sora, beams, glass) is distinctive and already matches the touring-DJ bar. The redesign is about **structure and content, not the look**.

## Anti-patterns to keep avoiding

- Audio that plays without a tap.
- Heavy YouTube or SoundCloud players loaded up front (the facade already solves this).
- Date-bound copy ("Now booking 2026", agendas).
- Several CTAs competing in the hero.
- Unsourced badge walls.
- Long forms.

## Recommended new structure (mobile, 390 px)

1. **Hero:**
   - `h1` with the offer + Cali, a two-line lead.
   - One WhatsApp CTA.
   - The photo stays (a muted hero loop is optional and costs weight; see below).
2. **Proof strip:** 3 numbers that stay true over time (events, years, cities), then the Google rating if there is one.
3. **Events:** event-type cards, each opening WhatsApp with a message prefilled for that type.
4. **In action:** a sideways-scrolling row of 9:16 clips behind facades. One horizontal video at most, or a link out.
5. **What's included:** a short list (sound, lighting, music genres, MC/animation, hours, travel).
6. **Testimonials:** 3 quotes with first name and event type.
7. **How it works:** 3 steps (write on WhatsApp → proposal the same day → your event).
8. **FAQ:** 5–6 questions in native `<details>`, no JS.
9. **Contact** (as today) and footer.

Note: Google has shown FAQ rich results only for government and health sites since 2023. The FAQ is worth having as content (buyers, AI answers) but won't produce a rich snippet. The `FAQPage` JSON-LD is cheap, so it can stay optional.

## Content the owner must supply

- Number of events and years of experience.
- 3 real testimonials.
- Google Business rating and review count, if any.
- 2–4 more vertical event clips.
- What's included.
- Whether weddings are offered.
- Whether to show a "desde" price.

Until it arrives, everything uses the existing `[PLACEHOLDER]` mechanism, and the release gate blocks publishing.
