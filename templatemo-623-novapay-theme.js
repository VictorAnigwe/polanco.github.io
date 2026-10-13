const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('apex-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme === 'light' || savedTheme === 'dark'
  ? savedTheme
  : (prefersDark ? 'dark' : 'light');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#1f211e' : '#ffffff';
}

setTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('apex-theme', nextTheme);
  setTheme(nextTheme);
});
