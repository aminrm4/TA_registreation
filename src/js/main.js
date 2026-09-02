import { pagesData, categories } from './config.js';

/**
 * Fieldbook — main.js
 *
 * Everything here is event-driven: no polling, no infinite animation
 * loops, no continuous DOM writes. Scroll-triggered work goes through
 * IntersectionObserver so it only runs when something actually enters
 * or leaves the viewport.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------------
 * Loader — fades out as soon as the page is interactive. No artificial delay.
 * ------------------------------------------------------------------- */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.style.opacity = '0';
  window.setTimeout(() => loader.remove(), 400);
}

/* ---------------------------------------------------------------------
 * Theme toggle (ink / parchment), persisted in localStorage.
 * ------------------------------------------------------------------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const iconInk = document.getElementById('themeIconInk');
  const iconParchment = document.getElementById('themeIconParchment');

  const stored = window.localStorage.getItem('fieldbook-theme');
  if (stored === 'parchment' || stored === 'ink') {
    root.setAttribute('data-theme', stored);
  }

  const syncIcons = () => {
    const isParchment = root.getAttribute('data-theme') === 'parchment';
    iconInk.classList.toggle('hidden', isParchment);
    iconParchment.classList.toggle('hidden', !isParchment);
    toggle.setAttribute('aria-pressed', String(isParchment));
  };
  syncIcons();

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'ink' ? 'parchment' : 'ink';
    root.setAttribute('data-theme', next);
    window.localStorage.setItem('fieldbook-theme', next);
    syncIcons();
  });
}

/* ---------------------------------------------------------------------
 * Sticky navbar: adds a background/blur once the page has scrolled past
 * the hero. Uses a single scroll listener guarded by requestAnimationFrame
 * so it never runs more than once per frame.
 * ------------------------------------------------------------------- */
function initNavbarScrollState() {
  const navInner = document.getElementById('navInner');
  let ticking = false;

  const applyState = () => {
    const scrolled = window.scrollY > 24;
    navInner.classList.toggle('bg-surface/90', scrolled);
    navInner.classList.toggle('backdrop-blur-md', scrolled);
    navInner.classList.toggle('border-hairline', scrolled);
    navInner.classList.toggle('shadow-card', scrolled);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(applyState);
        ticking = true;
      }
    },
    { passive: true }
  );

  applyState();
}

/* ---------------------------------------------------------------------
 * Mobile menu.
 * ------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('menuIconOpen');
  const iconClose = document.getElementById('menuIconClose');

  const setOpen = (open) => {
    mobileMenu.style.maxHeight = open ? `${mobileMenu.scrollHeight}px` : '0px';
    menuToggle.setAttribute('aria-expanded', String(open));
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/* ---------------------------------------------------------------------
 * Render section cards + the category filter bar from config.js. Both
 * `pagesData` and `categories` can have any number of entries — nothing
 * here assumes a fixed count for either.
 * ------------------------------------------------------------------- */
function placeholderSvg(label) {
  // Lightweight inline SVG shown only if a card has no `image` set, or
  // if the given image file fails to load (see the img.onerror below).
  // Encoded as a data URI so no network request or extra file is needed.
  const safe = label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#232b33"/>
      <g stroke="#3a4653" stroke-width="1">
        <line x1="0" y1="75" x2="400" y2="75"/>
        <line x1="0" y1="150" x2="400" y2="150"/>
        <line x1="0" y1="225" x2="400" y2="225"/>
      </g>
      <text x="50%" y="52%" fill="#8b96a1" font-family="Vazirmatn, sans-serif" font-size="13" text-anchor="middle" letter-spacing="2">${safe}</text>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function buildCard(page) {
  const article = document.createElement('article');
  article.className =
    'card reveal group relative flex flex-col rounded-xl border border-hairline bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover hover:border-accent/40';
  article.dataset.category = page.category;

  // Real screenshot if `page.image` is set and loads; otherwise the
  // generated placeholder graphic. Whatever size the real image is, the
  // "aspect-[4/3] ... object-cover" classes below always crop it into a
  // consistent 4:3 box — no manual resizing needed when new images are
  // added later.
  const initialImage = page.image || placeholderSvg('پیش‌نمایش در دسترس نیست');

  article.innerHTML = `
    <button type="button" class="card-image-wrap preview-trigger relative block aspect-[4/3] w-full overflow-hidden bg-surface2 focus-visible:outline-none" aria-label="پیش‌نمایش تصویر ${page.title}">
      <img src="${initialImage}" alt="پیش‌نمایش صفحه ${page.title}" class="h-full w-full object-cover" loading="lazy" />
      <span class="absolute top-3 left-3 rounded-full border border-white/15 bg-black/40 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80">شماره فرم ${page.fileNo}</span>
      <span class="absolute top-3 right-3 rounded-full bg-accent/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bg font-semibold">${page.status}</span>
    </button>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-display text-lg font-semibold leading-snug">${page.title}</h3>
      <p class="mt-2 text-sm text-muted leading-relaxed flex-1">${page.description}</p>
      <a href="${page.formUrl}" target="_blank" rel="noopener noreferrer"
        class="stamp-btn open-form-link mt-5 inline-flex items-center justify-between gap-2 rounded-lg border border-hairline px-4 py-3 font-mono text-xs uppercase tracking-wider group-hover:border-accent/50 group-hover:text-accent transition-colors">
        باز کردن فرم
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </a>
    </div>
  `;

  // If a real image path is broken/missing, fall back to the placeholder
  // instead of showing a broken-image icon. Guarded with a one-time flag
  // so a failing placeholder can't loop.
  const imgEl = article.querySelector('img');
  imgEl.addEventListener('error', function onError() {
    imgEl.removeEventListener('error', onError);
    imgEl.src = placeholderSvg('پیش‌نمایش در دسترس نیست');
  });

  // Wire up the lightbox preview button.
  const previewBtn = article.querySelector('.preview-trigger');
  previewBtn.addEventListener('click', () => openLightbox(page));

  return article;
}

function renderCards(activeCategory = 'all') {
  const grid = document.getElementById('cardsGrid');
  const emptyState = document.getElementById('emptyState');
  grid.innerHTML = '';

  const visible = pagesData.filter(
    (page) => activeCategory === 'all' || page.category === activeCategory
  );

  visible.forEach((page) => grid.appendChild(buildCard(page)));
  emptyState.classList.toggle('hidden', visible.length > 0);

  // Newly injected cards need to be observed for the scroll-reveal effect.
  observeReveal(grid.querySelectorAll('.reveal'));
}

function renderFilterBar() {
  const bar = document.getElementById('filterBar');
  bar.innerHTML = '';

  categories.forEach((cat, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.category = cat.id;
    btn.textContent = cat.label;
    btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    btn.className = filterBtnClasses(index === 0);
    btn.addEventListener('click', () => {
      bar.querySelectorAll('button').forEach((b) => {
        const active = b === btn;
        b.setAttribute('aria-pressed', String(active));
        b.className = filterBtnClasses(active);
      });
      renderCards(cat.id);
    });
    bar.appendChild(btn);
  });
}

function filterBtnClasses(active) {
  const base = 'rounded-full px-4 py-2 border transition-colors duration-200';
  return active
    ? `${base} bg-accent border-accent text-bg font-semibold`
    : `${base} border-hairline text-muted hover:text-ink hover:border-accent/40`;
}

/* ---------------------------------------------------------------------
 * Scroll reveal via IntersectionObserver. Elements are observed once;
 * after they've revealed, they're unobserved so no further work happens.
 * ------------------------------------------------------------------- */
let revealObserver;

function observeReveal(elements) {
  if (prefersReducedMotion) return; // CSS already renders them fully visible.

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
  }

  elements.forEach((el) => revealObserver.observe(el));
}

