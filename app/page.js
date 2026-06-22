import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { faqJsonLd, localBusinessJsonLd, siteNavigationJsonLd, websiteJsonLd } from './seo/structured-data';
import { withBasePathHtml } from './site-paths';

export default function HomePage() {
  const html = withBasePathHtml(readFileSync(join(process.cwd(), 'content/home.html'), 'utf8'));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
