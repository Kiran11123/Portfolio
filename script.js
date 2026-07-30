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

/* ---------- Accordion (work experience) ---------- */
document.querySelectorAll('.accordion-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.closest('.accordion-item');
    const isOpen = item.classList.contains('is-open');
    item.classList.toggle('is-open', !isOpen);
    head.setAttribute('aria-expanded', String(!isOpen));
  });
});

/* ---------- Skill flip cards ---------- */
document.querySelectorAll('.flip-card').forEach(card => {
  function toggle(){ card.classList.toggle('flipped'); }
  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});

/* ---------- Back to top ---------- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => { backToTop.classList.toggle('show', window.scrollY > 500); }, { passive:true });
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

/* ---------- Contact form (static placeholder) ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thank you. This is a static demo. Connect Formspree or EmailJS to send this for real.';
  formNote.style.fontWeight = '700';
  contactForm.reset();
});

/* ---------- Skills in Practice: dynamic dashboard widget ---------- */
(function dashboardWidget(){
  const growthEl = document.getElementById('dashGrowth');
  const efficiencyEl = document.getElementById('dashEfficiency');
  const accuracyEl = document.getElementById('dashAccuracy');
  const polyline = document.getElementById('dashPolyline');
  const dot = document.getElementById('dashDot');
  const bars = document.querySelectorAll('#dashBars span');
  if (!growthEl) return;

  const state = { growth: 24, efficiency: 92, accuracy: 98 };
  let linePoints = [45, 38, 42, 25, 20, 10, 8];
  let barHeights = [35, 48, 30, 60, 52, 70, 80];

  function flashValue(el, oldVal, newVal){
    el.textContent = newVal + '%';
    el.classList.remove('up','down');
    if (newVal > oldVal) el.classList.add('up');
    else if (newVal < oldVal) el.classList.add('down');
    setTimeout(() => el.classList.remove('up','down'), 1400);
  }

  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  function tick(){
    const newGrowth = clamp(state.growth + Math.round((Math.random() - 0.45) * 6), 8, 45);
    const newEfficiency = clamp(state.efficiency + Math.round((Math.random() - 0.5) * 5), 70, 99);
    const newAccuracy = clamp(state.accuracy + Math.round((Math.random() - 0.5) * 3), 85, 99);

    flashValue(growthEl, state.growth, newGrowth);
    flashValue(efficiencyEl, state.efficiency, newEfficiency);
    flashValue(accuracyEl, state.accuracy, newAccuracy);
    state.growth = newGrowth; state.efficiency = newEfficiency; state.accuracy = newAccuracy;

    linePoints.shift();
    const lastY = linePoints[linePoints.length - 1];
    const nextY = clamp(lastY + (Math.random() - 0.5) * 22, 5, 50);
    linePoints.push(nextY);
    const xs = [0, 46, 92, 138, 184, 230, 280];
    const pointsStr = xs.map((x, i) => `${x},${(60 - linePoints[i]).toFixed(1)}`).join(' ');
    polyline.setAttribute('points', pointsStr);
    dot.setAttribute('cy', (60 - linePoints[linePoints.length - 1]).toFixed(1));

    barHeights = barHeights.map((h, i) => {
      const nh = clamp(h + Math.round((Math.random() - 0.5) * 30), 20, 90);
      const barEl = bars[i];
      barEl.style.setProperty('--h', nh + '%');
      barEl.classList.remove('up','down');
      if (nh > h) barEl.classList.add('up');
      else if (nh < h) barEl.classList.add('down');
      setTimeout(() => barEl.classList.remove('up','down'), 1400);
      return nh;
    });
  }

  if (!prefersReducedMotion) {
    setInterval(tick, 2400);
  }
})();

/* ---------- Skills in Practice: code typing widgets ---------- */
(function codeWidgets(){
  const pythonSnippet = `def automate_job(source):
    data = extract(source)
    clean = transform(data)
    load(clean, target="prod_db")
    return "job complete, 85% faster"`;

  const sqlSnippet = `SELECT region, AVG(accuracy) AS avg_accuracy
FROM performance_reports
WHERE report_month = CURRENT_MONTH
GROUP BY region
ORDER BY avg_accuracy DESC;`;

  function typeLoop(elId, text){
    const el = document.getElementById(elId);
    if (!el) return;
    if (prefersReducedMotion) { el.textContent = text; return; }

    let i = 0;
    function step(){
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, 28);
      } else {
        setTimeout(() => { i = 0; el.textContent = ''; setTimeout(step, 500); }, 2600);
      }
    }
    step();
  }

  typeLoop('pythonCode', pythonSnippet);
  setTimeout(() => typeLoop('sqlCode', sqlSnippet), 400);
})();

/* ---------- Skills in Practice: design thinking stepper ---------- */
(function stepperWidget(){
  const steps = document.querySelectorAll('#stepper .step');
  if (!steps.length || prefersReducedMotion) return;
  let active = 0;
  setInterval(() => {
    steps[active].classList.remove('is-active');
    active = (active + 1) % steps.length;
    steps[active].classList.add('is-active');
  }, 1700);
})();

/* ---------- Skills in Practice: socio-technical balance meter ---------- */
(function balanceWidget(){
  const fill = document.getElementById('balanceFill');
  if (!fill || prefersReducedMotion) return;
  const states = [50, 70, 35, 55, 65];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % states.length;
    fill.style.width = states[i] + '%';
    fill.style.marginLeft = states[i] > 50 ? '0' : (50 - states[i]) + '%';
  }, 2000);
})();

