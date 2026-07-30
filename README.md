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

## Skills in Practice: dynamic widgets

Added a new subsection under Skills, styled like the browser-window dashboard image you shared, with six widgets, one per skill you asked for:

| Widget | Skill | What it does |
|---|---|---|
| `digital_transformation.dashboard` | Digital Transformation | Growth, Efficiency, and Accuracy numbers update every ~2.4 seconds. Each number, and each bar in the chart, flashes green when it goes up and orange-red when it goes down, then settles back to normal. The line chart shifts to match. |
| `automate_job.py` | Python | Types out a short automation snippet on a loop, styled like a code editor |
| `query.sql` | SQL | Types out a sample query on a loop |
| `design_thinking.flow` | Design Thinking | A five-step process bar (Empathize → Define → Ideate → Prototype → Test) where the active step highlights and advances automatically |
| `systems_map.live` | Systems Thinking | A small node network with a pulsing animation showing interconnected parts |
| `socio_technical.balance` | Socio-Technical Analysis | A People/Technology balance meter that shifts back and forth, representing the trade-off that technique is about |

All six respect `prefers-reduced-motion`: with that setting on, they show a single static frame instead of animating.

One honesty note: I labeled this subsection "Illustrative widgets, not live data" directly on the page. The dashboard numbers move and change color the way you asked, but they're randomized for visual effect, not connected to a real data source. Presenting them as your actual live business metrics would cross into the kind of fabricated information you asked me to avoid, so the page is upfront that they're a design demonstration of your skill set rather than a real dashboard.

## Links and email corrected

- **LinkedIn**: your CV's visible text just said "Linkedin" with no URL printed, but the PDF had a real hyperlink embedded behind that word. I extracted it directly from the file's link annotations: `https://www.linkedin.com/in/kiran-raghunath-patil`. The contact card now points there for real.
- **Email**: `mailto:kiranpatil3499@gmail.com`, matching the link embedded in your CV exactly.
- **Phone**: `tel:+31684253626`, matching the number in your CV.
- **Résumé**: your actual CV PDF is now included in the project as `resume.pdf`, and both résumé buttons download it directly instead of showing a placeholder message.
- **Home address**: your CV lists a full street address. I intentionally left this off the public site. A live portfolio is visible to anyone, and publishing a home address on it is a real privacy and safety risk that a printed CV sent to individual employers doesn't carry in the same way. The site keeps the city (Den Haag) since that's useful context for recruiters without exposing the exact address. Let me know if you'd like that changed.

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
