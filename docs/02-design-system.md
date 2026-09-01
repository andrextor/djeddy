# Parte 2 · Sistema de diseño (tokens)

Valores exactos tomados de `design/Main.dc.html` y `design/Mobile.dc.html`.
Se implementan como custom properties en `src/styles/tokens.css` y se
consumen desde los estilos scoped de cada componente. **No redondear ni
"normalizar" a una rejilla**.

## Color
```css
:root {
  --color-bg: #070604;            /* fondo de página */
  --color-bg-elevated: #0c0a07;   /* inicio del degradado del hero */
  --color-bg-footer: #050403;
  --color-surface: rgba(20, 17, 12, 0.55);  /* cristal */
  --color-surface-row: rgba(255, 255, 255, 0.03);  /* filas de contacto */

  --color-gold: #d4af37;          /* acento principal */
  --color-gold-light: #f1d67a;
  --color-gold-dark: #b8922a;
  --color-gold-text: #e6c463;     /* segunda línea del titular */
  --color-gold-deep: #9a7a1e;     /* glow inferior derecho del hero */

  --color-text: #f4efe4;
  --color-text-muted: #b8b0a0;
  --color-text-dim: #8a8272;      /* copyright; el diseño usa #6f685c, se sube por contraste AA (ver Parte 5) */
  --color-text-badge: #e6dcc3;

  --color-whatsapp: #25d366;

  --border-gold-14: rgba(212, 175, 55, 0.14);
  --border-gold-16: rgba(212, 175, 55, 0.16);
  --border-gold-18: rgba(212, 175, 55, 0.18);
  --border-gold-20: rgba(212, 175, 55, 0.20);
  --border-gold-22: rgba(212, 175, 55, 0.22);
  --border-gold-25: rgba(212, 175, 55, 0.25);
  --border-gold-35: rgba(212, 175, 55, 0.35);

  --gradient-gold: linear-gradient(120deg, #f1d67a 0%, #d4af37 55%, #b8922a 100%);
  --gradient-photo: linear-gradient(165deg, #33291a 0%, #17130d 50%, #0a0806 100%);
  --gradient-card: linear-gradient(140deg, #201a11 0%, #0d0b08 60%, #070604 100%);
  --gradient-card-alt: linear-gradient(200deg, #1a1610 0%, #0a0806 100%);
  --gradient-event-a: linear-gradient(180deg, #2a2216 0%, #12100b 55%, #070604 100%);
  --gradient-event-b: linear-gradient(180deg, #1f1a12 0%, #100e0a 55%, #070604 100%);
  --shadow-card: 0 40px 120px rgba(0, 0, 0, 0.65);
  --shadow-cta: 0 20px 50px rgba(212, 175, 55, 0.25);
  --shadow-float: 0 16px 40px rgba(0, 0, 0, 0.55);
}
```

Fondo del hero (escritorio):
```css
background:
  radial-gradient(900px 600px at 15% 10%, rgba(212,175,55,.22), rgba(212,175,55,0) 60%),
  radial-gradient(700px 500px at 90% 85%, rgba(154,122,30,.28), rgba(154,122,30,0) 60%),
  linear-gradient(180deg, #0c0a07 0%, #070604 100%);
```
Móvil: `radial-gradient(520px 420px at 0% 0%, …)` + el mismo lineal.

## Tipografía
- **Display**: `Sora Variable` (pesos usados: 600, 700, 800). Fallback: `'Helvetica Neue', Arial, sans-serif`.
- **Texto**: `Manrope Variable` (400–700). Mismo fallback.
- Antialiasing: `-webkit-font-smoothing: antialiased`.

| Rol | Escritorio (≥1024) | Móvil (<1024) | Familia / peso | Tracking |
|-----|-------------------|---------------|----------------|----------|
| H1 hero | 132px / 0.94 | 62px / 0.96 | Sora 800; 2.ª línea 700 en `--color-gold-text` con `text-shadow: 0 0 60px rgba(212,175,55,.35)` (40px en móvil) | -0.035em |
| H2 sección | 68px / 1 | 40px / 1 | Sora 700 | -0.03em |
| H2 contacto | 72px / 0.98 | 44px / 0.98 | Sora 700 | -0.035em |
| H3 tarjeta evento | 26px / 1.15 | 18px / 1.2 | Sora 700 | -0.02em / -0.015em |
| H3 tarjeta video | 22px (20px secundaria) | 17px | Sora 600 | -0.01em |
| Dato de contacto | 22px | 17px | Sora 600 | -0.01em |
| Numeral de fecha | 32px / 1 | 30px / 1 | Sora 800 | -0.02em |
| Eyebrow (01 · Videos) | 12px | 11px | Manrope 700, uppercase | 0.26em |
| Cuerpo | 18px / 1.65 | 16px / 1.65 | Manrope 400, `--color-text-muted` | — |
| Cuerpo secundario | 16–17px / 1.6–1.65 | 15px | Manrope 400 | — |
| Meta de tarjeta | 15px / 1.5 | 13–14px / 1.5 | Manrope 400 | — |
| Etiqueta [VIDEO 1] | 11px | 10px | Manrope 700, uppercase, gold | 0.2–0.22em |
| Botón | 15px | 15px (13px nav) | Manrope 700 | — |
| Enlaces nav | 14px | — | Manrope 600, `--color-text-muted` | — |
| Marquesina | 15px | 12px | Sora 600, uppercase, gold | 0.22em |
| Wordmark footer | 220px / 0.85 | 88px / 0.85 | Sora 800, `color: transparent; -webkit-text-stroke: 1px rgba(212,175,55,.35)` | -0.06em |
| Wordmark nav | 20px | 17px | Sora 800, "DJ" texto + "EDDY" gold | 0.08em / 0.06em |
| Copyright | 13px | 12px / 1.6 | Manrope 400, `--color-text-dim` | — |

