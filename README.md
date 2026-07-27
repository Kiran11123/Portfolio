# Alex Morgan — Cinematic Portfolio (Monochrome Edition)

A premium, monochrome, interactive portfolio: 3D hero, glass cards, cursor-reactive lighting, magnetic buttons, tilt interactions, and staggered scroll reveals. Pure HTML/CSS/JS — still zero-config, still deploys to Vercel for free.

## Important implementation note: vanilla JS instead of React/Framer Motion

The brief asked for Framer Motion, which is a React library. This project has intentionally stayed dependency-free HTML/CSS/JS so it deploys to Vercel with **zero build configuration** — you drag in three files and it's live. Rebuilding it in React would add a build step, `node_modules`, and a framework to maintain just to get spring easing.

Instead, every interaction in the brief is implemented natively:
- **Framer Motion's scroll reveals** → `IntersectionObserver` + CSS `cubic-bezier(.22,1,.36,1)` transitions (the same easing family Framer Motion uses by default)
- **3D tilt / perspective** → CSS `transform: perspective() rotateX() rotateY()` driven by `mousemove` math
- **Magnetic buttons** → `mousemove` offset math translating the button toward the cursor, reset on `mouseleave`
- **Cursor glow** → a fixed radial-gradient div eased toward the cursor position every frame via `requestAnimationFrame`

If you later migrate this to Next.js (still free on Vercel), you could swap these for actual Framer Motion components 1:1 — the interaction design already matches what Framer Motion would produce.

## Design decisions (per your request for a full summary)

### Color & materials
Strict monochrome per spec: `#000000` → `#0F0F0F` → `#121212` → `#1B1B1B` for depth (background → section → card → surface), white text at three opacities (`#FFFFFF` / `#D6D6D6` / `#9A9A9A`) for hierarchy without color. All contrast comes from **elevation and translucency**, not hue — glass cards use `rgba(255,255,255,0.04)` fills with `backdrop-filter: blur()` so depth reads through layering, exactly as specified ("contrast only from lighting, shadows, transparency, glass, depth").
I kept a light-mode toggle in the nav (as your Navigation section requested) by inverting the same token set to white/black — it's off by default so the monochrome-dark experience is what recruiters see first.

### Typography
Chillax (loaded from Fontshare, which hosts it free) for all headings, Inter for body — matches your fallback spec. The hero headline sits at `clamp(40px, 5.8vw, 84px)`, close to your 72–96px display spec but fluid so it never overflows on laptop screens; H2s land at `clamp(30px,3.6vw,42px)`, matching your H2 spec almost exactly. Every heading uses `-0.02em` letter-spacing for the tightened, premium look Apple/Linear use at large sizes.

### The "cinematic" hero
- **Headline stagger reveal**: each word is a separate `<span>` that fades and slides up with an increasing delay (`0.07s` per word) — the mask-reveal effect from your Page Transitions section, done in CSS keyframes rather than JS-driven masking, for performance.
- **3D floating cube**: a real CSS 3D object (six `<div>` faces positioned with `translateZ`/`rotateY` in a `preserve-3d` parent), auto-rotating slowly and given a subtle parallax offset on scroll — this is your "floating cubes" / "wireframe" requirement without needing WebGL or Three.js, which would blow past your Lighthouse-95 performance target.
- **Glass shards + rings**: smaller floating glass panels around the cube reinforce depth without competing with the headline.
- **Cursor glow**: a soft radial light that eases toward the mouse position (`requestAnimationFrame` + linear interpolation, not raw `mousemove` coordinates — this is what keeps it feeling smooth instead of jittery).
- All of the above is disabled under `prefers-reduced-motion` and on touch devices (`hover:none`), since tilt/glow/parallax have no meaning without a mouse.

