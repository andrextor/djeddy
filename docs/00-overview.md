# Parte 0 · Visión general y decisiones

## Objetivo
Landing de una sola página para **DJ Eddy** (bodas, fiestas privadas,
corporativos) cuyo único objetivo de conversión es **iniciar una conversación
por WhatsApp**. Colores negro y dorado. Contenido: hero, 2 videos, agenda de
eventos con imagen, contacto, botón flotante de WhatsApp y footer con redes.

## Alcance v1
- Una página (`/`), estática, en español (`lang="es"`).
- Sin backend, sin formularios, sin base de datos, sin analítica obligatoria.
- Contenido editable desde archivos de datos tipados (no CMS).

Fuera de alcance v1: CMS, blog, reservas online, pagos, multi-idioma,
cuenta regresiva, aviso superior (posibles v2; ver Parte 6).

## Decisiones técnicas (ADR resumidos)

| # | Decisión | Motivo | Alternativa descartada |
|---|----------|--------|------------------------|
| 1 | **Astro 7**, salida `static` | Cero JS por defecto, `astro:assets`, content layer tipado | Next.js (sobredimensionado para una landing) |
| 2 | **TypeScript estricto** (`astro/tsconfigs/strict`), sin `any` | Requisito del proyecto | — |
| 3 | **pnpm** fijado con `packageManager` (Corepack) | Instalaciones reproducibles | npm/yarn |
| 4 | **Biome** para lint + formato (2 espacios) | Requisito del proyecto, una sola herramienta | ESLint + Prettier |
| 5 | **CSS plano con custom properties** y estilos scoped de Astro | El diseño ya está expresado como CSS; evita una dependencia y clases utilitarias en el HTML | Tailwind (añadir solo si el equipo lo pide) |
| 6 | **Fuentes autoalojadas** con `@fontsource-variable/sora` y `@fontsource-variable/manrope` | Sin petición a terceros, mejor LCP y privacidad | Google Fonts `<link>` |
| 7 | **Sin JavaScript de aplicación** en v1 (dos scripts inline de <10 líneas: cierre del menú móvil y fachada de video) | Todos los efectos del diseño son CSS; el menú móvil usa la Popover API nativa | Framework islands |
| 8 | **Videos con fachada** (miniatura `i.ytimg.com` + botón; el iframe `youtube-nocookie` se crea al pulsar) | Medido en Fase 5: los iframes directos cargaban ~1,1 MB de terceros y llevaban el LCP móvil a 10 s; con fachada, 1,6 s | `<iframe loading="lazy">` (descartado por medición) |
| 9 | **Eventos en content collection** (`file()` loader sobre JSON + Zod) | Validación en build, imágenes verificadas por `image()` | Array en TS sin validación |
| 10 | **Despliegue estático** en [HOSTING: Vercel / Netlify / Cloudflare Pages] | Cualquiera sirve; decidir con el cliente | — |

## Requisitos no funcionales (resumen; detalle en Parte 5)
- **SEO es prioridad de primer nivel**: estrategia de palabra clave local, datos estructurados de negocio local + eventos + videos, y una puerta SEO al cierre de cada fase.
- Lighthouse móvil ≥ 95 en Performance, A11y, Best Practices y SEO.
- LCP < 2,5 s en 4G simulada; 0 KB de JS de aplicación.
- WCAG 2.2 AA en contraste, foco y `prefers-reduced-motion`.
