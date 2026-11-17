---
name: Video Scene Construction
description: Construye escenas filmables y renderizables — objetivo, obstáculo, giro, blocking, geografía, cobertura, props, continuidad y transiciones. Úsala cuando el usuario pida escena, escenografía, staging, blocking, puesta en escena, secuencia, plano secuencia, geografía, continuidad o cómo pasar de una idea a una secuencia visual. Funciona para papercut 2D, lowpoly/3D y three.js.
---

# Video Scene Construction

## Principio

Una escena no es "lo que pasa": es **una unidad de cambio**.
Alguien quiere algo, algo se opone, y al final la situación es distinta. Si nada cambia, no es escena: es relleno.

## La columna de la escena

Antes de escribir un plano, define:

| Campo | Pregunta |
|---|---|
| **Quién** | ¿Quién conduce la escena? |
| **Quiere** | ¿Qué quiere, en concreto y visible? |
| **Obstáculo** | ¿Qué se lo impide? |
| **Táctica** | ¿Qué hace para conseguirlo? |
| **Giro** | ¿Qué cambia a mitad? |
| **Resultado** | ¿Yes-but, no-and, no-but? |
| **Valor** | ¿Qué está en juego (amor, estatus, verdad, supervivencia)? |

Si no puedes nombrar el valor que cambia, la escena no tiene función.

## Entrar tarde, salir temprano

- Entra cuando el conflicto ya empezó; salta saludos, llegadas y preparativos.
- Sal en el momento de máxima consecuencia; no muestres la despedida.
- La primera imagen de la escena debe tener tensión o información.
- La última imagen debe abrir la siguiente pregunta.

## Geografía

Antes de cubrir, dibuja un **plano cenital** con:

- posiciones iniciales y finales,
- ejes de mirada,
- puertas, ventanas, obstáculos,
- recorridos,
- fuente de luz,
- cámara(s).

Reglas:

- **Master shot** primero: wide que explique dónde está todo.
- **Eje (180°):** mantén a los personajes a un lado consistente.
- **Screen direction:** si A va a la derecha, B no puede ir a la derecha en el contraplano sin transición.
- **Eyeline:** la mirada debe coincidir en altura y dirección.
- **Profundidad:** foreground, midground, background; no todo en el mismo plano.

## Staging y blocking

El movimiento nace del cambio de poder, no del aburrimiento.

- **Acercarse** = intimidad, amenaza, presión.
- **Alejarse** = derrota, rechazo, protección.
- **Rodear** = control, evaluación.
- **Sentarse** = bajar la guardia o tomar poder.
- **Levantarse** = decisión, ruptura.
- **Inclinarse** = urgencia, confesión.
- **Quietud** = dominio o miedo; úsala cuando sea más fuerte que moverse.

Reglas:

- Un cambio de blocking marca un cambio de beat.
- No muevas a todos a la vez; el foco es uno.
- Usa niveles (de pie, sentado, en el suelo) para jerarquía.
- Deja espacio negativo para el texto y la UI en 9:16.

## Cobertura

| Plano | Función |
|---|---|
| **Wide / master** | geografía y relaciones |
| **Medium** | diálogo y acción |
| **Close** | emoción y decisión |
| **Insert** | información, objeto, detalle |
| **Over-the-shoulder** | relación y subtexto |
| **POV** | identificación |
| **Cutaway** | ritmo, contexto, reacción |

- Cubre para editar: no un solo plano de cada cosa.
- Rueda inserts de props y manos: salvan continuidad y ritmo.
- En 9:16, el close es tu wide: el móvil ya es un primer plano.
- Para papercut 3D, los "planos" son capas y parallax; para lowpoly, la cámara ortográfica es el master.

## Tipos de escena

- **Diálogo:** poder cambia línea a línea; subtexto; reacciones.
- **Acción:** geografía clara; causa-efecto; impacto legible.
- **Transformación:** mismo encuadre antes/después; el cambio es el evento.
- **Reveal:** ocultar y mostrar; el corte o el movimiento es la revelación.
- **Producto:** héroe visual; beneficio visible; un solo claim.
- **Tutorial:** contexto → pasos → resultado; inserts de manos.
- **Montaje:** elipsis rítmica; una idea por plano; música manda.
- **Plano secuencia:** la cámara es el montaje; cada movimiento revela algo.

## Transiciones

- **Corte en acción:** el movimiento tapa el corte.
- **Match cut:** forma, color o movimiento conecta.
- **Sound bridge:** el audio de la siguiente escena entra antes.
- **Light transition:** flash, cambio de luz, día/noche.
- **Object wipe:** un prop cruza el frame.
- **Paper actions:** fold, page turn, peel, sheet fly.
- **3D:** fly-through, portal, dolly into object.
- **No uses dissolve** salvo paso de tiempo o tono onírico.

## Continuidad

```
[ ] Eje y screen direction
[ ] Eyeline y altura
[ ] Props y vestuario
[ ] Luz y hora del día
[ ] Color y paleta
[ ] Estado emocional coherente
[ ] Velocidad de acción comparable
[ ] Nada importante en el 5% del borde
[ ] Texto legible y fuera del movimiento
```

## 9:16

- Compón en columna central; la escena no debe depender de los bordes.
- Apila la información en vertical: arriba contexto, centro héroe, abajo texto.
- Evita grupos en línea horizontal; usa profundidad y altura.
- El suelo y el techo son tus aliados para escala.
- Los movimientos verticales (tilt, rise, drop) funcionan mejor que los laterales.

## Papercut 2D

- Capas de papel en parallax; la profundidad viene de tonos, no de perspectiva.
- Figuras articuladas con remaches; poses duras a 12 fps.
- Props como piezas recortadas; el cambio de escena es una acción de papel.
- La luz puede ser un evento: contraluz, proyección de calados.

## Lowpoly / 3D

- Cámara ortográfica isométrica para el master.
- Bloques y prismas; flat shading; sin texturas.
- Cada pieza aparece con rebote y sonido.
- La luz cambia la hora del día; no cambies el modelo.
- Respeta grounding: todo toca su superficie.

## Errores frecuentes

- Escena sin objetivo ni obstáculo.
- Personajes que hablan de pie sin blocking.
- Cubrir todo en el mismo tamaño de plano.
- Cruzar el eje y desorientar.
- Props que aparecen/desaparecen entre planos.
- Texto encima de la cara del héroe.
- Cambiar de escena sin transición ni elipsis.
- Explicar con diálogo lo que se puede mostrar.

## Plantillas

- `templates/scene-card.md`
- `templates/shot-list.md` (en `video-camera-movement/templates/`)

## Skills relacionadas

`video-camera-movement`, `video-audio-design`, `guion-video-viral`, `storyboard-shot-design`, `dialogue-performance-blocking`, `papercut-video`, `threejs-grounding-anti-superposicion`.
