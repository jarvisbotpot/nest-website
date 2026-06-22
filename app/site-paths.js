export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nest-pavia.it';

export function withBasePath(path) {
  if (!basePath || !path.startsWith('/')) return path;
  return `${basePath}${path}`;
}

export function withBasePathHtml(html) {
  if (!basePath) return html;
  return html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
}

export function absoluteUrl(path = '/') {
  return new URL(withBasePath(path), siteUrl).toString();
}
