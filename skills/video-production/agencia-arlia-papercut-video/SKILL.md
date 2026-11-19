---
name: agencia-arlia-papercut-video
description: Use when creating viral 9:16 vertical videos, Reels, TikToks, or Shorts for Agencia Arlia or Argentine SMBs (pymes) using the Papercut 2D paper-art style, Argentine voiceover, procedural sound design, before-vs-after storytelling, and automated web conversion angles.
---

# Agencia Arlia — Papercut 2D Video Production Playbook

Guía técnica y creativa definitiva para concebir, guionar, animar, sonorizar y renderizar videos virales en formato 9:16 vertical (30 s exactos @ 30 fps) para **Agencia Arlia** con estética **Papercut 2D**.

---

## 1. Fórmula Narrativa Viral: Historia Antes vs Después

Todo reel de Arlia para pymes sigue una estructura de **30.0 segundos exactos**:

1. **0.0–2.8 s | Gancho Financiero Directo:**
   - Presentar a una **persona real con nombre y rubro**: *"Este es Martín: su taller mecánico pierde $350.000 por mes."*
   - Mostrar el número en pesos con **tipografía gigante calada** (`Archivo Black`) en el primer frame.
   - Acción física de tijera cortando papel o billetes al medio con virutas cayendo. Cero logos ni intros.
2. **2.8–6.5 s | El Dolor Operativo Concreto:**
   - El dueño en plena tarea (manos en el motor, amasando pizza, mostrando casas) mientras el celular se llena de mensajes de WhatsApp sin responder.
   - La fricción cotidiana: no dar abasto para cotizar a mano.
3. **6.5–9.8 s | La Fuga a la Competencia:**
   - El cliente de papel esperando con reloj girando. Frustrado, cruza la vereda y compra en el local de la competencia.
4. **9.8–13.0 s | La Tijera Arlia & Reveal Web:**
   - La tijera de Arlia desciende y corta el desorden. Pliegue (*swish*) y despliegue seco (*¡pa!*) revelando la **web de papel interactiva** con cotizador en vivo y turnos automáticos.
5. **13.0–16.8 s | Split Screen Antes vs Después:**
   - Comparación lado a lado:
     - **ANTES:** 23:45 hs, cansado respondiendo tarde, venta perdida.
     - **AHORA:** Cotización automática 24/7, turno confirmado con tilde verde de WhatsApp.
6. **16.8–20.0 s | Payoff / Triunfo:**
   - Negocio lleno de clientes, el dueño feliz con pulgar arriba y caja registradora sonando.
7. **20.0–22.5 s | Respaldo Arlia:**
   - 3 cartas de soluciones (Diseño a medida, Cotizador 24/7, SEO Google Maps).
8. **22.5–26.5 s | Oferta & Urgencia:**
   - Aterrizaje del Pegaso de Arlia y bandera roja: **10% OFF / PRIMEROS 10 CUPOS**.
9. **26.5–30.0 s | Un Solo CTA & Loop Infinito:**
   - Celular enviando mensaje DM con la palabra clave (`PRESUPUESTO`).
   - La tijera corta el marco final y regresa a la pose del frame 0.0s en un bucle visual perfecto.

---

## 2. Gramática Visual Papercut 2D

- **Filosofía del material:** Todo es papel recortado con tijeras y montado sobre capas. Sin gradientes digitales planos, sin contornos dibujados; el detalle y la luz provienen de **lo que se recorta y se cala**.
- **Paleta Oficial Arlia (Regla 60-30-10):**
  - **Fondo / Tinta (60%):** Azul tinta profundo (`#1B2A41`) y Crema arroz (`#F2E8D5`).
  - **Héroe Arlia (30%):** Rojo China vibrante (`#D2201F`).
  - **Acentos y Calados (10%):** Dorado viejo (`#C9A227`), Blanco cálido (`#FAF6EC`) y Verde éxito (`#2E7D32`).
  - **Competencia:** Jade frío (`#2F6F6B`).
