// ---------------------------------------------
// Setup
// ---------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.lucide) lucide.createIcons();

// ---------------------------------------------
// Nav scroll state + mobile toggle
// ---------------------------------------------
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });
}

// ---------------------------------------------
// Scroll reveal
// ---------------------------------------------
const revealEls = document.querySelectorAll(".reveal");

if (reduceMotion) {
  revealEls.forEach(el => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(el => revealObserver.observe(el));
}

// ---------------------------------------------
// Count-up stats
// ---------------------------------------------
const counters = document.querySelectorAll("[data-count]");

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  if (reduceMotion) {
    el.textContent = target + suffix;
    return;
  }

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

counters.forEach(el => countObserver.observe(el));

// ---------------------------------------------
// Animated background: data-flow particle network
// ---------------------------------------------
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width, height;
const COLORS = ["78,205,196", "244,163,64"];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function initParticles() {
  const count = Math.min(70, Math.floor((width * height) / 18000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.6 + 0.6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  }));
}

function step() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},0.7)`;
    ctx.fill();
  });

  const maxDist = Math.min(150, width / 8);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(78,205,196,${0.16 * (1 - dist / maxDist)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  if (!reduceMotion) requestAnimationFrame(step);
}

resize();
initParticles();

if (reduceMotion) {
  step(); // draw a single static frame
} else {
  requestAnimationFrame(step);
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resize();
    initParticles();
  }, 200);
});
