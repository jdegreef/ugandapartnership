// Builds the static site into ./dist. No dependencies: `node build.mjs`.
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { allPages } from './src/pages.mjs';
import { layout } from './src/layout.mjs';
import { site } from './src/site.mjs';

const OUT = 'dist';

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp('src/assets', join(OUT, 'assets'), { recursive: true });
await cp('public', OUT, { recursive: true });

const pages = allPages();
for (const page of pages) {
  const file = page.file || join(page.path, 'index.html');
  const dest = join(OUT, file);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, layout(page));
}

const urls = pages.filter((p) => !p.file).map((p) => `  <url><loc>${site.url}${p.path}</loc></url>`);
await writeFile(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
);

console.log(`Built ${pages.length} pages into ./${OUT}`);
if (!site.formEndpoint && !site.email) {
  console.warn('Note: contact form has no destination yet — set formEndpoint or email in src/site.mjs.');
}
