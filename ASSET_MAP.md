# ASSET_MAP — Hypertune (réplica visual)

**Referencia:** snapshot de Wayback Machine del **7 ago 2026**
`http://web.archive.org/web/20260807103246/https://hypertune.gg/`
(es la última versión que contiene **todas** las secciones objetivo; la home en vivo, a 8 nov 2026, ya no incluye "Boosts FPS in all games", "How it works" ni la FAQ).

Para ver cualquier recurso original, antepón al path:
`http://web.archive.org/web/20260807103246id_/https://hypertune.gg`
(los originales llevan además `?dpl=dpl_BkFmRTQabAkQ2H36DtH8b9SAZUaW`; la mayoría de las imágenes se sirven vía `/_next/image?url=…&w=…&q=75`).

## Leyenda de estado

| Estado | Significado |
|---|---|
| ✅ DESCARGADO | Uso autorizado por licencia abierta. Está en `public/assets/`. |
| ⛔ NO DESCARGADO (propietario) | Propiedad de Compready/Hypertune. Sus Términos de Servicio (secciones 14, 18 y 20) reservan la propiedad intelectual y prohíben reproducir o "mirror" la presentación del sitio. Hace falta un sustituto propio o un permiso escrito. |
| ⛔ NO DESCARGADO (terceros) | Marcas o arte de terceros: carátulas de juegos (EA, Valve, Activision, Epic, NetEase, Blizzard, Facepunch, Riot) o fotos e imagen de streamers. Necesitan licencia de cada titular. |

Ruta local prevista = dónde debería ir el archivo si en el futuro se obtiene permiso o se crea un sustituto propio con las mismas dimensiones. **Todavía no existe.**

---

## Fuentes

| Fuente | Pesos | Uso en el sitio | Estado | Archivo local |
|---|---|---|---|---|
| Inter Display (rsms/inter v4.1) | 400, 500, 600, 700 | Fuente principal (`--font-sans`) en todo el sitio | ✅ SIL OFL 1.1 | `public/assets/fonts/InterDisplay/InterDisplay-{Regular,Medium,SemiBold,Bold}.woff2` + `OFL.txt` |
| DM Mono | 400 | Cifras técnicas (FPS, latencia, porcentajes) | ✅ SIL OFL 1.1 (Google Fonts / Fontsource) | `public/assets/fonts/DMMono/DMMono-Regular.woff2` + `OFL.txt` |
| Blender Pro | 500, 700 | Títulos de estilo "gaming" (p. ej. nombres de juegos en mayúsculas en "Boosts FPS") | ⛔ Comercial (Fontsmith/Monotype) | — Sustituto libre sugerido: **Rajdhani** o **Chakra Petch** (OFL) |

Original: `/fonts/InterDisplay/InterDisplay-*.latin.woff2`, `/fonts/DMMono/DMMono-Regular.latin.woff2`, `/fonts/BlenderPro/BlenderPro-{Medium,Bold}.woff2`. Los archivos descargados vienen de las fuentes oficiales, no del sitio de Hypertune (son la versión completa, no el subset `latin`).

---

## 1. Navbar

| Recurso original | Tipo | Estado | Ruta local prevista |
|---|---|---|---|
| `/hypertune-logo.svg` | SVG logo | ⛔ propietario (marca) | `public/assets/navbar/hypertune-logo.svg` |
| `/images/hamburger.svg` | SVG icono menú móvil | ⛔ propietario | `public/assets/navbar/hamburger.svg` |

Los enlaces (Home, Expert Tuning, About, FAQ, Contact, Pricing y Log In) son solo texto.

## 2. Hero (`#hero`)

| Recurso original | Tipo | Estado | Ruta local prevista |
|---|---|---|---|
| `/videos/hero/intro_v2.mp4` | Vídeo de fondo (desktop). **El titular grande va renderizado dentro del vídeo** (no hay `<h1>` en el HTML). | ⛔ propietario | `public/assets/hero/intro_v2.mp4` |
| `/videos/hero/intro_v2_mobile.mp4` | Vídeo de fondo (móvil, `<source media>`) | ⛔ propietario | `public/assets/hero/intro_v2_mobile.mp4` |

