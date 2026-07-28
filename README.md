# Alex Morgan — Portfolio (Interactive Edition)

Same bold black-and-white visual language, restructured to be genuinely interactive: real new components, not just new animations on old markup.

## What's structurally new

| Change | What it is | Why |
|---|---|---|
| **Intro loader** | Full-screen black splash with the name, sliding up to reveal the page on load | Gives the site a "moment" before it starts, like a lot of Awwwards sites — skipped instantly under reduced-motion |
| **Scroll progress bar** | Thin black bar across the top that fills as you scroll the page | Small but useful wayfinding + a nice bit of polish |
| **Custom cursor** | A small dot plus a lagging ring that expands over anything clickable/tiltable | Reinforces the graphic, designed feel; disabled automatically on touch devices |
| **Experience → accordion** | Was a static timeline; now each role is collapsed by default (first one open) and expands on click | Turns a wall of bullet points into something the recruiter *does* rather than just scrolls past |
| **Projects → filter + modal** | New filter bar (All / Process / Dashboard / Requirements / Pricing) that hides/shows cards, and "View case study" now opens a real modal dialog with the full write-up instead of a dead link | This is the biggest structural change — projects behave like an actual mini case-study browser |
| **Skills → flip cards** | Each card flips on click/tap/keyboard-Enter to reveal a short "how I actually use this" line on the back | Replaces a static badge list with something that rewards a click |
| **Education + Certifications → merged, draggable carousel** | These were two separate grid sections; now one "Education & Certifications" section with a horizontally scrollable, drag-to-scroll card carousel plus prev/next arrow buttons | Real structural consolidation (you asked to change the site's structure) and a genuinely different interaction pattern (drag-scroll) than everything else on the page |
| **Hero: flip avatar + draggable sticker** | The avatar block flips on click to reveal a second message; the "Open to work" badge can be dragged anywhere with the mouse or a finger | Small playful moments that don't affect the professional tone but add personality |
| **Back-to-top button** | Appears after ~500px of scroll, bottom-right | Standard on long single-page sites once they have this many sections |
| **Magnetic buttons + 3D tilt cards returned** | Buttons pull slightly toward the cursor; project/skill/contact cards tilt in 3D based on cursor position | Carried over from an earlier direction because it fits "more interactive," now layered on top of the bold B&W look instead of the glass look |

## Accessibility notes for the new interactions
- Flip cards and the accordion are keyboard-operable (`tabindex`, `Enter`/`Space`, `aria-expanded`)
- The modal traps focus visually within a bordered dialog, closes on `Escape`, backdrop click, or the close button, and sets `aria-modal="true"`
- Cursor, loader, and all mouse-tilt/parallax-style effects are removed entirely under `prefers-reduced-motion` and on touch devices — they're decorative, not load-bearing
- The drag carousel is still fully usable with the prev/next buttons alone if someone can't or doesn't want to drag

## Customize your content

Same as before: edit `index.html` by section. Project case-study text for the modal lives in `script.js` under `projectsData` — edit that object to change what appears when someone opens a case study (keep the summary text on the card itself in sync manually, since they're two separate copies by design — the modal is meant to say more than the card).

## Deploy to Vercel for free

1. Push `index.html`, `style.css`, `script.js` to a GitHub repo.
2. vercel.com → "Add New Project" → import the repo → Deploy. Static site, zero config.

## Files
- `index.html` — restructured content: accordion, filter bar + modal markup, flip cards, carousel
- `style.css` — loader, cursor, progress bar, accordion, modal, flip-card 3D, carousel, tilt/magnetic support
- `script.js` — all interaction logic: loader timing, cursor lerp, tilt/magnetic math, accordion, filters, modal, flip toggles, drag-scroll carousel, back-to-top
