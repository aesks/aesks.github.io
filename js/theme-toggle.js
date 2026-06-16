(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  if (!btn) return;

  // Resolve the effective visual theme based on saved preference or system setting
  function getEffectiveTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Toggle between light and dark
  btn.addEventListener('click', function () {
    applyTheme(getEffectiveTheme() === 'dark' ? 'light' : 'dark');
  });

  // Keep in sync if the system preference changes while the page is open
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}());
