# Parte 6 · Plan de implementación

Cada fase termina con `pnpm lint && pnpm build` en verde y un commit propio.

**Puerta SEO en cada fase** (el SEO es prioridad de primer nivel para el cliente): antes de cerrar una fase se revisa la lista de `docs/05-quality.md#seo` y no se introduce nada que la contradiga (rutas de prueba, imágenes sin `alt`, textos de negocio fuera de los datos, H1 duplicados, JS innecesario).
Estimaciones para una persona.

## Fase 1 · Base del proyecto (½ día) — Parte 1 ✅
1. `pnpm create astro` (minimal), `.nvmrc`, `packageManager`, Biome, `tsconfig`, scripts.
2. `astro.config.mjs` con `site`, `@astrojs/sitemap`.
3. `BaseLayout.astro` con fuentes, `tokens.css`, `global.css`, skip link, `theme-color`.
4. `index.astro` vacío con el layout.
**Hecho cuando**: criterios de la Parte 1 + página negra con la tipografía cargada.

## Fase 2 · Tokens y utilidades (½ día) — Parte 2 ✅
1. `tokens.css` completo; `global.css` con reset mínimo, `.glass .grain .beam .card .focus-group .wordmark .sr-only`, keyframes y bloque `prefers-reduced-motion`.
2. ~~Página de prueba `/_tokens`~~ descartada: una ruta de prueba puede acabar indexada; la comparación visual se hace contra el lienzo con capturas de `/`.
3. Adelantado de la Fase 5 por prioridad SEO: `robots.txt` y `<meta name="robots">`.
**Hecho cuando**: criterios de la Parte 2. (Cumplido: build sin JS, CSS 5,4 KB gzip.)

## Fase 3 · Contenido tipado (½ día) — Parte 3 ✅
1. `site.ts` con `SiteConfig` (+ campos SEO) y `lib/placeholders.ts` con `assertNoPlaceholders`; `pnpm build` bloqueado con 18 placeholders, `pnpm build:draft` para desarrollo.
2. `content.config.ts` + `events.json` con 3 eventos de ejemplo y `src/assets/events/placeholder-evento.svg`.
3. `lib/whatsapp.ts`, `lib/dates.ts` (`formatEventDate`, `upcoming`), `lib/seo.ts` (`buildJsonLd`, adelantado de la Fase 5 por prioridad SEO).
4. `src/lib/lib.test.ts` con `node:test` (5 pruebas), sin framework.
**Hecho cuando**: criterios de la Parte 3 + tests en verde. (Cumplido.)

## Fase 4 · Secciones, escritorio primero en móvil-first (2 días) — Parte 4 ✅
Orden: `Header` → `Hero` + `Marquee` → `WhatsAppButton` → `Videos` → `Events` → `Contact` → `Footer`.
Para cada una: escribir móvil, luego `@media (min-width: 1024px)`; comparar con el artboard a 390 y 1440 (captura superpuesta); ajustar hasta coincidir.
**Hecho cuando**: criterios de la Parte 4 en todas las secciones. (Cumplido: capturas a 1440 y 390 con Chrome headless comparadas con el lienzo; el menú móvil usa Popover API + un script inline de 3 líneas para cerrarse al navegar por ancla, la única excepción de JS; el JSON-LD ya se emite desde `index.astro`.)

Notas de implementación: un icono compartido `Icon.astro` (mapa de paths) en lugar de un archivo por icono; `Icon` debe propagar `...rest` al `<svg>` para recibir el atributo de scope del padre, si no las clases pasadas desde el padre no reciben estilo.

## Fase 5 · Calidad (1 día) — Parte 5
1. SEO (`<head>`, JSON-LD, `robots.txt`, sitemap), `og.jpg`.
2. Auditoría Lighthouse + axe; corregir hasta cumplir presupuesto.
3. Revisión de contraste y reduced-motion.
4. CI de GitHub Actions.
**Hecho cuando**: criterios de la Parte 5.

## Fase 6 · Contenido real y publicación (½ día)
1. Sustituir todos los `[CORCHETES]` (el build falla mientras queden).
2. Foto hero real, flyers de eventos, IDs de YouTube, enlaces sociales, número E.164.
3. Desplegar en [HOSTING]; configurar dominio y cabeceras.
4. Alta en Google Search Console y envío del sitemap; crear/optimizar el perfil de Google Business Profile con el mismo nombre, teléfono y ciudad que el JSON-LD.
**Hecho cuando**: el sitio está en el dominio, Lighthouse ≥ 95 en producción y el botón de WhatsApp abre la conversación con el mensaje prellenado.

## Backlog v2 (no iniciar sin decisión del cliente)
- Cuenta regresiva al próximo evento en el hero (requiere JS mínimo o render en build con fecha fija).
- Aviso superior descartable ("Últimas fechas de diciembre").
- Hover en evento que revela detalle (line-up, entradas).
- Facade para los videos si el presupuesto de LCP no se cumple.
- Analítica sin cookies.
- Sección de testimonios (solo con testimonios reales del cliente).
- Fondo fotográfico con fundido en hero/footer cuando haya fotos.

## Riesgos y mitigaciones
| Riesgo | Mitigación |
|--------|-----------|
| Cierre del popover del menú móvil en Safari | Probar en Fase 4; excepción de JS de 3 líneas documentada |
| Iframes de YouTube penalizan LCP/TBT | Medir en Fase 5; facade en v2 |
| `backdrop-filter` en Android de gama baja | Fallback: `@supports not (backdrop-filter: blur(1px))` → `background: rgba(20,17,12,.92)` |
| Datos del cliente tardan | El build falla con placeholders: no se puede publicar a medias por accidente |