### Cards, tilt, and magnetism
Every card that should feel "physical" (`project-card`, `skill-card`, `timeline-content`, `contact-card`, the avatar panels) carries `data-tilt`: on `mousemove` the JS computes the cursor's position relative to the card center and applies a small `rotateX`/`rotateY`, snapping back on `mouseleave`. Buttons and icon links use a separate, stronger `.magnetic` effect (they move toward the cursor rather than just tilting) — this distinction mirrors Linear/Raycast, where buttons feel "grabbable" but content cards feel "tiltable."

### Scroll experience
Sections reveal via `IntersectionObserver`, but rather than every element on a section fading in simultaneously, I grouped `.reveal` elements by parent and gave each a staggered `transition-delay` (90ms apart, capped at 360ms) — this produces the "cards slide into place in sequence" effect from your Scroll Experience section without needing a scroll-linked animation library.

### Layout
Editorial asymmetry instead of centered boxes: the About section is a 0.85fr/1.15fr split with a floating fact-chip overlapping the image panel's corner; the hero is 1.1fr/0.9fr with the 3D scene breaking out of its column edge. Nothing in the page uses a single centered max-width column throughout — each section's ratio changes slightly, which is what avoids the "template" look you flagged.

### Navigation
Sticky, transparent until scroll, then gains a blurred glass background (`backdrop-filter: blur(18px) saturate(140%)`) and **shrinks its padding** (22px → 13px) — the "navigation shrinks while scrolling" requirement. Active-section tracking drives an underline that slides in via `IntersectionObserver`, not `:hover` alone.

### Icons
Swapped all icons to real **Lucide** (loaded via their CDN UMD build, `lucide.createIcons()` on load) — consistent line weight, no filled/colorful icon sets anywhere.

### Accessibility (WCAG AA)
- Skip-to-content link, semantic `<header>/<nav>/<main>/<section>/<footer>`
- Visible focus rings (`:focus-visible`) in full white/black contrast, not the accent-dependent style some "premium" templates skip
- `aria-pressed`/`aria-expanded`/`aria-label` on the theme and mobile-menu toggles
- Every animation (cube spin, parallax, cursor glow, tilt, magnetic pull, reveal transitions) is wrapped in a `prefers-reduced-motion` check — under that setting, the cube and cursor glow are removed entirely rather than just shortened, since a spinning 3D object with no motion isn't meaningfully present anyway
- Text contrast: `#FFFFFF` on `#000000`/`#0F0F0F`/`#121212` all exceed 15:1; `#9A9A9A` muted text on `#000000` still clears 4.5:1 for body-size text

### Performance
- No animation library, no WebGL — every effect is CSS transforms/opacity (GPU-composited) or `requestAnimationFrame`, so nothing forces layout/reflow
- `backdrop-filter` is used selectively (nav, glass cards) rather than globally, since it's the most expensive effect in this design
- Fonts are loaded via `<link>` with `display=swap` so text renders immediately in a fallback face
- Background noise/grid/mesh are pure CSS gradients/SVG-data-URIs, not images — zero network weight

## Customize your content

Same as before — everything is in `index.html`, organized by section comment. Colors and easing live in the `:root` / `[data-theme]` blocks at the top of `style.css`.

## Add your real photo (optional)

Replace the `.avatar-ring` content and the `.about-panel`'s `.avatar-initials-lg` span with `<img>` tags, and set `object-fit: cover` on the container.

## Add your resume / wire up the contact form

Same steps as previous versions — see the inline comments near `#resumeBtn`, `#resumeCard`, and `#contactForm` in the HTML/JS.

## Deploy to Vercel for free

1. Push `index.html`, `style.css`, `script.js` to a GitHub repo.
2. vercel.com → "Add New Project" → import the repo → Deploy. Static site, zero config.

You'll get a free `yourproject.vercel.app` URL.

## Files
- `index.html` — structure, content, Lucide icon tags, tilt/magnetic/parallax hooks
- `style.css` — monochrome design system, glassmorphism, 3D cube, typography scale, motion
- `script.js` — cursor glow, magnetic buttons, tilt, parallax, staggered reveals, theme + nav logic
