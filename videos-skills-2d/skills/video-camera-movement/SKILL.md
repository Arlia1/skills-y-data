---
name: Video Camera Movement
description: Diseña movimientos de cámara con intención para videos verticales 9:16 y escenas 3D/2D. Úsala cuando el usuario pida shot list, movimiento de cámara, transiciones, parallax, dolly, push-in, órbita, grúa, whip pan, cámara lenta, continuidad o "que se vea dinámico". Cubre motivación, timing, easing, eje, 180°, y adaptación a papercut, lowpoly y three.js.
---

# Video Camera Movement

## Principio

La cámara no decora: **actúa**. Cada movimiento debe hacer una de estas cosas:

- revelar información,
- seguir una acción,
- aumentar presión o escala,
- cambiar la relación emocional con el sujeto,
- conectar dos ideas.

Si no hace ninguna, es cámara estática. Mover por mover se siente amateur.

## Catálogo de movimientos

| Movimiento | Expresa | Cuándo usarlo | Error típico |
|---|---|---|---|
| **Locked / estática** | control, observación, diseño | papercut frontal, título, producto, punchline | aburrir por no tener nada que mirar |
| **Pan** | recorrer un mundo, comparar | paisajes de capas, antes/después horizontal | pan sin destino claro |
| **Tilt** | revelar altura, escala | edificio, personaje que aparece | tilt demasiado lento |
| **Dolly in / push-in** | intimidad, tensión, importancia | revelación, decisión, cara | push-in a nada |
| **Dolly out / pull-back** | contexto, soledad, escala | final de acto, "esto era parte de algo mayor" | alejarse sin nueva información |
| **Tracking / travelling** | acompañar, velocidad | caminar, correr, viajar | cámara que se adelanta o atrasa |
| **Crane / jib** | dios, destino, amplitud | apertura, cierre, multitud | grúa que marea |
| **Órbita / arc** | poder, mito, producto héroe | personaje en 3D, objeto central | orbitar algo sin detalle |
| **Handheld** | urgencia, verdad, caos | acción, testimonio, comedia | shaky sin motivo |
| **Whip pan** | energía, corte, sorpresa | transición cómica o de acción | whip sin match |
| **Roll / dutch** | inestabilidad, peligro | thriller, caída, tensión | abusar y marear |
| **Zoom** | énfasis artificial, comedia | meme, punchline, reveal | zoom digital sucio |
| **Dolly zoom** | vértigo, cambio de verdad | shock, revelación | usarlo sin clímax |
| **Parallax** | profundidad, riqueza | papercut, lowpoly, dioramas | capas que no se separan |
| **Fly-through** | mundo habitable, inmersión | three.js, arquitectura, isla | atravesar geometría |
| **Rack focus** | cambio de atención | revelar segundo plano | foco que duda |
| **Overhead / top-down** | tablero, destino, patrón | mapas, mesas, coreografías | no se entiende la geografía |
| **Low angle** | poder, amenaza | villano, héroe, producto | ángulo bajo sin motivo |
| **POV** | identificación | inmersión, juego, decisión | POV falso sin manos/cuerpo |

## Gramática de movimiento

1. **Motivación antes que movimiento.** Escribe en el shot list *por qué* se mueve.
2. **Un movimiento principal por plano.** Un push-in con órbita y roll es mareo, no cine.
3. **Empieza y termina en composición.** El primer y último frame deben funcionar como stills.
4. **Corta en movimiento, no en pausa.** El corte se esconde cuando la acción ya está en marcha.
5. **Respeta el eje (180°).** No cruces la línea entre dos personajes sin un plano de transición.
6. **Screen direction:** si alguien va a la derecha, sigue a la derecha hasta que un giro lo justifique.
7. **Lead room:** deja aire hacia donde mira o se mueve el sujeto.
8. **Eyeline match:** si mira fuera de cuadro, el siguiente plano debe respetar altura y dirección.
9. **Match cut:** conecta forma, movimiento o color entre planos.
10. **Anticipación → acción → settle.** El movimiento tiene aceleración, no velocidad constante.

