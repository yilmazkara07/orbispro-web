/* ORBIS – script.js (geçici holding page) */
(function () {
  'use strict';

  /* Navbar scroll shadow */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.borderBottomColor = window.scrollY > 10
        ? 'rgba(0,200,224,0.14)'
        : 'rgba(255,255,255,0.06)';
    }, { passive: true });
  }

  /* Smooth in-page anchor scroll for #contact */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}());
