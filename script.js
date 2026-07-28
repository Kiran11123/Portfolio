document.getElementById('year').textContent = new Date().getFullYear();
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover:hover)').matches;

/* ---------- Theme toggle ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
function setTheme(theme){
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
});
setTheme(root.getAttribute('data-theme') || 'light');

/* ---------- Intro loader ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('done'), prefersReducedMotion ? 0 : 500);
});

/* ---------- Scroll progress bar ---------- */
const scrollProgress = document.getElementById('scrollProgress');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}
window.addEventListener('scroll', updateProgress, { passive:true });
updateProgress();

/* ---------- Custom cursor ---------- */
if (canHover && !prefersReducedMotion) {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let rx = 0, ry = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
  });
  function loop(){
    rx += (tx - rx) * 0.18;
    ry += (ty - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('a, button, [data-tilt], .flip-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
} else {
  document.getElementById('cursorDot').style.display = 'none';
  document.getElementById('cursorRing').style.display = 'none';
}

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); });
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
}, { threshold: 0.35, rootMargin: '-80px 0px -55% 0px' });
sections.forEach(s => navObserver.observe(s));

/* ---------- Staggered scroll reveal ---------- */
const revealGroups = new Map();
document.querySelectorAll('.reveal').forEach(el => {
  const parent = el.parentElement;
  if (!revealGroups.has(parent)) revealGroups.set(parent, []);
  revealGroups.get(parent).push(el);
});
revealGroups.forEach(group => { group.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 80, 320)}ms`; }); });
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Stat counters ---------- */
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
  entries.forEach(entry => { if (entry.isIntersecting){ animateCount(entry.target); statObserver.unobserve(entry.target); } });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

/* ---------- Magnetic buttons ---------- */
if (canHover && !prefersReducedMotion) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${relX * 0.2}px, ${relY * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ---------- 3D tilt ---------- */
if (canHover && !prefersReducedMotion) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; });
  });
}

/* ---------- Avatar flip ---------- */
const flipAvatar = document.getElementById('flipAvatar');
flipAvatar.addEventListener('click', () => flipAvatar.classList.toggle('flipped'));

/* ---------- Draggable sticker ---------- */
(function makeDraggable(){
  const sticker = document.getElementById('dragSticker');
  let dragging = false, startX = 0, startY = 0, curX = 0, curY = 0;
  function start(x, y){ dragging = true; startX = x - curX; startY = y - curY; }
  function move(x, y){
    if (!dragging) return;
    curX = x - startX; curY = y - startY;
    sticker.style.transform = `translate(${curX}px, ${curY}px) rotate(${curX * 0.15}deg)`;
  }
  function end(){ dragging = false; }
  sticker.addEventListener('mousedown', (e) => start(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));
  window.addEventListener('mouseup', end);
  sticker.addEventListener('touchstart', (e) => { const t = e.touches[0]; start(t.clientX, t.clientY); }, { passive:true });
  window.addEventListener('touchmove', (e) => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive:true });
  window.addEventListener('touchend', end);
})();

/* ---------- Accordion (experience) ---------- */
document.querySelectorAll('.accordion-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.closest('.accordion-item');
    const isOpen = item.classList.contains('is-open');
    item.classList.toggle('is-open', !isOpen);
    head.setAttribute('aria-expanded', String(!isOpen));
  });
});

/* ---------- Project filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ---------- Project modal ---------- */
const projectsData = {
  1: { tag: 'Process Automation', title: 'Co-Manufacturer Reporting Automation', desc: 'Automated monthly co-manufacturer performance reporting at Danone, replacing manual spreadsheet handling with a Power BI + Power Query pipeline built on clean data modeling.', achievements: ['Cut manual processing time by ~90% and eliminated reporting errors', 'Added slicers, tooltips, and drill-through for detailed performance analysis', 'Defined KPIs with stakeholders for compliance and quality monitoring'], tools: ['Power BI','Power Query (M)','DAX'] },
  2: { tag: 'Dashboard Build', title: 'Jira-Integrated Capacity Dashboard', desc: 'Built a Power BI dashboard integrated with Jira at GoodHabitz for real-time visibility into workload, sprint planning, and team capacity, backed by structured stakeholder research.', achievements: ['Applied Design Based Working (DBW) to iterate lo-fi → hi-fi prototypes', 'Ran Stakeholder & Socio-Technical Analysis to align solution with context', 'Executed a Digital Readiness Assessment ahead of rollout'], tools: ['Power BI','Jira','DBW Prototyping'] },
  3: { tag: 'Python Automation', title: 'Job Development Automation Script', desc: 'Built a Python script at TCS automating a major part of the job development process, addressing a key inefficiency identified through stakeholder analysis.', achievements: ['Reduced job development time by 85%', 'Eliminated manual errors in the process', 'Delivered early and deployed during the client transition phase'], tools: ['Python','SQL','Linux'] },
  4: { tag: 'Product Strategy', title: 'Tikdin Product Vision & Prioritization', desc: 'Defined the product vision for Tikdin during a product management bootcamp, grounding prioritization decisions in real user research rather than guesswork.', achievements: ['Tracked the North Star Metric using Amplitude', 'Conducted user interviews and analyzed product stickiness', 'Ran RICE Analysis to prioritize features in the Product Requirement Document'], tools: ['Amplitude','RICE Analysis','User Research'] }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalAchievements = document.getElementById('modalAchievements');
const modalTools = document.getElementById('modalTools');

function openModal(id){
  const data = projectsData[id];
  if (!data) return;
  modalTag.textContent = data.tag;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalAchievements.innerHTML = data.achievements.map(a => `<li>${a}</li>`).join('');
  modalTools.innerHTML = data.tools.map(t => `<span>${t}</span>`).join('');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-open-modal]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.openModal));
});
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------- Skill flip cards ---------- */
document.querySelectorAll('.flip-card').forEach(card => {
  function toggle(){ card.classList.toggle('flipped'); }
  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});

/* ---------- Drag-scroll carousel ---------- */
(function initCarousel(){
  const carousel = document.getElementById('carousel');
  let isDown = false, startX, scrollLeft;
  carousel.addEventListener('mousedown', (e) => {
    isDown = true; carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft; scrollLeft = carousel.scrollLeft;
  });
  window.addEventListener('mouseup', () => { isDown = false; carousel.classList.remove('dragging'); });
  carousel.addEventListener('mouseleave', () => { isDown = false; carousel.classList.remove('dragging'); });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollLeft - (x - startX) * 1.2;
  });
  document.getElementById('carouselPrev').addEventListener('click', () => {
    carousel.scrollBy({ left: -320, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
  document.getElementById('carouselNext').addEventListener('click', () => {
    carousel.scrollBy({ left: 320, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
})();

/* ---------- Back to top ---------- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => { backToTop.classList.toggle('show', window.scrollY > 500); }, { passive:true });
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

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
