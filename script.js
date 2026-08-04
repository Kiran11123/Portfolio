// ---------------------------------------------
// Setup
// ---------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarse = window.matchMedia("(pointer: coarse)").matches;

if (window.lucide) lucide.createIcons();

// ---------------------------------------------
// Theme toggle (light / dark)
// ---------------------------------------------
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("kp-theme", next); } catch (e) { /* storage unavailable */ }
  });
}

// ---------------------------------------------
// Back to top
// ---------------------------------------------
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > window.innerHeight * 0.6);
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

// ---------------------------------------------
// Preloader
// ---------------------------------------------
const preloader = document.getElementById("preloader");
const preCount = document.getElementById("preCount");
const preBar = document.getElementById("preBar");

(function runPreloader() {
  if (reduceMotion) {
    preloader.classList.add("done");
    return;
  }
  let progress = 0;
  const start = performance.now();
  const duration = 1100;

  function tick(now) {
    const elapsed = now - start;
    progress = Math.min(100, Math.round((elapsed / duration) * 100));
    preCount.textContent = progress;
    preBar.style.width = progress + "%";
    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => preloader.classList.add("done"), 250);
    }
  }
  requestAnimationFrame(tick);
})();

// ---------------------------------------------
// Nav scroll state + mobile toggle
// ---------------------------------------------
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");
const progressFill = document.getElementById("progressFill");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  progressFill.style.width = scrolled + "%";
}, { passive: true });

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", false);
  }));
}

// ---------------------------------------------
// Custom cursor
// ---------------------------------------------
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

if (!isCoarse) {
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll("a, button, .tilt, .tilt-sm").forEach(el => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("hovered"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovered"));
  });
}

// ---------------------------------------------
// Magnetic buttons
// ---------------------------------------------
if (!isCoarse && !reduceMotion) {
  document.querySelectorAll(".magnetic").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0,0)";
    });
  });
}

// ---------------------------------------------
// Tilt cards
// ---------------------------------------------
if (!isCoarse && !reduceMotion) {
  document.querySelectorAll(".tilt").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateX(${py * -6}deg) rotateY(${px * 6}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(600px) rotateX(0) rotateY(0)";
    });
  });
}

// ---------------------------------------------
// Hero spotlight follows cursor
// ---------------------------------------------
const heroSpotlight = document.getElementById("heroSpotlight");
if (heroSpotlight && !isCoarse) {
  document.querySelector(".hero").addEventListener("mousemove", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    heroSpotlight.style.setProperty("--x", `${e.clientX - rect.left}px`);
    heroSpotlight.style.setProperty("--y", `${e.clientY - rect.top}px`);
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
// Live dashboard mock: bars, chart line, and KPIs keep moving
// ---------------------------------------------
const dashPanel = document.querySelector(".hero-visual .panel");

if (dashPanel && !reduceMotion) {
  // Moving bars
  const bars = dashPanel.querySelectorAll(".bar");
  bars.forEach(bar => {
    const initial = parseFloat(bar.style.getPropertyValue("--h")) || 50;
    bar.dataset.prev = initial;
  });
  function nudgeBars() {
    bars.forEach(bar => {
      const prev = parseFloat(bar.dataset.prev) || 50;
      const h = 30 + Math.random() * 65;
      bar.style.setProperty("--h", h.toFixed(0) + "%");
      bar.classList.toggle("is-up", h >= prev);
      bar.classList.toggle("is-down", h < prev);
      bar.dataset.prev = h;
    });
  }
  setInterval(nudgeBars, 2400);

  // Ticking KPI values
  const kpiRanges = {
    "0": [20, 29],
    "1": [88, 96],
    "2": [95, 99]
  };
  const kpiEls = dashPanel.querySelectorAll(".kpi-value");
  kpiEls.forEach((el, i) => {
    const range = kpiRanges[i] || [10, 90];
    setInterval(() => {
      const prev = parseFloat(el.dataset.count) || range[0];
      const val = Math.round(range[0] + Math.random() * (range[1] - range[0]));
      el.classList.toggle("is-up", val >= prev);
      el.classList.toggle("is-down", val < prev);
      el.dataset.count = val;
      animateCount(el);
    }, 3200 + i * 400);
  });
}
const timeline = document.getElementById("timeline");
const tlFill = document.getElementById("tlFill");

if (timeline && tlFill) {
  window.addEventListener("scroll", () => {
    const rect = timeline.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(viewportH * 0.6 - rect.top, 0), total);
    const pct = total > 0 ? (visible / total) * 100 : 0;
    tlFill.style.height = pct + "%";
  }, { passive: true });
}

// ---------------------------------------------
// Animated background: ambient trend lines + data-flow particle network
// ---------------------------------------------
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width, height;
let t = 0;
const COLORS = ["78,205,196", "244,163,64"];

const trendLines = [
  { baseFrac: 0.22, amp1: 26, amp2: 10, f1: 0.006, f2: 0.017, speed1: 0.35, speed2: 0.6, color: "78,205,196", phase: 0 },
  { baseFrac: 0.52, amp1: 34, amp2: 14, f1: 0.004, f2: 0.012, speed1: 0.28, speed2: 0.5, color: "244,163,64", phase: 2 },
  { baseFrac: 0.8, amp1: 20, amp2: 9, f1: 0.008, f2: 0.02, speed1: 0.4, speed2: 0.7, color: "78,205,196", phase: 4 }
];

function drawTrendLines() {
  trendLines.forEach(line => {
    const baseY = height * line.baseFrac;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 8) {
      const y = baseY
        + Math.sin(x * line.f1 + t * line.speed1 + line.phase) * line.amp1
        + Math.sin(x * line.f2 + t * line.speed2 + line.phase) * line.amp2;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${line.color},0.14)`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  });
}

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
  t += 1;

  drawTrendLines();

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
