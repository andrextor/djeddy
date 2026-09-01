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
  Cada evento futuro añade al `@graph` un `Event` (`name`, `startDate` ISO con zona horaria, `eventStatus: EventScheduled`, `eventAttendanceMode: OfflineEventAttendanceMode`, `location` → `Place` con `name` y `address.addressLocality`, `performer` → `{"@id": ".../#business"}`, `image` si existe, `url` si existe). Los dos videos añaden `VideoObject` (`name`, `thumbnailUrl` = `https://i.ytimg.com/vi/{id}/hqdefault.jpg`, `embedUrl`, `uploadDate` [FECHA]) para elegibilidad de resultados de video.
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
| Iframes de YouTube | `loading="lazy"`, dominio `youtube-nocookie.com`; medir su coste real y pasar a facade si LCP/TBT empeoran |

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

## CI (GitHub Actions) — `.github/workflows/ci.yml`
```yaml
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version-file: .nvmrc, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
```
Opcional al final de la v1: `treosh/lighthouse-ci-action` contra `dist/` con los presupuestos de la tabla.

## Seguridad / privacidad
- Enlaces externos `rel="noopener"`; sin cookies ni trackers por defecto; YouTube en modo `nocookie`.
- Si se añade analítica, que sea sin cookies (Plausible/Umami) y documentada aquí.
- Cabeceras recomendadas en el hosting: `Content-Security-Policy` con `frame-src https://www.youtube-nocookie.com`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

## Criterios de aceptación
- [ ] Lighthouse móvil ≥ 95 en las cuatro categorías sobre `pnpm preview`.
- [ ] `dist/` sin `.js` de aplicación.
- [ ] axe: 0 violaciones; recorrido por teclado completo hasta el botón flotante.
- [ ] Rich Results Test valida `EntertainmentBusiness`, `Event` y `VideoObject`; Schema Markup Validator sin errores.
- [ ] La palabra clave principal aparece en title, H1/hero, description, alt del hero y JSON-LD.
- [ ] Search Console: sitemap enviado y página indexada tras el despliegue.
- [ ] CI en verde en `main`.
