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
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="https://standalone.api.sportigo.fr/component-standalone.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
