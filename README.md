# Alex Morgan — Business Analyst Portfolio (Premium Edition)

A premium, minimal black/white/yellow portfolio with full dark/light theming. Pure HTML/CSS/JS — no build step, no dependencies, deploys to Vercel for free.

## What changed in this redesign

| Area | What I did | Why |
|---|---|---|
| **Color system** | Rebuilt entirely on CSS variables: `#0B0B0B` bg / `#181818` secondary / `#1F1F1F` surface / `#FFD54A` accent, with a parallel light-mode variable set | Matches the enterprise-grade black/white/yellow brief exactly, and swapping a theme is now a single attribute change (`data-theme`) instead of touching every rule |
| **Theming** | `localStorage`-backed dark/light toggle, theme applied in a tiny inline `<script>` in `<head>` before first paint | Prevents the "flash of wrong theme" you'd get if theme were set after the CSS loads; persists the user's choice across visits |
| **Navigation** | Sticky nav, transparent at top, blurs and gains a background once you scroll (`.nav.scrolled`), yellow underline that animates to the active section via `IntersectionObserver` | Recruiters skim — a nav that always shows where you are and never gets in the way of the hero reads as more polished |
| **Hero** | Bold two-line headline, stat counters that animate in, an avatar/monogram card (no real photo needed yet) with softly floating geometric shapes behind it, and a bouncing scroll indicator | Gives a strong first impression without requiring a real headshot; floating shapes + counters signal "modern tech company" per the brief's Vercel/Linear/Stripe references |
| **Background** | Fixed low-opacity grid layer + radial yellow glow behind the hero, both `pointer-events:none` so they never interfere with interaction | Adds depth without becoming a distraction; scales for free since it's CSS, not an image |
| **Cards everywhere** | Experience timeline, project cards, skill cards, education cards, certification cards, contact cards — all share the same surface/border/radius/hover-lift pattern | Consistency is what makes a site feel "designed" rather than assembled; one visual language throughout |
| **Project cards** | Added a thumbnail (grid pattern placeholder — swap for real screenshots), a short achievements list, tech tags, and a hover-lift + yellow border + arrow-shift on the link | Recruiters scan projects fastest when outcome and tools are visually separated from the description |
| **New sections** | Added **Education** and **Certifications** (the brief listed them, the previous version didn't have them) | You asked to keep all existing content — these are additive, nothing else was removed |
| **Buttons** | Primary = yellow fill / black text with hover lift + soft glow shadow; secondary = outlined, turns yellow on hover | Matches the exact button spec and gives clear visual hierarchy between primary and secondary actions |
| **Icons** | Inline monochrome SVGs (no external icon library dependency to avoid a broken CDN at runtime) that shift color on hover/parent-hover | Keeps the site fast and offline-safe, still hits the "icons turn yellow on hover" requirement |
| **Motion** | Scroll-reveal via `IntersectionObserver`, counters, hover lifts, floating shapes — all wrapped in a global `prefers-reduced-motion` override that disables/shortens animations | WCAG 2.2 requires respecting reduced-motion preference; this also keeps the site feeling calm rather than busy |
| **Accessibility** | Skip-to-content link, semantic `<header>/<nav>/<main>/<section>/<footer>`, visible focus rings in the accent color, `aria-pressed`/`aria-expanded`/`aria-label` on the theme and menu toggles, alt-free decorative elements marked `aria-hidden` | Meets WCAG AA basics: keyboard operability, screen-reader labeling, and contrast (all text/background pairs in both themes meet 4.5:1+) |
| **Responsiveness** | Full breakpoint set down to small mobile: nav collapses to a slide-down menu, grids drop from 4→2→1 columns, hero visual reorders above the text on small screens | Recruiters increasingly review portfolios on mobile; nothing should break or require horizontal scrolling |

## 1. Customize your content

Everything lives in `index.html`, organized by section comment (`<!-- HERO -->`, `<!-- PROJECTS -->`, etc.). Replace:
- Name, tagline, hero stats
- About bio and facts
- Experience timeline entries
- Project cards (swap the placeholder thumbnail pattern for a real screenshot by replacing the `.project-thumb` div with an `<img>`)
- Skills badges
- Education and certification entries
- Contact links and email

Colors and spacing live in `style.css` under the `:root` / `[data-theme="dark"]` and `[data-theme="light"]` blocks at the top — change a value there and it updates everywhere.

## 2. Add your real photo (optional)

Currently the hero uses a monogram avatar card. To use a real photo, replace the `.avatar-ring` span with an `<img src="your-photo.jpg" alt="Alex Morgan">` and adjust `.avatar-ring` in CSS to `overflow:hidden` with `object-fit: cover`.

## 3. Add your resume (optional)

Drop `resume.pdf` into this folder, then update both resume links (`#resumeBtn` in the hero and `#resumeCard` in Contact) to `href="resume.pdf" download` and remove their click handlers in `script.js`.

## 4. Make the contact form send real email (optional, free)

- **Formspree** (easiest): sign up at formspree.io, set the form's `action` to your endpoint, remove the `preventDefault` handler in `script.js`.
- **EmailJS**: similar, sends directly from the browser via their JS SDK.

## 5. Deploy to Vercel for free

**Easiest — GitHub + Vercel import:**
1. Create a free GitHub repo and push these files (`index.html`, `style.css`, `script.js`).
2. Go to vercel.com → "Add New Project" → import that repo → Deploy. No build settings needed, it's static.

**Vercel CLI:**
```bash
npm install -g vercel
cd ba-portfolio
vercel        # preview deploy
vercel --prod # publish live
```

Either way you get a free `yourproject.vercel.app` URL, with a custom domain attachable later for free (the domain purchase itself isn't free, just connecting it).

## Files
- `index.html` — page structure and content
- `style.css` — full design system: color tokens, dark/light theme, typography, layout, animations
- `script.js` — theme toggle + persistence, scroll effects, reveal animations, counters, form handling
