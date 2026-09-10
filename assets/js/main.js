/**
 * KeepNotes for Nextcloud - Main Application Logic
 * Theme, Language Switcher, Lightbox Gallery, FAQ Accordion, Mobile Menu
 */

(function () {
  'use strict';

  // --- STATE ---
  let currentLang = 'ru';
  let currentTheme = 'light';
  let activeLightboxIndex = 0;

  const screenshotsData = [
    { file: '01_Notes.png', titleKey: 'screenshot1Title', descKey: 'screenshot1Desc' },
    { file: '02_Checklist_preview.png', titleKey: 'screenshot2Title', descKey: 'screenshot2Desc' },
    { file: '03_Checklist_edit.png', titleKey: 'screenshot3Title', descKey: 'screenshot3Desc' },
    { file: '04_Make_Checklist.png', titleKey: 'screenshot4Title', descKey: 'screenshot4Desc' },
    { file: '05_Create_Category.png', titleKey: 'screenshot5Title', descKey: 'screenshot5Desc' },
    { file: '06_Settings.png', titleKey: 'screenshot6Title', descKey: 'screenshot6Desc' }
  ];

  // --- THEME LOGIC ---
  function initTheme() {
    const savedTheme = localStorage.getItem('kn_theme');
    if (savedTheme) {
      currentTheme = savedTheme;
    } else {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(currentTheme);

    // Watch system changes if not explicitly overridden
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('kn_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeIcons();
  }

  function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('kn_theme', newTheme);
    applyTheme(newTheme);
  }

  function updateThemeIcons() {
    const sunIcons = document.querySelectorAll('.theme-sun-icon');
    const moonIcons = document.querySelectorAll('.theme-moon-icon');
    sunIcons.forEach(icon => {
      icon.classList.toggle('hidden', currentTheme !== 'dark');
    });
    moonIcons.forEach(icon => {
      icon.classList.toggle('hidden', currentTheme === 'dark');
    });
  }

  // --- I18N LOGIC ---
  function initLanguage() {
    const savedLang = localStorage.getItem('kn_lang');
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
      currentLang = savedLang;
    } else {
      const userLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      currentLang = userLang.startsWith('ru') ? 'ru' : 'en';
    }
    applyLanguage(currentLang);
  }

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('kn_lang', lang);

    if (!window.I18N_DATA || !window.I18N_DATA[lang]) {
      console.warn('I18N data not loaded for language:', lang);
      return;
    }

    const dict = window.I18N_DATA[lang];

    // Update page title & meta description if present
    if (dict.pageTitle && document.querySelector('title[data-page="home"]')) {
      document.title = dict.pageTitle;
    } else if (dict.privacyPageTitle && document.querySelector('title[data-page="privacy"]')) {
      document.title = dict.privacyPageTitle;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      if (dict.metaDescription && document.querySelector('title[data-page="home"]')) {
        metaDesc.setAttribute('content', dict.metaDescription);
      } else if (dict.privacyMetaDesc && document.querySelector('title[data-page="privacy"]')) {
        metaDesc.setAttribute('content', dict.privacyMetaDesc);
      }
    }

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Update elements with data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Update attribute translations
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (dict[key] !== undefined) {
        el.setAttribute('alt', dict[key]);
      }
    });

    // Update language switch button text/indicator
    const langBtns = document.querySelectorAll('.lang-btn-text');
    langBtns.forEach(btn => {
      btn.textContent = lang === 'ru' ? 'EN' : 'RU';
    });

    const langActiveIndicators = document.querySelectorAll('.lang-current-label');
    langActiveIndicators.forEach(ind => {
      ind.textContent = lang.toUpperCase();
    });

    // CRITICAL: Update all screenshot images to current language folder
    updateScreenshotImages(lang);

    // If lightbox is open, update its content
    if (isLightboxOpen()) {
      renderLightboxSlide(activeLightboxIndex);
    }
  }

  function toggleLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    applyLanguage(newLang);
  }

  function updateScreenshotImages(lang) {
    // Hero mockup screenshot
    const heroMockupImg = document.getElementById('hero-mockup-img');
    if (heroMockupImg) {
      heroMockupImg.src = `assets/images/screenshots/${lang}/01_Notes.png`;
    }

    // Gallery cards
    document.querySelectorAll('.gallery-screenshot-img').forEach(img => {
      const filename = img.getAttribute('data-filename');
      if (filename) {
        img.src = `assets/images/screenshots/${lang}/${filename}`;
      }
    });
  }

  // --- LIGHTBOX MODAL ---
  const lightboxModal = document.getElementById('screenshot-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');

  function isLightboxOpen() {
    return lightboxModal && lightboxModal.classList.contains('active');
  }

  function openLightbox(index) {
    if (!lightboxModal) return;
    activeLightboxIndex = (index >= 0 && index < screenshotsData.length) ? index : 0;
    renderLightboxSlide(activeLightboxIndex);
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderLightboxSlide(index) {
    if (!lightboxModal || !window.I18N_DATA) return;
    const item = screenshotsData[index];
    const dict = window.I18N_DATA[currentLang] || window.I18N_DATA.ru;

    if (lightboxImg) {
      lightboxImg.src = `assets/images/screenshots/${currentLang}/${item.file}`;
      lightboxImg.alt = dict[item.titleKey] || 'Screenshot';
    }
    if (lightboxTitle) {
      lightboxTitle.textContent = dict[item.titleKey] || '';
    }
    if (lightboxDesc) {
      lightboxDesc.textContent = dict[item.descKey] || '';
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${screenshotsData.length}`;
    }
  }

  function nextLightbox() {
    activeLightboxIndex = (activeLightboxIndex + 1) % screenshotsData.length;
    renderLightboxSlide(activeLightboxIndex);
  }

  function prevLightbox() {
    activeLightboxIndex = (activeLightboxIndex - 1 + screenshotsData.length) % screenshotsData.length;
    renderLightboxSlide(activeLightboxIndex);
  }

  // --- FAQ ACCORDION ---
  function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const button = item.querySelector('.faq-button');
      if (!button) return;

      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close other items for single-open behavior
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherBtn = other.querySelector('.faq-button');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          button.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // --- MOBILE NAVIGATION DRAWER ---
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuDrawer = document.getElementById('mobile-menu-drawer');
    const menuBackdrop = document.getElementById('mobile-menu-backdrop');
    const menuCloseBtn = document.getElementById('mobile-menu-close');

    function openMenu() {
      if (menuDrawer) menuDrawer.classList.remove('translate-x-full');
      if (menuBackdrop) menuBackdrop.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (menuDrawer) menuDrawer.classList.add('translate-x-full');
      if (menuBackdrop) menuBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

    // Close on any nav link click inside mobile drawer
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- NAVBAR SCROLL EFFECT ---
  function initNavbarScroll() {
    const navbar = document.getElementById('site-navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('shadow-md', 'bg-white/80', 'dark:bg-slate-900/80', 'border-b', 'border-slate-200/60', 'dark:border-slate-800/80');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/80', 'dark:bg-slate-900/80', 'border-b', 'border-slate-200/60', 'dark:border-slate-800/80');
        navbar.classList.add('bg-transparent');
      }
    }, { passive: true });
  }

  // --- BACK TO TOP BUTTON ---
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.remove('opacity-0', 'pointer-events-none');
        btn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none');
        btn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- KEYBOARD & SWIPE LISTENERS ---
  function initEvents() {
    // Theme toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Language toggle buttons
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleLanguage);
    });

    // Gallery items trigger lightbox
    document.querySelectorAll('.gallery-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const idx = parseInt(trigger.getAttribute('data-index'), 10);
        openLightbox(isNaN(idx) ? 0 : idx);
      });
    });

    // Lightbox Controls
    const closeBtn = document.getElementById('lightbox-close');
    const nextBtn = document.getElementById('lightbox-next');
    const prevBtn = document.getElementById('lightbox-prev');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!isLightboxOpen()) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    });

    // Touch swipe support for lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightboxModal) {
      lightboxModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lightboxModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance < 0) {
          nextLightbox(); // swiped left
        } else {
          prevLightbox(); // swiped right
        }
      }
    }
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initFaq();
    initMobileMenu();
    initNavbarScroll();
    initBackToTop();
    initEvents();
  });

})();
