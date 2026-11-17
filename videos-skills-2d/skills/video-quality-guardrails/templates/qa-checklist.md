# QA checklist — video

Proyecto:
Versión:
Fecha:

## Canvas
- [ ] 1080×1920
- [ ] 30/60 fps coherente
- [ ] Zona segura: 180 top / 320 bottom / 120 right
- [ ] Nada crítico en el 5% del borde

## Texto
- [ ] Sin desbordamiento
- [ ] Padding 8–12%
- [ ] Máx. 2 líneas
- [ ] Tamaño mínimo 32 px (captions 40–48)
- [ ] Contraste ≥ 4.5:1
- [ ] Acentos y ñ correctos
- [ ] No tapa cara/logo/prop clave

## Solapamientos
- [ ] Bounding boxes sin colisión
- [ ] Separación ≥ 24 px
- [ ] 48 px alrededor de la cara
- [ ] Un foco por frame
- [ ] 5 frames clave revisados

## Grounding 3D
- [ ] Pies/base en Y = superficie
- [ ] Sin flotación ni hundimiento
- [ ] Sin clipping
- [ ] Sombra de contacto
- [ ] Texto 3D no atraviesa cabezas

## Color
- [ ] Paleta 3–5 colores + neutros
- [ ] 60-30-10
- [ ] Sujeto/fondo ≥ 3:1
- [ ] Sin rojo/verde como única señal
- [ ] Sin #000/#fff puros
- [ ] Consistente entre planos

## Tipografía
- [ ] Máx. 2 fuentes
- [ ] Jerarquía clara
- [ ] Sin MAYÚSCULAS largas
- [ ] Sin estiramientos

## Composición
- [ ] Un foco
- [ ] Tercios o centro deliberado
- [ ] Espacio negativo
- [ ] Capas de profundidad

## Movimiento
- [ ] Easing
- [ ] Sin jitter
- [ ] Un movimiento principal por plano
- [ ] Loop verificado

## Audio
- [ ] Voz clara en móvil
- [ ] Música ducked
- [ ] SFX sincronizados
- [ ] −14 LUFS / −1 dBTP
- [ ] Sin clics

## Export
- [ ] H.264 / AAC
- [ ] Primer y último frame correctos
- [ ] Sin frames perdidos
- [ ] Reproducible en móvil

## Pruebas
- [ ] Mobile
- [ ] Mute
- [ ] Squint
- [ ] Grayscale
- [ ] 1 segundo
- [ ] Safe-zone overlay
- [ ] 0.25×
- [ ] Phone speaker
