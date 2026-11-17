---
name: Papercut 2D & 3D Video
description: Produce videos virales verticales en estilos de papel recortado — papercut 2D (ventana de papel rojo, figuras articuladas, calados yin/yang) y 3D paper pop-up book (diorama macro, cartas planas, luz real) y lowpoly de papel. Úsala cuando el usuario pida papercut, paper cut, recortado de papel, stop-motion de papel, ventana de papel, libro pop-up, libro de cuentos 3D, origami, diorama lowpoly o un Reel/TikTok/Short 9:16 con estética de papel.
---

# Papercut 2D & 3D — Dirección de video

Librería local: `/home/y/lemo-opuscar` (66 estilos hechos 100% en código).
La skill `lemo-opuscar` orquesta la producción completa; esta skill fija el estilo de papel y evita los errores típicos.

## 0. Regla de oro

Lee SIEMPRE el `STYLE.md` del estilo elegido antes de construir. Escribe primero un `TREATMENT.md`
(3 estructuras candidatas + elección) y solo después abre `DEMO.md` o el código del demo.
El demo se usa para aprender técnica (rig, shader, mix), **nunca** su historia, planos, props ni timeline.

| Pedido | Estilo | Documento |
|---|---|---|
| Papercut 2D rojo, ventana china, figuras articuladas | `papercut-red` | `styles/papercut-red/STYLE.md` |
| 3D pop-up book, libro que se abre en un escritorio real | `paper-popup` | `styles/paper-popup/STYLE.md` |
| 3D lowpoly isométrico tipo diorama | `lowpoly-island` | `styles/lowpoly-island/STYLE.md` |

## 1. Papercut 2D (`papercut-red`)

**Esencia:** todo es una pieza de papel recortada con tijeras y apoyada sobre otra hoja. No hay pintura,
degradados ni contorno dibujado: el detalle, el volumen y la expresión salen solo de **lo que se recorta**.
No es sombra chinesca (sin contraluz translúcido ni varillas), no es vector plano, no es silueta.

- **Material:** grano de papel neutro en `soft-light` dentro de cada pieza; borde de corte con micro-oscilación
  (hecho a mano), rima clara arriba-izquierda y oscura abajo-derecha; espesor = sombra suave sobre la capa de abajo.
- **Figuras:** bloque rojo + líneas yin interiores; contorno insertado (doble línea) para separar rojo sobre rojo.
  Articulaciones remachadas (cuello, hombros, codos, caderas, rodillas, mandíbula, cola).
- **Vocabulario de calado:** sierra (pelaje, pasto, tejas, flecos), crecientes (escamas), espirales (articulaciones),
  nubes, rosetas, ciruelo, moneda, ranuras afiladas. La roseta se diseña como una cuña de 45° espejada ×8.
- **Caras:** piezas intercambiables (sonrisa, sorpresa, miedo, decidido, dormido). Ojos = dos crecientes + pupila
  calada. Nunca hay islas flotantes: un anillo cerrado perdería su centro.
- **Color:** rojo China (`#d2201f`, rango `#c8102e`–`#d7261e`) como héroe. Fondo y héroe deben ser familias de papel
  distintas. Profundidad por tonos de papel, no por sombreado. Oro solo como acento tardío.
- **Movimiento:** personajes a **12 fps duros** (pose cuantizada); cámara, luz, clima y papeles volando a 24 fps.
  Poses duras, eases mínimos, overshoot de 1 frame. Peso = tamaño + sacudida de cámara.
  Plegar: tiras con perspectiva falsa, oscurecer al levantarse, color de dorso tras 90°, crease al final.
  Cortar: revelar por máscara de círculos sobre la tijera; la viruta cae al pasar el borde.
  Desplegar: golpe "pa!" con ease-out, bump de escala y flash cálido.
- **Cámara:** frontal bloqueada, paneo con parallax entre capas, cenital de mesa, push, giro sobre roseta,
  page-turn/peel. Sin dissolves: las transiciones son acciones de papel.
- **Audio:** foley de papel (tijera metálica + fibra, fold swish + tap, unfold snap, pasos de cartón),
  ensamble chino de cámara (pipa, zheng, erhu, dizi, gong). Mezcla −14 LUFS, sin grano de película.
