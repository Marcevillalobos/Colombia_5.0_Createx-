// ============================================================
// STATE
// ============================================================
let currentLang = 'es';
let currentPage = 'colombia';

// ============================================================
// PAGE SWITCHING
// ============================================================
function showPage(page) {
  currentPage = page;

  // Toggle page visibility
  document.getElementById('pageColombia').classList.toggle('active', page === 'colombia');
  document.getElementById('pageCreatex').classList.toggle('active', page === 'createx');

  // Toggle nav button active state
  document.getElementById('btnC50').classList.toggle('active', page === 'colombia');
  document.getElementById('btnCtx').classList.toggle('active', page === 'createx');

  // Toggle nav style for Createx mode
  const nav = document.getElementById('globalNav');
  nav.classList.toggle('createx-mode', page === 'createx');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// LANGUAGE TOGGLE
// ============================================================
function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  applyLang(currentLang);
  document.getElementById('langLabel').textContent = currentLang === 'es' ? 'EN' : 'ES';
}

function applyLang(lang) {
  // Elements with data-es and data-en attributes on the element itself (text content)
  const textEls = document.querySelectorAll('[data-es][data-en]');
  textEls.forEach(el => {
    // Only update textContent if the element has no child elements
    // (to avoid overwriting structured HTML)
    if (el.children.length === 0) {
      el.textContent = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
    }
  });

  // Update glossary search placeholder
  const search = document.getElementById('glossarySearch');
  if (search) {
    search.placeholder = lang === 'es'
      ? search.getAttribute('data-placeholder-es')
      : search.getAttribute('data-placeholder-en');
  }

  // Update glossary table header and definition cells with data-es/data-en
  // (handled by the general loop above for th and td with those attributes)
}

// ============================================================
// GLOSSARY FILTER
// ============================================================
function filterGlossary() {
  const query = document.getElementById('glossarySearch').value.toLowerCase().trim();
  const rows = document.querySelectorAll('#glossaryTable tbody tr');

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
}

// ============================================================
// LIGHTBOX
// ============================================================
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.getElementById('lightboxImg').src = '';
  document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const animEls = document.querySelectorAll(
    '.conf-card, .ctx-area-item, .ctx-stat, .hero-img-card, .ctx-gallery-item'
  );

  animEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });
}

// ============================================================
// SMOOTH ANCHOR SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  // Set initial language display
  applyLang(currentLang);
});
