// === Mobile drawer ===
(function () {
  const burger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.close-drawer');
  const backdrop = document.querySelector('.backdrop');

  if (!burger) return;

  const open = () => {
    drawer.classList.add('open');
    burger.classList.add('active');
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add('show'));
    document.body.classList.add('lock');
    burger.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    drawer.classList.remove('open');
    burger.classList.remove('active');
    backdrop.classList.remove('show');
    document.body.classList.remove('lock');
    burger.setAttribute('aria-expanded', 'false');
    setTimeout(() => (backdrop.hidden = true), 300);
  };

  burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });
})();

// === Search overlay ===
(function () {
  const btn = document.querySelector('.search-btn');
  const overlay = document.querySelector('.search-overlay');
  const closeBtn = document.querySelector('.close-search');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('show'));
    document.body.classList.add('lock');
  });

  const close = () => {
    overlay.classList.remove('show');
    document.body.classList.remove('lock');
    setTimeout(() => overlay.hidden = true, 300);
  };

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('show')) close(); });
})();

// === Auto-hide header on scroll ===
(function () {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 80) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScroll = current;
  });
})();
