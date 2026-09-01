# Parte 4 · Componentes

Orden en `index.astro`:
`Header → main[ Hero (+Marquee) → Videos → Events → Contact ] → Footer → WhatsAppButton`.
Cada sección tiene `id` (`videos`, `eventos`, `contacto`) y un `<h2>`; el
`<h1>` es único (hero). Los estilos van scoped en cada `.astro`; los valores
salen de `tokens.css` (Parte 2). "D" = escritorio ≥1024, "M" = móvil.

## `BaseLayout.astro`
- Props: `title: string`, `description: string`, `ogImage?: string`.
- `<html lang="es">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<meta name="theme-color" content="#070604">`.
- Importa `@fontsource-variable/sora`, `@fontsource-variable/manrope`, `tokens.css`, `global.css`.
- Skip link "Saltar al contenido" → `#main` (visible al enfocar).
- SEO y JSON-LD según Parte 5.

## `Header.astro`
- Píldora `.glass` **fija** (`position: fixed; z-index: 20`), animación `rise`.
- D: 1120×68, centrada, `top: 24px`, padding `0 12px 0 28px`; wordmark · enlaces (Videos, Eventos, Contacto) · botón gold "Reservar fecha" (46px, icono WhatsApp 16).
- M: `inset: 14px 14px auto`, alto 56, padding `0 6px 0 18px`; wordmark · botón "Reservar" (44px) · botón menú 44×44.
- Menú M: **Popover API nativa**: `<button popovertarget="nav-menu">` y `<nav id="nav-menu" popover>` con los 3 enlaces (cada uno ≥ 48px alto) en una tarjeta `.glass` bajo la nav. Sin JS. Al pulsar un enlace el popover se cierra (`popovertargetaction="hide"` en cada `<a>` no aplica; usar `<a>` dentro de un `<form method="dialog">` no procede: basta con que la navegación por ancla y `:popover-open` convivan — comprobar en Safari 17+; si no cierra, añadir `hidden` toggle de 3 líneas como única excepción de JS).
- Enlaces con `scroll-margin-top` en las secciones destino (D 120px, M 90px) y `scroll-behavior: smooth` en `html` (respetando reduced-motion).

## `Hero.astro`
- Contenedor `position: relative; overflow: hidden`; fondo de Parte 2; capa `.grain`; D añade rejilla tenue.
- **Haces de luz**: contenedor D `right: 60px; width: 620px; height: 100%`, M `inset: 0` sobre el bloque de la foto; tres `.beam` en `left: 18% / 42% / 66%` (M `20/50/80%`), delays `0 / -2.5s / -5s`, el segundo con `opacity: .7`; suelo `radial-gradient(ellipse at 50% 100%, rgba(212,175,55,.35), transparent 70%)` alto 320 (M 220).
- **Foto** (`astro:assets` `<Image>` de `src/assets/hero.jpg`, `loading="eager"`, `fetchpriority="high"`, `widths=[520,1040]`): D `absolute; right: 96px; top: 150px; 520×660; rotate(4deg); radius 32`; borde `--border-gold-35`, sombra `--shadow-card`, degradado inferior `rgba(7,6,4,0)→.85`; caption dentro: etiqueta 12px uppercase .55 + "En cabina, {city}" Sora 600 22px. M: bloque en flujo de 470px alto, tarjeta `left/right: 32px; top: 24px; height: 420px; rotate(3deg); radius 28`. Animación `fadeRight` (delay .4s).
- **Texto** D: `absolute; left: 80px; top: 200px; max-width: 900px; gap: 36px`. M: flujo `padding: 104px 20px 0; gap: 20px`.
  1. Badge `.glass` píldora 40px (M 36): punto verde 8px con `box-shadow: 0 0 12px` + "Agenda 2026 abierta · bodas, privadas y corporativos" (M solo "Agenda 2026 abierta").
  2. `<h1>`: "Enciende" `<br>` `<span>` "tu evento." (tokens H1).
  3. Párrafo (`max-width: 440px`, M 320): "Sets a medida, sonido e iluminación propios y una lectura de pista que no deja a nadie sentado. Base en {city}, disponible para viajar." (M versión corta).
  4. Botones: primario gold degradado 60px (M 56, ancho completo) "Escríbeme por WhatsApp" con icono 20; secundario `.glass` 60px (M 52) "Ver en acción" con Play 18 → `#videos`. D en fila `gap: 16px`; M en columna `gap: 10px`.
