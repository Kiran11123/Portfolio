document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- Terminal typing effect ---------- */
const lines = [
  { text: '$ whoami', cls: 't-prompt' },
  { text: 'Alex Morgan — Business Analyst', cls: 't-out' },
  { text: '', cls: '' },
  { text: '$ cat skills.txt', cls: 't-prompt' },
  { text: 'SQL · Power BI · Process Mapping · Stakeholder Mgmt', cls: 't-out' },
  { text: '', cls: '' },
  { text: '$ ./generate_impact.sh --range=3y', cls: 't-prompt' },
  { text: '> $2.4M in cost savings identified', cls: 't-metric' },
  { text: '> 40% reduction in reporting time', cls: 't-metric' },
  { text: '> 12 cross-functional projects delivered', cls: 't-metric' },
];

const terminalBody = document.getElementById('terminalBody');
let lineIndex = 0, charIndex = 0;
const typeSpeed = 18;

function typeNext() {
  if (lineIndex >= lines.length) return;
  const current = lines[lineIndex];

  if (charIndex === 0) {
    const span = document.createElement('div');
    span.className = current.cls;
    span.dataset.row = lineIndex;
    terminalBody.appendChild(span);
  }

  const row = terminalBody.querySelector(`[data-row="${lineIndex}"]`);

  if (charIndex < current.text.length) {
    row.textContent = current.text.slice(0, charIndex + 1);
    charIndex++;
    setTimeout(typeNext, typeSpeed + Math.random() * 20);
  } else {
    lineIndex++;
    charIndex = 0;
    setTimeout(typeNext, current.text === '' ? 60 : 220);
  }
}

/* Start typing once the terminal scrolls into view */
const terminalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeNext();
      terminalObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
terminalObserver.observe(document.querySelector('.terminal'));

/* ---------- Animated stat counters ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isDecimal = target % 1 !== 0;
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
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
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-value').forEach(el => statObserver.observe(el));

/* ---------- Scroll reveal for sections ---------- */
document.querySelectorAll('.section-head, .about-body, .skills-grid, .timeline, .projects-grid, .contact-inner')
  .forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      link.style.color = 'var(--text)';
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => navObserver.observe(s));

/* ---------- Contact form (static placeholder) ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks! (This is a static demo — connect Formspree/EmailJS to actually send this.)';
  formNote.style.color = 'var(--accent-green)';
  contactForm.reset();
});

/* ---------- Resume button placeholder ---------- */
document.getElementById('resumeBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Add your resume PDF to the project and link it here, e.g. href="resume.pdf" download.');
});
