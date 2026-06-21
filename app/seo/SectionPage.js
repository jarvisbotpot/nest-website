import { siteUrl } from './sections';

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

export function SectionPage({ section }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${section.title} - NEST Pavia`,
    description: section.description,
    url: `${siteUrl}${section.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'NEST Pavia',
      url: siteUrl,
    },
  };

  return (
    <main className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="/" className="seo-back">NEST Pavia</a>
      <span className="eyebrow">{section.eyebrow}</span>
      <h1 className="section-title">{section.title}</h1>
      <p className="section-body">{section.description}</p>
      <ul className="seo-list">
        {section.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <a href={section.ctaHref} className="btn-primary">{section.cta}</a>
    </main>
  );
}
