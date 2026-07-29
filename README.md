# Kiran Patil — Portfolio Site

A single-page portfolio built with plain HTML, CSS, and JavaScript. No build
step, no framework, so it deploys on Vercel as-is.

## What's inside

- `index.html` — page content and structure
- `style.css` — design system, layout, and animations
- `script.js` — background animation, scroll reveals, count-up stats, nav behavior
- `assets/Kiran_Patil_CV.pdf` — your résumé, linked from the "Résumé" button

## Before you deploy

Two small things need your input:

1. **LinkedIn link.** In `index.html`, search for the comment
   `<!-- Add your LinkedIn profile URL to the href below -->` and replace the
   `href="#"` on the line below it with your actual LinkedIn URL.
2. **Address.** The full home address from your CV was intentionally left off
   the public site for privacy. Only city and country are shown. If you'd
   rather show something else, edit the two `"The Hague, Netherlands"` lines
   in `index.html`.

Optional: swap `assets/Kiran_Patil_CV.pdf` for an updated version any time,
keeping the same file name, or update the file name in `index.html` if you
rename it.

## Deploying on Vercel via GitHub

1. Create a new GitHub repository and push these files to it:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project**, then select the repository.
4. Vercel will detect it as a static site automatically. No build command or
   output directory is needed. Click **Deploy**.
5. Once deployed, you'll get a live URL (something like
   `your-repo.vercel.app`). You can attach a custom domain later from the
   project's **Settings → Domains** tab.

Any future push to the `main` branch redeploys the site automatically.

## Notes on the design

- Fonts: Chillax for headings, Inter for body text, JetBrains Mono for
  numbers and labels — loaded from Fontshare and Google Fonts.
- Icons: [Lucide](https://lucide.dev), loaded from a CDN.
- The moving background is a lightweight canvas particle network meant to
  echo data flowing between points. It pauses automatically if the visitor's
  system has "reduce motion" turned on.
- The floating dashboard mock in the hero section is built from CSS and SVG,
  not a screenshot, so it stays crisp at any size.
