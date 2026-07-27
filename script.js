document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Mobile nav ---------- */
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

/* ---------- Staggered scroll reveal ---------- */
const revealGroups = new Map();
document.querySelectorAll('.reveal').forEach(el => {
  const parent = el.parentElement;
  if (!revealGroups.has(parent)) revealGroups.set(parent, []);
  revealGroups.get(parent).push(el);
});
revealGroups.forEach(group => {
  group.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 80, 320)}ms`; });
});

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
    if (entry.isIntersecting){ animateCount(entry.target); statObserver.unobserve(entry.target); }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

/* ---------- Contact form (static placeholder) ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks! (This is a static demo — connect Formspree/EmailJS to actually send this.)';
  formNote.style.fontWeight = '700';
  contactForm.reset();
});

/* ---------- Resume buttons (placeholder) ---------- */
function resumePlaceholder(e){
  e.preventDefault();
  alert('Add your resume PDF to the project and link it here, e.g. href="resume.pdf" download.');
}
document.getElementById('resumeBtn').addEventListener('click', resumePlaceholder);
document.getElementById('resumeCard').addEventListener('click', resumePlaceholder);
