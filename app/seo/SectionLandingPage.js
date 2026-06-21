import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function buildSectionMetadata(section) {
  return {
    title: section.title,
    description: section.description,
    alternates: {
      canonical: section.path,
    },
    openGraph: {
      title: `${section.title} - NEST Pavia`,
      description: section.description,
      url: section.path,
      images: ['/assets/images/hero-gym.jpg'],
    },
  };
}

export function SectionLandingPage({ section, targetId }) {
  const html = readFileSync(join(process.cwd(), 'content/home.html'), 'utf8');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${section.title} - NEST Pavia`,
    description: section.description,
    url: `https://nest-pavia.it${section.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'NEST Pavia',
      url: 'https://nest-pavia.it',
    },
  };

  const scrollScript = `
    window.__NEST_TARGET_SECTION__ = ${JSON.stringify(targetId)};
    requestAnimationFrame(function(){
      var target = document.getElementById(window.__NEST_TARGET_SECTION__);
      if(target) target.scrollIntoView({block:'start'});
    });
  `;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <script dangerouslySetInnerHTML={{ __html: scrollScript }} />
    </>
  );
}
