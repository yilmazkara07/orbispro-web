/**
 * ORBIS Pro – script.js
 * Lightweight vanilla JS: nav scroll effect, mobile menu, contact form mock
 */

(function () {
  'use strict';

  /* ── Navbar: scroll sınıfı ── */
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // İlk yüklemede kontrol et

  /* ── Mobil menü açma/kapama ── */
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Menü linkine tıklanınca menüyü kapat
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Dışarı tıklanınca kapat
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── İletişim formu (mock submit) ── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Gönderiliyor…';

      // Gerçek bir backend bağlantısı olmadığından 1.2 sn. sonra başarı mesajı göster
      setTimeout(function () {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Mesajı Gönder';
        formSuccess.style.display = 'block';

        setTimeout(function () {
          formSuccess.style.display = 'none';
        }, 6000);
      }, 1200);
    });
  }

  /* ── Intersection Observer: fade-in animasyonu ── */
  if ('IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = [
      '.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }',
      '.reveal.visible { opacity: 1; transform: none; }'
    ].join('');
    document.head.appendChild(style);

    const targets = document.querySelectorAll(
      '.solution-card, .adv-item, .adv-card, .about-features li, .contact-detail'
    );

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

})();
