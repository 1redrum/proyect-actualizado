# PROJECT_CONTEXT — Réplica visual de hypertune.gg

Léelo antes de cualquier sesión nueva. Resume lo ya investigado para **no repetir la investigación**.

## Objetivo
Construir una réplica visual de la landing de https://hypertune.gg/ con estas secciones objetivo: Navbar, Hero, Introducing Hypertune, Boosts FPS in all games, Pricing, How it works, CTA, FAQ y Footer.

**Etapa 1 (completada):** inspección y recopilación de recursos. Todavía **no hay código de la página**.

## Versión de referencia (importante)
- La home **en vivo** (8 nov 2026) ya **no tiene** "Boosts FPS in all games", "How it works" ni la FAQ. Su estructura actual es hero, problem, showcase, bullet-points, showcase-2, pricing, testimonials, showcase-3, CTA, join y footer.
- La referencia elegida es el **snapshot de Wayback del 7 ago 2026**, el último que contiene las 9 secciones:
  `http://web.archive.org/web/20260807103246/https://hypertune.gg/`
  - El HTML crudo se obtiene con `…/web/20260807103246id_/https://hypertune.gg/`.
  - El CSS de ese snapshot **no está archivado**. Se usó el CSS en vivo (`/_next/static/chunks/42tbgm5-k70rg.css`), que comparte tokens y keyframes.
- Snapshots revisados: 2025-07 y 2026-01 tienen otro diseño (Webflow). 2026-05 y 2026-08 tienen todas las secciones. 2026-09 está roto y 2026-10 ya es la versión actual.

## Orden de secciones en la referencia (ids reales)

| # | id | Sección objetivo | Contenido clave |
|---|---|---|---|
| — | `nav` fijo | **Navbar** | Logo, Home, Expert Tuning, About, FAQ, Contact, Pricing y Log In |
| 1 | `#hero` | **Hero** | Vídeo de fondo y titular HTML (corregido en etapa 6). Subtítulo: "Hypertune is a PC optimization software built by the performance specialists at Compready. Get more frames, smoother play, and less lag." CTA: "Unlock your Performance" |
| 2 | `#referals` | (extra) | Marquee de citas de streamers |
| 3 | `#problem` | (extra) | "Your PC is leaving performance on the table." con 4 tarjetas |
| 4 | `#showcase` | **Introducing Hypertune** | "Hypertune optimizes your PC on the hardware level." Tabs: CPU Overclocking, GPU Smart Autoclock, Memory Optimization, Network Optimization y Selective Features |
| 5–6 | `#bullet-points` | (extra) | Tarjetas Rive (Anti-cheat verified / Fully reversible) y marquee de beneficios |
| 7 | `#games-showcase` | **Boosts FPS in all games** | "Hypertune safely optimizes your PC on hardware level, without triggering any anti-cheat." Carrusel de 9 juegos con "Average boost 18-140 FPS" |
| 8 | `#showcase-2` | (extra) | "Packed with features" |
| 9 | `#rive` | (extra) | Canvas Rive grande |
| 10 | `#showcase` (2.º) | (extra) | "Only performance software you need." |
| 11 | `#pricing-card` | **Pricing** | Eyebrow "Pricing". "Next level power is one click away." Yearly cuesta $69.99/año (SAVE 42%) y Monthly $9.99/mes. Features: Smart Optimization Engine, System Health Dashboard, Game Mode Presets, Benchmark Leaderboards, Deep-Level PC Cleaning y Auto CPU/GPU Overclocking |
| 12 | `#ram` | **How it works** | "You can't download RAM, but you can 'download' FPS." 4 pasos con barra de progreso |
| 13 | `#testimonials` | (extra) | Vídeos de pros |
| 14 | `#call-to-action` | **CTA** | "Your FPS ceiling just moved." / "Apply hundreds of hardware-tuned tweaks. Reversible and anti-cheat safe." |
| 15 | `#faq` | **FAQ** | "Your questions, answered.", 7 preguntas (texto completo en el HTML del snapshot y en el JSON-LD) |
| 16 | `#join` | (extra, sobre el footer) | Discord, Creator program y Join the team |
| — | `footer` | **Footer** | "Hey, you. It's time to start winning again." Enlaces Terms of Service, Policy, Pricing y Try for free. Iconos de Discord, X y LinkedIn |

Las secciones "(extra)" no se pidieron. Están documentadas por si se decide incluirlas.

## Recursos
- Mapa completo, URLs originales y rutas locales previstas: **`ASSET_MAP.md`**.
- Animaciones, efectos, interacciones y tokens de diseño: **`ANIMATIONS.md`**.
- **Descargados** (`public/assets/fonts/`): Inter Display 400/500/600/700 y DM Mono 400, ambas SIL OFL, con sus licencias incluidas.
- **No descargados:** todo lo demás. Las imágenes, vídeos, logos, SVG y `.riv` son propiedad de Compready, y sus ToS reservan la PI y prohíben reproducir o "mirror" el sitio. Las carátulas de juegos y las fotos de streamers son de terceros. La fuente Blender Pro es comercial.

## Decisiones pendientes para la etapa de desarrollo
1. **Recursos visuales:** conseguir permiso escrito de Compready, aportar recursos propios o usar *placeholders* con las mismas proporciones. Las rutas previstas están en ASSET_MAP.md.
2. **Sustitutos libres sugeridos:** Rajdhani o Chakra Petch (OFL) en lugar de Blender Pro, Lucide (ISC) para los iconos de Pricing y Simple Icons (CC0) para los logos sociales.
3. **Stack:** aún sin decidir. Lo previsto es TanStack Start y Tailwind, desplegado en Netlify. El original usa Next.js, Tailwind v4, Framer Motion (inferido), Radix Accordion y Rive.

## Restricciones del usuario
- No generar imágenes con IA, no inventar recursos y no repetir investigaciones innecesarias.
- No tocar el repositorio principal del usuario. El trabajo vive solo en este proyecto.
- Al terminar cada etapa, actualizar `PROGRESS.md`.

## Correcciones de contexto — auditoría (etapa 6)

El estado vigente está al final de PROGRESS.md; las notas iniciales de investigación son históricas. La web en vivo ya tiene otra estructura: no usarla para eliminar las secciones elegidas del snapshot de agosto.

El vídeo desktop aportado sí existe (2742×2160, 10.069 s), pero los fotogramas revisados NO incluyen un titular. La afirmación anterior de que el texto iba embebido no describe este archivo. Se ha restaurado un H1 visible dentro del slot existente: “Boost your gaming / performance with one click”, texto y tipografía medidos en la referencia viva (48 px desktop, 32 px móvil, peso 500, interletrado −.02em). Esto es una corrección apoyada en la referencia actual, no una afirmación sobre el texto ausente del SSR de agosto. El subtítulo y el resto de secciones conservan la referencia de agosto.

Las nuevas imágenes se siguen colocando en las rutas de ASSET_MAP.md. Ejecutar `python scripts/render-pricing.py` tras añadirlas: también regenera `public/scripts/asset-manifest.js` mediante `scripts/render-assets.py`. Así las imágenes ausentes no originan peticiones 404 y las disponibles se activan sin cambiar componentes. No se han descargado recursos adicionales.
