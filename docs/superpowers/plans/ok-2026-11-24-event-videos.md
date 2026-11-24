# Event videos: plan

Spec: [`specs/2026-11-24-event-videos-design.md`](../specs/2026-11-24-event-videos-design.md) · Branch: `feat/event-videos` (from `main` at `1512278`) · Status: **approved 2026-11-24**

## How every task is checked

1. **`pnpm ci:check` passes.**
2. **390 px pass, then 1024 and 1440 px.**
3. **No `<video>` or `<iframe>` in `dist/index.html` before a tap.**

## Tasks

1. **`docs: event videos spec and plan`.** Commits the spec and this plan, renamed to `ok-`.
2. **`feat(videos): add two live event clips`.**
   - Encode both clips with the settings from the spec into `public/videos/dj-eddy-evento-en-vivo-{1,2}.mp4`.
   - Extract one poster per clip into `src/assets/dj-eddy-evento-en-vivo-{1,2}-poster.jpg`.
   - `src/data/site.ts`: two `FileVideo` entries in positions 2 and 3.
   - Delete `src/assets/WhatsApp Unknown 2026-11-24 at 8.59.31 AM.zip`. It was never tracked.
   - Check:
     - `ffprobe` shows `moov` before `mdat`;
     - the sizes match the spec (±10 %);
     - JSON-LD has 5 `VideoObject`s;
     - both clips play with sound after a tap.
3. **`feat(videos): "Presentes en tus grandes eventos" heading, 3-column desktop grid`.**
   - `src/components/Videos.astro`:
     - the title becomes "Presentes en tus grandes eventos";
     - the `@media (min-width: 1280px)` grid goes from 4 to 3 columns.
   - Check:
     - at 390 px the heading wraps without overflow;
     - at 1440 px there are 2 full rows of 3 and no horizontal scroll.
4. **`chore(release): 0.5.0`.**
   - `CHANGELOG.md`:
     - `Added`: the two event clips.
     - `Changed`: the new heading and the 3-column grid.
   - `package.json`: version 0.5.0.

## Revision 1: card size (approved 2026-11-24)

Iván saw on a laptop that the cards are too big: one card fills the screen, and the header covers it. See spec decision 6 (revised).

5. **`fix(videos): smaller desktop cards, more-clips bar`.**
   - `src/components/Videos.astro`:
     - from 1024 px, 3 columns;
     - from 1280 px, 5 columns;
     - from 1280 px, `.more` spans the full row as a 128 px horizontal bar (icon left, text right).
   - Check:
     - at 390 px nothing changes;
     - at 1024, 1280, 1440 and 1920 px, the whole card (including the video controls) fits under the header without scrolling;
     - there is no horizontal scroll;
     - `pnpm ci:check` passes.
6. **`chore(release): 0.5.0`** is amended so the `Changed` entry describes the final grid.

Deviation, found in the 1280 px check: five columns left ~205 px cards, and the titles wrapped to 4 lines over the poster. Five columns now start at 1440 px. Between 1024 and 1439 px there are 3 columns, with the grid capped at 1080 px wide so a card never grows past ~344 × 611 px. "Háblame Carangano · DJ Eddy" was shortened to "Háblame Carangano" so its caption matches the others.

The bar selector is `.layout > .more`: Astro compiles `.layout > *` to `.layout[cid]>[cid]`, which outranks `.more[cid]` and kept the 9:16 ratio.
