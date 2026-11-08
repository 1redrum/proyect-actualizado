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

## Etapa 5 — CTA, FAQ y Footer (8 nov 2026)

### Implementación
- [x] Añadidas exclusivamente CTA y FAQ tras How it works, y Footer semántico fuera de `<main>`, en `public/index.html`. No se añaden Testimonials ni Join, que son secciones extra.
- [x] CTA: titular y subtítulo originales, composición centrada con gaps de 16 px, botón plateado existente de 250 px, vídeo desktop con loop/muted/playsinline y altura clamp(300px,36vw,520px); variante móvil de 630 px, fondo #131516 y sin descarga de vídeo. Tipografías y tamaños por breakpoint recuperados de la referencia. El botón abre `/pricing`, sin enlazar onboarding ni añadir autenticación.
- [x] FAQ: siete preguntas y respuestas exactas del HTML de referencia ya guardado. Ancho máximo 639 px, separación de filas 15 px, filas #14161770 con hover #141617, radios de 10 px, paddings de 24/14 px, títulos Inter Display y respuestas a 15 px/135%. Encabezado alineado a la izquierda en móvil y centrado desde md; espaciados de sección 20/32/60/100/120 px, según referencia.
- [x] Acordeón mediante `<details>/<summary>` accesibles; funciona sin JS. Mejora progresiva con apertura/cierre animados de 350 ms, un elemento abierto, rotación del símbolo +, control de cancelación en pulsaciones rápidas, estados aria-expanded e inert durante cierre, Enter/Espacio y foco mediante flechas/Home/End. Respeta movimiento reducido.
- [x] JSON-LD FAQPage dentro de la sección FAQ; coincide con los textos visibles y no se copia al head de la página de Pricing mediante el generador.
- [x] Footer: franja visual de 300 px, mensaje original, composición de medios con las rutas previstas, resplandor radial #13F287 al 50%, línea separadora de 2 px, barra desktop de 80 px y layout vertical móvil. Enlaces con subrayado verde de 500 ms e iconos sociales con elevación/color al hover; foco visible.
- [x] Destinos válidos: `/pricing` para Pricing/Try for free; `https://hypertune.gg/terms-of-service` y `/policy` del sitio original para los documentos legales, evitando rutas locales inexistentes. Discord, X y LinkedIn conservan los destinos del HTML de referencia; los enlaces en nueva pestaña incluyen noopener/noreferrer.
- [x] Entradas al viewport de los bloques nuevos; vídeo pausado fuera de pantalla o al ocultar la pestaña, y desactivado con movimiento reducido. No se implementa login, registro, pagos ni autenticación.

### Recursos y fidelidad
Siguen ausentes el vídeo de CTA, el logotipo grande, los tres rayos, el patrón Crypto y los SVG sociales del Footer. Se documentan en ASSET_MAP.md; se mantienen cajas/fondos neutros y placeholders tipográficos para los iconos sociales. Las dimensiones, composición y tipografía se cotejaron con el HTML guardado y ANIMATIONS.md. La réplica no puede reproducir el arte original ausente ni declarar equivalencia píxel a píxel sin esos recursos y el CSS archivado. No se han descargado ni generado imágenes nuevas.

### Verificación
- Chromium/Playwright en 1440, 1024, 768, 390 y 320 px: apertura de las siete respuestas, cierre, exclusividad, Enter/Espacio, Home/End, pulsaciones rápidas, aria-expanded e inert; sin excepciones JS ni overflow horizontal.
- FAQ funcional sin JavaScript; `/pricing/` también sigue cargando sin JS. Enlace FAQ del menú móvil y preferencia de movimiento reducido comprobados. Móvil no solicita el vídeo desktop de CTA.
- JSON-LD contrastado automáticamente contra las siete preguntas y respuestas visibles. Enlaces legales, Discord, X y LinkedIn respondieron HTTP 200 desde este entorno; los dos enlaces locales de Footer y el de CTA apuntan a la página `/pricing` existente.
- Capturas desktop/móvil de CTA, FAQ y Footer revisadas. Sintaxis de JS correcta; no hay proceso de compilación en este sitio estático.
- Regresión de tabs, carrusel/arrastre y progreso por scroll en 1440 y 390 px correcta. Comparación con HEAD: HTML de Navbar y las cinco secciones anteriores intacto; los estilos y controles previos se conservan como prefijo y solo se añade código para las secciones nuevas. Assets, página independiente y componentes de Pricing sin modificar.

