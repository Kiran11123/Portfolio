# Alex Morgan — Portfolio (Bold B&amp;W Creative Edition)

A high-energy, graphic black-and-white portfolio — Swiss-poster / neo-brutalist creative-studio feel, expressed entirely in black and white (per your request: colorful/vibrant energy, but strictly a black-and-white palette). Same Chillax + Inter fonts as before, everything else rebuilt.

## What changed and why

| Area | What I did | Why |
|---|---|---|
| **Base theme** | Flipped from dark to a bright white background with pure black ink — no grays-as-color, no dark mode | You asked for "everything else" changed; the previous two versions were both dark. This is the clearest possible visual break. |
| **"Vibrant" without color** | Hard-edged drop shadows (flat, no blur, offset 5–11px), thick 2px borders everywhere, a scrolling black marquee banner, rotated circular "sticker" badge, halftone dot background | Energy comes from graphic boldness and motion, not hue — this is how Swiss-poster and neo-brutalist studios (Gumroad's old site, Cosmos, many Awwwards black/white sites) read as "vibrant" while staying monochrome |
| **Marquee ticker** | Full-width black stripe under the nav with bold scrolling text (BUSINESS ANALYST ★ DATA & AI ★ …) | Instant, high-energy signal of who you are, styled like a streetwear/creative-studio site rather than a corporate one |
| **Numbered section tags** | Each section now opens with a pill-bordered number (01, 02, 03…) next to the label | Common device in editorial/print design for rhythm and wayfinding — replaces the plainer "eyebrow" text-only labels |
| **Hard shadow cards** | Every card (projects, skills, timeline, contact, facts) uses a flat black drop-shadow that grows and shifts on hover instead of a soft blur | This is the signature "vibrant graphic" interaction — cards feel like they're physically lifting off a printed page |
| **Hero** | Bold black avatar block with a rotated "Open to work" sticker, a ring and triangle as loose graphic shapes, headline with a highlighter-style mark behind one word | Playful, confident, and immediately different from both previous hero treatments |
| **Buttons** | Solid black or white with a hard shadow that grows on hover and the button nudges toward the shadow | Same physical, poster-ish feel as the cards |
| **Skill badges** | Alternate solid-black / outlined pills | Small graphic rhythm device, avoids a flat list |
| **Typography** | Kept exactly as requested — Chillax headings, Inter body | No change per your instruction |
| **Motion** | Marquee scroll (pure CSS), staggered scroll-reveals, hover lifts — all respect `prefers-reduced-motion` | Keeps the energetic feel without being exhausting or inaccessible |

Dropped from the previous version: the 3D cube, glass/blur effects, cursor glow, and magnetic buttons — none of those fit a flat graphic black-and-white system, so removing them was part of "everything else" changing.

## Customize your content

Same as before: open `index.html`, edit each section by its HTML comment. Colors, borders, and shadow depth are controlled by the CSS variables at the top of `style.css` (`--border-w`, `--shadow-offset`, `--radius`).

## Add your resume / real photo / working contact form

Same steps as prior versions — see the inline handlers near `#resumeBtn`, `#resumeCard`, and `#contactForm` in the HTML/JS. For a real photo, replace `.avatar-block`'s initials span with an `<img>` and set `object-fit: cover`.

## Deploy to Vercel for free

1. Push `index.html`, `style.css`, `script.js` to a GitHub repo.
2. vercel.com → "Add New Project" → import the repo → Deploy. Static site, zero config.

## Files
- `index.html` — structure and content
- `style.css` — bold black/white design system: hard shadows, thick borders, marquee, halftone background
- `script.js` — nav, scroll reveal, stat counters, form handling
