# hypertune-replica

Réplica visual de la landing de https://hypertune.gg/. **Estado: etapa 5** (las nueve secciones objetivo implementadas como sitio estático en `public/`, con página `/pricing/`). Ver `PROGRESS.md`.

## Contenido
- `PROJECT_CONTEXT.md`: versión de referencia, estructura de secciones y decisiones pendientes.
- `ASSET_MAP.md`: recursos originales por sección, su estado de licencia y su ruta local prevista.
- `ANIMATIONS.md`: animaciones, efectos, interacciones y tokens de diseño.
- `PROGRESS.md`: avance por etapas.
- `public/assets/fonts/`: Inter Display y DM Mono (SIL OFL, con sus licencias).

## Hoja de ruta
1. Decidir qué hacer con los recursos visuales (permiso, recursos propios o placeholders).
2. Montar el proyecto (previsto: TanStack Start, Tailwind y Netlify).
3. Maquetar las 9 secciones e implementar las interacciones.

## Pricing y desarrollo local

`python -m http.server 8000 --directory public` sirve la home y `/pricing/`. No hay compilación ni dependencias de runtime.

El componente compartido está en `components/pricing.html`. Tras editarlo o modificar la Navbar de la home, ejecuta `python scripts/render-pricing.py`: actualiza la sección de home y genera `public/pricing/index.html` reutilizando la navegación existente. Los dos HTML generados se incluyen en el repositorio.

Los planes son una vista previa visual: no se implementan cuentas ni cobros. Los recursos ausentes y límites de fidelidad están registrados en `ASSET_MAP.md` y `PROGRESS.md`.
