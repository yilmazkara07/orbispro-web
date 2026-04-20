/* ============================================================
   ORBIS – script.js
   Vanilla JavaScript: mobile nav, navbar scroll state,
   smooth scroll, footer year.
============================================================ */

(function () {
  'use strict';

  /* ── DOM references ─────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const yearSpan  = document.getElementById('year');

  /* ── Footer year ────────────────────────────────── */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ── Navbar: add .scrolled class on scroll ──────── */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load

  /* ── Mobile nav: hamburger toggle ──────────────── */
  function openNav() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });
  }

  /* Close nav when a link is clicked */
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  /* Close nav when clicking outside */
  document.addEventListener('click', function (event) {
    if (
      navLinks &&
      navLinks.classList.contains('open') &&
      !navLinks.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      closeNav();
    }
  });

  /* Close nav on Escape key */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      closeNav();
      hamburger.focus();
    }
  });

  /* ── Active nav link on scroll ──────────────────── */
  const sections   = document.querySelectorAll('main section[id]');
  const navAnchors = navLinks ? navLinks.querySelectorAll('a') : [];

  function updateActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.classList.remove('active');
      const href = anchor.getAttribute('href');
      if (href === '#' + current) {
        anchor.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

}());
