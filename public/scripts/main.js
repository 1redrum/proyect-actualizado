/* Hypertune replica — Navbar + Hero */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  // Only request files present in the checked-in local asset inventory.
  document.querySelectorAll('img[data-local-src]').forEach(img => {
    if (window.hypertuneAssets.has(img.dataset.localSrc)) img.src = img.dataset.localSrc;
  });
  if (window.hypertuneAssets.has('/assets/pricing/background.png')) {
    document.documentElement.style.setProperty('--pricing-background', "url('/assets/pricing/background.png')");
  }
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
    menu.inert = !open;
    menu.setAttribute("aria-hidden", String(!open));
    openBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) menu.querySelector('button, a').focus();
    else if (menu.contains(document.activeElement)) openBtn.focus();
  };
  menu.inert = true;
  openBtn.addEventListener("click", () => setMenu(true));
  matchMedia('(min-width: 768px)').addEventListener('change', () => setMenu(false));
  menu.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll('button, a')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
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
    const desktop = matchMedia('(min-width: 768px)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const syncHero = () => {
      const source = [...video.querySelectorAll('source')].find(el => !el.media || matchMedia(el.media).matches);
      const path = source?.dataset.localSrc;
      if (!path || !window.hypertuneAssets.has(path)) {
        video.pause(); video.removeAttribute('src'); showPlaceholder(); return;
      }
      placeholder.hidden = true; video.style.visibility = '';
      if (video.getAttribute('src') !== path) { video.src = path; video.load(); }
      if (reduced.matches) video.pause();
      else video.play().catch(() => {});
    };
    video.addEventListener('error', showPlaceholder);
    desktop.addEventListener('change', syncHero);
    reduced.addEventListener('change', syncHero);
    syncHero();
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
  const verticalTabs = matchMedia('(min-width: 1024px)');
  const syncTabOrientation = () => tabs[0].parentElement.setAttribute('aria-orientation', verticalTabs.matches ? 'vertical' : 'horizontal');
  verticalTabs.addEventListener('change', syncTabOrientation);
  syncTabOrientation();
  const panels = [...document.querySelectorAll('.feature-panel')];
  let feature = 0;
  const descriptions = [
    'CPU Overclock pushes your processor beyond stock speeds by fine-tuning frequency, voltage, and power limits for maximum performance.',
    '', '', '', '' // Other descriptions are not present in the saved SSR reference.
  ];
  const description = document.querySelector('[data-feature-description]');
  tabs.forEach(tab => tab.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); selectFeature(feature + (event.key === 'ArrowDown' ? 1 : -1), true);
    }
  }));
  function selectFeature(index, focus = false) {
    feature = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === feature));
      tab.tabIndex = i === feature ? 0 : -1;
      panels[i].classList.toggle("is-active", i === feature);
      panels[i].inert = i !== feature;
    });
    document.querySelector('[data-feature-label]').textContent = tabs[feature].textContent;
    description.textContent = descriptions[feature];
    description.hidden = !descriptions[feature];
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
  cards.forEach((card, i) => {
    const select = () => { viewport.scrollLeft = center(i); };
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); } });
  });
  let drag = null, frame = 0, dragged = false;
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
    dragged = false;
    drag = { x: event.clientX, scroll: viewport.scrollLeft };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', (event) => { if (drag) { dragged ||= Math.abs(drag.x - event.clientX) > 6; viewport.scrollLeft = drag.scroll + drag.x - event.clientX; } });
  const endDrag = () => { drag = null; viewport.classList.remove('is-dragging'); };
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', endDrag);
  viewport.addEventListener('click', event => {
    if (dragged || event.detail === 0) return;
    // Pointer capture retargets clicks to the viewport; choose the actual card
    // under the pointer rather than relying on the retargeted event target.
    let nearest = 0, distance = Infinity;
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const delta = Math.abs(rect.left + rect.width / 2 - event.clientX);
      if (delta < distance) { nearest = i; distance = delta; }
    });
    viewport.scrollLeft = center(nearest);
  });
  const moveGame = (direction) => viewport.scrollBy({ left: stride() * direction, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('[data-game-prev]').addEventListener('click', () => moveGame(-1));
  document.querySelector('[data-game-next]').addEventListener('click', () => moveGame(1));
  viewport.addEventListener('keydown', (event) => { if (['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); moveGame(event.key === 'ArrowRight' ? 1 : -1); } });
  originals.forEach(card => card.addEventListener('focus', () => { if (drag) return; viewport.scrollLeft = card.offsetLeft + card.offsetWidth / 2 - viewport.clientWidth / 2; }));

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

/* Etapa 5 — FAQ progresivo y medios de las secciones finales. */
document.addEventListener('DOMContentLoaded', () => {
  const entries = [...document.querySelectorAll('.faq-item')];
  const desired = new WeakMap();
  const animations = new WeakMap();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function expand(item, open) {
    const answer = item.querySelector('.faq-item__answer');
    const start = item.open ? answer.getBoundingClientRect().height : 0;
    animations.get(item)?.cancel();
    desired.set(item, open);
    item.querySelector('summary').setAttribute('aria-expanded', String(open));
    item.classList.toggle('is-closing', !open);
    item.open = true;
    // Closing content leaves the accessibility tree immediately, while its
    // visual height finishes animating. Native details remains the no-JS path.
    answer.inert = !open;
    const animation = answer.animate([{ height: `${start}px` }, { height: `${open ? answer.scrollHeight : 0}px` }], {
      duration: reducedMotion.matches ? 0 : 350, easing: 'cubic-bezier(.4,0,.2,1)'
    });
    animations.set(item, animation);
    animation.onfinish = () => {
      if (desired.get(item) !== open) return;
      item.open = open;
      item.classList.remove('is-closing');
      animations.delete(item);
    };
  }
  entries.forEach((item, index) => {
    desired.set(item, item.open);
    const summary = item.querySelector('summary');
    summary.setAttribute('aria-expanded', String(item.open));
    summary.addEventListener('click', event => {
      event.preventDefault();
      const open = !desired.get(item);
      if (open) entries.forEach(other => { if (other !== item && desired.get(other)) expand(other, false); });
      expand(item, open);
    });
    summary.addEventListener('keydown', event => {
      const target = { ArrowDown: (index + 1) % entries.length, ArrowUp: (index + entries.length - 1) % entries.length, Home: 0, End: entries.length - 1 }[event.key];
      if (target !== undefined) { event.preventDefault(); entries[target].querySelector('summary').focus(); }
    });
  });

  document.querySelectorAll('[data-footer-asset]').forEach(img => {
    const missing = () => { img.style.visibility = 'hidden'; };
    if (img.complete && !img.naturalWidth) missing();
    else img.addEventListener('error', missing, { once: true });
  });
  const reveal = new IntersectionObserver(items => items.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), { threshold: .15 });
  document.querySelectorAll('[data-final-reveal]').forEach(el => reveal.observe(el));

  const video = document.querySelector('[data-cta-video]');
  if (!video) return;
  const desktop = matchMedia('(min-width: 768px)');
  let visible = false;
  const syncVideo = () => {
    if (desktop.matches && !reducedMotion.matches && window.hypertuneAssets.has(video.dataset.src)) {
      if (!video.getAttribute('src')) video.src = video.dataset.src;
      if (visible && !document.hidden) video.play().catch(() => {});
      else video.pause();
    } else {
      video.pause();
      if (video.hasAttribute('src')) { video.removeAttribute('src'); video.load(); }
    }
  };
  video.addEventListener('error', () => { video.style.visibility = 'hidden'; });
  const mediaObserver = new IntersectionObserver(items => { visible = items[0].isIntersecting; syncVideo(); });
  mediaObserver.observe(video.closest('.closing-cta'));
  desktop.addEventListener('change', syncVideo);
  reducedMotion.addEventListener('change', syncVideo);
  document.addEventListener('visibilitychange', syncVideo);
});
