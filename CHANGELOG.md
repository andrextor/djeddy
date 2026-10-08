# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-10-08

### Added

- **Weddings** as a fourth event type, with "DJ para bodas" in the page keywords.
- **Quote links on every event card:** each one opens WhatsApp with a message ready to fill in (event type, date, city, guests). The other WhatsApp buttons use the same template.
- **"Cómo trabajo" section:** what is included and the three steps to book.
- **Questions section** with five answers about travel, equipment, music, song requests and booking, also published as `FAQPage` structured data.
- **Stats strip and testimonials section,** both hidden until Eddy's real figures and quotes are added (see `docs/07`).

### Changed

- **Hero headline** now says "DJ en Cali para bodas y eventos", and the intro is shorter so the button and photo fit on the first phone screen.
- **Videos** are shown as vertical 9:16 cards with the live-event clip first; any number of clips is supported.
- **Section order** puts event types before videos, and the menu gains "Preguntas".

## [0.1.0] - 2026-10-08

### Added

- **One-page landing for DJ Eddy**, mobile first: hero with booking call to action, scrolling marquee, video section (YouTube and self-hosted clips that load on tap), services (private parties, brands, corporate events), contact card, footer with social links, and a floating WhatsApp button.
- **SEO foundation:** title and meta description built on local keywords, canonical and Open Graph tags, JSON-LD for the business and its videos, `sitemap-index.xml` and `robots.txt`, all on the production domain.
- **Fast and accessible:** static output with inlined styles, self-hosted fonts, optimized images, WCAG 2.2 AA contrast, keyboard focus everywhere and no animation when reduced motion is requested.
- **Security headers** on Vercel, including a Content Security Policy and long-lived caching for hashed assets.
- **Release gate:** `pnpm build:release` refuses to publish while placeholder or sample client data remains.

### Changed

- **The color palette is defined in two layers** (raw values → named roles) with a documented contrast table. Gold hairline borders now use three opacity steps instead of seven, a change too small to see.