- **Errores a evitar:** rojo sobre rojo sin separación; oscurecer la capa que tapa al aplicar lightmap;
  flap plano que parece tarjeta deslizándose; mostrar el taco sin cortar a través de los agujeros;
  tijeras apuntando al revés; frames en blanco entre planos.

Código de referencia en `styles/papercut-red/demo/`: `paper.js` (piezas, corte, borde, grano, sombras),
`motifs.js` (patrones), `rig.js` (rig 2D), `tuanhua.js` (roseta 8×), `light.js` (noche, contraluz, bloom),
`fold.js` (fold–cut–unfold), `hud.js` (subtítulos y letras caladas).

## 2. Paper Pop-up Book 3D (`paper-popup`)

**Esencia:** dos mundos en un plano. Mundo real a escala humana: escritorio fotorrealista, HDRI, lente macro,
poca profundidad de campo, luz cálida práctica. Mundo de papel: libro de tapa dura que se abre; cada set es una
carta plana que **salta** desde su borde inferior; personajes de papel con borde blanco y canto de cartón.
Lo que vende es el choque de escala y material: dibujo plano saturado bajo luz real, con sombras recortadas y blur óptico real.

- Unidades reales en metros: página 0.3–0.5 m, actores 3–5 cm; near plane de pocos mm.
- Arte en Canvas2D con tinta marrón oscuro (nunca negro); borde off-white dilatado; canto de cartón;
  grano de papel compartido. Sombreado = un creciente duro, no degradado.
- Piezas = planos con alphaTest/alphaToCoverage y depth material con alpha → **la sombra es la silueta recortada**.
- Libro modelado (tela, foil, block de páginas, hoja que se curva). Tone mapping neutro (ACES desplaza los colores).
- DOF a mano por CoC; bloom suave, viñeta, calidez. Un spread = una familia de color; page-turn = cambio de escena.
- Cámara macro a altura de actor (5–10 cm sobre la página, fov 30), foco corto; pull back para el page-turn.
- Mecanismos: V-folds, pestañas, sol en varilla, puerta con bisagra, río de tiras, slats de día/noche, estrellas colgadas.
- Audio: pops de papel + crinkle, page swish, creak del libro; narrador cálido tipo álbum ilustrado.

Código de referencia en `styles/paper-popup/demo/`: `cutmesh.js` (borde/canto/sombra recortada), `paper.js`, `book.js`,
`sets.js`, `post.js` (DOF), `main.js` (shots y mecanismos).

## 3. Lowpoly de papel (`lowpoly-island`)

Mundo faceteado en **ortográfica isométrica**: columnas hexagonales, edificios caja, árboles cono/icosaedro,
materiales flat-shading sin texturas, paleta pastel, cielo por gradiente de pantalla (sin horizonte).
La luz, no la textura, cuenta la hora. Todo aparece con rebote y nota musical. Post: GTAO obligatorio,
haze, tilt-shift leve, bloom. Úsalo si el pedido es "3D lowpoly" o "diorama", no papercut literal.

## 4. Adaptación vertical 9:16 (Reels / TikTok / Shorts)

Los demos de la librería son 16:9. Para vertical:

- Renderiza a `--size 1080x1920`. Recompón, no recortes: capas de papel en franjas verticales, parallax vertical,
  héroe en el tercio central, cielo/techo arriba y suelo abajo.
- Zona segura: deja ~180 px arriba, ~320 px abajo y ~120 px a la derecha libres de texto o detalle crítico.
- Subtítulos dentro de la zona segura (y ≈ 1450–1600), con hold ≥ max(1.8 s, voz + 0.6 s).
- Estructura viral: gancho visual en 0–2 s (la tijera corta y revela el mundo, el libro salta, la roseta se enciende),
  primer valor antes de 8 s, cambio de cámara o geometría cada ~4.5 s, cierre que enlaza con el inicio (loop).
- 30–45 s, 80–115 palabras si hay voz (2.5–2.8 palabras/s).

## 5. Pipeline de producción

