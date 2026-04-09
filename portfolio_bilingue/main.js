/* ═══════════════════════════════════════════════
   MAIN — Cursor · Scroll · Reveal · i18n
   ═══════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ──────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
})();

/* ── SCROLL PROGRESS BAR ────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = (window.scrollY / scrollable) * 100;
    bar.style.width  = progress + '%';
  });
})();

/* ── REVEAL ON SCROLL ────────────────────────── */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ── LANGUAGE BARS ANIMATION ─────────────────── */
(function initLangBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        setTimeout(() => {
          bar.style.width = bar.dataset.width;
        }, 300);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.lang-bar').forEach(bar => observer.observe(bar));
})();

/* ── LANGUAGE SWITCHER ───────────────────────── */
let currentLang = 'fr';

function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;

  /* Update active button */
  document.getElementById('btnFR').classList.toggle('active', lang === 'fr');
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang;

  /* Fade out all translatable elements */
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => el.classList.add('lang-fade'));

  /* Update content after fade */
  setTimeout(() => {
    elements.forEach(el => {
      const key   = el.getAttribute('data-i18n');
      const value = TRANSLATIONS[lang][key];
      if (value !== undefined) el.innerHTML = value;
      el.classList.remove('lang-fade');
    });
  }, 180);
}