- Alto D: 900px. Marquesina al pie (componente aparte).

## `Marquee.astro`
- Props: `items: readonly string[]` (por defecto: Bodas, Fiestas privadas, Eventos corporativos, Sonido e iluminación, Open format; M omite "Open format" y acorta "Corporativos").
- Banda 64px (M 52 / 48 tras la foto), bordes superior e inferior `--border-gold-25`, fondo `rgba(7,6,4,.6)`; pista `.marquee` con el contenido **duplicado** para el bucle; separador `◆` en `rgba(212,175,55,.4)`; padding por ítem `0 28px` (M 18–20).
- `aria-hidden="true"` en la copia duplicada; el listado real también existe como texto accesible (`<ul>` con `sr-only`).

## `SectionHeading.astro`
- Props: `index: '01' | '02' | '03'`, `label: string`, `title: string`, `lead?: string`, `align?: 'split' | 'stack'`.
- Eyebrow: índice Sora `opacity: .6` · regla 32×1px gold (M 24) · label. Título H2 tokens.
- `split` (D): título a la izquierda, `lead` a la derecha `max-width: 360px; text-align` inicio, alineados al pie.

## `Videos.astro`
- Props: `videos: readonly [Video, Video]`, `socialsUrl: string` (Instagram).
- D: sección `padding: 128px 80px`; grid `minmax(0,1.75fr) minmax(0,1fr)`, `gap: 24px`. Columna 1: tarjeta 620px alto. Columna 2: tarjeta flexible + bloque gold "Más clips" 128px con "Instagram · TikTok · YouTube" y `ArrowUpRight` 28 → `socialsUrl`.
- M: cabecera con "Desliza →" (12px, muted); **carrusel** `.snap` (`overflow-x: auto; scroll-snap-type: x mandatory; gap: 14px; padding: 0 20px 8px`; ítems `flex: 0 0 300px; scroll-snap-align: start`; scrollbar oculta); tarjetas 380px alto; tercera tarjeta gold "Más clips" 380px.
- Tarjeta de video (`.card.video`, radius 28 / M 24, borde `--border-gold-22`, fondo `--gradient-card` / `--gradient-card-alt`, `.grain`):
  - Contenido: **fachada** `<button class="facade" data-embed="https://www.youtube-nocookie.com/embed/{id}?autoplay=1" aria-label="Reproducir: {title}">` con `<img src="https://i.ytimg.com/vi/{id}/hqdefault.jpg" alt="" loading="lazy">` (opacidad .7) y el botón `.play .glass` (D 104px principal / 80px secundaria, M 72px; hover: fondo gold .9, `scale(1.12)`, icono oscuro). Un script inline en la sección sustituye el botón por el `<iframe>` al pulsar (`allow="accelerometer; autoplay; encrypted-media; picture-in-picture"`, `allowfullscreen`, `title` = aria-label).
  - Caption `.glass` inferior (`inset: auto 24px 24px`, radius 18; M `12px`, radius 14): etiqueta gold uppercase + `<h3>` título + duración (13px muted, solo D); `pointer-events: none` para no tapar el botón.

## `Events.astro`
- Obtiene la colección `events` (filtro/orden/límite de Parte 3). Cabecera `02 · Agenda · Próximos eventos`.
- D: `padding: 32px 80px 128px`; grid 3 columnas `repeat(3, minmax(0, 1fr))`, `gap: 24px`, contenedor `.focus-group`. Tarjeta `.card` 520px alto, radius 28, `padding: 28px`, contenido al pie:
  - Imagen: `<Image>` `absolute inset 0; object-fit: cover` + degradado inferior; sin imagen → `--gradient-event-a/b` alternado + `.grain`.
  - Badge fecha `absolute; top: 24px; left: 24px`, radius 16, fondo gold, texto `#070604`: numeral 32px Sora 800 sobre mes 12px uppercase .16em.
  - `<h3>` título 26px; meta "{venue} · {city} · {time}" 15px muted.
  - Si `url`, toda la tarjeta es `<a>` (con `aria-label`).
- M: lista `.focus-group` en columna `gap: 12px`; fila `.card` radius 20, `padding: 14px`, `gap: 16px`: miniatura 96px ancho (radius 14; badge fecha centrado sobre la miniatura: numeral 30 + mes 10px .2em en `--color-gold-light`) · bloque texto (`<h3>` 18px, meta 13px "{venue} · {time}") · `ArrowUpRight` 20 gold a la derecha; `min-height: 96px`.
- Estado vacío (Parte 3): tarjeta `.glass` con texto y botón WhatsApp.