El botón "Unlock your Performance" es solo CSS (sin recursos).

### Tira de testimonios bajo el hero (`#referals`, no es sección objetivo, pero es contigua)
`/images/referal/raw/{shroud,marved,inspire,shazam,tarik}.png`, `/images/referal/raw/shroud-1.svg`, `shroud-2.svg`. ⛔ Imagen de terceros (streamers).

## 3. Problem (`#problem`, entre el hero y Introducing; no es sección objetivo)
`/images/problems/{unstable-frame-rates,background-processes,thermal-throttling,gigabytes-of-junk}.png`. ⛔ propietario.

## 4. Introducing Hypertune (`#showcase`)

| Recurso original | Tipo | Estado | Ruta local prevista |
|---|---|---|---|
| `/images/showcase/cpu-overclocking.png` | Captura de la app (tab 1) | ⛔ propietario | `public/assets/introducing/cpu-overclocking.png` |
| `/images/showcase/gpu-smart-autoclock.png` | Captura (tab 2) | ⛔ propietario | `public/assets/introducing/gpu-smart-autoclock.png` |
| `/images/showcase/memory-optimization.png` | Captura (tab 3) | ⛔ propietario | `public/assets/introducing/memory-optimization.png` |
| `/images/showcase/network-optimization.png` | Captura (tab 4) | ⛔ propietario | `public/assets/introducing/network-optimization.png` |
| `/images/showcase/selective-features.png` | Captura (tab 5) | ⛔ propietario | `public/assets/introducing/selective-features.png` |
| `/images/showcase/tarik.png` (48 px) | Avatar de la cita "They optimized my PC, it's so good!" | ⛔ terceros | `public/assets/introducing/avatar.png` |
| SVG inline | Flechas prev/next (7×11 px) | ⛔ propietario (son triviales: se pueden redibujar) | — |

### Franjas intermedias (`#bullet-points`, entre Introducing y Boosts FPS)
- `/rive/frame_left.riv`, `/rive/frame_right.riv`: animaciones Rive (state machine `"State Machine 1"`, aspecto 595/293) de las tarjetas "Anti-cheat verified" y "Fully reversible". ⛔ propietario.
- Iconos SVG inline del marquee de beneficios. ⛔ propietario.

## 5. Boosts FPS in all games (`#games-showcase`)

| Recurso original | Tipo | Estado | Ruta local prevista |
|---|---|---|---|
| `/images/games/battlefield-6.png` | Carátula de juego (carrusel) | ⛔ terceros (EA) | `public/assets/games/battlefield-6.png` |
| `/images/games/cs-2.png` | Carátula | ⛔ terceros (Valve) | `public/assets/games/cs-2.png` |
| `/images/games/call-of-duty-bo3.png` | Carátula | ⛔ terceros (Activision) | `public/assets/games/call-of-duty-bo3.png` |
| `/images/games/deadlock.png` | Carátula | ⛔ terceros (Valve) | `public/assets/games/deadlock.png` |
| `/images/games/fortnite.png` | Carátula | ⛔ terceros (Epic) | `public/assets/games/fortnite.png` |
| `/images/games/marvel-rivals.png` | Carátula | ⛔ terceros (NetEase/Marvel) | `public/assets/games/marvel-rivals.png` |
| `/images/games/overwatch.png` | Carátula | ⛔ terceros (Blizzard) | `public/assets/games/overwatch.png` |
| `/images/games/rust.png` | Carátula | ⛔ terceros (Facepunch) | `public/assets/games/rust.png` |
| `/images/games/valorant.png` | Carátula | ⛔ terceros (Riot) | `public/assets/games/valorant.png` |
| `/arrow-green-up.svg` | Flecha verde junto a "Average boost 18-140 FPS" | ⛔ propietario (trivial, se puede redibujar) | — |

