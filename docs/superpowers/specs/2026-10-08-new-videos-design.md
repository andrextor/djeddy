# New videos first: design

Follows [`2026-10-08-booking-structure-design.md`](2026-10-08-booking-structure-design.md).

## Problem

Iván delivered two new videos. Both are professionally shot, vertical 1080×1920, and they look better than anything on the page today:

| Master (`~/Desktop/SJEdy/`) | Length | Size | What it shows |
|---|---|---|---|
| `DJ EDDY - DIA 3_4k (1).mp4` | 24 s | 24 MB | Eddy talks to camera with burned-in subtitles: "¿Quieres que tu evento realmente se sienta diferente a los demás? … DJ profesional … Escríbenos y reserva hoy mismo tu evento." It shows the decks, the software and an outdoor setup. Producer outro (HUESOS) at the end. |
| `DJEDDYreel1.mp4` | 42 s | 202 MB | A brand activation: setup, Eddy on the mic, Flexi Auto banner, controller close-ups, a 2000 W speaker, and the DJ Eddy logo at the end. |

Iván wants them first. Today the videos section sits after the events section, so a visitor who arrives from Instagram or TikTok has to scroll past four cards before seeing any video.

## Decision

1. **The video section moves up** and becomes `01`, right after the hero and the stats strip. Events become `02`. This overrides the order from the booking-structure spec: with a 24 s clip where Eddy pitches directly to camera, video converts better than the event cards. The visitor also comes from a video app, so a video is what they expect first. The nav becomes Videos · Eventos · Preguntas · Contacto.
2. **Clip order:**
   1. *Presentación* (Eddy talking).
   2. *Activación de marca* (setup + brand + mic).
   3. *En vivo en un evento* (the only crowd shot).
   4. *Háblame Carangano* (music video).

   All four stay.
3. **Web encodes, made with ffmpeg and committed to `public/videos/`:**

   | Clip | File | Encode | Measured size |
   |---|---|---|---|
   | Presentación | `dj-eddy-presentacion.mp4` | 720×1280, H.264 High, CRF 26, AAC 128 k, `+faststart` | 4.1 MB |
   | Activación | `dj-eddy-activacion-de-marca.mp4` | same at CRF 29 (high motion; checked a close-up crop with no visible artifacts) | 7.6 MB |

   They load only when tapped (existing facade), and `faststart` lets playback begin before the download ends. The masters are not committed.
4. **Posters** are a frame from each clip saved as JPG in `src/assets/` (`dj-eddy-presentacion-poster.jpg`, `dj-eddy-activacion-de-marca-poster.jpg`). Astro resizes them. Each frame is picked where Eddy's face is visible and no subtitle word covers it.
5. **Desktop layout.** Four 9:16 cards fill the row at 1440 px (4 × ~302 px), so "Más clips" moves to a full-width gold bar under the row (the 128 px bar from the original canvas). Mobile keeps the swipe row with "Más clips" as the last card.
6. **Data:** two new `FileVideo` entries in `site.ts`.
   - Titles: "Haz que tu evento se sienta diferente" and "Activación de marca en Cali".
   - Durations: `0:24` and `0:42`.
   - `uploadDate: '2026-10-08'`.

   JSON-LD emits four `VideoObject`s.

## Alternatives rejected

- **Hosting on YouTube** (facade + `youtube-nocookie`). It costs about 1 MB of third-party JS per play and needs CSP, and the self-hosted MP4s are already small. If Eddy uploads them later, swapping `kind: 'file'` for `kind: 'youtube'` is a data change only.
- **Muted autoplay of the presentation.** It's a talking clip, so it needs sound. The hero decision (photo, no loop) stands.
- **Dropping "Háblame Carangano".** It weighs nothing until tapped, and Iván asked to prioritize the new clips, not to remove the old ones.

## Constraints

- No new dependencies; ffmpeg is only used locally to encode.
- Every video stays behind its tap facade: 0 bytes of video before a tap.
- The Flexi Auto brand appears in the activation clip. This assumes Eddy has the client's OK to show their own event; flag it to him.

## Mobile

390 px is unchanged in structure: swipe row, 240 px cards, the next card peeking in, the presentation clip as the first thing below the stats. At 390×844, the top of the first video card should be visible after one short scroll from the hero.

## Out of scope

- Uploading the clips to YouTube.
- Trimming the producer outro.
- New photos or other content from `docs/07`.
