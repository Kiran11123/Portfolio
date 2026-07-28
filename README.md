# Kiran Patil — Portfolio

Content, structure, and tone corrected to match your CV exactly. No invented claims, no em-dashes, professional copy throughout, plus an animated background and company/skill icons.

## What changed in this pass

### Structure now mirrors the CV directly
Nav and section order: **Career Summary, Work Experience, Education, Certifications, Skills, Contact**, the same order and the same headings as your CV. Education and Certifications are two separate sections again (they're two separate headers in your CV), not merged into one carousel.

The Projects section from the previous version has been removed. Its content duplicated what's already in Work Experience, and building it out as separate "case studies" meant adding framing that wasn't in your CV. Everything now lives in one place: the Work Experience accordion, using your actual bullet points.

### Copy: rewritten for tone and accuracy
- The Career Summary section now uses your CV's summary paragraph directly, since it's already clear and professional in your own words
- Removed hook-style marketing sentences (for example, the old headline "I turn manual reporting into automated decisions") in favor of a plain name-and-title hero, which reads like a professional profile rather than a landing-page pitch
- Removed all em-dashes site-wide, including in date ranges (now "Dec 2025 - Jun 2026" to match your CV's own formatting)
- Removed unverifiable claims: the "Open to work" badge and "I'll usually reply within a day" line are gone. The hero's draggable sticker now shows your actual location (Den Haag, Netherlands) instead
- Removed emoji flourishes (trophy and flag emoji) in favor of plain text and a location-pin icon, which reads more consistently with the rest of the site
- Contact section now states availability for the three role types mentioned in your CV's summary, without adding assumptions about geography or timelines

### Animated background
Two new layers, both very subtle and fully monochrome:
- A dot grid that drifts slowly in the background
- Three large, softly blurred shapes that shift position over 26 to 38 second cycles

Both respect `prefers-reduced-motion` and never interfere with reading the content.

### Logos and icons
- Each Work Experience entry now has a small monogram tile (D, G, T, T) representing the employer, similar to how company initials appear on LinkedIn when a real logo isn't available
- Education entries use a graduation cap icon, certifications use a badge icon, and each skill category keeps its icon from before
- I did not use real company logos or stock photography. Official logos are trademarked, and using them without permission carries risk even on a personal site; stock photos would mean using an image that isn't actually you. The monogram tiles and icons are original and safe to keep as-is, or you can replace them with real company logos later if you get permission or find official brand assets you're licensed to use

## Update further

- **LinkedIn**: the contact card currently says "View Profile" with a placeholder link. Add your real LinkedIn URL in `index.html`
- **Real photo**: swap the "KP" initials in `.avatar-front` for an `<img>` tag when you have a headshot
- **Resume PDF**: drop `resume.pdf` into the folder, then update the two `href="#"` resume links and remove their placeholder click handlers in `script.js`

## Deploy to Vercel for free

1. Push `index.html`, `style.css`, `script.js` to a GitHub repo.
2. vercel.com → "Add New Project" → import the repo → Deploy. Static site, zero config.

## Files
- `index.html` — CV-matching structure and content, company/education/certification icons
- `style.css` — animated background (drifting dots and blurred shapes), light/dark theme, all component styles
- `script.js` — theme toggle, loader, cursor, accordion, flip cards, tilt/magnetic, back-to-top, contact form
