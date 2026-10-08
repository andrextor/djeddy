# New videos first: plan

Spec: [`specs/2026-10-08-new-videos-design.md`](../specs/2026-10-08-new-videos-design.md) · Branch: `feat/new-videos` (from `main` at `0c3523c`) · Status: **approved 2026-10-08**

## How every task is checked

1. **`pnpm ci:check` passes.**
2. **390 px pass, then 1440 px.** Use the iframe screenshot method from the booking-structure plan.
3. **No `<video>` or `<iframe>` in `dist/index.html` before a tap.**

## Tasks

1. **`docs: new videos spec and plan`.** Commits the spec and this plan, renamed to `ok-`.
2. **`feat(videos): add presentation and brand activation clips`.**
   - Encode both masters with the exact settings from the spec into `public/videos/`.
   - Extract one poster frame per clip into `src/assets/`.
   - `src/data/site.ts`: two `FileVideo` entries, put first.
   - Check:
     - both MP4s play in Chrome and Safari with sound;
     - `ffprobe` shows `faststart` (moov before mdat);
     - the sizes match the spec (±10 %);
     - JSON-LD has 4 `VideoObject`s.
3. **`feat(layout): videos before events`.**
   - `src/pages/index.astro`: Videos before Services.
   - `Videos.astro` gets index `01`; `Services.astro` gets `02`.
   - `Header.astro`: nav becomes Videos · Eventos · Preguntas · Contacto.
   - `Videos.astro` desktop: a 4-column grid with "Más clips" as a full-width bar below; mobile is unchanged.
   - Check: the anchors work, and at 1440 px there is no horizontal scroll.
4. **`chore(release): 0.3.0`.**
   - `CHANGELOG.md`: `Added` covers the two new clips; `Changed` covers videos first and the desktop grid.
   - `package.json`: version 0.3.0.
