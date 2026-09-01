# DJ Eddy — Landing · Especificaciones

Documentación por partes para implementar la landing diseñada en el lienzo
(escritorio 1440, móvil 390). Cada parte es autocontenida y tiene criterios de
aceptación. Se implementan en orden.

| Parte | Documento | Qué define |
|------:|-----------|------------|
| 0 | [00-overview.md](00-overview.md) | Objetivo, alcance, decisiones técnicas (ADR) |
| 1 | [01-project-setup.md](01-project-setup.md) | Astro + TypeScript estricto + pnpm + Biome, estructura de carpetas, scripts |
| 2 | [02-design-system.md](02-design-system.md) | Tokens: color, tipografía, espaciado, radios, efectos y movimiento |
| 3 | [03-content-model.md](03-content-model.md) | Datos del sitio: contacto, redes, videos, eventos (schemas) |
| 4 | [04-components.md](04-components.md) | Especificación de cada sección/componente en escritorio y móvil |
| 5 | [05-quality.md](05-quality.md) | SEO, rendimiento, accesibilidad, CI |
| 6 | [06-implementation-plan.md](06-implementation-plan.md) | Fases, tareas y criterios de aceptación |
| 7 | [07-fotos-y-archivos.md](07-fotos-y-archivos.md) | Guía para el cliente: qué fotos hacen falta, dónde van y cómo se llaman |

Convenciones: la prosa de los docs está en español; **todo identificador, ruta,
archivo y código va en inglés** (ver `~/.claude/CLAUDE.md`). Los valores entre
`[CORCHETES]` son datos reales pendientes del cliente.

Fuente de verdad visual: `design/Main.dc.html`, `design/Mobile.dc.html`
(y `design/Tipografia.dc.html` para los pares tipográficos).