## `Contact.astro`
- Cabecera `03 · Contacto`. D: `padding: 0 80px 128px`; glow radial 900×500 centrado detrás (`rgba(212,175,55,.22)`); tarjeta `.glass` radius 36, `padding: 72px`, grid 2 columnas `gap: 64px` alineadas al centro.
  - Izquierda: eyebrow, `<h2>` "Reserva`<br>`tu fecha.", párrafo "Cuéntame qué celebras, dónde y cuándo. Te respondo el mismo día con disponibilidad y propuesta.", botón primario WhatsApp 60px.
  - Derecha: lista `<ul>` de tres filas (`padding: 24px 28px`, radius 20, fondo `--color-surface-row`, borde `--border-gold-16`, `gap: 16px` entre filas): WhatsApp (número formateado, `<a>` wa.me) · Correo (`<a mailto>`) · Base ("{city} · disponible para viajar", sin enlace). Las dos primeras llevan `ArrowUpRight` 22 gold.
- M: `padding: 64px 20px 0`; tarjeta radius 28, `padding: 28px 22px`, columna `gap: 20px`; H2 44px; botón 56px ancho completo; filas `min-height: 64px; padding: 14px 18px`, radius 16 (todo el área es el enlace).
- Número mostrado tal cual `site.whatsapp.display` (p. ej. `+57 300 123 4567`); el enlace usa `site.whatsapp.number` (E.164).

## `Footer.astro`
- D: `padding: 72px 80px 40px`, borde superior `--border-gold-20`, fondo `--color-bg-footer`, `overflow: hidden`.
  - Fila 1: wordmark 24px + párrafo (max 360px) "DJ para bodas, fiestas privadas y eventos corporativos. {city} y donde haga falta." · a la derecha "Sígueme" (12px uppercase .2em) y 4 píldoras sociales `.glass` 48px (`padding: 0 20px 0 14px`, icono 20 gold + label 14px 600) con `target="_blank" rel="noopener"`.
  - Wordmark gigante `.wordmark` "DJ EDDY" 220px (tokens), `aria-hidden="true"`, `user-select: none`, `margin-top: 56px`.
  - Fila 3: `margin-top: 40px; padding-top: 24px`, borde `--border-gold-14`; "© {año} {legalName}. Todos los derechos reservados." · "{city} · {email}".
- M: `padding: 44px 20px 28px`; sociales en grid 2×2 `gap: 10px` (píldoras centradas 48px); wordmark 88px `margin-top: 28px`; copyright en dos líneas 12px.
- El año se calcula en build (`new Date().getFullYear()`).

## `WhatsAppButton.astro`
- `<a>` **fijo** `bottom: 24px; right: 32px` (M `right: 16px`), `z-index: 30`, `.pulse`, fondo `--color-whatsapp`, sombra `--shadow-float`, `aria-label="Escríbeme por WhatsApp"`.
- D: píldora 60px `padding: 0 22px 0 8px`, `gap: 12px`: círculo 44px `rgba(255,255,255,.28)` con icono 26 + texto "Escríbeme" 15px 700, ambos en `--color-bg` (el blanco sobre el verde de WhatsApp da 1,98:1 y falla AA).
- M: círculo 60×60, icono 30.
- En el diseño está dibujado en el primer pliegue por ser una maqueta; en el sitio real es `position: fixed`.

## Iconos (`src/components/icons/*.astro`)
- Cada icono: `interface Props { size?: number; class?: string }`, `aria-hidden="true"`, `focusable="false"`, `viewBox="0 0 24 24"`, color heredado. Paths tal cual están en `design/Main.dc.html`.

## Criterios de aceptación (por componente)
- [ ] Coincide píxel a píxel con el artboard correspondiente a 1440 y a 390 (comparar capturas).
- [ ] Todo enlace/botón ≥ 44px de alto en móvil; foco visible (anillo gold 2px `outline-offset: 3px`).
- [ ] `Header` no tapa los títulos al navegar por ancla (`scroll-margin-top`).
- [x] Sin JS de aplicación (dos scripts inline documentados: cierre del popover y fachada de video).
- [ ] Textos de negocio proceden de `site.ts`/`events.json`, no del componente.
