# Event videos: design

Follows [`2026-10-08-new-videos-design.md`](2026-10-08-new-videos-design.md).

## Problem

Eddy sent two clips from a real event (WhatsApp, received 2026-11-23). He wants them on the page with a copy like "Estamos presente en tus grandes eventos".

| Source (zip in `src/assets/`) | Length | Size | What it shows |
|---|---|---|---|
| `WhatsApp Video … 8.24.27 PM.mp4` | 1:14 | 15.8 MB | Eddy on the mic in the booth, the outdoor plaza with lights, a kids' inflatable, the venue sign (Yonkers Grill and Drinks), the DJ Eddy logo at the end. |
| `WhatsApp Video … 8.24.48 PM.mp4` | 1:00 | 11.4 MB | Eddy at the decks and on the mic, the plaza and the guests at the tables. |

Both are vertical 480×864 (WhatsApp compression). This is lower than the current clips (720×1280), but the cards show them at 240–300 px wide, so the difference is not visible until fullscreen.

## Decision

1. **Copy.** The section title "En acción" becomes **"Presentes en tus grandes eventos"**. This fixes the agreement: "Estamos presente**s**", and "Presentes" is shorter. The eyebrow stays `01 · Videos`. The h2 keeps the hierarchy, and "eventos" in the heading helps SEO. At 40 px it wraps to 3 lines at 390 px, which is acceptable for a section opener.
2. **Clip order:**
   1. Presentación
   2. **Evento en vivo 1 (new)**
   3. **Evento en vivo 2 (new)**
   4. Activación de marca
   5. Háblame Carangano

   The pitch clip stays first. The real-event clips come next because they prove the new heading.
3. **Web encodes** in `public/videos/`. H.264 High, yuv420p, CRF 26, AAC 128 k, `+faststart`, native 480×864 (no upscale). Measured sizes:

   | Clip | File | Size |
   |---|---|---|
   | Evento en vivo 1 | `dj-eddy-evento-en-vivo-1.mp4` | 6.8 MB |
   | Evento en vivo 2 | `dj-eddy-evento-en-vivo-2.mp4` | 9.0 MB |

   Both stay behind the tap facade: 0 bytes before a tap.
4. **Posters.** One frame per clip, JPG in `src/assets/` (`dj-eddy-evento-en-vivo-1-poster.jpg`, `…-2-poster.jpg`). The frame shows Eddy in the red jacket at the booth, not the venue sign.
5. **Data.** Two `FileVideo` entries in `site.ts`:
   - Titles: "Evento en vivo en Cali" and "En cabina, noche de evento".
   - Durations: `1:14` and `1:00`.
   - `uploadDate: '2026-11-24'`.

   JSON-LD then emits 5 `VideoObject`s.
6. **Desktop grid (revised after review).** The first version used 3 columns from 1280 px. Iván found the cards too big: at a ~1470 px laptop each card was ~420 × 745 px, almost the whole viewport, so the fixed header covered the video and its controls. The new rule is that **a card must fit the viewport with room to spare**:

   | Width | Videos | "Más clips" | Card size |
   |---|---|---|---|
   | 1024–1439 px | 3 columns, grid capped at 1080 px wide | 6th grid cell (2 full rows) | ~270 × 480 px at 1024, ≤ 344 × 611 px |
   | ≥ 1440 px | 5 columns (all in one row) | full-width gold bar under the row, 128 px tall (the original canvas bar) | ~240 × 430 px at 1440 |

   240 px is the mobile card width, where the captions are already checked.

## Alternatives rejected

- **A new separate section for this event.** It adds a section and a nav item for two clips. The existing video row already does the job.
- **Using the copy as the video caption.** It is too long for a 240 px card and repeats on each card.
- **Upscaling to 720p.** It adds bytes and no detail.
- **Fixed-width cards in a horizontal swipe row on desktop.** A mouse wheel can't scroll it sideways.
- **4 columns.** It leaves an orphan fifth video on its own row.
- **Dropping an old clip.** Nobody asked for it, and the clips weigh nothing until tapped.

## Constraints

- No new dependency. ffmpeg is used locally only.
- CSP is unchanged: same origin, `media-src 'self'`.
- The venue sign (Yonkers Grill and Drinks) appears in clip 1. This assumes Eddy has the venue's OK. Flag it to him.
- The zip and the raw WhatsApp files are not committed. The zip is deleted after the encodes, as Iván asked.

## Mobile

At 390 px:

- The swipe row is unchanged (240 px cards, the next one peeking in). It now holds 5 videos + "Más clips".
- The heading wraps to 3 lines with no overflow and no horizontal scroll.
- The two new clips play inline (`playsinline`) with sound after a tap.

## Out of scope

- Re-shooting or getting higher-resolution masters (asking Eddy for the originals would improve fullscreen quality).
- Trimming the clips.
- Uploading them to YouTube.
