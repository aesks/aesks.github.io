document.addEventListener('DOMContentLoaded', () => {
  const refs = document.querySelectorAll('.footnote-ref a');
  if (!refs.length) return;

  const BREAKPOINT = 1200;
  const postContent = document.querySelector('.post-content');
  const desktopSidenotes = new Map();

  function getContent(ref) {
    const item = document.getElementById(ref.getAttribute('href').replace('#', ''));
    if (!item) return null;
    const clone = item.cloneNode(true);
    clone.querySelector('.footnote-backref')?.remove();
    return clone.innerHTML.trim();
  }

  function getNum(ref) {
    return ref.textContent.replace(/[[\]]/g, '').trim();
  }

  // --- Desktop: margin sidenotes, always visible, faded until hover ---
  function buildSidenotes() {
    if (!postContent) return;

    // First pass: create all sidenotes and record their ideal top position
    const entries = [];
    refs.forEach(ref => {
      if (desktopSidenotes.has(ref)) return;
      const content = getContent(ref);
      if (!content) return;

      const sn = document.createElement('div');
      sn.className = 'footnote-sidenote';
      sn.innerHTML = `<span class="footnote-sidenote-num">${getNum(ref)}</span><div class="footnote-sidenote-body">${content}</div>`;
      postContent.appendChild(sn);

      const refTop = ref.getBoundingClientRect().top - postContent.getBoundingClientRect().top;
      entries.push({ sn, refTop });
      desktopSidenotes.set(ref, sn);
    });

    // Second pass: position after layout, pushing down to avoid overlaps
    requestAnimationFrame(() => {
      let nextTop = 0;
      entries.forEach(({ sn, refTop }) => {
        const top = Math.max(refTop, nextTop);
        sn.style.top = top + 'px';

        nextTop = top + sn.offsetHeight + 8;
      });
    });
  }

  function removeSidenotes() {
    desktopSidenotes.forEach(sn => sn.remove());
    desktopSidenotes.clear();
  }

  // --- Mobile: click to toggle inline block under paragraph ---
  refs.forEach(ref => {
    ref.addEventListener('click', e => {
      e.preventDefault();
      if (window.innerWidth >= BREAKPOINT) return;

      const existing = document.getElementById('fn-inline-' + ref.id);
      if (existing) { existing.remove(); return; }

      const content = getContent(ref);
      if (!content) return;

      const box = document.createElement('div');
      box.className = 'footnote-inline';
      box.id = 'fn-inline-' + ref.id;
      box.innerHTML = `<span class="footnote-inline-num">${getNum(ref)}</span><div class="footnote-inline-body">${content}</div>`;

      const block = ref.closest('p, li, h1, h2, h3, h4, blockquote') || ref.parentElement;
      block.after(box);
    });
  });

  // --- Init & resize ---
  function update() {
    if (window.innerWidth >= BREAKPOINT) {
      document.querySelectorAll('.footnote-inline').forEach(el => el.remove());
      buildSidenotes();
    } else {
      removeSidenotes();
    }
  }

  update();
  window.addEventListener('resize', update);
});
