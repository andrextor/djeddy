# Parte 7 · Fotos y archivos: dónde va cada uno y cómo se llama

Guía para el cliente / quien prepare el material. **Los nombres de archivo
son exactos** (minúsculas, sin espacios ni acentos, guiones `-`): el código ya
apunta a ellos, de modo que basta con soltar el archivo en su carpeta y
sustituir el de relleno. Los nombres describen la foto porque Google también
lee el nombre del archivo (SEO de imágenes).

## Resumen

| # | Qué es | Carpeta | Nombre exacto | Tamaño mínimo | Formato | Se usa en |
|---|--------|---------|---------------|---------------|---------|-----------|
| 1 | Foto principal del DJ (hero) | `src/assets/` | `dj-eddy-en-cabina.jpg` | 1040 × 1320 px (vertical, 4:5) | JPG, ≤ 600 KB | Portada, escritorio y móvil; también es la imagen de la ficha de Google |
| 2 | Imagen para compartir en redes (Open Graph) | `public/` | `og.jpg` | exactamente 1200 × 630 px | JPG, ≤ 300 KB | Vista previa al compartir el enlace en WhatsApp, Instagram, Facebook |
| 3 | Flyer o foto de cada evento | `src/assets/events/` | `AAAA-MM-DD-nombre-corto.jpg` (ej. `2026-09-12-boda-hacienda-el-roble.jpg`) | 840 × 1040 px (vertical, 4:5) | JPG, ≤ 400 KB cada uno | Tarjetas de "Próximos eventos" |
| 4 | Favicon | `public/` | `favicon.svg` | vectorial | SVG | Pestaña del navegador (ya hay uno negro/dorado; solo cambiar si hay logo) |
| 5 | Logo del DJ (si existe) | `src/assets/` | `dj-eddy-logo.svg` | vectorial, fondo transparente | SVG (o PNG 512 px) | Opcional: cabecera y footer en lugar del texto "DJEDDY" |
| 6 | Videos | *no se suben*: van en YouTube | — | 1080p, miniatura clara | Enlace de YouTube | Sección "En acción" (se muestran las miniaturas de YouTube) |

## Detalle por archivo

### 1. `src/assets/dj-eddy-en-cabina.jpg` — foto principal
- Es la imagen más importante de la página: aparece grande, ligeramente
  inclinada, con luces doradas detrás.
- Vertical (más alta que ancha), proporción 4:5. Mínimo 1040 × 1320 px; ideal
  1600 × 2000 px. El sistema genera solas las versiones pequeñas y WebP.
- El DJ debe quedar en el **centro o tercio superior**: la parte inferior se
  oscurece con un degradado y lleva el texto "En cabina, [CIUDAD]".
- Evitar fotos con texto sobreimpreso o marcas de agua.
- Fondo oscuro o de fiesta funciona mejor con la paleta negro/dorado.
- Texto alternativo (lo genera el código): "DJ Eddy en cabina durante un
  evento en {ciudad}". Si la foto es de otra situación, avisar para ajustarlo
  en `src/components/Hero.astro`.
- Opcional SEO: si se quiere la ciudad en el nombre del archivo
  (`dj-eddy-dj-en-medellin.jpg`), hay que cambiar también una línea en
  `src/components/Hero.astro` (`import heroImage from '@/assets/...'`).

### 2. `public/og.jpg` — imagen para compartir
- Horizontal, **exactamente 1200 × 630 px**. Sin zona importante en los bordes
  (algunas apps recortan).
- Ya existe una versión generada con el titular "Enciende tu evento." sobre
  negro/dorado. Se puede dejar tal cual o sustituir por una con foto real
  (recomendado: foto del DJ a la derecha, titular a la izquierda).
- No lleva optimización automática: guardar ya comprimida (≤ 300 KB).

### 3. `src/assets/events/AAAA-MM-DD-nombre-corto.jpg` — flyers de eventos
- Un archivo por evento, nombrado con la **fecha del evento** y un nombre
  corto: `2026-10-03-fiesta-privada-club-campestre.jpg`.
- Vertical 4:5, mínimo 840 × 1040 px. En escritorio la tarjeta muestra la
  imagen completa detrás del texto; en móvil, un recorte cuadrado a la
  izquierda con la fecha encima. Por eso el motivo principal debe estar
  **centrado**, no en las esquinas.
- Cada evento se declara en `src/data/events.json` y ahí se indica la ruta
  de su imagen (`"image": "../assets/events/2026-10-03-fiesta-privada-club-campestre.jpg"`).
  Si un evento no tiene imagen, se omite el campo y la tarjeta muestra un
  fondo degradado dorado: no hace falta inventar una.
- El archivo de relleno `placeholder-evento.jpg` se puede borrar cuando haya
  flyers reales (y quitar su referencia en `events.json`).

### 4. `public/favicon.svg`
- Ya existe (disco dorado sobre negro). Sustituir solo si hay logo oficial;
  debe verse bien a 16 × 16 px.

### 5. `src/assets/dj-eddy-logo.svg` (opcional)
- Solo si el DJ tiene logotipo. Vectorial, sin fondo, en dorado o blanco.
  Si se entrega, se integra en cabecera y footer en lugar del texto "DJEDDY".

### 6. Videos (YouTube)
- Subirlos al canal de YouTube del DJ (públicos o "no listados", nunca
  privados). Entregar el **enlace** de cada uno; el ID son los 11 caracteres
  tras `v=` (`https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`).
- La miniatura que se ve en la página es la de YouTube: conviene elegir una
  buena miniatura personalizada en YouTube Studio.
- Se necesita también el título corto de cada video ("Boda en Hacienda El
  Roble"), la duración ("3:12") y la fecha de subida.

## Recomendaciones generales
- Exportar en JPG calidad 80–85; peso orientativo indicado en la tabla. No
  hace falta convertir a WebP: se hace solo al construir la web (excepto
  `og.jpg`).
- Nombres: solo minúsculas `a-z`, números y guiones. Nada de `IMG_2031.jpg`,
  `Foto final (2).jpg` ni acentos/eñes.
- Derechos: solo fotos propias o con permiso del fotógrafo; si aparecen
  invitados reconocibles, mejor con su consentimiento.
- Entrega: una carpeta con la misma estructura (`assets/`, `assets/events/`,
  `public/`) o los archivos sueltos ya nombrados.

## Comprobar que no falta nada
```bash
pnpm check:content   # lista los textos entre [CORCHETES] que quedan por rellenar
pnpm build           # falla mientras quede alguno; cuando pasa, el sitio está listo para publicar
```
