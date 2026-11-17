# QA — Hoja en blanco

Proyecto: `v5_pymes_hoja_en_blanco`
Versión: guion v1
Fecha: 2026-11-16

## Canvas
- [ ] 1080×1920
- [ ] 30 fps; personajes a 12 fps; cámara/luz a 24 fps
- [ ] Zona segura: 180 top / 320 bottom / 120 right
- [ ] Nada crítico en el 5% del borde

## Texto
- [ ] Sin desbordamiento
- [ ] Máx. 2 líneas por bloque
- [ ] 18–22 caracteres por línea
- [ ] Títulos 56–72 px; subtítulos 44 px
- [ ] Contraste ≥ 4.5:1
- [ ] Acentos y ñ correctos
- [ ] No tapa cara, logo, mapa ni prop clave

## Solapamientos
- [ ] El local crema no se superpone con el jade
- [ ] El texto del banner no tapa al dueño
- [ ] Las etiquetas del portfolio no tapan la captura
- [ ] El logo no tapa la bandera del 10%
- [ ] El teléfono del DM no tapa la burbuja
- [ ] 5 frames clave revisados: hook, mapa, corte, portfolio, oferta

## Grounding / papel
- [ ] Cada capa toca su superficie; sin flotación
- [ ] Sin clipping entre locales, cliente y tijera
- [ ] Sombras de papel coherentes con la luz
- [ ] El local crema no tiene sombra hasta que se corta
- [ ] El logo aterriza con contacto y sombra

## Color
- [ ] Paleta: tinta `#1B2A41`, crema `#F2E8D5`, rojo `#D2201F`, oro `#C9A227`, jade `#2F6F6B`
- [ ] 60-30-10
- [ ] Sin rojo sobre rojo sin contorno insertado
- [ ] Sujeto/fondo ≥ 3:1
- [ ] El oro no compite con el rojo
- [ ] Grayscale: la transformación se sigue leyendo

## Tipografía
- [ ] Archivo Black / Plus Jakarta Sans para títulos
- [ ] Fraunces SemiBold para subtítulos
- [ ] Máx. 2 fuentes + logo
- [ ] Sin estiramientos ni sombras duras

## Composición
- [ ] Un foco por frame
- [ ] Héroe en el tercio central
- [ ] La calle se apila en vertical
- [ ] Espacio negativo para texto

## Movimiento
- [ ] Easing en cámara y papel
- [ ] Sin jitter
- [ ] Un movimiento principal por plano
- [ ] Loop: shot 14 = shot 1

## Audio
- [ ] Voz clara en móvil
- [ ] Música ducked −9 dB
- [ ] SFX sincronizados al frame
- [ ] Sin clics ni clipping
- [ ] −14 LUFS / TP ≤ −1 dBTP
- [ ] 0.3 s de silencio antes de "Arlia. Tu negocio, visible."

## Export
- [ ] H.264 High, 10–20 Mbps
- [ ] AAC 192–320 kbps, 48 kHz
- [ ] Primer y último frame correctos
- [ ] Sin frames perdidos
- [ ] Reproducible en móvil

## Pruebas
- [ ] Mobile a 30 cm
- [ ] Mute: se entiende la historia
- [ ] Squint: se lee el hook y la oferta
- [ ] Grayscale
- [ ] Safe-zone overlay
- [ ] 0.25×: sin jitter
- [ ] Altavoz de móvil

## Pendientes
- [ ] URLs del portfolio (2–3)
- [ ] Capturas 1440×900
- [ ] Autorización de nombres
- [ ] Logo vectorial / alta resolución
- [ ] Casting de voz
- [ ] Aprobación de paleta