- **Sombra y Grano:**
  - Grano de papel suave (`grain(g, 0.08)`).
  - Sombras suaves en cada pieza (`paperShadow`) proyectadas sobre la capa inferior.
  - Rosetas de 8 pétalos (`rosette`) y calados de monedas y hojas en esquinas.
- **Zonas Seguras (Safe Zone 9:16):**
  - Subtítulos estrictamente en la franja inferior `y ≈ 1480–1580`.
  - Personajes y piezas de acción con pies o bases en `y ≤ 1470`.
  - Márgenes laterales libres de al menos 80 px.

---

## 3. Locución y Diseño Sonoro

- **Voz en Off (TTS):**
  - Modelo: `es-AR-TomasNeural` (español rioplatense, voseo natural y seguro).
  - Longitud: **70 a 80 palabras** para 30 segundos (ritmo ágil de 2.5–2.7 palabras/s).
  - Ajuste de rate (`+10%` a `+30%`) por línea para encajar en sus slots sin superposiciones.
- **Foley de Papel Procedimental (`mix.py`):**
  - Tijera metálica con corte de fibra (`snip()`).
  - Rasgado y pliegue de hoja (`tear()`, `fold_swish()`, `page()`).
  - Clicks mecánicos / herramientas (`ratchet()`, `click()`).
  - Campana de caja registradora (`kaching()`, `ding()`).
- **Música:**
  - 100–102 BPM, pizzicato en cuerdas acústicas, contrabajo y percusión de papel.
  - Ducking automático de música: **−9 dB** durante las frases de locución.
  - Normalización final: **−14 LUFS** y True Peak **≤ −1.0 dBTP** mediante `mux.sh` (filtro `loudnorm` + limitador a 192 kHz).

---

## 4. Pipeline Técnico de Renderizado

```sh
# 1. Generación de locución
/home/y/lemo-opuscar/.venv/bin/python audio/generate_voice.py

# 2. Generación de mezcla sonora
/home/y/lemo-opuscar/.venv/bin/python audio/mix.py

# 3. Render de stills de revisión obligatorios (antes de gastar tiempo en el video)
LEMO_ANGLE=swiftshader node /home/y/lemo-opuscar/core/render/still.mjs . 0.5 1.8 4.5 8.0 11.5 14.5 18.0 21.0 24.5 28.0 29.8 --size 1080x1920 --out stills

# 4. Render del video por segmentos (robusto contra cortes)
node tools/render_segment.mjs . 0 180 30 out/seg_00.mp4 1080x1920
node tools/render_segment.mjs . 180 360 30 out/seg_01.mp4 1080x1920
node tools/render_segment.mjs . 360 540 30 out/seg_02.mp4 1080x1920
node tools/render_segment.mjs . 540 720 30 out/seg_03.mp4 1080x1920
node tools/render_segment.mjs . 720 900 30 out/seg_04.mp4 1080x1920

# 5. Concatenar y mezclar video y audio final
ffmpeg -y -f concat -safe 0 -i out/segs.txt -c copy out/video_raw.mp4
sh /home/y/lemo-opuscar/core/render/mux.sh out/video_raw.mp4 audio/mix.wav out/final.mp4 30 0
```

---

## 5. Lecciones Críticas de Producción (`LESSONS.md`)

1. **Nunca texto claro sobre fondo claro:** Títulos en rojo Arlia o azul tinta sobre tarjetas crema; nunca crema sobre crema.
2. **UI anclada al fondo:** En maquetas de celular o chat, el input debe ir anclado a `y1 - 148`, no con offset flotante desde arriba.
3. **No tapar la acción:** En planos de corte de tijera, los personajes deben estar al borde o ausentes para dejar libre la línea de corte.
4. **Loop idéntico al frame 0:** Todo elemento dinámico (título de oferta, virutas, brillos) debe desvanecerse en `t = 29.28–29.50 s` para que el último frame encaje pixel por pixel con el frame 0.0s.
5. **Revisar stills a tamaño real:** Verificar legibilidad en pantalla 1080×1920, no en thumbnail.
