import Script from 'next/script';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://nest-pavia.it'),
  title: {
    default: 'NEST Pavia - Spazio fitness privato e personal training',
    template: '%s - NEST Pavia',
  },
  description:
    'NEST Pavia e uno spazio fitness privato in Viale Lodi 1 per allenamenti individuali, personal trainer e piccoli gruppi fino a 4 persone.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'palestra privata Pavia',
    'personal trainer Pavia',
    'spazio fitness privato',
    'allenamento privato Pavia',
    'NEST Pavia',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'NEST Pavia',
    title: 'NEST Pavia - Spazio fitness privato e personal training',
    description: 'Allenati in privato in uno spazio fitness esclusivo a Pavia.',
    url: '/',
    images: ['/assets/images/hero-gym.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/assets/images/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B1B1B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Bodoni+Moda:ital,wght@1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/styles.css" />
      </head>
      <body>
        {children}
        <div className="cookie-banner" id="cookieBanner" role="dialog" aria-modal="false" aria-labelledby="cookieTitle" hidden>
          <button className="cookie-close" id="cookieClose" type="button" aria-label="Rifiuta cookie non necessari">
            ×
          </button>
          <div className="cookie-copy">
            <span className="cookie-eyebrow">Privacy</span>
            <h2 id="cookieTitle">Gestione cookie</h2>
            <p>
              Usiamo cookie tecnici necessari. Con il tuo consenso possiamo attivare servizi funzionali per
              prenotazioni/gift card e strumenti marketing come Meta Pixel per misurare le campagne.
            </p>
            <a href="/cookie/">Leggi la Cookie Policy</a>
          </div>
          <div className="cookie-actions">
            <button className="cookie-btn cookie-btn-muted" id="cookieReject" type="button">
              Rifiuta
            </button>
            <button className="cookie-btn cookie-btn-secondary" id="cookieCustomize" type="button">
              Personalizza
            </button>
            <button className="cookie-btn cookie-btn-primary" id="cookieAccept" type="button">
              Accetta tutto
            </button>
          </div>
          <div className="cookie-panel" id="cookiePanel" hidden>
            <label className="cookie-toggle cookie-toggle-disabled">
              <span>
                <strong>Necessari</strong>
                <small>Richiesti per sicurezza e funzionamento del sito.</small>
              </span>
              <input type="checkbox" checked disabled readOnly />
            </label>
            <label className="cookie-toggle">
              <span>
                <strong>Funzionali</strong>
                <small>Attivano Sportigo per prenotazioni, area utente e gift card.</small>
              </span>
              <input id="cookieFunctional" type="checkbox" />
            </label>
            <label className="cookie-toggle">
              <span>
                <strong>Marketing</strong>
                <small>Attivano Meta Pixel per campagne e misurazione conversioni.</small>
              </span>
              <input id="cookieMarketing" type="checkbox" />
            </label>
            <button className="cookie-btn cookie-btn-primary cookie-save" id="cookieSave" type="button">
              Salva preferenze
            </button>
          </div>
        </div>
        <button className="cookie-preferences" id="cookiePreferences" type="button" hidden>
          Cookie
        </button>
        <Script
          id="nest-consent-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.NEST_META_PIXEL_ID=${JSON.stringify(process.env.NEXT_PUBLIC_META_PIXEL_ID || '')};`,
          }}
        />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
