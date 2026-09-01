# Parte 5 · Calidad: SEO, rendimiento, accesibilidad, CI

## SEO (prioridad de primer nivel)

### Estrategia de palabras clave
Consulta objetivo principal: **"DJ en [CIUDAD]"** y variantes de intención
local: "DJ para bodas [CIUDAD]", "DJ para fiestas privadas [CIUDAD]",
"DJ eventos corporativos [CIUDAD]". Reglas:
- La palabra clave principal aparece en `<title>`, `<h1>` o el párrafo del
  hero, la meta description, el `alt` de la foto principal y el JSON-LD.
- Cada `<h2>` de sección contiene la variante que le corresponde de forma
  natural (p. ej. "Próximos eventos" → "Próximos eventos en [CIUDAD]"; el
  copy final se decide con el cliente, sin keyword stuffing).
- Los nombres de archivo de imagen son descriptivos y en minúsculas con
  guiones: `dj-eddy-boda-[ciudad].jpg`, nunca `IMG_0231.jpg`.
- Una landing sola tiene poco texto indexable: proponer al cliente (no añadir
  sin su OK) un bloque breve "Servicios" con tres párrafos (bodas, privadas,
  corporativos) que dé contexto semántico; si acepta, va entre Videos y Agenda.

### Etiquetas y marcado
- `<title>`: "DJ Eddy · DJ para bodas, fiestas y eventos en [CIUDAD]" (≤ 60 chars).
- `<meta name="robots" content="index, follow, max-image-preview:large">` (hecho en Fase 2).
- `<meta name="description">` = `site.tagline` (≤ 155 chars).
- `<link rel="canonical">` desde `Astro.site` + `Astro.url.pathname`.
- Open Graph / Twitter: `og:type=website`, `og:title`, `og:description`, `og:image=/og.jpg` (1200×630), `og:locale=es_ES` (o `es_CO` según país), `twitter:card=summary_large_image`.
- JSON-LD (`<script type="application/ld+json">`, generado con `JSON.stringify` desde `site` en `src/lib/seo.ts`). Entidad principal **negocio local** (mejor para búsquedas "DJ en [CIUDAD]" que `Person`), con `@graph`:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EntertainmentBusiness",
      "@id": "https://[DOMINIO]/#business",
      "name": "DJ Eddy",
      "description": "DJ para bodas, fiestas privadas y eventos corporativos en [CIUDAD].",
      "url": "https://[DOMINIO]",
      "image": "https://[DOMINIO]/og.jpg",
      "telephone": "+[NUMERO_E164]",
      "email": "[CORREO]",
      "address": { "@type": "PostalAddress", "addressLocality": "[CIUDAD]", "addressCountry": "[PAIS_ISO2]" },
      "areaServed": [{ "@type": "City", "name": "[CIUDAD]" }],
      "priceRange": "$$",
      "sameAs": ["[URL_INSTAGRAM]", "[URL_TIKTOK]", "[URL_YOUTUBE]", "[URL_FACEBOOK]"],
      "founder": { "@type": "Person", "name": "Eddy [APELLIDO]", "jobTitle": "DJ" },
      "makesOffer": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DJ para bodas" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DJ para fiestas privadas" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DJ para eventos corporativos" } }
      ]
    },
    { "@type": "WebSite", "@id": "https://[DOMINIO]/#website", "url": "https://[DOMINIO]", "name": "DJ Eddy", "inLanguage": "es", "publisher": { "@id": "https://[DOMINIO]/#business" } }
  ]
}
```
  ~~Cada evento futuro añade al `@graph` un `Event`~~ (eliminado: la sección de eventos ya no lleva fechas). Los dos videos añaden `VideoObject`  (`name`, `thumbnailUrl` = `https://i.ytimg.com/vi/{id}/hqdefault.jpg`, `embedUrl`, `uploadDate` [FECHA]) para elegibilidad de resultados de video.
- Enlaces de anclaje internos (`#videos`, `#eventos`, `#contacto`) con texto descriptivo en la nav; los ids se mantienen en español.
- Los textos de negocio proceden de `site.ts`: cambiar ciudad o servicios actualiza título, description, H1, JSON-LD y footer a la vez.
- `robots.txt` (`Allow: /`, `Sitemap: https://[DOMINIO]/sitemap-index.xml`) y `@astrojs/sitemap` (única integración añadida).
- Un solo `<h1>`; jerarquía `h2 → h3` sin saltos.

## Rendimiento (presupuesto)
| Métrica | Objetivo |
|---------|----------|
| Lighthouse móvil (Performance) | ≥ 95 |
| LCP (foto del hero) | < 2,5 s (4G lenta, Moto G4) |
| CLS | < 0,05 |
| INP | < 200 ms |
| JS de aplicación | 0 KB |
| CSS total | < 25 KB gzip |
| Fuentes | 2 archivos variables woff2, `font-display: swap`, `<link rel="preload">` de ambos |
| Imagen hero | AVIF/WebP, `widths=[520,1040]`, `sizes`, `fetchpriority="high"`, dimensiones explícitas |
| Imágenes de eventos | `loading="lazy"`, `widths=[420,840]` |
| Videos de YouTube | Fachada (miniatura + botón); el iframe `youtube-nocookie` solo tras el clic. Medido: con iframes directos el LCP móvil era 10,2 s y se cargaban 29 peticiones de terceros; con fachada 1,6 s y 2 peticiones (las miniaturas) |

