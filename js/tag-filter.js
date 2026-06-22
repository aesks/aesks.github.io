(function () {
  const filterGroup = document.querySelector('.tag-filters');
  if (!filterGroup) return;

  const buttons = filterGroup.querySelectorAll('.tag-filter');
  const cards = document.querySelectorAll('[data-tags]');

  function setActive(btn) {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function updateFirstVisible() {
    let found = false;
    cards.forEach(card => {
      card.classList.remove('is-first-visible');
      if (!found && !card.hidden) {
        card.classList.add('is-first-visible');
        found = true;
      }
    });
  }

  function filterCards(tag) {
    cards.forEach(card => {
      if (tag === 'all') {
        card.hidden = false;
      } else {
        const cardTags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
        card.hidden = !cardTags.includes(tag);
      }
    });
    updateFirstVisible();
  }

  filterGroup.addEventListener('click', function (e) {
    const btn = e.target.closest('.tag-filter');
    if (!btn) return;
    setActive(btn);
    filterCards(btn.dataset.tag);
  });

  // Clicking a tag pill on a post card also triggers the filter
  document.addEventListener('click', function (e) {
    const pill = e.target.closest('.post-card-tags .tag[data-tag]');
    if (!pill) return;
    const tag = pill.dataset.tag;
    const matchingBtn = filterGroup.querySelector(`.tag-filter[data-tag="${tag}"]`);
    if (matchingBtn) {
      setActive(matchingBtn);
      filterCards(tag);
      filterGroup.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();
