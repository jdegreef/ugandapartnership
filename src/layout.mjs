import { site, nav } from './site.mjs';
import { esc, icon } from './lib.mjs';

const year = new Date().getFullYear();

function header(path) {
  const links = nav
    .map((n) => {
      const current = path.startsWith(n.href) ? ' aria-current="page"' : '';
      return `<li><a href="${n.href}"${current}>${n.label}</a></li>`;
    })
    .join('');
  const give = site.donateUrl
    ? `<a class="btn btn-primary btn-sm" href="${esc(site.donateUrl)}" rel="noopener">${icon('heart')} Give</a>`
    : `<a class="btn btn-primary btn-sm" href="/contact/">Contact us</a>`;
  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="${esc(site.name)} — home">
      <img src="/assets/images/logo.webp" alt="" width="52" height="44">
      <span class="brand-text"><span class="brand-small">The</span> Uganda Partnership <span class="brand-small">Society</span></span>
    </a>
    <nav class="primary-nav" aria-label="Main">
      <ul id="nav-list" data-nav>${links}<li class="nav-cta-mobile"><a href="/contact/">Contact us</a></li></ul>
    </nav>
    <div class="header-actions">
      ${give}
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-list" data-nav-toggle>
        <span class="sr-only">Menu</span>${icon('menu', 'icon icon-open')}${icon('close', 'icon icon-close')}
      </button>
    </div>
  </div>
</header>`;
}

function footer() {
  const links = [...nav, { href: '/contact/', label: 'Contact' }]
    .map((n) => `<li><a href="${n.href}">${n.label}</a></li>`)
    .join('');
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="brand brand-footer" href="/">
        <img src="/assets/images/logo.webp" alt="" width="52" height="44" loading="lazy">
        <span class="brand-text">The Uganda Partnership Society</span>
      </a>
      <p>Connecting Canadian churches and donors with trusted Ugandan ministry partners since ${site.foundedYear}.</p>
      <p class="muted">${icon('pin')} ${esc(site.location)}</p>
    </div>
    <div>
      <h2 class="footer-heading">Explore</h2>
      <ul class="footer-links">${links}</ul>
    </div>
    <div>
      <h2 class="footer-heading">Stay connected</h2>
      <p>Want prayer updates or to hear about the next mission trip?</p>
      <a class="btn btn-outline-light btn-sm" href="/contact/">Get in touch ${icon('arrow')}</a>
      ${site.email ? `<p class="muted">${icon('mail')} <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>` : ''}
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${year} The Uganda Partnership Society.${site.charityNumber ? ` Registered charity ${esc(site.charityNumber)}.` : ''}</p>
    <p class="verse">“Serve one another humbly in love.” — Galatians 5:13</p>
  </div>
</footer>`;
}

export function layout({ path, title, description, body, image = '/assets/images/heroes/home.webp', bodyClass = '' }) {
  const fullTitle = path === '/' ? `${site.name} — ${site.tagline}` : `${title} | ${site.name}`;
  const desc = description || site.description;
  const url = site.url + path;
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title || site.name)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1f1a17">
<link rel="icon" href="/assets/images/logo.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/styles.css">
<script defer src="/assets/js/main.js"></script>
${path === '/' ? `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: site.url + '/assets/images/logo.webp',
    description: site.description,
    foundingDate: String(site.foundedYear),
    areaServed: 'Uganda',
  })}</script>` : ''}
</head>
<body class="${bodyClass}">
${header(path)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}
