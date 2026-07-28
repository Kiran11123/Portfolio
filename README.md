# Kiran Patil — Portfolio

Bold black-and-white interactive portfolio, now populated with your real CV content, a working dark/light mode toggle, and custom vector illustrations in place of stock photography.

## What changed in this pass

### Content — pulled directly from your CV
- **Hero, About**: rewritten around your actual career summary (3+ years, Power BI/DAX/Power Query, 90%/85% automation wins)
- **Experience accordion**: all 4 real roles — Danone, GoodHabitz, TCS, and the Tikdin product bootcamp — with your actual bullet points. TCS's "Star of the Month" and "Best Team Award" now show as small badges inside that entry.
- **Projects**: your four biggest measurable wins turned into case studies (Danone reporting automation, GoodHabitz Jira dashboard, TCS Python script, Tikdin product work), each filterable by category and with a modal for the fuller story
- **Skills**: your actual skill list, grouped into Data & Analytics / BI & Cloud Tools / Business & Process / Product & Mindset
- **Education & Certifications carousel**: Fontys Master's, your Bachelor's, Google Cloud cert, Microsoft Power Platform cert, and the Software Testing diploma
- **Contact**: your real email and phone number; LinkedIn uses a placeholder handle (`linkedin.com/in/kiranpatil`) since no URL was in the CV — update it to your actual profile link in `index.html`

### "Add relevant pictures" — what I actually did and why
I don't have a real photo of you, and pulling a random stock photo off the web would mean either misrepresenting you or using someone else's likeness/copyrighted image on your personal site — neither is right for a portfolio that's supposed to be *you*. So instead I built **original, on-brand vector graphics** tied to your actual work:
- A **mini "dashboard" illustration** in the hero — animated bar chart styled like a Power BI card, labeled with your Danone reporting win, since that's the single most visual, most relevant thing about your background
- **Custom icons on each project thumbnail** — a clock/cycle icon for the reporting automation, a bar-chart icon for the Jira dashboard, an automation/arrows icon for the Python script, a star/priority icon for the product work
- **Icons on each skill card** matching its category (chart line, BI stack, process blocks, brain/lightbulb)

These are all inline SVG, so there's zero image-hosting dependency and nothing to break. **When you have a real headshot**, replace the "KP" initials block in the hero (`.avatar-front` in `index.html`) with an `<img src="your-photo.jpg">` — I've left clear instructions in the file comments.

### Dark / light mode toggle
Added back to the nav (sun/moon icon button), defaults to light, remembers your choice in `localStorage`. This time every color in the stylesheet routes through the `--bg` / `--ink` / `--card` variables (no hardcoded `#fff` left anywhere), so buttons, the marquee, modal, carousel, and every card actually invert correctly — in the last version's underlying code this would have broken (white text on white buttons) in dark mode; that's fixed now.

## Update your content further

- **LinkedIn URL**: search `linkedin.com/in/kiranpatil` in `index.html` and swap in your real profile link (appears in the Contact section)
- **Real photo**: replace the `.avatar-front` initials span with an `<img>`, and do the same for `.avatar-back` if you want a photo there instead of text
- **Resume PDF**: drop `resume.pdf` into the folder and update the two `href="#"` resume links (`#resumeBtn`, `#resumeCard`) to `href="resume.pdf" download`, removing their placeholder click handlers in `script.js`
- **Project case-study text**: lives in `script.js` under `projectsData` if you want to expand any of the four write-ups

## Deploy to Vercel for free

1. Push `index.html`, `style.css`, `script.js` to a GitHub repo.
2. vercel.com → "Add New Project" → import the repo → Deploy. Static site, zero config.

## Files
- `index.html` — your real content, custom SVG illustrations, theme toggle button
- `style.css` — full light/dark theme (properly variable-driven this time), illustration + icon styles
- `script.js` — theme toggle + persistence, plus all prior interactions (accordion, filters, modal, flip cards, drag carousel, tilt/magnetic, cursor, loader)