/* ---------------------------------------------------------------------
 * Active nav-link highlighting, driven by IntersectionObserver on the
 * three main sections rather than a scroll-position calculation.
 * ------------------------------------------------------------------- */
function initActiveNavTracking() {
  const sectionIds = ['home', 'sections', 'about'];
  const navLinks = document.querySelectorAll('.nav-link');

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.section === id;
      link.classList.toggle('text-accent', isActive);
      link.classList.toggle('text-ink/80', !isActive);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}

/* ---------------------------------------------------------------------
 * FAQ accordion — single-purpose, keyboard accessible via native <button>.
 * ------------------------------------------------------------------- */
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    const icon = item.querySelector('.faq-icon');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.gridTemplateRows = isOpen ? '0fr' : '1fr';
      icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
    });
  });
}

/* ---------------------------------------------------------------------
 * Lightbox / modal for previewing a section's screenshot.
 * ------------------------------------------------------------------- */
let lastFocusedElement = null;

function openLightbox(page) {
  const lightbox = document.getElementById('lightbox');
  const imageEl = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');

  // Try the real image first; if it 404s, swap to the placeholder.
  // (A background-image can't fire onerror, so we probe with a
  // throwaway Image object first.)
  const probe = new Image();
  const fallback = placeholderSvg('پیش‌نمایش در دسترس نیست');
  const realSrc = page.image || fallback;
  probe.onload = () => {
    imageEl.style.backgroundImage = `url("${realSrc}")`;
  };
  probe.onerror = () => {
    imageEl.style.backgroundImage = `url("${fallback}")`;
  };
  probe.src = realSrc;

  imageEl.style.backgroundSize = 'cover';
  imageEl.style.backgroundPosition = 'center';
  caption.textContent = `شماره فرم ${page.fileNo} — ${page.title}`;

  lastFocusedElement = document.activeElement;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose').focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
  });
}

/* ---------------------------------------------------------------------
 * Back-to-top button — shown once the user has scrolled past the hero.
 * ------------------------------------------------------------------- */
function initBackToTop() {
  const button = document.getElementById('backToTop');
  let ticking = false;

  const update = () => {
    const show = window.scrollY > 640;
    button.classList.toggle('opacity-0', !show);
    button.classList.toggle('pointer-events-none', !show);
    button.classList.toggle('translate-y-3', !show);
    button.classList.toggle('opacity-100', show);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  update();
}

/* ---------------------------------------------------------------------
 * Hero title intro: reveals the words in #heroTitle one after another on
 * page load (not scroll-triggered — it's the first thing visible). Each
 * <span class="hero-word"> already carries its own stagger via an inline
 * transition-delay in the HTML; this just toggles them all to visible at
 * once and CSS handles the stagger. Runs once, never repeats.
 * ------------------------------------------------------------------- */
function initHeroIntro() {
  const words = document.querySelectorAll('#heroTitle .hero-word');
  if (words.length === 0) return;

  if (prefersReducedMotion) {
    words.forEach((word) => word.classList.add('is-in'));
    return;
  }

  // Double rAF ensures the browser has painted the initial (hidden)
  // state before we flip the class, so the transition actually plays.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      words.forEach((word) => word.classList.add('is-in'));
    });
  });
}

/* ---------------------------------------------------------------------
 * Init
 * ------------------------------------------------------------------- */
function init() {
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());

  initThemeToggle();
  initNavbarScrollState();
  initMobileMenu();
  initFaqAccordion();
  initLightbox();
  initBackToTop();
  initActiveNavTracking();
  initHeroIntro();

  renderFilterBar();
  renderCards('all');
  observeReveal(document.querySelectorAll('.reveal'));

  hideLoader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
