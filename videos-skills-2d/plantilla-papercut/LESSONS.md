# Lecciones de producción — Arlia “Hoja en blanco”

Estas son correcciones reales hechas sobre los stills. Aplicarlas antes de renderizar evita el 80% de las iteraciones.

## Checklist pre-render (obligatorio)

1. **Imports runtime**: además de `node --check`, abrir el primer still. Un helper usado dentro de una pieza (`hash`, `crescent`, etc.) puede faltar en `pieces.js` y explotar recién al construir la página.
2. **Contraste de carteles**: nunca texto crema sobre papel crema. En la fachada vacía, URL y cartel van en tinta/rojo. Los carteles chicos usan texto corto y sólido (“SIN WEB”), no calado fino.
3. **Zona de acción libre**: en el plano de corte/zoom, ningún personaje debe tapar la pieza que se corta. Si molesta, sacarlo o mandarlo al borde.
4. **Path de corte = zoom actual**: si cambia el zoom, recalcular el rectángulo en pantalla. No reutilizar el path de otra cámara.
5. **Z-order del portfolio**: la carta héroe se dibuja última; las laterales van detrás. Los labels laterales van fuera del footprint de la carta central (x≈155 / 925, 22 px).
6. **UI de teléfono anclada abajo**: input a `y1 - 148`, no a `y0 + 404`. El chat puede quedar vacío en el medio; el input nunca flota.
7. **Logo dentro del contenedor**: verificar bbox con margen interno. En el cartel de oferta: escala .29 y centro y≈1058; nunca dejar que el ala cruce el borde dorado.
8. **Texto redundante que colisiona**: si un texto chico pisa un cartel del fondo (ej. “ARLIA” sobre “ABIERTO”), eliminarlo.
9. **Safe zone inferior**: subtítulos ocupan desde y≈1480. Personajes/acción deben terminar pies ≤1470 o quedar completamente arriba; si no, se ven flotando o cortados.
10. **Personajes en reveal**: mejor ausentes o dos figuras pequeñas (s≈.55) con pies en 1470, a los costados. Nunca tres figuras grandes delante del sitio.
11. **Loop perfecto**: el frame final debe ser idéntico al inicial. Desvanecer línea de corte, virutas, guías y títulos antes de 29.5 s. En este video: `strokeCut(..., 1 - seg(t, 29.28, 29.5))`.
12. **Subtítulos cubren la VO**: extender el último cue hasta el final real de la voz (acá `10%` hasta 26.35, no 25.4).
13. **Tijeras legibles**: manijas separadas (centro ±34, radios 46×27). Si quedan juntas parecen una flor.
14. **Título del hook**: maxW 780; la salida de tijeras no debe cruzar el texto. Si cruza, desvanecer el panel antes o desviar la tijera.
15. **Performance**: cachear piezas de texto (`paperText`), no regenerar canvas con `drawPaperText` en cada frame.
16. **Escritura de archivos**: no mandar un `scenes.js` gigante en un solo `write`; se trunca el JSON. Partir en 2–3 bloques y validar sintaxis.
17. **Stills mínimos**: 0.5, 1.0, 1.8, 3, 5.5, 6.3, 8, 10.5, 11.3, 12, 13.5, 14.9, 17.5, 18.4, 20, 23, 24.8, 26, 27.2, 28.6, 29.7. Revisar a tamaño real, no thumbnail.
18. **Render final**: 30 fps, 3 workers, swiftshader; después `ffprobe` de duración/resolución y `loudnorm` a −14 LUFS / TP ≤ −1 dBTP.

## Errores concretos corregidos

| Síntoma | Causa | Fix |
|---|---|---|
| `hash is not defined` | `pieces.js` no importaba `hash` | agregar al import |
| Cartel de fachada ilegible | texto crema sobre cartel crema | tinta/rojo + pill oscura |
| Cartel del dueño ilegible | “ESTAMOS” calado a 20 px | “SIN WEB” sólido 25 px |
| Dueño tapaba el corte | personaje en el centro con zoom 1.5 | eliminarlo del plano; cámara 1.35 |
| Título “MUEBLES” tapado | carta lateral encima de la central | dibujar héroe al final |
| Labels laterales cortados | centrados bajo cartas y tapados por la central | x 155/925, 22 px |
| Input del DM en el medio | `y0 + 404` | `y1 - 148` |
| Logo fuera del cartel | escala .32 en y 1012 | escala .29 en y 1058 |
| “ARLIA” chico sobre “ABIERTO” | texto redundante | eliminar |
| Loop con marco oscuro | línea de corte persistente | fade 29.28–29.5 |
| Personas flotando/cortadas | pies 1548 bajo subtítulo | pies 1470, s .55, o sacar |
| Subtítulo no cubría VO | cue terminaba 25.4 | extender a 26.35 |

## Regla de oro

**Ningún render completo sin stills de todos los beats.** Cada corrección de esta lista se detectó en un still de 1–2 s, no en el video final. El still es barato; el render de 900 frames no.
