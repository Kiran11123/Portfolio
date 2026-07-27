document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Lucide icons ---------- */
if (window.lucide) lucide.createIcons();

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
setTheme(root.getAttribute('data-theme') || 'dark');

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

/* ---------- Sticky nav shrink ---------- */
const nav = document.getElementById('nav');
function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 30); }
window.addEventListener('scroll', onScroll, { passive:true });
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

/* ---------- Headline word stagger ---------- */
document.querySelectorAll('.headline .word').forEach((word, i) => {
  word.style.animationDelay = `${0.15 + i * 0.07}s`;
});

/* ---------- Staggered scroll reveal ---------- */
const revealGroups = new Map();
document.querySelectorAll('.reveal').forEach(el => {
  const parent = el.parentElement;
  if (!revealGroups.has(parent)) revealGroups.set(parent, []);
  revealGroups.get(parent).push(el);
});
revealGroups.forEach(group => {
  group.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 90, 360)}ms`; });
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
  const duration = 1300;
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

/* ---------- Cursor glow ---------- */
if (!prefersReducedMotion && window.matchMedia('(hover:hover)').matches) {
  const glow = document.getElementById('cursorGlow');
  let gx = 0, gy = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    glow.classList.add('active');
  });
  function loop(){
    gx += (tx - gx) * 0.15;
    gy += (ty - gy) * 0.15;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ---------- Magnetic buttons ---------- */
if (!prefersReducedMotion && window.matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ---------- 3D tilt on cards ---------- */
if (!prefersReducedMotion && window.matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-py * 8).toFixed(2);
      const rotateY = (px * 8).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
    });
  });
}

/* ---------- Parallax on scroll ---------- */
const parallaxEls = document.querySelectorAll('.parallax');
if (parallaxEls.length && !prefersReducedMotion) {
  function updateParallax(){
    const scrolled = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed || 0.2);
      el.style.transform = `translateY(${scrolled * speed * -0.15}px)`;
    });
  }
  window.addEventListener('scroll', updateParallax, { passive:true });
  updateParallax();
}

/* ---------- Contact form (static placeholder) ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks! (This is a static demo — connect Formspree/EmailJS to actually send this.)';
  formNote.style.color = 'var(--text)';
  contactForm.reset();
});

/* ---------- Resume buttons (placeholder) ---------- */
function resumePlaceholder(e){
  e.preventDefault();
  alert('Add your resume PDF to the project and link it here, e.g. href="resume.pdf" download.');
}
document.getElementById('resumeBtn').addEventListener('click', resumePlaceholder);
document.getElementById('resumeCard').addEventListener('click', resumePlaceholder);
