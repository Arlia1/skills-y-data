---
name: Video Audio Design
description: Diseña, sincroniza y mezcla el audio de un video viral — voz, música, SFX, foley, ambiente y silencio. Úsala cuando el usuario pida audio, sonido, música, efectos, foley, TTS, voz en off, mezcla, loudness, ducking, sincronización o cuando el video se sienta muerto, barato o saturado. Incluye niveles, −14 LUFS, true peak y chequeos para móvil.
---

# Video Audio Design

## Principio

El audio es la mitad del video. Un render impecable con audio muerto se siente barato; una imagen simple con sonido intencional se siente producida.

Tres reglas:

1. **La voz manda.** Si la voz no se entiende, nada más importa.
2. **Cada sonido tiene una causa visible.** No se pone foley porque sí.
3. **El silencio es un recurso.** Quitar música en una línea clave vale más que subirla.

## Las 5 capas

| Capa | Función | Nivel base |
|---|---|---|
| **Voz / diálogo** | información y emoción | −6 dBFS pico; 10–11 LU sobre la música |
| **Música** | emoción, ritmo, continuidad | −18 a −24 dBFS bajo voz |
| **SFX / foley** | causa física y textura | −6 dBFS; transient claro |
| **Ambiente** | espacio y realismo | −20 a −24 dBFS, estéreo |
| **Silencio** | tensión, énfasis, respiro | 0.3–0.8 s antes de un reveal |

## Spotting (antes de generar audio)

Haz una lista de cada evento audible:

| t | Evento visual | Capa | Sonido | Sync | Prioridad |
|---|---|---|---|---|---|
| 0:02 | tijera corta papel | SFX | shear metálico + fibra | frame exacto | alta |
| 0:04 | hoja se despliega | SFX | snap de papel | +1 frame | alta |
| 0:06 | pueblo de noche | ambiente | grillos, viento suave | fondo | media |
| 0:10 | revelación | música | gong + silencio previo | beat | alta |

Reglas:

- **Sync duro:** el transiente cae en el frame del contacto (tolerancia 1 frame a 24 fps).
- **Sync blando:** ambiente, música y texturas pueden flotar.
- **No dupliques:** un sonido por acción; dos capas del mismo evento suenan a error.
- **No inventes** sonidos para acciones que no se ven, salvo que sean historia.

## Jerarquía de mezcla

```
VOZ        ─────────────────────────  claridad, siempre al frente
MÚSICA     ───────────────            ducking bajo voz, carve 2–4 kHz
SFX        ──────────                 impactos y texturas
AMBIENTE   ─────                      espacio, nunca protagonista
SILENCIO   ·                          respiro antes de un giro
```

- **Ducking:** sidechain de música −6 a −10 dB cuando entra voz; ataque 20 ms, release 300–400 ms.
- **EQ:** high-pass de voz a 90 Hz; corte suave de música en 1–4 kHz para dejar sitio a la voz.
- **Compresión de voz:** 3:1 suave, −24 dB threshold; de-esser si hay sibilancia.
- **Fades:** 4 ms en cada corte para evitar clics.
- **Mono:** verifica que la mezcla no se cancela en un altavoz de móvil.

## Loudness y export

- **Social:** −14 LUFS integrado, true peak ≤ −1 dBTP.
- **Cine/YouTube largo:** −16 LUFS si la plataforma lo prefiere; mantén coherencia.
- **Rango dinámico:** no aplastes; deja respirar los impactos.
- **Medición:** `ffmpeg -af loudnorm=I=-14:TP=-1.2:LRA=11` o `mix.py` de lemo.
- **Prueba real:** escucha en altavoz de móvil a volumen medio; si la voz se pierde, sube voz o baja música.

## Música

- **Una idea musical por video.** No cambies de género a mitad sin motivo narrativo.
- **BPM y beat grid:** corta en downbeats; el drop coincide con el giro o el reveal.
- **Estructura:** intro corta → build → drop/giro → outro/loop.
- **Trending audio:** úsalo si encaja con el formato y tu nicho; si no, mejor original o library.
- **Licencias:** usa CC0, library con licencia o música propia. Guarda fuente y crédito.
- **Volumen:** la música no compite; si tapa la voz, baja 3 dB y vuelve a probar.

## SFX y foley

- **Foley físico:** pasos, tela, props, papel, metal, madera, agua.
- **Diseñado:** whoosh, riser, impact, glitch, click, chime, sub-drop.
- **Capas:** transient + cuerpo + cola; un solo sonido suele sonar plano.
- **Variación:** no repitas el mismo sample; rota pitch, gain y pan.
- **Pan:** sigue la posición visual; no abuses del estéreo en móvil.
- **Papercut:** tijera metálica 2.5–9 kHz + anillo corto + fibra; fold = swish + creak; unfold = snap; pasos = cartón, no carne.
- **Lowpoly/3D:** pops, chimes, water, UI, motor suave, viento; evita sonidos orgánicos que rompan el mundo.
- **Three.js:** synth hits, whooshes, glitches, sub; sincroniza con geometría y cámara.

## Voz

- **Humana > TTS** si hay presupuesto; TTS solo si la voz es consistente y bien dirigida.
- **Ritmo:** 2.5–2.8 palabras/s; frases de una respiración.
- **Pronunciación:** revisa nombres, números, siglas y español Latam/España.
- **TTS:** usa `core/tts/tts.py` de lemo (Kokoro) o edge-tts; ajusta speed 0.9–1.0.
- **Edición:** corta silencios, respira, muletillas; no cortes a mitad de palabra.
- **Emoción:** la voz debe tener intención, no lectura plana.

## Silencio

- 0.3–0.5 s de silencio antes de una revelación.
- Quita música bajo la línea más importante.
- Un golpe de silencio después de un impacto hace que el impacto se recuerde.
- No llenes todo: el oído se cansa igual que el ojo.

## Checklist de audio

```
[ ] Voz inteligible en altavoz de móvil
[ ] Voz 10–11 LU sobre la música
[ ] Música ducked bajo voz, sin bombear
[ ] SFX sincronizados al frame de contacto
[ ] Ambiente en todas las escenas con espacio
[ ] Sin clics, pops, clipping ni phase issues
[ ] Fades de 4 ms en cortes
[ ] Loudness −14 LUFS, TP ≤ −1 dBTP
[ ] Mono compatibility
[ ] Silencio usado con intención
[ ] Licencias y créditos guardados
```

## Errores frecuentes

- Música alta que tapa la voz.
- SFX 2–3 frames tarde (se siente doblaje).
- Sin ambiente: el video suena a render.
- TTS sin dirección: plano, sin respiración.
- Tema trending que no tiene nada que ver con el video.
- Todo lleno de sonido, sin silencio.
- Normalizar a ojo sin medir LUFS.
- Sample repetido que se convierte en tic.

## Herramientas

- **Lemo:** `core/tts/tts.py`, `core/audio/sfx.py`, `core/audio/sampler.py`, `core/render/mux.sh`.
- **FFmpeg:** `loudnorm`, `sidechaincompress`, `highpass`, `acompressor`.
- **DAW:** Reaper/Audacity para edición fina.
- **Bibliotecas:** CC0/CC BY; guarda `CREDITS`.

## Plantilla

- `templates/cue-sheet.md`
