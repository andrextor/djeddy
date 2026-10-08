# New videos first: plan

Spec: [`specs/2026-10-08-new-videos-design.md`](../specs/2026-10-08-new-videos-design.md) · Branch: `feat/new-videos` (from `main` at `0c3523c`) · Status: **approved 2026-10-08, done**

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

## Result

- `pnpm ci:check` passes.
- No `<video>` or `<iframe>` in the HTML before a tap.
- 3 `VideoObject`s in the JSON-LD.
- Both MP4s have `moov` before `mdat`.

Change requested by Iván after review: the old "En vivo en un evento" clip was removed, together with its MP4 and poster. "Más clips" went back to being the fourth card, so on desktop three videos and that card fill one row.

Deviation, found in the 1024 px check: four columns left the captions cramped over the play button. The grid now uses two columns from 1024 px and four from 1280 px.

The first activation poster (second 12) showed parked cars. It was replaced by the frame at second 5, where Eddy is on the mic.

Not checked here: playback in Safari. The encode is H.264 High / AAC LC / yuv420p, which Safari supports, but it should be confirmed on an iPhone in the Vercel preview.