- `backdrop-filter` y `filter: blur()` en `.focus-group` son las operaciones más caras: limitar a las capas indicadas; no animar `filter` en más de 3 elementos a la vez.
- Los haces de luz usan `transform` (compositor). `will-change` solo si se mide jank.

## Accesibilidad (WCAG 2.2 AA)
- Contraste: `--color-text` y `--color-text-muted` sobre `--color-bg` > 7:1; `--color-gold` sobre `--color-bg` ≈ 8,6:1; texto `#070604` sobre gold ≈ 10:1. El gris de copyright del diseño (`#6f685c`) da ≈ 3,9:1 → usar `--color-text-dim: #8a8272` (≈ 5,3:1).
- `prefers-reduced-motion` desactiva todas las animaciones (Parte 2).
- Foco visible en todo control: `outline: 2px solid var(--color-gold); outline-offset: 3px`.
- Skip link, landmarks (`header`, `main`, `footer`, `nav[aria-label]`), `aria-label` en enlaces solo-icono, `aria-hidden` en wordmark decorativo y copia de la marquesina.
- Tamaño táctil mínimo 44×44 en móvil; texto mínimo 12px solo en etiquetas.
- `alt` de la foto hero descriptivo ("DJ Eddy en cabina durante una boda en [CIUDAD]"); imágenes decorativas `alt=""`.
- Los iframes llevan `title`.
- Comprobación: axe DevTools sin violaciones; navegación completa con teclado.

## Resultados medidos (Fase 5, build de borrador, Lighthouse 13 con Chrome headless)
| | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | FCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Móvil (4G lenta, CPU ×4) | 99 | 100 | 96 | 100 | 1,6 s | 0,8 s | 0 | 120 ms |
| Escritorio | 100 | 96 → 100 tras corregir el contraste del botón flotante | 96 | 100 | 0,4 s | 0,2 s | 0 | 0 ms |

Los 96 de "Buenas prácticas" corresponden a errores 404 en consola de las miniaturas de YouTube con IDs de relleno (`[ID_VIDEO_1]`); desaparecen con IDs reales. Peso total transferido: 88 KB en 9 peticiones. Correcciones aplicadas por la auditoría: `inlineStylesheets: 'always'` (el CSS bloqueaba el render), índice de sección `01/02/03` en `--color-gold-dark` (3,9:1 → 6,9:1), lista de contacto como `<ul>` (el `<dl>` con enlaces era inválido), `aria-label` del logotipo eliminado (no coincidía con el texto visible), texto e icono del botón flotante en `--color-bg`.

Cómo repetir: `pnpm build && pnpm preview` y `pnpm dlx lighthouse http://localhost:4321/ --preset=desktop` (o sin preset para móvil).

## Despliegue en Vercel (decisión del cliente)
- Vercel está enlazado al repositorio de GitHub: cada push a `main` despliega producción. El workflow de GitHub Actions (`lint → test → build`) se mantiene solo como validación; no interviene en el despliegue.
- `vercel.json`: framework `astro`, `buildCommand: pnpm build`, `outputDirectory: dist`, cabeceras de seguridad (CSP con `media-src 'self'` para los MP4, `frame-src youtube-nocookie`, `img-src i.ytimg.com`), `Cache-Control` inmutable para `/_astro/*` y 7 días para `/videos/*`.
- Dominio: `astro.config.mjs` toma `SITE_URL` si existe; si no, `https://` + `VERCEL_PROJECT_PRODUCTION_URL` (dominio de producción del proyecto en Vercel, incluido el personalizado cuando se configure); en local, `http://localhost:4321`. Canonical, OG, sitemap, `robots.txt` (endpoint `src/pages/robots.txt.ts`) y JSON-LD derivan de ahí: no hay dominio escrito a mano.
- Node fijado a `22.x` en `engines`; pnpm por `packageManager` (Corepack); `sharp` y `esbuild` autorizados en `pnpm-workspace.yaml`.
- `pnpm build:release` (bloqueo por placeholders / `sampleData`) queda como comprobación manual antes de dar por publicada la versión definitiva.

## Seguridad / privacidad
- Enlaces externos `rel="noopener"`; sin cookies ni trackers por defecto; YouTube en modo `nocookie`.
- Si se añade analítica, que sea sin cookies (Plausible/Umami) y documentada aquí.
- Cabeceras recomendadas en el hosting: `Content-Security-Policy` con `frame-src https://www.youtube-nocookie.com`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

## Criterios de aceptación
- [x] Lighthouse móvil ≥ 95 en las cuatro categorías sobre `pnpm preview` (99/100/96/100; el 96 son los 404 de miniaturas de relleno).
- [x] `dist/` sin `.js` de aplicación.
- [x] Auditoría de accesibilidad de Lighthouse (reglas axe) 100 en móvil; recorrido por teclado pendiente de comprobación manual en la Fase 6.
- [ ] Rich Results Test valida `EntertainmentBusiness` y `VideoObject`; Schema Markup Validator sin errores.
- [ ] La palabra clave principal aparece en title, H1/hero, description, alt del hero y JSON-LD.
- [ ] Search Console: sitemap enviado y página indexada tras el despliegue.
- [x] Despliegue automático desde GitHub en Vercel; CI de validación en GitHub Actions.
