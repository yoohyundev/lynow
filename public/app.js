(() => {
  const deck = document.querySelector('.deck');
  const slides = [...document.querySelectorAll('.slide')];
  const N = slides.length;
  const chapEl = document.querySelector('.hdr .chap');
  const countEl = document.querySelector('.navbtns .count');
  const prog = document.querySelector('.progress');
  const mini = document.querySelector('.mini');
  const toc = document.querySelector('.toc .list');
  const mobile = () => window.matchMedia('(max-width:900px)').matches;
  let cur = 0, step = 1;

  // ----- scale the fixed 1440x810 canvas to the window
  function fit() {
    if (mobile()) { deck.style.transform = ''; return; }
    const s = Math.min(innerWidth / 1440, innerHeight / 810);
    deck.style.transform = `translate(-50%,-50%) scale(${s})`;
  }
  addEventListener('resize', fit); fit();

  // ----- minimap + table of contents
  let lastChap = null;
  slides.forEach((sl, i) => {
    const b = document.createElement('button');
    const label = sl.dataset.label || `${i + 1}`;
    b.innerHTML = `<span>${label}</span>`;
    if (sl.dataset.chapter !== lastChap) {
      b.classList.add('chapstart');
      const h = document.createElement('h4'); h.textContent = sl.dataset.chapter || '';
      toc.appendChild(h); lastChap = sl.dataset.chapter;
    }
    b.onclick = () => go(i, 1);
    mini.appendChild(b);
    const a = document.createElement('a'); a.href = `#${i + 1}`; a.textContent = label;
    a.onclick = () => document.querySelector('.toc').classList.remove('open');
    toc.appendChild(a);
  });
  document.querySelector('.tocbtn').onclick = () => document.querySelector('.toc').classList.add('open');
  document.querySelector('.toc .x').onclick = () => document.querySelector('.toc').classList.remove('open');

  const stepsOf = sl => [...sl.querySelectorAll('.steps li')];
  const maxStep = sl => Math.max(1, stepsOf(sl).length);

  function paintSteps(sl, s) {
    stepsOf(sl).forEach((li, k) => {
      li.dataset.n = k + 1;
      li.classList.toggle('cur', k + 1 === s);
      li.classList.toggle('seen', k + 1 < s);
      li.onclick = () => { step = k + 1; paintSteps(sl, step); };
    });
    sl.querySelectorAll('[data-s]').forEach(el => el.classList.toggle('off', +el.dataset.s > s));
    sl.querySelectorAll('[data-f]').forEach(el =>
      el.classList.toggle('focus', el.dataset.f.split(',').map(Number).includes(s)));
  }

  function go(i, s = 1) {
    i = Math.max(0, Math.min(N - 1, i));
    cur = i; step = s === 'last' ? maxStep(slides[i]) : s;
    slides.forEach((sl, k) => {
      sl.classList.toggle('active', k === i);
      sl.classList.toggle('before', k < i);
    });
    paintSteps(slides[i], step);
    chapEl.textContent = slides[i].dataset.chapter || '';
    countEl.textContent = `${String(i + 1).padStart(2, '0')} / ${N}`;
    prog.style.width = `${((i + 1) / N) * 100}%`;
    [...mini.children].forEach((b, k) => b.classList.toggle('on', k === i));
    if (location.hash !== `#${i + 1}`) history.replaceState(null, '', `#${i + 1}`);
  }

  function next() {
    if (step < maxStep(slides[cur])) { step++; paintSteps(slides[cur], step); }
    else if (cur < N - 1) go(cur + 1, 1);
  }
  function prev() {
    if (step > 1) { step--; paintSteps(slides[cur], step); }
    else if (cur > 0) go(cur - 1, 'last');
  }
  document.querySelector('.nb-prev').onclick = prev;
  document.querySelector('.nb-next').onclick = next;
  document.querySelectorAll('[data-go]').forEach(el => el.onclick = () => go(+el.dataset.go - 1, 1));

  addEventListener('keydown', e => {
    if (mobile()) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next(); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
    if (e.key === 'Home') go(0); if (e.key === 'End') go(N - 1);
    if (e.key === 'Escape') document.querySelector('.toc').classList.remove('open');
  });
  let lock = 0;
  addEventListener('wheel', e => {
    if (mobile() || document.querySelector('.toc.open')) return;
    const t = Date.now(); if (t - lock < 650 || Math.abs(e.deltaY) < 12) return;
    lock = t; e.deltaY > 0 ? next() : prev();
  }, { passive: true });
  let tx = null;
  addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
  addEventListener('touchend', e => {
    if (mobile() || tx === null) return;
    const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) d < 0 ? next() : prev(); tx = null;
  });
  addEventListener('hashchange', () => {
    const n = parseInt(location.hash.slice(1)); if (n && n - 1 !== cur) go(n - 1);
  });

  // ----- image placeholders: drop assets/IMG-xx.(webp|jpg|png) to replace
  document.querySelectorAll('.ph[data-img]').forEach(ph => {
    const id = ph.dataset.img;
    ph.insertAdjacentHTML('afterbegin', `<span class="pid">${id}</span>`);
    const tryExt = exts => {
      if (!exts.length) return;
      const src = `assets/${id}.${exts[0]}`, im = new Image();
      im.onload = () => { ph.style.backgroundImage = `url("${src}")`; ph.classList.add('loaded'); };
      im.onerror = () => tryExt(exts.slice(1));
      im.src = src;
    };
    tryExt(['webp', 'jpg', 'png', 'gif']);
  });

  const n0 = parseInt(location.hash.slice(1));
  go(n0 ? n0 - 1 : 0);
  if (mobile()) slides.forEach(sl => paintSteps(sl, 99));
})();
