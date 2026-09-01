# Parte 5 · Calidad: SEO, rendimiento, accesibilidad, CI

## SEO
- `<title>`: "DJ Eddy · DJ para bodas, fiestas y eventos en [CIUDAD]" (≤ 60 chars).
- `<meta name="description">` = `site.tagline` (≤ 155 chars).
- `<link rel="canonical">` desde `Astro.site` + `Astro.url.pathname`.
- Open Graph / Twitter: `og:type=website`, `og:title`, `og:description`, `og:image=/og.jpg` (1200×630), `og:locale=es_ES` (o `es_CO` según país), `twitter:card=summary_large_image`.
- JSON-LD (`<script type="application/ld+json">`, generado con `JSON.stringify` desde `site`):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "DJ Eddy",
  "jobTitle": "DJ",
  "url": "https://[DOMINIO]",
  "email": "mailto:[CORREO]",
  "telephone": "+[NUMERO_E164]",
  "address": { "@type": "PostalAddress", "addressLocality": "[CIUDAD]" },
  "sameAs": ["[URL_INSTAGRAM]", "[URL_TIKTOK]", "[URL_YOUTUBE]", "[URL_FACEBOOK]"]
}
```
  Cada evento futuro añade un `Event` (`name`, `startDate` ISO, `location.name`, `location.address.addressLocality`, `performer` → la `Person`, `image` si existe).
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
- [ ] Rich Results Test valida `Person` y `Event`.
- [ ] CI en verde en `main`.
