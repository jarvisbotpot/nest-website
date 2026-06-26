import { siteUrl } from '../site-paths';

export { siteUrl };

export const sections = {
  'spazio-privato': {
    title: 'Spazio fitness privato a Pavia',
    eyebrow: 'NEST Pavia',
    description:
      'NEST e uno spazio premium esclusivo per allenamenti individuali e sessioni con personal trainer, con privacy, comfort e attrezzature professionali.',
    path: '/spazio-privato/',
    cta: 'Prenota il tuo slot',
    ctaHref: '/#prenotazione',
    bullets: [
      'Accesso riservato su prenotazione',
      'Massimo 4 persone per sessione',
      'Ambiente curato, silenzioso e senza affollamento',
      'Attrezzatura professionale in continua manutenzione',
    ],
  },
  'come-funziona': {
    title: 'Come funziona NEST',
    eyebrow: 'Prenotazione e accesso',
    description:
      'Registrati, scegli lo slot e allenati in privato. Ogni sessione NEST dura 75 minuti e lo spazio resta dedicato alla tua prenotazione.',
    path: '/come-funziona/',
    cta: 'Vai alla prenotazione',
    ctaHref: '/#prenotazione',
    bullets: [
      'Registrazione profilo online',
      'Scelta di giorno e orario dall app',
      'Accesso smart con QR Code',
      'Cancellazione gratuita fino a 18 ore prima',
    ],
  },
  servizi: {
    title: 'Servizi NEST',
    eyebrow: 'Servizi inclusi',
    description:
      'Spazio privato, prenotazione digitale, accesso smart, spogliatoio, attrezzatura premium, WiFi, impianto audio e parcheggio privato.',
    path: '/servizi/',
    cta: 'Prenota il tuo slot',
    ctaHref: '/#prenotazione',
    bullets: [
      'Spazio esclusivo per la tua prenotazione',
      'Prenotazione digitale e accesso smart',
      'Attrezzatura professionale in manutenzione continua',
      'Parcheggio privato in Viale Lodi 1 a Pavia',
    ],
  },
  equipment: {
    title: 'Equipment NEST Pavia',
    eyebrow: 'Equipment',
    description:
      'Attrezzature Technogym e Xenios per strength training, functional training, athletic reconditioning e mobility nello spazio privato NEST.',
    path: '/equipment/',
    cta: 'Prenota il tuo slot',
    ctaHref: '/#prenotazione',
    bullets: [
      'Technogym Cable Station 4',
      'Rack Xenios con Smith Machine',
      'Manubri, bilancieri e dischi Xenios',
      'Resistance loop bands',
    ],
  },
  trainer: {
    title: 'Personal trainer a Pavia',
    eyebrow: 'Trainer',
    description:
      'NEST e uno spazio per personal trainer professionisti, sessioni private, piccoli gruppi, shooting, video e contenuti social.',
    path: '/trainer/',
    cta: 'Scopri gli slot disponibili',
    ctaHref: '/#prenotazione',
    bullets: [
      'Sessioni con personal trainer',
      'Possibilita di portare il tuo trainer',
      'Ambiente riservato per lavorare senza distrazioni',
      'Ideale per forza, functional training, mobility e conditioning',
    ],
  },
  'gift-card': {
    title: 'Gift card NEST',
    eyebrow: 'Regala NEST',
    description:
      'La gift card NEST e un regalo ideale per condividere un esperienza esclusiva di allenamento in uno spazio privato e curato.',
    path: '/gift-card/',
    cta: 'Acquista Gift Card',
    ctaHref: '/#giftcard',
    bullets: [
      'Idea regalo per allenarsi in privato',
      'Utilizzabile per slot NEST',
      'Esperienza fitness riservata e curata',
      'Gestione digitale tramite Sportigo',
    ],
  },
  prenota: {
    title: 'Scarica l app NEST',
    eyebrow: 'App NEST',
    description:
      'Scarica l app NEST per acquistare crediti, prenotare il tuo slot e gestire l accesso allo spazio fitness privato a Pavia.',
    path: '/prenota/',
    cta: 'Scarica l app',
    ctaHref: '/#prenotazione',
    bullets: [
      'Download da App Store',
      'Download da Google Play',
      'Slot da 75 minuti',
      'Prenotazione e accesso dall app',
    ],
  },
  faq: {
    title: 'FAQ NEST Pavia',
    eyebrow: 'Domande frequenti',
    description:
      'Risposte su registrazione, crediti, prenotazioni, cancellazioni, accesso, checkout, spogliatoi, servizi igienici, WiFi e impianto audio.',
    path: '/faq/',
    cta: 'Leggi le FAQ complete',
    ctaHref: '/#faq',
    bullets: [
      'Accesso consentito agli utenti registrati',
      'Sessioni fino a 4 persone',
      'Slot da 75 minuti',
      'Cancellazione fino a 18 ore prima',
    ],
  },
  contatti: {
    title: 'Contatti NEST Pavia',
    eyebrow: 'Dove siamo',
    description:
      'NEST si trova in Viale Lodi 1 a Pavia. La struttura e prenotabile 7 giorni su 7, dalle 05:00 alle 24:00.',
    path: '/contatti/',
    cta: 'Apri la sezione contatti',
    ctaHref: '/#contatti',
    bullets: [
      'Viale Lodi 1, 27100 Pavia',
      'Aperto 7 giorni su 7',
      'Orari 05:00-24:00',
      'Contatto email nella sezione Contatti',
    ],
  },
};

export const sectionList = Object.values(sections);
