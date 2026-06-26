import { AppDownloadPanel } from '../AppDownloadPanel';
import { appStoreLinks } from '../app-links';
import { AppRedirect } from './AppRedirect';
import { getSiteChrome } from '../site-chrome';
import { absoluteUrl, searchRobots } from '../site-paths';

export const metadata = {
  title: 'Download app NEST',
  description: 'Apri lo store corretto per scaricare l app NEST su iPhone, iPad o Android.',
  alternates: {
    canonical: '/app/',
  },
  robots: searchRobots,
};

export default function AppPage() {
  const { header, footer } = getSiteChrome();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Download app NEST',
    description: metadata.description,
    url: absoluteUrl('/app/'),
    potentialAction: appStoreLinks.map((store) => ({
      '@type': 'DownloadAction',
      target: store.href,
      name: `Scarica da ${store.label}`,
      operatingSystem: store.platform,
    })),
  };

  return (
    <>
      <AppRedirect />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: header }} />
      <main className="app-page">
        <section className="app-download-section app-download-section-page">
          <div className="prenotazione-inner">
            <div className="prenotazione-header">
              <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                Download app
              </span>
              <h1 className="section-title">
                Apri l'app <em>NEST.</em>
              </h1>
              <p className="section-body">
                Se il redirect automatico non parte, scegli manualmente lo store del tuo dispositivo.
              </p>
            </div>
            <AppDownloadPanel compact />
          </div>
        </section>
      </main>
      <div dangerouslySetInnerHTML={{ __html: footer }} />
    </>
  );
}