Desde la raíz de la librería (`/home/y/lemo-opuscar`), con el proyecto en una carpeta absoluta:

```sh
# 1) Dependencias (una vez)
sh /home/y/.config/opencode/skills/lemo-opuscar/scripts/setup.sh deps

# 2) Referencia del estilo (después del TREATMENT.md)
sh /home/y/.config/opencode/skills/lemo-opuscar/scripts/setup.sh demo papercut-red

# 3) Stills de revisión
node core/render/still.mjs "<proyecto>" 1.5 4 8 --size 1080x1920

# 4) Video
node core/render/video.mjs "<proyecto>" --fps 30 --workers 3 --out "<proyecto>/out/video.mp4" --size 1080x1920

# 5) Eventos de audio y subtítulos
node core/render/events.mjs "<proyecto>" --size 1080x1920
node core/render/readcheck.mjs "<proyecto>" --size 1080x1920

# 6) Mezcla y master
sh core/render/mux.sh "<proyecto>/out/video.mp4" "<proyecto>/out/mix.wav" "<proyecto>/out/final.mp4" 30 0
```

TTS: `.venv/bin/python core/tts/tts.py lines.json out_dir` (Kokoro offline; español disponible con voces `ef_*`/`em_*`).
La página debe exponer `window.READY`, `window.render(t)`, `window.DUR` y opcionalmente `window.EV` / `window.TEXTS(t)`.

## 6. Checklist antes de entregar

- 5–7 stills en beats clave revisados a tamaño real; contacto hoja vs `poster.jpg` del estilo.
- `readcheck` sin textos fuera de cuadro ni demasiado cortos; subtítulos sin solaparse.
- Loudness −14 LUFS, true peak ≤ −1 dBTP; sin clipping.
- La historia/planos difieren del demo en al menos 4 de 6 ejes (estructura, apertura, plano firma, ruta de cámara,
  forma del score, cierre).
- Entregar `final.mp4`, `TREATMENT.md`, `build.sh` y `CREDITS` en la carpeta del proyecto.
- Sistema: se recomienda ffmpeg 7+ (hay 6.1 instalado) y Node 20+.

## 7. Lecciones de producción (papercut 2D vertical)

Checklist nacido de correcciones reales; aplicar **antes** del render completo:

1. Abrir un still temprano: `node --check` no detecta helpers faltantes dentro de piezas (`hash`, etc.).
2. Contraste: nunca crema sobre crema. Carteles chicos con texto corto y sólido, no calados finos.
3. En planos de corte/zoom, dejar la pieza héroe libre: sacar personajes del centro o mandarlos al borde.
4. Si cambia el zoom, recalcular el path de corte en coordenadas de pantalla.
5. Portfolio: carta héroe dibujada última; laterales detrás; labels fuera del footprint central (x≈155/925, 22 px).
6. UI de teléfono: input anclado a `y1 - 148`, nunca flotando en el medio.
7. Logo: verificar bbox dentro del contenedor con margen; en cartel 820×420 usar escala ≈.29.
8. Eliminar texto redundante que pise carteles del fondo.
9. Safe zone: subtítulos desde y≈1480; acción/pies ≤1470 o completamente arriba.
10. Reveal: sin multitud delante del sitio; a lo sumo dos figuras s≈.55 con pies 1470 a los costados.
11. Loop: frame final idéntico al inicial; desvanecer línea de corte, virutas y títulos antes de 29.5 s.
12. Subtítulos deben cubrir toda la VO; extender el cue final hasta la última sílaba.
13. Tijeras: manijas separadas (centro ±34, radios 46×27); si no, parecen flor.
14. Cachear piezas de texto; no regenerar canvas por frame.
15. Escribir `scenes.js` en 2–3 bloques: un `write` gigante se trunca.
16. Stills mínimos: hook, mapa, corte, fold, reveal, portfolio, oferta, DM, loop y frame final.
17. Render 1080×1920, 30 fps, 3 workers, swiftshader; verificar `ffprobe`, −14 LUFS, TP ≤ −1 dBTP.

Detalle de casos: `v5_pymes_hoja_en_blanco/LESSONS.md` (proyecto Arlia).