### Estado actual
Las nueve secciones objetivo están implementadas: Navbar, Hero, Introducing, Boosts FPS, Pricing, How it works, CTA, FAQ y Footer. Pricing también dispone de `/pricing`. Pendiente: incorporar los medios originales ausentes y validar la fidelidad visual completa con ellos. Las secciones extra no se han añadido.

## Etapa 6 — Auditoría visual y funcional (8 nov 2026)

### Referencia y alcance
Se revisaron las nueve secciones solicitadas y `/pricing`, tanto visualmente como en navegador. Se visitó `https://hypertune.gg/` y se comprobó que la versión viva ya no contiene Games, How it works y FAQ. Se mantuvo el HTML de agosto ya guardado como referencia para esas secciones, sin repetir la investigación de recursos. Para el titular ausente del Hero se usó explícitamente la referencia viva, con texto y medidas computadas comprobados; el SSR guardado no contenía ese texto. No se declara una comparación píxel a píxel: falta el CSS archivado y varios medios originales.

### Hallazgos y correcciones por sección

| Sección | Hallazgo | Corrección / estado |
|---|---|---|
| Navbar | Expert Tuning apuntaba a `/expert-tuning`, ruta local sin implementar. El menú cerrado seguía teniendo elementos enfocables y podía bloquear el scroll al cambiar a desktop. Logo original ausente. | Expert Tuning enlaza a `https://hypertune.gg/expert-tuning` (200 con User-Agent de navegador). Menú con inert cerrado, foco al abrir/cerrar, ciclo de Tab y cierre al cambiar de breakpoint. Se conserva composición y CTA a `/pricing`. Logo pendiente. |
| Hero | No había titular visible: la documentación asumía erróneamente que iba dentro del MP4. El desktop reproduce correctamente el vídeo local; el móvil no existe. El placeholder móvil mostraba una ruta interna al usuario. | H1 original de la web actual restaurado en el slot existente, Inter Display 48/32 px, peso 500, line-height 1 y tracking −.02em. Vídeo, máscara y composición conservados. Selección de medios al cambiar de ancho y pausa con movimiento reducido. Placeholder neutro sin rutas de implementación. Vídeo móvil pendiente. |
| Introducing | Composición centrada con tabs horizontales y captura a ancho completo; la referencia tiene sidebar de 250 px, gap de 40 px y captura de hasta 910 px. Faltaba la descripción CPU y sobraban espacios verticales. | Corrección de distribución con CSS grid sobre los mismos tabs/paneles: título a la izquierda, selector vertical verde desde lg, cita lateral y avatar de 22 px, captura 1820:1024; recorte 2× en pantallas menores como el markup original. Se recuperó la descripción CPU exacta, espaciados y tipografía. Conservados controles/teclado, crossfade de 500 ms y tabs horizontales accesibles en móvil. Capturas/avatar y otras cuatro descripciones siguen pendientes: no están en los archivos/SSR guardado. |
| Boosts FPS | Tarjetas de 230×320 px con gap 20 px; la referencia usa 220×300 px, gap 10 px y escala 1.1 en la activa. Tipografía/espaciados diferían y las tarjetas no se seleccionaban al pulsarlas. | Dimensiones, gaps, escala, radios de 8 px, opacidad y espaciados ajustados; selección con click/Enter/Espacio sin interferir con arrastre. Se conservan pista circular y flechas. Carátulas y Blender Pro pendientes; Inter es fallback explícito. |
| Pricing home | Panel, precios, radios, glow y botón plateado corresponden al markup documentado. Faltan seis iconos y ciertos adornos. | Conservado el componente; no se reconstruye. Se evitan peticiones a máscaras/fondo inexistentes mediante inventario local. Los controles y navegación al plan Monthly se mantienen. |
| How it works | Se mostraban círculos numerados y una barra central visible, omitiendo descripciones, regla graduada y distribución alternada de referencia. | Se conservan el progreso por scroll, sticky y cuatro pasos; se corrigen título a la izquierda, textos originales, ticks/regla con marcador verde, etiquetas alternadas desktop y línea vertical móvil. Se ocultan visualmente los círculos y el porcentaje conservando semántica de progreso. El sticky y duración del recorrido siguen siendo inferidos, no confirmados por el HTML SSR. |
| CTA | Texto, dimensiones, botón y variantes responsive coherentes con documentación; vídeo ausente. | No se reconstruye; fondo neutro conservado. Solo se intentará cargar el vídeo al estar disponible en el inventario, en desktop sin movimiento reducido. |
| FAQ | Estructura, siete textos, espaciado, colores, animación y semántica correctos. | Conservado; apertura/cierre, exclusividad, pulsaciones rápidas, teclado y JSON-LD revalidados. |
| Footer | Composición/gradientes, enlaces y hover funcionan. Faltan wordmark, rayos, Crypto e iconos originales. | Conservado. No se solicitan imágenes ausentes; continúan espacios reservados y placeholders tipográficos. Enlaces legales/sociales originales y Pricing local preservados. |
| `/pricing` | Página y selector correctos, con CTA de compra desactivado de forma intencional por alcance sin pagos/auth. | Se regenera desde la plantilla compartida para incorporar navegación corregida e inventario. Recarga directa, radios, transferencia de plan y retorno a home comprobados. Sin añadir login, cobros ni autenticación. |

