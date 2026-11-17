---
name: Viral Video Pipeline
description: Pipeline completo para producir un video viral de principio a fin — brief, research de tendencias, idea, guion, estilo, preproducción, producción, edición, sonido, portada, QA, publicación y análisis. Úsala cuando el usuario pida producir un video completo, ordenar un proyecto, pasar de idea a MP4, definir entregables o coordinar varias skills. Incluye puertas de calidad y estructura de carpetas.
---

# Viral Video Pipeline

## Principio

Un video viral no sale de una skill: sale de **una idea fuerte + ejecución limpia + distribución con feedback**.
Este pipeline evita las dos fallas más caras: producir algo que nadie quiere ver y publicar algo que se ve barato.

Regla: **no se avanza de fase sin pasar la puerta de calidad (G0–G7)**.

## Fases y puertas

| Fase | Entregable | Puerta |
|---|---|---|
| 0. Brief | `BRIEF.md` | G0: una frase con audiencia, promesa y CTA |
| 1. Research | `RESEARCH.md` (3–5 referencias + patrones) | G1: sabemos qué está funcionando y por qué |
| 2. Idea | `IDEA.md` (1 idea, 3 hooks, shareability test) | G2: el hook se entiende en 1 s y da ganas de ver |
| 3. Guion | `SCRIPT.md` / `.fountain` + beat sheet | G3: cada beat tiene acción visual y giro |
| 4. Estilo | `TREATMENT.md` (1 estilo, referencias, paleta) | G4: el estilo no compite con la historia |
| 5. Preproducción | shot list, assets, fuentes, calendario | G5: todo lo necesario existe o está agendado |
| 6. Producción | escena/render/captura | G6: stills clave aprobados a tamaño real |
| 7. Post | corte, subtítulos, sonido, portada | G7: mobile + mute test aprobados |
| 8. Publicación | MP4 + caption + hashtags + horario | — |
| 9. Análisis | `ANALYTICS.md` a 24 h y 7 días | iterar o descartar |

## 0. Brief (15 min)

Responde en una página:

- **Objetivo:** alcance, guardados, seguidores, ventas, autoridad.
- **Audiencia:** quién exactamente; qué problema/deseo tiene.
- **Plataforma:** TikTok / Reels / Shorts (elige una principal).
- **Duración:** 15 / 30 / 45–60 s.
- **Idioma y voz:** español neutro /Latam/España; TTS o humana.
- **CTA:** qué hace el espectador al final.
- **Restricciones:** marca, colores, legal, presupuesto, deadline.
- **Referencias:** 3 links de videos que funcionaron (no para copiar, para entender el patrón).

Si no puedes llenar objetivo, audiencia y promesa, no hay video.

## 1. Research (30–45 min)

Extrae **patrones**, no copies contenido:

- 3–5 videos del nicho con alto engagement.
- Para cada uno: hook (primer 1–3 s), formato, duración, ritmo de corte, audio, caption, CTA.
- Anota: qué emoción activa (risa, sorpresa, nostalgia, orgullo, miedo, deseo), qué promete y qué entrega.
- Detecta un **gap**: ángulo que nadie está cubriendo o que está viejo.

Herramientas: `websearch`, `webfetch`, TikTok Creative Center, búsqueda por hashtag, comentarios del nicho.
Nunca copies planos, guion, música ni branding de una referencia.

## 2. Idea (20 min)

**Una idea por video.** Si hay dos, son dos videos.

Genera 10–20 ángulos y elige uno con este test:

| Test | Pregunta |
|---|---|
| Claridad | ¿Se entiende en una frase? |
| Emoción | ¿Qué siento en 3 s? |
| Novedad | ¿Ya lo vi mil veces? |
| Utilidad | ¿Se guarda o se comparte? |
| Identidad | ¿El espectador se ve reflejado? |
| Visualidad | ¿Se puede mostrar sin explicar? |

Escribe **3 hooks** distintos y elige el que pase el checklist de 8 puntos de `short-drama-hook-engineering` (frame 0 en movimiento, conflicto, mute, primeros 0.5 s, etc.).

## 3. Guion (30–60 min)

Usa `guion-video-viral` como base. Mínimos:

- Logline en una frase.
- Beat sheet con tiempos, acción visual, giro, cámara, audio.
- Hook en 0–2 s; primer valor antes de 8 s; cambio perceptible cada ~4.5 s.
- Cierre que enlace con el inicio (loop) o deje una pregunta concreta.
- Si hay voz: 2.5–2.8 palabras/s; 80–115 palabras para 30–45 s.

