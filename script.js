/* =============================================================
   UNIVERSO PILATES — script.js
   Vanilla JS: preloader, header, menú móvil, scroll reveal, marquee
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     1. PRELOADER
  ----------------------------------------------------------- */
  var preloader = document.getElementById('preloader');
  document.body.classList.add('no-scroll');

  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('loaded');
    document.body.classList.remove('no-scroll');
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 900);
  }

  // Se oculta cuando la página termina de cargar, con un mínimo
  // de tiempo visible para que la animación se aprecie.
  var minDelay = 1100;
  var start = Date.now();

  window.addEventListener('load', function () {
    var elapsed = Date.now() - start;
    var wait = Math.max(minDelay - elapsed, 0);
    setTimeout(hidePreloader, wait);
  });

  // Salvaguarda: si "load" tarda demasiado, ocultamos igualmente.
  setTimeout(hidePreloader, 4000);

  /* -----------------------------------------------------------
     2. HEADER: fondo sólido al hacer scroll
  ----------------------------------------------------------- */
  var header = document.getElementById('siteHeader');

  function toggleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  toggleHeaderScroll();
  window.addEventListener('scroll', toggleHeaderScroll, { passive: true });

  /* -----------------------------------------------------------
     3. MENÚ MÓVIL (hamburguesa)
  ----------------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mainNav = document.getElementById('mainNav');
  var navOverlay = document.getElementById('navOverlay');
  var navLinks = document.querySelectorAll('.nav-link');

  function openNav() {
    mainNav.classList.add('active');
    navOverlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  function closeNav() {
    mainNav.classList.remove('active');
    navOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  hamburger.addEventListener('click', function () {
    if (mainNav.classList.contains('active')) {
      closeNav();
    } else {
      openNav();
    }
  });

  navOverlay.addEventListener('click', closeNav);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Cierra el menú si se redimensiona a escritorio
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeNav();
  });

  /* -----------------------------------------------------------
     4. SCROLL REVEAL (IntersectionObserver)
  ----------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: navegadores sin soporte muestran todo directamente
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* -----------------------------------------------------------
     5. Año dinámico en el copyright (opcional, no altera el texto fijo)
  ----------------------------------------------------------- */
  // El footer solicita el texto fijo "© 2026 Universo Pilates",
  // por lo que no se sobrescribe dinámicamente.

});
