# Parte 6 · Plan de implementación

Cada fase termina con `pnpm lint && pnpm build` en verde y un commit propio.
Estimaciones para una persona.

## Fase 1 · Base del proyecto (½ día) — Parte 1
1. `pnpm create astro` (minimal), `.nvmrc`, `packageManager`, Biome, `tsconfig`, scripts.
2. `astro.config.mjs` con `site`, `@astrojs/sitemap`.
3. `BaseLayout.astro` con fuentes, `tokens.css`, `global.css`, skip link, `theme-color`.
4. `index.astro` vacío con el layout.
**Hecho cuando**: criterios de la Parte 1 + página negra con la tipografía cargada.

## Fase 2 · Tokens y utilidades (½ día) — Parte 2
1. `tokens.css` completo; `global.css` con reset mínimo, `.glass .grain .beam .card .focus-group .wordmark .sr-only`, keyframes y bloque `prefers-reduced-motion`.
2. Página de prueba temporal `/_tokens` (se borra al final) que renderiza swatches y escala tipográfica para comparar con `design/Tipografia.dc.html`.
**Hecho cuando**: criterios de la Parte 2.

## Fase 3 · Contenido tipado (½ día) — Parte 3
1. `site.ts` con `SiteConfig` y `assertNoPlaceholders`.
2. `content.config.ts` + `events.json` con 3 eventos de ejemplo y una imagen placeholder en `src/assets/events/`.
3. `lib/whatsapp.ts`, `lib/phone.ts` (`formatPhone`), `lib/dates.ts` (`formatEventDate` → `{ day, month }`).
4. Comprobaciones mínimas: un `src/lib/*.test.ts` por función con `node:test` (`pnpm test` = `node --test --experimental-strip-types src/lib`), sin framework.
**Hecho cuando**: criterios de la Parte 3 + tests en verde.

## Fase 4 · Secciones, escritorio primero en móvil-first (2 días) — Parte 4
Orden: `Header` → `Hero` + `Marquee` → `WhatsAppButton` → `Videos` → `Events` → `Contact` → `Footer`.
Para cada una: escribir móvil, luego `@media (min-width: 1024px)`; comparar con el artboard a 390 y 1440 (captura superpuesta); ajustar hasta coincidir.
**Hecho cuando**: criterios de la Parte 4 en todas las secciones.

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
4. Borrar `/_tokens`.
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