Puerta G3: lee el guion en voz alta con cronómetro. Si sobra tiempo, corta; si falta, no aceleres la voz.

## 4. Estilo y tratamiento (20–30 min)

Elige **un** estilo y escribe `TREATMENT.md`:

- 3 estructuras candidatas y la elegida.
- Referencias visuales (solo gramática: luz, composición, material).
- Paleta (3–5 colores + neutros), tipografía, textura.
- Sonido: paleta de SFX y música.
- Qué NO va a tener el video (para evitar el "todo a la vez").

Skills: `viral-video-styles`, `papercut-video`, `lemo-opuscar`, `threejs-lowpoly-contexto-visual`.

## 5. Preproducción

- **Shot list** con `video-camera-movement/templates/shot-list.md`.
- **Scene cards** con `video-scene-construction`.
- **Cue sheet** de audio con `video-audio-design`.
- Assets: modelos, texturas, fuentes, iconos, música, SFX, voces.
- Verifica licencias y pesos de archivo.
- Define carpeta del proyecto:

```text
<proyecto>/
├── BRIEF.md
├── RESEARCH.md
├── IDEA.md
├── SCRIPT.md
├── TREATMENT.md
├── storyboard/
├── scenes/
├── audio/
├── out/
└── ANALYTICS.md
```

## 6. Producción

- Construye por escenas, no por "todo el video".
- Renderiza **stills** en los beats clave antes de video completo.
- Revisa a 1080×1920 real, no en miniatura.
- Para three.js: `threejs-captura-video`, `threejs-grounding-anti-superposicion`.
- Para papercut/3D: `papercut-video`.
- Nada de `Math.random()` sin semilla; todo determinista y reproducible.

Puerta G6: 5–7 stills aprobados; si un still no funciona, el video tampoco.

## 7. Postproducción

Orden: **imagen → ritmo → texto → sonido → color → export**.

- Edición: cortes en acción, punch-ins, b-roll, pattern interrupts.
- Subtítulos: 2–4 palabras por bloque, dentro de zona segura, alto contraste.
- Audio: `video-audio-design`; voz clara, música ducks, SFX sincronizados, −14 LUFS.
- Color: una paleta, contraste sujeto/fondo, sin clipping.
- Portada: primer frame legible en miniatura; texto grande, una idea.
- QA: `video-quality-guardrails`.

Puerta G7: **mobile test** (móvil a 30 cm), **mute test** (se entiende sin audio), **squint test** (se lee entornando los ojos).

## 8. Publicación

- MP4 1080×1920, 30/60 fps, H.264, AAC, −14 LUFS, true peak ≤ −1 dBTP.
- Caption: hook en la primera línea, contexto, CTA; hashtags 3–5 (mezcla nicho + amplio).
- Horario: prueba 2–3 franjas; mide, no adivines.
- Cross-post adaptando caption y portada, no el mismo texto.
- Publica, no perfecciones eternamente: el feedback real llega después.

## 9. Análisis (24 h y 7 días)

| Métrica | Qué te dice |
|---|---|
| Retención a 3 s | Si el hook funciona |
| Retención media | Si el ritmo sostiene |
| Guardados | Valor percibido |
| Compartidos | Identidad/social currency |
| Comentarios | Reacción emocional |
| Follows por alcance | Si el perfil convierte |
| CTR de portada | Si el primer frame promete |

Diagnóstico:
- Cae en 0–3 s → hook.
- Cae a mitad → ritmo/beat sin giro.
- Se ve completo pero no comparte → falta emoción o utilidad.
- Mucho alcance y pocos follows → perfil/CTA.
- Buen CTR y mala retención → portada promete algo que el video no da.

Itera: mismo formato, nuevo hook; o mismo hook, nuevo formato. Cambia una variable por vez.

## Puertas de calidad resumidas

```
G0  Brief con audiencia + promesa + CTA
G1  Research con patrones, no copias
G2  Idea única + 3 hooks + test de shareability
G3  Guion cronometrado + beats con acción visual
G4  Tratamiento con un solo estilo y paleta definida
G5  Shot list + assets + licencias + calendario
G6  Stills clave aprobados a tamaño real
G7  Mobile + mute + squint test
```

## Errores que matan el pipeline

- Empezar por la animación o el código.
- Copiar el formato viral sin entender por qué funcionó.
- Meter dos ideas, dos estilos o dos CTAs.
- Producir 30 s cuando el guion pide 15.
- Publicar sin probar en móvil y sin audio.
- Cambiar todo a la vez después de un flop.
- No medir nada y llamarlo "mala suerte".

## Plantillas

- `templates/brief.md`
- `templates/qa.md`
