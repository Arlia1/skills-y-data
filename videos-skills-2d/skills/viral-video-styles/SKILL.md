---
name: Viral Video Styles (2D / 3D / Three.js)
description: Elige y ejecuta el formato correcto para un video viral corto hecho en código: papercut 2D, pop-up book 3D, lowpoly isométrico, escenas three.js/WebGL, shaders, partículas, físicas, ASCII/voxel o hand tracking. Úsala cuando el usuario pida un video viral, Reel, TikTok, Short, animación 3D, escena three.js, demo visual, "algo que se vea increíble" o no sepa qué formato usar. Conecta guion, estilo, cámara, composición, captura y publicación.
---

# Viral Video Styles — router de formato

Tres capas, en este orden: **guion → estilo → ejecución**. No empieces por el código.

## 1. Elige el formato

| Si el pedido es… | Estilo / skill | Dónde |
|---|---|---|
| Papel recortado, ventana roja, stop-motion de papel | `papercut-red` | skill `papercut-video` |
| Libro pop-up 3D, diorama macro, libro de cuentos | `paper-popup` | skill `papercut-video` |
| 3D lowpoly isométrico, diorama pastel | `lowpoly-island` + `threejs-lowpoly-contexto-visual` | `/home/y/lemo-opuscar/styles/lowpoly-island/STYLE.md` |
| Escena three.js, shaders, partículas, físicas, morphing | `threejs-formatos-virales` + `viral-threejs-video` | `.agents/skills/` del workspace |
| Producir un video completo de principio a fin | `viral-video-pipeline` | skill `viral-video-pipeline` |
| Guion, hook, ritmo, loop | `guion-video-viral` + `threejs-guion-viral` + `threejs-ganchos` | skill `guion-video-viral` |
| Movimiento de cámara, shot list, transiciones | `video-camera-movement` + `threejs-camara-movimientos` | skill `video-camera-movement` |
| Escenas, blocking, staging, cobertura | `video-scene-construction` + `storyboard-shot-design` | skill `video-scene-construction` |
| Audio, música, SFX, foley, mezcla | `video-audio-design` | skill `video-audio-design` |
| Dónde poner objeto, texto, logo, webcam | `threejs-composicion-contenido` | `.agents/skills/` del workspace |
| Personajes/props flotando, clipping, texto desbordado | `video-quality-guardrails` + `threejs-grounding-anti-superposicion` | skill `video-quality-guardrails` |
| Paleta, contraste, tipografía, QA final | `video-quality-guardrails` | skill `video-quality-guardrails` |
| Grabar/exportar 1080×1920, loops, ffmpeg/WebCodecs | `threejs-captura-video` | `.agents/skills/` del workspace |
| Caption, hashtags, métricas, iteración | `threejs-publicacion-metricas` | `.agents/skills/` del workspace |
| Librería completa de 66 estilos de cine en código | `lemo-opuscar` | skill `lemo-opuscar` |

Si una skill del workspace no aparece en la lista disponible, léela directamente en
`/home/y/Escritorio/videos-ai (2)/.agents/skills/<id>/SKILL.md`.

## 2. Pipeline

1. **Brief:** tema, audiencia, duración, idioma, CTA y si hay voz (`viral-video-pipeline`).
2. **Guion:** hook en 0–2 s, primer valor antes de 8 s, cambio perceptible cada ~4.5 s, cierre que enlaza con el inicio (`guion-video-viral`).
   30–45 s, 80–115 palabras si hay locución.
3. **Estilo:** elige un solo estilo y lee su `STYLE.md` completo. No mezcles papercut con lowpoly ni con shaders (`papercut-video` / `lemo-opuscar`).
4. **Escenas:** columna dramática, blocking, geografía y cobertura (`video-scene-construction`).
5. **Cámara:** shot list, movimiento motivado y transiciones (`video-camera-movement`).
6. **Audio:** voz, música, SFX, foley, mezcla y loudness (`video-audio-design`).
7. **QA:** zona segura, texto, solapes, paleta, grounding, export (`video-quality-guardrails`).
8. **Entrega:** MP4 H.264 + audio, `TREATMENT.md`, `build.sh` y `CREDITS`.

## 3. Reglas duras

- **Hook visual, no verbal:** el primer frame ya muestra el conflicto o la textura. Prohibido logo, intro o "hola".
- **Un formato, una idea:** si el video necesita dos estilos, son dos videos.
- **Loop perfecto:** última cámara/pose vuelve a las coordenadas de t=0 cuando el formato lo permita.
- **Nada de 3D genérico:** sin cubos flotantes, sin gradientes morados, sin texto 3D inclinado sin motivo.
- **Grounding:** todo personaje toca su superficie exacta; auditar flotación, hundimiento y clipping.
- **Texto legible:** dentro de la zona segura, hold ≥ max(1.8 s, voz + 0.6 s), sin tapar la cara del héroe.
- **Determinismo:** animación por frame/tiempo, nunca por `Date.now()` ni `Math.random()` sin semilla.
- **Renders reproducibles:** fija fps, resolución, semilla y versión de la escena en `build.sh`.

## 4. Librería local de estilos

`/home/y/lemo-opuscar` contiene 66 estilos con `STYLE.md` + demo hecho en código (papercut, pop-up, lowpoly,
impasto, ukiyo-e, risograph, pixel, clay, etc.). El demo es referencia técnica: **nunca** reutilices su historia,
planos, props ni timeline. Escribe tu `TREATMENT.md` antes de abrirlo.

Instalación/actualización de la librería:
`sh /home/y/.config/opencode/skills/lemo-opuscar/scripts/setup.sh`
