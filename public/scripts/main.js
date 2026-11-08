/* Hypertune replica — Navbar + Hero */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Navbar: estado "píldora" al hacer scroll ---- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-scroll-top]").forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); })
  );

  /* ---- Menú lateral móvil ---- */
  const menu = document.querySelector("[data-side-menu]");
  const openBtn = document.querySelector("[data-menu-open]");
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  openBtn.addEventListener("click", () => setMenu(true));
  menu.querySelectorAll("[data-menu-close]").forEach((el) => el.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---- Logo: placeholder neutro 32×32 si el SVG original no está en local ---- */
  document.querySelectorAll('img[data-asset-fallback="logo"]').forEach((img) => {
    const swap = () => {
      const ph = document.createElement("span");
      ph.className = "asset-placeholder-logo";
      ph.setAttribute("role", "img");
      ph.setAttribute("aria-label", img.alt);
      img.replaceWith(ph);
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener("error", swap, { once: true });
  });

  /* ---- Hero: vídeo de fondo; placeholder neutro si el archivo no existe ---- */
  const video = document.querySelector("[data-hero-video]");
  if (video) {
  const placeholder = document.querySelector("[data-hero-placeholder]");
  const showPlaceholder = () => { placeholder.hidden = false; video.style.visibility = "hidden"; };
  const check = () => { if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) showPlaceholder(); };
  video.querySelectorAll("source").forEach((s) => s.addEventListener("error", () => setTimeout(check, 0)));
  video.addEventListener("error", showPlaceholder);
  check();
  const p = video.play && video.play();
  if (p && p.catch) p.catch(() => {});

  }

  /* ---- Animaciones de entrada ---- */
  requestAnimationFrame(() => requestAnimationFrame(() =>
    document.querySelectorAll('[data-reveal="wrap"]').forEach((el) => el.classList.add("is-revealed"))
  ));
});

/* Etapa 3 — controles aislados de Navbar y Hero. */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-section-asset]").forEach((img) => {
    const missing = () => { img.hidden = true; img.style.display = "none"; };
    if (img.complete && !img.naturalWidth) missing();
    else img.addEventListener("error", missing, { once: true });
  });
  const tabs = [...document.querySelectorAll('.feature-tabs [role="tab"]')];
  if (!tabs.length) return; // /pricing reuses the Navbar without home-only sections.
  const panels = [...document.querySelectorAll('.feature-panel')];
  let feature = 0;
  function selectFeature(index, focus = false) {
    feature = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === feature));
      tab.tabIndex = i === feature ? 0 : -1;
      panels[i].classList.toggle("is-active", i === feature);
      panels[i].inert = i !== feature;
    });
    document.querySelector('[data-feature-label]').textContent = tabs[feature].textContent;
    if (focus) { tabs[feature].focus({ preventScroll: true }); tabs[feature].scrollIntoView({ block: "nearest", inline: "nearest" }); }
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectFeature(i));
    tab.addEventListener('keydown', (event) => {
      const next = { ArrowRight: feature + 1, ArrowLeft: feature - 1, Home: 0, End: tabs.length - 1 }[event.key];
      if (next !== undefined) { event.preventDefault(); selectFeature(next, true); }
    });
  });
  document.querySelector('[data-feature-prev]').addEventListener('click', () => selectFeature(feature - 1));
  document.querySelector('[data-feature-next]').addEventListener('click', () => selectFeature(feature + 1));

  const viewport = document.querySelector('.games-viewport');
  const track = viewport.firstElementChild;
  const originals = [...track.children];
  // Tres copias; las exteriores no se anuncian ni reciben foco.
  for (const prepend of [true, false]) {
    const group = originals.map(card => { const clone = card.cloneNode(true); clone.setAttribute('aria-hidden', 'true'); clone.tabIndex = -1; clone.querySelectorAll('img').forEach(img => { const hide = () => { img.style.display = 'none'; }; if (img.complete && !img.naturalWidth) hide(); else img.addEventListener('error', hide, { once: true }); }); return clone; });
    if (prepend) track.prepend(...group); else track.append(...group);
  }
  const cards = [...track.children];
  let drag = null, frame = 0;
  const stride = () => cards[1].offsetLeft - cards[0].offsetLeft;
  const center = (i) => cards[i].offsetLeft + cards[i].offsetWidth / 2 - viewport.clientWidth / 2;
  function updateGames() {
    const cycle = stride() * originals.length;
    const lower = center(originals.length), upper = center(originals.length * 2);
    if (viewport.scrollLeft < lower - stride() / 2) { viewport.scrollLeft += cycle; if (drag) drag.scroll += cycle; }
    if (viewport.scrollLeft >= upper - stride() / 2) { viewport.scrollLeft -= cycle; if (drag) drag.scroll -= cycle; }
    const midpoint = viewport.scrollLeft + viewport.clientWidth / 2;
    let nearest = 0;
    cards.forEach((card, i) => { if (Math.abs(card.offsetLeft + card.offsetWidth / 2 - midpoint) < Math.abs(cards[nearest].offsetLeft + cards[nearest].offsetWidth / 2 - midpoint)) nearest = i; });
    cards.forEach((card, i) => { card.classList.toggle('is-current', i === nearest); card.classList.toggle('is-near', Math.abs(i - nearest) === 1); });
    frame = 0;
  }
  viewport.scrollLeft = center(originals.length);
  updateGames();
  viewport.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateGames); }, { passive: true });
  viewport.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    drag = { x: event.clientX, scroll: viewport.scrollLeft };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', (event) => { if (drag) viewport.scrollLeft = drag.scroll + drag.x - event.clientX; });
  const endDrag = () => { drag = null; viewport.classList.remove('is-dragging'); };
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', endDrag);
  const moveGame = (direction) => viewport.scrollBy({ left: stride() * direction, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('[data-game-prev]').addEventListener('click', () => moveGame(-1));
  document.querySelector('[data-game-next]').addEventListener('click', () => moveGame(1));
  viewport.addEventListener('keydown', (event) => { if (['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); moveGame(event.key === 'ArrowRight' ? 1 : -1); } });
  originals.forEach(card => card.addEventListener('focus', () => { viewport.scrollLeft = card.offsetLeft + card.offsetWidth / 2 - viewport.clientWidth / 2; }));

  const work = document.querySelector('#ram');
  const progress = work.querySelector('[role="progressbar"]');
  const steps = [...work.querySelectorAll('.work-step')];
  let workFrame = 0;
  function updateWork() {
    const value = Math.max(0, Math.min(1, -work.getBoundingClientRect().top / (work.offsetHeight - innerHeight)));
    const percent = Math.round(value * 100);
    work.style.setProperty('--work-progress', value);
    progress.setAttribute('aria-valuenow', percent);
    work.querySelector('[data-work-percent]').textContent = percent + '%';
    steps.forEach((step, i) => step.classList.toggle('is-active', percent >= i * 100 / 3));
    workFrame = 0;
  }
  window.addEventListener('scroll', () => { if (!workFrame) workFrame = requestAnimationFrame(updateWork); }, { passive: true });
  window.addEventListener('resize', () => { updateWork(); viewport.scrollLeft = center(originals.length); updateGames(); });
  updateWork();
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .15 });
  document.querySelectorAll('[data-section-reveal]').forEach(el => observer.observe(el));
});
