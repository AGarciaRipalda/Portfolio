/* ES/EN language toggle — reads data-es / data-en (text) and
   data-es-html / data-en-html (rich) attributes on flagged nodes. */
(function () {
  var KEY = 'agr_portfolio_lang';
  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-es]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-es-html]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang + '-html');
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('.langtoggle button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.lang === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  function init() {
    var saved = 'es';
    try { saved = localStorage.getItem(KEY) || 'es'; } catch (e) {}
    apply(saved);
    document.querySelectorAll('.langtoggle button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.lang); });
    });
    // mobile nav toggle
    var nav = document.querySelector('.topnav');
    var tgl = document.querySelector('.navtoggle');
    if (nav && tgl) {
      var setOpen = function (open) {
        nav.classList.toggle('open', open);
        tgl.setAttribute('aria-expanded', open ? 'true' : 'false');
      };
      tgl.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
      nav.querySelectorAll('.navlinks a').forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    }
    // scroll reveal
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
    // Safety: reveal anything already within the first viewport immediately
    // (covers slow observer ticks / static captures so above-the-fold never stays blank).
    requestAnimationFrame(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add('in');
      });
    });
    // Hard fallback: never leave content hidden if the observer never ticks.
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      });
    }, 1200);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
