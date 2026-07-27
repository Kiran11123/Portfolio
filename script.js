document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Theme toggle ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme){
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'light');
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* sync initial aria state (theme itself already set in <head> to avoid flash) */
setTheme(root.getAttribute('data-theme') || 'dark');

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Sticky nav background on scroll ---------- */
const nav = document.getElementById('nav');
function onScroll(){
  nav.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Active section indicator ---------- */
const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');
const sections = [...navAnchors].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px -60% 0px' });
sections.forEach(s => navObserver.observe(s));

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Animated stat counters ---------- */
function animateCount(el){
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isDecimal = target % 1 !== 0;
  const duration = 1200;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

/* ---------- Contact form (static placeholder) ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks! (This is a static demo — connect Formspree/EmailJS to actually send this.)';
  formNote.style.color = 'var(--accent)';
  contactForm.reset();
});

/* ---------- Resume buttons (placeholder) ---------- */
function resumePlaceholder(e){
  e.preventDefault();
  alert('Add your resume PDF to the project and link it here, e.g. href="resume.pdf" download.');
}
document.getElementById('resumeBtn').addEventListener('click', resumePlaceholder);
document.getElementById('resumeCard').addEventListener('click', resumePlaceholder);
