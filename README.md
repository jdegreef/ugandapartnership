# The Uganda Partnership Society website

A fast, modern rebuild of [ugandapartnership.com](https://ugandapartnership.com). It replaces the WordPress/Divi site with a plain static site: HTML, CSS and a little JavaScript.

- **No dependencies.** You only need Node.js 18 or newer. There's no `npm install` step.
- **Content lives in plain data files.** You don't touch HTML to update the site.
- **Fast.** Each page is about 10–30 KB of HTML. Photos are optimized WebP.
- **Accessible and mobile-first.** Includes a skip link, keyboard-friendly lightbox and menu, alt text, and good colour contrast.
- **SEO.** Every page has its own title and description, Open Graph tags, a sitemap, and redirects from the old URLs.

## Run it locally

```bash
npm run dev      # builds into ./dist and serves http://localhost:8080
```

```bash
npm run build    # builds only
```

## Editing content

| What | File |
| --- | --- |
| Site name, contact form, donate link, charity number | `src/site.mjs` |
| Ministry partners (cards and detail pages) | `src/content/partners.mjs` |
| Stories of change (`/impact/<slug>/`) | `src/content/stories.mjs` |
| Board and Ugandan leadership | `src/content/team.mjs` |
| Gallery photos and filters | `src/content/gallery.mjs` |
| Page layouts and copy | `src/pages.mjs` |
| Styles / behaviour | `src/assets/css/styles.css`, `src/assets/js/main.js` |

To add a photo, put a `.webp` file (about 800–1600 px wide) in `src/assets/images/...` and reference it from the content file.

## Before going live

1. **Contact form.** In `src/site.mjs`, set `formEndpoint` to a form service such as [Formspree](https://formspree.io) (free tier). Or set `email`, and the form will open the visitor's email app instead.
2. **Giving.** Set `donateUrl` (for example a CanadaHelps page). A "Give" button then appears in the header and on the Get Involved page.
3. **Charity number.** Set `charityNumber` if applicable. It shows in the footer.
4. **Logo.** The old site only has a 100×84 px logo. Replace `src/assets/images/logo.webp` with a higher-resolution or SVG version.

## Deploying

The site builds to `./dist` and can be hosted on any static host.

- **Cloudflare Pages / Netlify:** set the build command to `npm run build` and the output directory to `dist`. `public/_redirects` sends old URLs (`/partnerships/`, `/media/`) to the new pages. Story URLs (`/impact/junior/` etc.) are unchanged.
- **GitHub Pages:** publish the `dist` folder with an Action. Redirects would then need to be handled separately.

## Site map

`/` · `/about/` · `/partners/` (+ 9 partner pages) · `/impact/` (+ 12 stories) · `/gallery/` · `/get-involved/` · `/contact/`
