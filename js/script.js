(function () {
  'use strict';

  var header = document.getElementById('header');
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  var navAnchors = links.querySelectorAll('a');

  // Mobile menu
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.firstElementChild.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
  navAnchors.forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.firstElementChild.className = 'fa-solid fa-bars';
    });
  });

  // Header shadow on scroll
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight active nav link
  var map = {};
  navAnchors.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          navAnchors.forEach(function (a) { a.classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'experience', 'projects', 'skills', 'education', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
