import { sectionList, siteUrl } from './sections';

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  '@id': `${siteUrl}/#nest-pavia`,
  name: 'NEST Pavia',
  url: siteUrl,
  image: `${siteUrl}/assets/images/hero-gym.jpg`,
  description:
    'Spazio fitness privato a Pavia per allenamenti individuali, personal trainer e piccoli gruppi fino a 4 persone.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Viale Lodi 1',
    addressLocality: 'Pavia',
    postalCode: '27100',
    addressRegion: 'PV',
    addressCountry: 'IT',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '05:00',
      closes: '23:59',
    },
  ],
  sameAs: ['https://www.instagram.com/nest.pavia/'],
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NEST Pavia',
  url: siteUrl,
  inLanguage: 'it-IT',
};

export const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: sectionList.map((section, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: section.title,
    url: `${siteUrl}${section.path}`,
  })),
};

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Come posso registrarmi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scarica l app NEST dal tuo store digitale e crea un account personale inserendo i dati richiesti.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come effettuo una prenotazione?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Acquista Crediti prepagati dall app NEST, poi seleziona il pulsante Prenota dalla Home e scegli data e orario desiderati.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual e la politica di cancellazione?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puoi cancellare la prenotazione fino a 18 ore prima dell inizio dello slot, ottenendo il rimborso totale dei Crediti utilizzati.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come si accede allo spazio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accedi all app NEST, seleziona il pulsante QR Code e scansiona il QR code di accesso fuori dalla porta d ingresso.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sono presenti servizi igienici e docce?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lo spazio dispone di servizi igienici con lavabo e wc, ma non e dotato di docce.',
      },
    },
  ],
};
