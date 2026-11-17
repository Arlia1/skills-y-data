---
name: Video Quality Guardrails
description: Auditoría de calidad visual y técnica para videos — evita desbordamientos de texto, solapamientos, clipping, personajes flotando, elementos fuera de zona segura, paletas de color que pelean, bajo contraste, tipografía ilegible y exports defectuosos. Úsala cuando el usuario pida revisar un video/escena, "que se vea profesional", arreglar composición, colores, texto, grounding o QA final.
---

# Video Quality Guardrails

## Principio

La calidad percibida no es "más efectos". Es **legibilidad + consistencia + intención**.
Un video se ve barato por cinco razones, casi siempre las mismas:

1. Texto que se sale o se solapa.
2. Colores que pelean entre sí.
3. Elementos flotando o atravesándose.
4. Ritmo y motion inconsistentes.
5. Audio sucio o mal nivelado.

Esta skill es la puerta final antes de publicar.

## 1. Lienzo y zona segura (9:16)

- Lienzo: **1080×1920**.
- Zona segura conservadora: **180 px arriba, 320 px abajo, 120 px derecha**.
- Área útil central: ~**1080×1420**.
- Nada crítico dentro del **5% del borde** (54 px horizontal, 96 px vertical).
- Subtítulos: y ≈ **1450–1600**, centrados, dentro de la zona segura.
- Títulos: parte superior central, sin invadir el avatar/UI.
- Verifica con overlay de zona segura en stills, no “a ojo”.

## 2. Texto: contención y legibilidad

### Reglas duras

- **Padding interior:** 8–12% del contenedor; nunca texto pegado al borde.
- **Máximo 2 líneas** por bloque en vertical; 18–22 caracteres por línea.
- **Tamaño mínimo:** 32 px a 1080 de ancho; subtítulos 40–48 px; títulos 64–120 px.
- **Interlineado:** 1.1–1.3.
- **Contraste:** ≥ 4.5:1 para texto pequeño; ≥ 3:1 para texto grande.
- Si el fondo es complejo: stroke, sombra suave o placa semitransparente; no las tres a la vez.
- **Nunca** texto sobre la cara del héroe, el logo o un prop clave.
- Mide la caja real después del render: `text box + padding ≤ container`.
- Si no cabe: acorta el texto, baja el tamaño o parte en dos beats. No deformes la fuente.

### Pruebas

```
[ ] Still a tamaño real (1080 px de ancho)
[ ] Vista al 25% (miniatura de feed)
[ ] Squint test: se intuye el mensaje entornando los ojos
[ ] Grayscale: sigue habiendo contraste sin color
[ ] Todos los acentos y signos españoles visibles
[ ] Sin palabras cortadas ni huérfanas
```

## 3. Solapamientos y colisiones

- Define **bounding boxes** para texto, logo, héroe, props y UI.
- Separación mínima entre elementos: **24 px**; alrededor de la cara del héroe: **48 px**.
- Un solo foco por frame; si dos elementos compiten, baja jerarquía a uno.
- Revisa 5 frames clave: hook, primer valor, giro, payoff, último frame.
- En 3D, audita colisiones cámara-geometría y texto-cabeza en cada beat.
- En papercut, verifica que las capas no se “coman” el texto al hacer parallax.

### Grounding 3D

```
[ ] Pies/base exactamente en Y = superficie
[ ] Sin personajes flotando ni hundidos
[ ] Sin clipping entre props, cuerpos o escenografía
[ ] Sombra de contacto visible
[ ] Separación lateral ≥ 0.85 m en formaciones
[ ] Carteles/texto 3D no atraviesan cabezas
```

Para auditoría profunda: `threejs-grounding-anti-superposicion`.

## 4. Color

### Sistema de paleta

- **60-30-10:** 60% dominante, 30% secundario, 10% acento.
- **3–5 colores máximo** + neutros. Más parece ruido.
- Roles: dominante, secundario, acento, neutro, semántico (éxito/error).
- Una paleta por mundo/escena; si cambia la hora del día, cambia el set de color, no el branding.
- Guarda tokens hex y úsalos en todos los assets.

### Armonía

- **Análoga:** calma, cohesión.
- **Complementaria:** tensión, contraste.
- **Split-complementaria:** contraste con matiz.
- **Triádica:** energía, infantil, lúdico.
- **Monocromática + acento:** elegancia, foco.

### Contraste y valor

- Sujeto vs fondo: ≥ **3:1** de valor; si no, se pierde en miniatura.
- Texto: ≥ **4.5:1**.
- No uses rojo/verde como única diferencia (daltonismo); añade forma o icono.
- Evita `#000000` y `#ffffff` puros; usa neutros tintados.
- Cuidado con rojo sobre rojo, neón sin motivo y “gradient soup”.

### Errores que empobrecen