### Consola, recursos y pruebas
- Antes: entre 29 y 36 mensajes de error de consola por página de home, principalmente peticiones 404 a medios ya documentados como ausentes. No había excepciones JavaScript. Esos errores HTTP no se habían contabilizado en verificaciones anteriores centradas en `pageerror`.
- Ahora: inventario local generado en `scripts/render-assets.py` y consumido en ambas páginas. Se mantienen rutas/placeholders; únicamente se solicitan recursos presentes. No se descargó ni sustituyó ningún medio. No se silencia la consola ni se interceptan errores para fingir éxito.
- Chromium/Playwright en 1440, 1280, 1024, 768, 390 y 320 px: **0 excepciones JS, 0 errores de consola y 0 respuestas HTTP locales fallidas**, en home y tras navegar/recargar `/pricing`. Sin overflow horizontal. Vídeo desktop reproducible y fallback móvil estable.
- Verificados tabs con teclado, distribución lateral desktop, descripción CPU, carrusel circular/arrastre/selección, progreso 0/50/100, siete respuestas FAQ, controles de Pricing y rutas locales de navegación/footer (200).
- Hover comprobado por estilos calculados: botón plateado brightness(.75), FAQ #141617, Footer verde #13F287 y subrayado expansivo, glow de tarjeta de juego. Movimiento reducido pausa el vídeo y evita transiciones prolongadas. Menú móvil no deja scroll bloqueado al volver a desktop.
- Capturas revisadas de Hero, Introducing y timeline desktop/móvil; se conservan colores base #08080A/#131516, acento #13F287 y fuentes locales Inter Display/DM Mono. El nuevo titular se contrastó con 48 px desktop y 32 px móvil medidos en vivo.
- FAQ revalidado en cinco anchos con ratón/teclado, cierre/alternancia rápida y correspondencia JSON-LD; contenido y FAQ funcionan sin JS. Sintaxis JS y generación estática comprobadas, sin introducir stack/dependencias nuevos.

### Límites pendientes
La mayor diferencia visual que queda es la falta de medios originales ya registrada en ASSET_MAP.md: logo, vídeo móvil, capturas, carátulas, iconos/fondo de Pricing, vídeo CTA y arte del Footer. No puede calificarse la réplica como visualmente idéntica mientras falten. La Navbar/subtítulo y secciones históricas siguen la versión de agosto y no coinciden con los cambios editoriales de la home actual. Los tabs móviles se mantienen accesibles en vez de eliminarlos; las cuatro descripciones que no contiene el SSR no se inventan. No se reconstruyeron Pricing, FAQ, CTA ni Footer, ni se modificaron servicios externos o funcionalidades ajenas al proyecto.

- Verificación final del carrusel: se detectó y corrigió un doble avance al combinar foco automático y captura de puntero. El foco solo centra tarjetas durante navegación por teclado; los clicks de ratón se resuelven una sola vez a partir de la tarjeta bajo el puntero. Selección real con ratón y Enter comprobada en 1440 y 390 px.
