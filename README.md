# Alex Morgan — Business Analyst Portfolio

A dark, terminal/dashboard-themed portfolio site. Pure HTML/CSS/JS — no build step, no dependencies, deploys to Vercel for free in minutes.

## 1. Customize your content

Open `index.html` and replace the placeholders:
- Name, tagline, and hero copy (top of file)
- `about` section bio and facts
- `skills` section categories
- `experience` timeline entries (company names, dates, bullets)
- `projects` case studies
- `contact` email, LinkedIn, GitHub links

Colors, fonts, and spacing live in `style.css` under `:root` at the top if you want to adjust the palette.

## 2. Add your resume (optional)

Drop a `resume.pdf` file into this folder, then in `index.html` change:
```html
<a href="#" class="btn btn-ghost" id="resumeBtn">Download resume ↓</a>
```
to:
```html
<a href="resume.pdf" class="btn btn-ghost" download>Download resume ↓</a>
```
and remove the placeholder click handler for `#resumeBtn` in `script.js`.

## 3. Make the contact form actually send email (optional)

Right now the form just shows a confirmation message locally. To make it work for free:
- **Formspree** (easiest): sign up at formspree.io, get a form endpoint, set the form's `action` to that URL and remove the JS `preventDefault` handler.
- **EmailJS**: similar, sends straight from the browser via their JS SDK.

## 4. Deploy to Vercel for free

**Option A — no coding tools needed (drag & drop):**
1. Go to https://vercel.com and sign up (free).
2. Click "Add New" → "Project" → "Deploy" and choose to upload this folder, OR
3. Actually, the simplest path: create a free GitHub repo, push these 4 files to it, then in Vercel click "Add New Project" → "Import" your GitHub repo → Deploy. No settings needed since it's a static site.

**Option B — Vercel CLI:**
```bash
npm install -g vercel
cd ba-portfolio
vercel
```
Follow the prompts (log in, confirm project settings — defaults are fine for a static site), then run `vercel --prod` to publish it live.

Either way you'll get a free `your-project.vercel.app` URL. You can later attach a custom domain for free in the Vercel dashboard (domain purchase itself isn't free, but connecting one is).

## Files
- `index.html` — page structure and content
- `style.css` — design system (colors, type, layout, animations)
- `script.js` — terminal typing effect, animated stats, nav, scroll reveals, form handling
