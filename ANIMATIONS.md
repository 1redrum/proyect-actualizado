# Animaciones, efectos e interacciones — Hypertune

Fuente: HTML del snapshot del 7 ago 2026 (clases Tailwind y estilos inline del SSR) y el CSS en vivo (`/_next/static/chunks/42tbgm5-k70rg.css`, mismo sistema de diseño). Lo marcado como *(inferido)* sale de los estados iniciales del SSR y del markup. No se pudo ejecutar JS para confirmarlo.

## Patrones globales

- **Aparición al hacer scroll** *(inferido; patrón Framer Motion)*: los bloques se renderizan con `opacity:0; transform:translateY(30px)` (o `translateY(10px)`) y pasan a `opacity:1; translateY(0)` al entrar en el viewport. Algunos elementos del hero empiezan en `opacity:0; filter:blur(10px); transform:scale(0.3)`, así que hacen zoom y desenfoque de entrada.
- **`fadeIn`** (CSS): `0% {opacity:0; translateY(4px)} → 100% {opacity:1; translateY(0)}`, `.4s ease-out forwards`. Retrasos de `.2s` y `.3s` (`.animation-delay-200/300`).
- **Botón CTA plateado** (hero, Pricing, CTA, Join y "Only performance…"):
  - Fondo `linear-gradient(90.53deg, #909096 -17.24%, #FFFFFF 53.77%, #909096 113.47%)`.
  - Borde y overlay `linear-gradient(88.68deg, rgba(255,255,255,.14) …)`.
  - Sombras `inset 0 1px 0 rgba(255,255,255,.4), inset 0 0 20px rgba(255,255,255,.2)` más una sombra exterior en 5 capas.
  - **Hover:** un pseudo `::before` con `linear-gradient(120deg, transparent, rgba(255,255,255,.6), transparent)` cruza el botón de `translateX(-100%)` a `translateX(100%)` (`700ms ease-in-out`), un *shine sweep*. Además aplica `brightness(.75)`.
- **`pulse-button`**: `3s ease-in-out infinite`. Escala 1 → 1.1 → 1 con un halo `box-shadow 0 0 10px 5px var(--brand)` y el texto pasa a verde.
- **`border-spin`**: anima la custom property `--border-angle` hasta `1turn`, un borde degradado cónico que gira.
- **`growLine`**: `scaleY(0) → scaleY(2.2)`, una línea que crece en vertical.
- **Botones de paginación** (flechas de carruseles): fondo `#ffffff1a` que pasa a `#ffffff40` en hover. Las flechas son SVG de 7×11 px.
- **Máscaras de borde**: `--edge-fade-mask-sm/lg` son `linear-gradient(to right, transparent 0% … black 7.5% … black 92.5% … transparent 100%)` y difuminan los laterales de marquees, carruseles y canvas.
- **Transición por defecto:** `.15s cubic-bezier(.4,0,.2,1)`.

## Navbar
- `position: fixed; top:0; left:50%; translateX(-50%); z-index:101`.
- *(inferido)* Al hacer scroll se compacta en una "píldora": transiciona `width, margin, background-color, border-radius, box-shadow, padding` en `duration-300`/`1000ms ease-in-out`.
- Los enlaces cambian a `bg-white/15` y `text-white` en hover.
- En móvil hay un botón hamburguesa que abre un menú lateral (`#side-menu` en versiones previas).

## Hero
- El vídeo de fondo se reproduce con `muted autoPlay playsInline preload="auto"` y usa `object-cover`. Hay `<source>` distintos para móvil y desktop.
- `--hero-video-edge-mask` compone dos máscaras (`mask-composite: intersect`). La vertical hace un fade inferior (blanco hasta el 62 %, luego 0.85, 0.45 y transparente) y la horizontal difumina los laterales.
- El titular va dentro del vídeo. El subtítulo (`16px`, `rgba(255,255,255,.5)`, `leading 140%`, `tracking -0.16px`) y el CTA entran con fade y translateY.
- Justo debajo, un marquee de testimonios (`#referals`) avanza con `animation: scroll-referals 75s linear infinite` sobre una pista de 4490 px. El contenido va duplicado para un bucle sin costura y usa `will-change:transform`.

## Introducing Hypertune (`#showcase`)
- Tabs/carrusel con 5 features (CPU Overclocking, GPU Smart Autoclock, Memory, Network y Selective Features).
- La imagen activa tiene `opacity-100 translate-y-0` y las inactivas `opacity-0`, con transición `transition-opacity duration-500 ease-out`. El cambio es un crossfade.
- Las flechas prev/next y los títulos de tab permiten cambiar. El texto descriptivo cambia con la tab.
- Hay una cita fija con avatar de 48 px.

## Bullet-points (entre Introducing y Boosts FPS)
- Hay dos tarjetas con canvas **Rive** (`frame_left.riv` y `frame_right.riv`, state machine `"State Machine 1"`, autoplay, aspecto 595/293).
- Debajo hay un marquee infinito de beneficios con icono y texto. La lista va triplicada para el bucle.

