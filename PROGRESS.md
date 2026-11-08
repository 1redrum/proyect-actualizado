# PROGRESS

## Etapa 1 — Inspección y recopilación de recursos ✅ (8 nov 2026)

- [x] Inspeccionadas las 9 secciones objetivo. Referencia: snapshot de Wayback del 7 ago 2026, porque la home en vivo ya no incluye "Boosts FPS in all games", "How it works" ni la FAQ.
- [x] Identificados unos 60 recursos originales: imágenes, vídeos, SVG, Rive, iconos y 3 familias tipográficas.
- [x] Descargados los recursos con uso autorizado: Inter Display (4 pesos) y DM Mono, ambas SIL OFL, en `public/assets/fonts/`.
- [x] No descargados, por ser propietarios o de terceros: imágenes, vídeos, logos, SVG, `.riv` y la fuente Blender Pro. Están documentados con su URL original.
- [x] `ASSET_MAP.md`: cada recurso con su sección, su estado y su ruta local prevista.
- [x] `ANIMATIONS.md`: animaciones, efectos, interacciones y tokens de diseño.
- [x] `PROJECT_CONTEXT.md`: contexto para futuras sesiones.

## Próxima etapa — Desarrollo (pendiente)
- [ ] Decidir qué hacer con los recursos visuales: permiso, recursos propios o placeholders.
- [ ] Elegir el stack y montar el proyecto.
- [ ] Maquetar las secciones en orden: Navbar, Hero, Introducing, Boosts FPS, Pricing, How it works, CTA, FAQ y Footer.
- [ ] Implementar las interacciones de `ANIMATIONS.md`.

## Etapa 2 — Navbar y Hero ✅ (8 nov 2026)

Stack: sitio estático sin build (`public/index.html`, `public/styles/main.css`, `public/scripts/main.js`) y `netlify.toml` con `publish = "public"`. Las siguientes secciones se añaden en el mismo archivo, debajo del comentario final de `<main>`.

- [x] **Navbar** fija con los mismos breakpoints, paddings (25/75/100/150 px), altura de 70 px, tamaños de texto (1.5rem/1rem/15px) y hover `bg-white/15`. Al hacer scroll se compacta en una píldora (efecto inferido). En móvil hay hamburguesa y menú lateral.
- [x] **Hero** a 100vh con un `<video>` mudo en autoplay. Tiene fuentes distintas para móvil y desktop, la máscara doble `--hero-video-edge-mask`, el bloque de contenido en `top:110/125px`, el subtítulo original y la entrada con fade, translateY y blur/zoom.
- [x] El CTA "Boost my performance" enlaza a `/pricing` y usa el botón plateado con *shine sweep* y `brightness(.75)` (en `.btn-silver`, reutilizable).
- [x] Comprobado en el navegador a 1440×900 y 390×844, con hover, scroll y menú móvil, sin errores de JS.
- ⚠️ **Recursos originales ausentes** porque no hay permiso para descargarlos: `public/assets/hero/intro_v2.mp4`, `intro_v2_mobile.mp4` y `public/assets/navbar/hypertune-logo.svg`. Mientras falten se muestran placeholders neutros con las mismas proporciones. El titular del hero va dentro del vídeo, así que no se verá hasta añadirlo. Basta con copiar los archivos en esas rutas, sin tocar código.
- ⚠️ `/pricing` todavía no existe (da 404) y los anclajes `#showcase` y `#faq` apuntan a secciones pendientes.

## Pendiente
- [ ] Introducing Hypertune, Boosts FPS in all games, Pricing (y la página `/pricing`), How it works, CTA, FAQ y Footer.
- [ ] Decidir si se incluyen las secciones "extra": `#referals` (marquee bajo el hero), `#problem`, etc.
- [ ] Obtener o aportar los vídeos y el logo originales.

## Etapa 3 — Introducing, Boosts FPS y How it works (8 nov 2026)

- [x] Continuación del mismo sitio estático, sin cambiar stack ni estructura. Navbar, Hero y sus estilos/controles anteriores conservados.
- [x] `#showcase`: cinco tabs con crossfade de 500 ms, flechas cíclicas, navegación por teclado (flechas/Home/End), estados ARIA, cita y espacio de avatar de 48 px.
- [x] `#games-showcase`: nueve juegos, pista triplicada con reposicionamiento circular, arrastre con ratón/táctil, flechas y teclado; tarjetas de 320 px de alto, estados central/lateral, máscara de bordes, panel con blur y glow verde.
- [x] `#ram`: cuatro pasos, contenedor sticky, progreso de 0 a 100 % según scroll, barra accesible, línea horizontal en desktop y vertical en móvil, pasos con transición de opacidad.
- [x] Tipografías locales Inter Display y DM Mono, tokens y breakpoints de la documentación; entradas al viewport y soporte de movimiento reducido.
- [x] Comprobación con Chromium/Playwright a 1440×900 y 390×900: selección de tabs, teclado, flechas, carrusel circular, arrastre, progreso 0/50/100, sin desbordamiento horizontal ni excepciones JavaScript.

### Recursos ausentes y límites de fidelidad

El ZIP sí incluye `public/assets/hero/intro_v2.mp4` (la nota anterior que lo marcaba ausente quedó desactualizada). No se ha alterado el Hero.

Faltan los siguientes recursos de estas tres secciones, referenciados exactamente en las rutas previstas de ASSET_MAP.md:
- `public/assets/introducing/{cpu-overclocking,gpu-smart-autoclock,memory-optimization,network-optimization,selective-features}.png`.
- `public/assets/introducing/avatar.png`.
- `public/assets/games/{battlefield-6,cs-2,call-of-duty-bo3,deadlock,fortnite,marvel-rivals,overwatch,rust,valorant}.png`.
- Blender Pro Medium/Bold: se usa Inter Display como fallback, sin descargar otra fuente ni generar arte.

Se mantienen cajas neutras para los medios ausentes; no se han descargado recursos adicionales ni generado imágenes. Las imágenes se mostrarán al incorporarlas en las rutas indicadas. How it works no requiere medios externos.

La documentación no conserva dimensiones de las capturas, todos los espaciados, descripciones completas de tabs ni valores FPS individuales de cada juego. La caja de captura 1200:675 y los detalles sin medidas documentadas son aproximaciones explícitas; el texto descriptivo de tab queda limitado al título disponible. El rango 18–140 FPS se reproduce como rango general documentado. No se afirma equivalencia visual exacta con el snapshot: queda pendiente cotejarla al disponer de los recursos y de una referencia visual completa.

### Pendiente tras esta entrega
- Pricing (incluida `/pricing`), CTA, FAQ y Footer permanecen pendientes y no se han implementado.
- Las secciones extra no se han añadido.
- Siguen ausentes logo de Navbar y vídeo móvil del Hero; no se modificaron esas secciones.
