import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { withBasePathHtml } from './site-paths';

function extractHtml(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);

  if (start === -1 || end === -1) return '';

  return source.slice(start, end + endMarker.length);
}

export function getSiteChrome() {
  const home = readFileSync(join(process.cwd(), 'content/home.html'), 'utf8');
  const header = withBasePathHtml(extractHtml(home, '<div class="cursor"', '<!-- HERO -->'))
    .replace('<!-- HERO -->', '')
    .replace('<nav id="navbar">', '<nav id="navbar" class="scrolled legal-site-nav">');
  const footer = withBasePathHtml(extractHtml(home, '<footer>', '</footer>'));

  return { header, footer };
}