## Timing y easing

- **Duración mínima perceptible:** 0.4–0.6 s para un movimiento corto; 1.5–3 s para un movimiento narrativo.
- **Ease-in/out** en cámara 3D; nunca lineal salvo fly-through o loop.
- **Overshoot** máximo 1–2 frames; sin rebote el movimiento se siente robótico.
- **Corte cada 2–4.5 s** en short-form; el movimiento puede ser el cambio perceptible.
- **12 fps** para personajes papercut; **24/30/60 fps** para cámara, luz y física.
- **Loop perfecto:** la cámara vuelve exactamente al frame 0; verifica con still comparativo.

## Vertical 9:16

- Compón en **columna central**; el héroe no debe quedar tapado por la UI.
- Usa **parallax vertical** (capas que suben/bajan), no solo horizontal.
- **Headroom** arriba y **suelo** abajo: deja aire, pero no desperdicies 40% del frame.
- En grupos, apila en profundidad y altura; evita filas horizontales que se salen del cuadro.
- Push-in vertical y reveal de abajo hacia arriba funcionan mejor que paneos horizontales largos.
- Zona segura: ~180 px arriba, ~320 px abajo, ~120 px derecha.
- Subtítulos: y ≈ 1450–1600; la cámara no debe mover el texto.

## Recetas por formato

- **Reveal papercut:** plano frontal bloqueado → la tijera corta → push-in al hueco → la luz revela el mundo.
- **Diorama lowpoly:** órbita lenta 15–20° → tilt down al detalle → pop de un edificio → pull-back al conjunto.
- **Producto héroe:** push-in bajo → órbita 30° → rack focus del logo al detalle → pull-back con end card.
- **Antes/después:** plano espejo exacto, misma lente y altura; el cambio ocurre en el corte o en un whip.
- **Transformación:** cámara locked, el objeto cambia; el movimiento aparece solo en el payoff.
- **Tutorial:** wide de contexto → insert de manos → close del resultado; cortes en acción.
- **Three.js:** vuelo continuo con spline, mirada al target, FOV estable; evita cambiar FOV y posición a la vez.

## Shot list

| # | t | Plano | Tamaño | Ángulo | Movimiento | Acción | FOV/Lente | Duración | Audio |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0–2 | Hook | close | frontal | push-in | … | 35mm | 2 s | hit |

Plantilla: `templates/shot-list.md`.

## Continuidad

```
[ ] Eje y screen direction consistentes
[ ] Eyeline y altura de cámara
[ ] Lente/FOV coherente entre planos de la misma escena
[ ] Luz y hora del día
[ ] Props, vestuario, color
[ ] Velocidad de movimiento comparable
[ ] Nada importante dentro del 5% del borde
[ ] Texto/UI fuera del movimiento o anclado a pantalla
```

## Errores que gritan "amateur"

- Mover la cámara en cada plano.
- Órbita alrededor de algo sin detalle que justifique.
- Zoom digital para “arreglar” una composición.
- Cruzar el eje y desorientar.
- Whip pan sin match de dirección.
- Handheld en una escena que pedía control.
- Cambiar FOV y distancia a la vez (efecto vértigo accidental).
- Cámara lenta sin motivo narrativo.
- Texto que se mueve con la cámara y no se puede leer.

## Implementación

- **Three.js:** usa `threejs-camara-movimientos` para código, easing, FOV y loops.
- **Composición y zona segura:** `threejs-composicion-contenido`.
- **Escenas y blocking:** `video-scene-construction`.
- **Shot planning:** `storyboard-shot-design`.
- **Papercut/3D:** `papercut-video`.
- **Calidad final:** `video-quality-guardrails`.

## Plantilla

- `templates/shot-list.md`