Titulares con `text-wrap: balance`; párrafos con `text-wrap: pretty`.

## Espaciado y layout
| Token | Escritorio | Móvil |
|-------|-----------|-------|
| Ancho de referencia | 1440 (contenido 1280, gutter 80) | 390 (gutter 20) |
| Padding vertical de sección | 128px | 64px (72px tras el hero) |
| Gap título → contenido | 48px | 22px |
| Gap entre tarjetas | 24px | 16px (eventos 12px, carrusel 14px) |
| Alto hero | 900px | flujo (≈ 880px) |
| Nav flotante | 1120×68, `top: 24px`, centrada | `left/right: 14px`, alto 56, `top: 14px` |
| Alto botón principal | 60px (padding 0 32px) | 56px (ancho completo) |
| Alto botón secundario | 60px (padding 0 28px) | 52px |
| Alto botón nav | 46px | 44px |
| Píldora social | 48px | 48px |
| Botón flotante | 60px píldora (icono 44 + texto) | 60×60 círculo |
| Altura mínima táctil | — | 44px |

Breakpoint único: `@media (min-width: 1024px)` = layout escritorio; por
debajo, layout móvil (el diseño es mobile-first). Entre 390 y 1023 el layout
móvil escala en fluido (contenedores `max-width: 100%`, tipografía con
`clamp()` entre los dos valores de la tabla).

## Radios
| Uso | Valor |
|-----|-------|
| Píldoras (nav, botones, chips, sociales) | 999px |
| Tarjetas video/evento escritorio, foto hero | 28px (foto 32px) |
| Tarjetas móvil | 24px (evento compacto 20px) |
| Tarjeta de contacto (cristal) | 36px escritorio / 28px móvil |
| Cajas internas (caption glass, filas contacto) | 18–20px escritorio / 14–16px móvil |
| Badge de fecha | 16px / 14px |

## Efectos (utilidades globales en `global.css`)
```css
.glass { background: var(--color-surface); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid var(--border-gold-22); }

.grain { background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>"); mix-blend-mode: soft-light; opacity: .35; pointer-events: none; }

.beam { position: absolute; top: -10%; width: 14px; height: 120%; border-radius: 999px; filter: blur(10px); opacity: .55; background: linear-gradient(180deg, rgba(241,214,122,0) 0%, rgba(241,214,122,.9) 35%, rgba(212,175,55,.7) 70%, rgba(212,175,55,0) 100%); transform-origin: top center; animation: sway 7s ease-in-out infinite alternate; }

.card { transition: transform .4s cubic-bezier(.2,.7,.2,1), border-color .4s ease, filter .4s ease; }
.card:hover { transform: translateY(-6px) scale(1.02); border-color: rgba(212,175,55,.7); }
.focus-group:hover .card { filter: blur(2px) grayscale(.7) brightness(.6); }
.focus-group .card:hover { filter: none; }

.wordmark { -webkit-mask-image: linear-gradient(180deg, #000 20%, transparent 95%); mask-image: linear-gradient(180deg, #000 20%, transparent 95%); }
```
Rejilla tenue del hero (solo escritorio): dos `linear-gradient` de 1px en
`rgba(212,175,55,.06)` con `background-size: 120px 120px` y máscara radial
`ellipse at 50% 40%, #000 30%, transparent 75%`.

## Movimiento
| Nombre | Definición | Uso |
|--------|-----------|-----|
| `rise` | `0.9s cubic-bezier(.2,.7,.2,1) both`; de `opacity:0; translateY(28px)` a `1; 0`. Delays `.1s / .25s / .4s / .55s` | badge, H1, párrafo, botones del hero; nav |
| `fadeRight` | `1s` misma curva; de `opacity:0; translateX(60px) rotate(4deg)` a `1; 0 rotate(4deg)` (3deg en móvil) | foto del hero |
| `sway` | `7s ease-in-out infinite alternate`; `rotate(-4deg)` → `rotate(4deg)`; delays `0 / -2.5s / -5s` | haces de luz |
| `marquee` | `26s linear infinite`; `translateX(0)` → `translateX(-50%)`; contenido duplicado | marquesina |
| `pulse` | `2s ease-out infinite` en `::before` (`inset:-8px`, borde 2px verde .6); `scale(.85), opacity 1` → `scale(1.35), opacity 0` | botón flotante |
| hover play | `.play` `transform .35s, background .35s` → `scale(1.12)`, fondo `rgba(212,175,55,.9)`, icono `#070604` | tarjetas de video |

**Obligatorio**:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  .marquee { animation: none; }
}
```

## Iconografía
SVG inline, trazo 1.6px (`stroke-linecap/linejoin: round`), caja 24, tamaños
16/18/20/22/26/30/34 según contexto. Color por `currentColor` o `--color-gold`.
Nunca emoji. Iconos: WhatsApp (relleno, path oficial simplificado), Play,
ArrowUpRight, Instagram, TikTok, YouTube, Facebook, Menu.

## Criterios de aceptación
- [ ] `tokens.css` contiene todos los valores de esta parte con estos nombres.
- [ ] Ninguna medida hardcodeada en componentes que exista como token.
- [ ] Con `prefers-reduced-motion: reduce` la página no anima nada.