## 6. Packed with features (`#showcase-2`) y `#rive` (no son secciones objetivo)
- `/images/showcase-2/{optimization,game-profiles,stability,customization,disk-tools,restore-point}.png`. ⛔ propietario.
- `#rive`: canvas Rive a pantalla completa. El `.riv` se carga desde JS y no se identificó (no hacía falta).
- `#showcase` (2.º, "Only performance software you need"): `/images/showcase-3/showcase-3.png`, `showcase-3-mobile.png` y `marved.png`. ⛔.

## 7. Pricing (`#pricing-card`)

| Recurso original | Tipo | Estado | Ruta local prevista |
|---|---|---|---|
| `/icons_2/speed.svg` | Icono de feature (se usa como `mask-image` con degradado #ADADAD→#E3E3E3, 12 px) | ⛔ propietario | `public/assets/pricing/icons/speed.svg` |
| `/icons_2/eraser.svg` | Icono de feature | ⛔ propietario | `public/assets/pricing/icons/eraser.svg` |
| `/icons_2/cpu.svg` | Icono de feature | ⛔ propietario | `public/assets/pricing/icons/cpu.svg` |
| `/icons_2/cup.svg` | Icono de feature | ⛔ propietario | `public/assets/pricing/icons/cup.svg` |
| `/icons_2/gamepad.svg` | Icono de feature | ⛔ propietario | `public/assets/pricing/icons/gamepad.svg` |
| `/icons_2/tools.svg` | Icono de feature | ⛔ propietario | `public/assets/pricing/icons/tools.svg` |
| SVG inline | Checks, radio y badge "SAVE 42%" | ⛔ propietario | — |

Sustituto libre sugerido para los iconos: **Lucide** (ISC) con `gauge`, `eraser`, `cpu`, `trophy`, `gamepad-2` y `wrench`.

## 8. How it works (`#ram`)
No tiene imágenes ni vídeos: los 4 pasos, la barra de progreso y la línea vertical son HTML y CSS.

## 9. Testimonials (`#testimonials`, no es sección objetivo)
`/images/testimonials/{shroud,subroza,tarik,shazam}-min.png`, `/videos/testimonials/*-min.mp4`, `/images/testimonials/play-button.svg` y `play-button-brand.svg`. ⛔.

## 10. CTA (`#call-to-action`)

| Recurso original | Tipo | Estado | Ruta local prevista |
|---|---|---|---|
| `/videos/cta/cta.mp4` | Vídeo de fondo (versión desktop; en móvil hay una variante sin vídeo con fondo `#131516`) | ⛔ propietario | `public/assets/cta/cta.mp4` |

## 11. FAQ (`#faq`)
No tiene recursos. El icono "+" es texto o CSS.

## 12. Join the community (`#join`, entre la FAQ y el footer)
`/images/footer/join_discord.png`, `join_creator.png` y `join_team.png`. ⛔ propietario.

## 13. Footer

| Recurso original | Tipo | Estado | Ruta local prevista |
|---|---|---|---|
| `/images/footer/hypertune.svg` | Logotipo grande del footer | ⛔ propietario (marca) | `public/assets/footer/hypertune.svg` |
| `/images/footer/lightning-1.png` | Rayo decorativo de fondo | ⛔ propietario | `public/assets/footer/lightning-1.png` |
| `/images/footer/lightning-2.png` | Rayo decorativo | ⛔ propietario | `public/assets/footer/lightning-2.png` |
| `/images/footer/lightning-3.png` | Rayo decorativo | ⛔ propietario | `public/assets/footer/lightning-3.png` |
| `/images/footer/crypto.svg` | Patrón decorativo de fondo ("Background Crypto") | ⛔ propietario | `public/assets/footer/crypto.svg` |
| SVG inline | Iconos sociales: Discord, X y LinkedIn | ⛔ marcas de terceros. Sustituto: **Simple Icons** (CC0) | — |

---

## Resumen

- **Descargados (7 archivos + 2 licencias):** Inter Display ×4 y DM Mono ×1.
- **Identificados y no descargados:** unos 60 recursos (imágenes, vídeos, SVG y Rive), todos propietarios o de terceros.
- **Favicon:** `/favicon.ico` ⛔ propietario.