- Arcoíris de colores sin jerarquía.
- Saturación alta en todo: nada destaca.
- Degradados por todas partes: sin material.
- Paleta distinta en cada plano.
- Color de marca cambiado por el filtro/grade.
- Fondo y héroe del mismo valor.

### Paletas de ejemplo

Úsalas como punto de partida, no como verdad. Adapta al branding y al material.

| Mundo | Dominante | Secundario | Acento | Neutro | Extra |
|---|---|---|---|---|---|
| **Papercut rojo** | `#D2201F` | `#1B2A41` | `#C9A227` | `#F2E8D5` | `#E86A5E` |
| **Lowpoly pastel** | `#BFE3F2` | `#8FBF7F` | `#E8836B` | `#E8D5A8` | `#4A6FA5` |
| **Tech / three.js** | `#0B0F1A` | `#151C2C` | `#38E1FF` | `#F5F7FF` | `#8B5CF6` |
| **Editorial cálido** | `#F7F1E8` | `#C65D3B` | `#E3A82B` | `#2B2B2B` | `#6B7A4F` |
| **Cine nocturno** | `#0A1423` | `#1F6F78` | `#F2A93B` | `#FFF3E0` | `#8C3B2E` |

Reglas:
- Una paleta por video/mundo; no mezcles papercut rojo con tech cyan.
- El acento ocupa ≤10%; si todo es acento, nada destaca.
- Verifica la paleta en grayscale: debe seguir habiendo jerarquía.
- Si hay marca, sus colores mandan; la paleta se adapta, no al revés.

## 5. Tipografía

- **2 fuentes máximo:** una display, una de texto.
- Jerarquía clara: título > subtítulo > cuerpo > caption.
- Pesos: 2–3; no uses 6.
- Evita MAYÚSCULAS en frases largas.
- Fuentes con acentos y ñ correctos; subset si es web.
- No estires, no inclines, no pongas sombras duras sin motivo.

## 6. Composición

- **Un foco por frame.** Si no sabes dónde mirar, no hay composición.
- Regla de tercios o centro deliberado; no “casi centro”.
- Espacio negativo para respirar y para el texto.
- Capas de profundidad: foreground, midground, background.
- Líneas guía hacia el héroe, no hacia el borde.
- En 9:16, el peso visual vive en la columna central.

## 7. Movimiento

- FPS consistente: 12 fps para personajes papercut; 24/30/60 para cámara.
- Easing en todo movimiento; sin cambios lineales bruscos.
- Sin jitter, sin vibración no motivada, sin spins aleatorios.
- Un movimiento principal por plano.
- Loop: primer y último frame coinciden; compara stills.
- Texto anclado a pantalla si la cámara se mueve.

## 8. Export

| Parámetro | Valor |
|---|---|
| Resolución | 1080×1920 |
| FPS | 30 o 60 (coherente con el motion) |
| Códec | H.264 High |
| Bitrate | 10–20 Mbps |
| Audio | AAC 192–320 kbps, 48 kHz |
| Loudness | −14 LUFS, TP ≤ −1 dBTP |
| Color | sRGB / Rec.709 |
| Contenedor | MP4 |

- Verifica primeros y últimos frames (no negros accidentales).
- Sin frames perdidos ni duplicados.
- Archivo reproducible en móvil antes de publicar.
- Nombra: `proyecto_v01_1080x1920.mp4`.

## 9. Pruebas de calidad

| Prueba | Cómo | Qué detecta |
|---|---|---|
| **Mobile** | móvil a 30 cm | texto pequeño, contraste, UI |
| **Mute** | sin audio | dependencia de voz, claridad visual |
| **Squint** | entornar ojos | jerarquía y foco |
| **Grayscale** | quitar color | contraste real |
| **1 segundo** | pausa en frame 0 | si el hook se entiende |
| **Safe zone** | overlay | texto bajo UI |
| **0.25×** | reproducción lenta | jitter, saltos, sync |
| **Phone speaker** | altavoz del móvil | voz tapada, música alta |

## 10. Checklist final

```
[ ] 1080×1920, fps correcto
[ ] Zona segura respetada
[ ] Texto sin desbordar ni solapar
[ ] Contraste texto/fondo ≥ 4.5:1
[ ] Paleta 60-30-10 consistente
[ ] Un foco por frame
[ ] Sin elementos flotando ni con clipping
[ ] Grounding 3D correcto
[ ] Movimiento con easing y sin jitter
[ ] Loop verificado
[ ] Audio −14 LUFS, voz clara
[ ] SFX sincronizados
[ ] Mobile + mute + squint test
[ ] Export reproducible
```

## Skills relacionadas

`threejs-composicion-contenido`, `threejs-grounding-anti-superposicion`, `threejs-lowpoly-contexto-visual`, `video-camera-movement`, `video-scene-construction`, `video-audio-design`, `viral-video-pipeline`.

## Plantilla

- `templates/qa-checklist.md`
