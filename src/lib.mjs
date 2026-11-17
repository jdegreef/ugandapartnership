// Small helpers shared by the templates.

export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Inline formatting: **bold** and *italic*. Input is escaped first.
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

// Minimal markdown: paragraphs, "## " headings, "- " lists, "> " pull quotes.
export function md(src) {
  const blocks = src.trim().split(/\n\s*\n/);
  return blocks
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim());
      if (lines[0].startsWith('## ')) {
        const [h, ...rest] = lines;
        return `<h2>${inline(h.slice(3))}</h2>` + (rest.length ? `<p>${inline(rest.join(' '))}</p>` : '');
      }
      if (lines.every((l) => l.startsWith('- '))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`;
      }
      if (lines[0].startsWith('> ')) {
        return `<blockquote class="pull"><p>${inline(lines.map((l) => l.replace(/^> ?/, '')).join(' '))}</p></blockquote>`;
      }
      return `<p>${inline(lines.join(' '))}</p>`;
    })
    .join('\n');
}

// Inline SVG icons (stroke-based, inherit currentColor).
const paths = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
  cross: '<path d="M12 3v18M6 9h12"/>',
  pray: '<path d="M12 3c-1 3-4 6-4 10a4 4 0 0 0 8 0c0-4-3-7-4-10z"/>',
  plane: '<path d="M2 16l20-8-6 12-3-5-5-2z"/>',
  hands: '<path d="M7 11V6a2 2 0 0 1 4 0v5M11 10V4a2 2 0 0 1 4 0v6M15 9V6a2 2 0 0 1 4 0v7a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L3 13a2 2 0 0 1 3.4-2L7 12"/>',
  medical: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
  school: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  chevronL: '<path d="M15 6l-6 6 6 6"/>',
  chevronR: '<path d="M9 6l6 6-6 6"/>',
  quote: '<path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6"/>',
};
export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;

export const img = (src, alt, { cls = '', eager = false, sizes = '' } = {}) =>
  `<img src="${src}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${sizes ? ` sizes="${sizes}"` : ''}>`;