## Boosts FPS in all games (`#games-showcase`)
- **Carrusel horizontal de carátulas arrastrable** de 320 px de alto. Usa `transform: translateX(-2070px)` y `touch-action: pan-y`, y bloquea la selección y el callout. La lista está triplicada para hacer un bucle infinito.
- *(inferido)* La tarjeta central va destacada y las laterales bajan a `opacity-50/75`. Las transiciones son `duration-300 ease-in-out`.
- La tarjeta activa enseña un panel con `backdrop-blur-md` sobre `radial-gradient(ellipse at center, rgba(0,0,0,.52) → transparent 78%)`. Muestra el nombre del juego en mayúsculas (Blender Pro) y "Average boost 18-140 FPS" con una flecha verde.
- En hover, la tarjeta gana `box-shadow 0 0 24px rgba(34,197,94,.14)` (glow verde).
- Los laterales llevan degradados `#08080A` (90° y 270°) que funden el carrusel con el fondo.

## Pricing (`#pricing-card`)
- **Selector de plan Yearly/Monthly** con dos botones tipo radio. Yearly cuesta $69.99/año y lleva el badge "SAVE 42%" en verde. Monthly cuesta $9.99/mes. El seleccionado se resalta y el otro queda en `opacity-50`. En la versión en vivo, Yearly además tacha "$119.88".
- La tarjeta tiene fondo `linear-gradient(180deg, rgba(31,72,54,.62) -111.93%, rgba(14,16,17,.62) 168.06%)` y `backdrop-blur-md`. Lleva un brillo superior `linear-gradient(180deg, #13F287 -88%, transparent 88%)`.
- Los iconos de features usan `mask-image` con el SVG y se rellenan con un degradado plateado (`#ADADAD → #E3E3E3`, 12 px).
- Detrás hay decoración de fondo con máscara de bordes. El CTA plateado usa el *shine sweep*.
- Debajo aparece "Want Hypertune for the whole team? **Contact Us.**", que enlaza a Discord.
- El markup aparece dos veces (versión móvil y desktop).

## How it works (`#ram`)
- Es una **sección guiada por el scroll** con una barra `role="progressbar"` que muestra "Progress 0%" y avanza hasta el 100 %.
- En desktop, una línea horizontal con `border-image: linear-gradient(90deg, #131516, #13F287)` crece con `width: calc(2.5px + (100% - 5px) * progreso)`. En móvil la línea es vertical (`height: calc(...)`, gradiente 180°).
- Tiene 4 pasos: Download Hypertune, Scan your computer, Run optimization y Get FPS boost. Cada paso pasa de `opacity-25/0.38` a 1 cuando el progreso lo alcanza (`transition-opacity duration-300`).
- *(inferido)* La sección queda fijada (sticky) mientras el usuario hace scroll.
- El orden de los pasos 2 y 3 difiere entre el markup móvil y el desktop.

## CTA (`#call-to-action`)
- En desktop hay un vídeo de fondo (`cta.mp4`) en bucle y mudo. En móvil, un bloque alternativo de 630 px con fondo `#131516`.
- Contiene el titular "Your FPS ceiling just moved.", el subtítulo y el botón plateado.

## FAQ (`#faq`)
- Es un **acordeón** de 7 preguntas. Cada fila muestra "+" y tiene `hover:bg-[#141617]`.
- Al abrir, el contenido se anima con `accordion-down/up` (altura `0 ↔ var(--radix-accordion-content-height)`), con transiciones de `300–500ms`.
- El icono pasa de `scale(0)` a `scale(1)` o rota (`transition-transform`).
- Incluye JSON-LD `FAQPage` en el `<head>` (vale la pena replicarlo por SEO).

## Join the community (`#join`)
- Tiene 3 tarjetas (Discord, Creator program y Join the team) con brillos de esquina: `linear-gradient(225deg / 135deg, rgba(94,255,178,0) …, rgba(94,255,178,.42) 100%)`.

## Footer
- Al fondo hay un resplandor `radial-gradient(ellipse at bottom, #13F287 0%, transparent 50%)` al 50 % de opacidad.
- Los rayos (lightning-1..3) y el patrón `crypto.svg` llevan una máscara radial desde abajo.
- Una línea separadora `linear-gradient(90deg, transparent, #13F287, transparent)`.
- **Enlaces con subrayado animado:** un pseudo `::after` crece de ancho 0 a `w-full` en `#13F287` (`500ms ease-in-out`) y el texto pasa a `#13F287`.
- Los iconos sociales suben de `opacity-50` a 100 en hover.
- Contiene el copy "Hey, you. It's time to start winning again." y "© 2026 Compready. All rights reserved."

## Tokens de diseño (CSS en vivo)

| Token | Valor |
|---|---|
| `--brand` | `#13f287` |
| `--brand-dark` / `--brand-darker` | `#132811` / `#06562f` |
| Fondo | `#000`. Secciones `#08080A`, `#131516`, `#0e1011` |
| `--color--card-background` / `--color--card-border` | `#0b0c0d80` / `#ffffff0d` |
| `--color--button-cta-primary` / `secondary` | `#909096` / `#fff` |
| `--color--text-secondary` (rojo) | `#e1251b`. Icono rojo `#ff4f4f` |
| Texto secundario | `#797D86`, `rgba(255,255,255,.5)` |
| `--color--modal-primary` / `secondary` | `#1a1a1c` / `#0c0e0f` |
| Ancho máximo | `1440px`. Paddings laterales: `120px` xl, `100px` lg, `60px` md, `32px` sm y `20px` base |
| Radios | `1rem`, `1.5rem` |
| Títulos de sección | Inter Display, `38px` aprox., con eyebrow gris `#797D86` ("FAQ", "Pricing"…) |
