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
      opens: '06:00',
      closes: '22:00',
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
      name: 'Quante persone possono allenarsi contemporaneamente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fino a un massimo di 4 persone, per garantire privacy, spazio e qualita dell allenamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come si prenota?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tramite app o piattaforma online, selezionando la fascia oraria desiderata. La cancellazione e gratuita fino a 24 ore prima.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso portare il mio personal trainer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si, il trainer deve registrarsi per accedere. E possibile anche scegliere uno dei professionisti NEST.',
      },
    },
  ],
};
