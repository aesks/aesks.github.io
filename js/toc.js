document.addEventListener('DOMContentLoaded', () => {
  const postContent = document.querySelector('.post-content');
  if (!postContent) return;

  const headings = [...postContent.querySelectorAll('h2, h3, h4')];
  if (headings.length < 2) return;

  const TOC_BREAKPOINT = 1080;
  const HEADER_HEIGHT = 72;
  let tocEl = null;
  let rafPending = false;

  function headingText(h) {
    const clone = h.cloneNode(true);
    clone.querySelectorAll('.header-anchor').forEach(el => el.remove());
    return clone.textContent.trim();
  }

  function buildToc() {
    const nav = document.createElement('nav');
    nav.className = 'toc';
    nav.setAttribute('aria-label', 'Table of contents');

    const ul = document.createElement('ul');
    headings.forEach(h => {
      const li = document.createElement('li');
      li.className = 'toc-item toc-' + h.tagName.toLowerCase();

      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'toc-link';
      a.textContent = headingText(h);

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    document.body.appendChild(nav);
    return nav;
  }

  function positionToc() {
    if (!tocEl) return;
    const rect = postContent.getBoundingClientRect();
    const left = rect.left - 20 - tocEl.offsetWidth;
    tocEl.style.left = Math.max(8, left) + 'px';
  }

  function updateActive() {
    if (!tocEl) return;
    let activeId = null;

    for (let i = headings.length - 1; i >= 0; i--) {
      if (headings[i].getBoundingClientRect().top <= HEADER_HEIGHT + 16) {
        activeId = headings[i].id;
        break;
      }
    }

    tocEl.querySelectorAll('.toc-link').forEach(a => {
      a.classList.toggle('toc-active', a.getAttribute('href') === '#' + activeId);
    });
  }

  function onScroll() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        updateActive();
        rafPending = false;
      });
    }
  }

  function showToc() {
    if (tocEl) return;
    tocEl = buildToc();
    positionToc();
    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function hideToc() {
    if (!tocEl) return;
    window.removeEventListener('scroll', onScroll);
    tocEl.remove();
    tocEl = null;
  }

  function update() {
    if (window.innerWidth >= TOC_BREAKPOINT) {
      showToc();
      positionToc();
    } else {
      hideToc();
    }
  }

  update();
  window.addEventListener('resize', update);
});
