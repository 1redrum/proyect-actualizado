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

## Etapa 4 — Pricing en home y `/pricing` (8 nov 2026)

### Implementación
- [x] Sección `#pricing-card` añadida entre Games y How it works, respetando el orden de referencia. No se han modificado Hero, Introducing, Games ni How it works.
- [x] Página estática independiente en `public/pricing/index.html`, accesible en `/pricing` (el servidor estático puede normalizar a `/pricing/`). No necesita SPA, paquetes ni cambios en Netlify.
- [x] Fuente compartida `components/pricing.html`, renderizada por `python scripts/render-pricing.py` en ambas páginas. La página independiente reutiliza también el head y Navbar de la home, con enlaces de retorno `/#hero`, `/#showcase` y `/#faq`. Los HTML resultantes están incluidos: no se requiere generar nada para servirlos.
- [x] CSS y controles compartidos en `public/styles/pricing.css` y `public/scripts/pricing.js`. Se conservan los archivos y la estructura estática anterior.
- [x] Diseño específico de la referencia: panel 480×750 px en home, aro 727 px, raíles 25+25 px, soportes 30×67 px, fondo #0E0F10, radio 16 px, sombras en tres capas, planes de 89 px y radio 8 px, borde y fondo con los degradados originales, blur, selección verde, SAVE 42%, seis features y CTA plateado reutilizado con shine sweep. Mobile: panel de 800 px y ancho 98% de la caja interior, titular dentro del panel, sin aro/raíles. Tipografías locales Inter Display; cifras en Inter como el HTML original.
- [x] Yearly $69.99/year y Monthly $9.99/month con radios nativos accesibles, ratón y teclado; plan no seleccionado al 50% de opacidad. Entrada al viewport con fade/translate y soporte de movimiento reducido.
- [x] Home: eyebrow Pricing, titular “Next level power is one click away.”, “Unlock your Performance” enlazado a `/pricing`, y enlace de equipo a Discord. La selección Monthly se conserva al pasar a `/pricing?plan=monthly`.
- [x] Página independiente: encabezado “The cheapest upgrade you'll ever buy.” y subtítulo del HTML archivado, panel desktop 480×700 px a 340 px del inicio, panel móvil a 460 px, precio anual anterior $119.88 tachado, “Smart Overclocking” y pie de garantía. No se incluyen las secciones Tutorial/CTA/Footer de esa ruta porque quedan fuera del alcance solicitado.
- [x] Navbar: el espacio derecho que contenía Log In ahora contiene el CTA plateado “Boost my performance” a `/pricing`; la misma sustitución en el menú móvil. Se ajustan solo paddings/gaps de navegación de 768–1199 px para alojarlo. No se implementa login ni registro.
- [x] `/pricing` desactiva su botón de compra, con indicación accesible de preview. No se conecta onboarding, autenticación, checkout ni pagos. Los dos planes siguen siendo seleccionables.
- [x] Guardas mínimas en main.js para que Navbar y menú funcionen en una página sin vídeo Hero ni tabs de home; sin cambios en los algoritmos anteriores.

### Referencia y limitaciones
Se consultó exclusivamente el HTML archivado de la home y de `/pricing` para recuperar las medidas y diferencias que no estaban detalladas en la documentación. No se cambió de referencia a la home en vivo. Siguen ausentes los seis SVG de features, el arte inline de tornillos/insignia y el fondo específico de `/pricing`; quedan documentados en ASSET_MAP.md. La geometría CSS, tamaños, textos y colores se han cotejado con el markup; no se declara una comparación píxel a píxel con el CSS archivado, que no está disponible.

### Estado actual
Terminados: Navbar, Hero, Introducing, Boosts FPS, Pricing (home y página independiente), How it works. Pendientes: CTA, FAQ y Footer. Las listas de etapas anteriores son registros históricos.

### Verificación de la etapa 4
- Sintaxis de `main.js` y `pricing.js` correcta; generación estática repetible sin diferencias al regenerar. El proyecto no tiene un paso de compilación ni dependencias que instalar.
- Chromium/Playwright: home y `/pricing` a 1440, 1024, 768, 390 y 320 px. Respuesta HTTP 200 tras normalización de ruta, radios Yearly/Monthly con click y flechas de teclado, seis features, una sola instancia de panel, plan Monthly conservado al navegar, CTA de compra desactivado solo en la página independiente; sin excepciones JS, sin overflow horizontal ni contenido fuera del panel.
- Navegación desde Navbar desktop y menú móvil, recarga directa de `/pricing/`, retorno a About en home y movimiento reducido a 1440, 1280, 1024, 768, 390 y 320 px. Contenido de ambos precios visible también sin JavaScript.
- Regresión de etapa 3: tabs/teclado, carrusel circular/arrastre y progreso 0/50/100 pasan en 1440 y 390 px. Comparación con HEAD confirma que el HTML de Hero, Introducing, Games y How it works, todos los assets y `main.css` permanecen intactos.
- Capturas de Pricing revisadas visualmente en desktop y móvil; iconos/fondo originales ausentes se mantienen como limitación explícita, no como errores de JavaScript.
