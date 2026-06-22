import { siteUrl } from '../site-paths';

export { siteUrl };

export const sections = {
  'spazio-privato': {
    title: 'Spazio fitness privato a Pavia',
    eyebrow: 'NEST Pavia',
    description:
      'NEST e uno spazio privato per allenamenti individuali, personal trainer e piccoli gruppi fino a 4 persone, pensato per privacy, qualita e tranquillita.',
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
      'Scelta di giorno, ora e modalita di allenamento',
      'Accesso smart con codice personale',
      'Cancellazione gratuita fino a 24 ore prima',
    ],
  },
  servizi: {
    title: 'Servizi NEST',
    eyebrow: 'Servizi inclusi',
    description:
      'Spazio privato, attrezzatura premium, accesso smart, prenotazione digitale, WiFi dedicato, musica personalizzata, spogliatoi singoli e parcheggio privato.',
    path: '/servizi/',
    cta: 'Prenota il tuo slot',
    ctaHref: '/#prenotazione',
    bullets: [
      'Spazio esclusivo per la tua prenotazione',
      'Attrezzatura professionale',
      'Codice personale di ingresso',
      'Parcheggio privato in Viale Lodi 1 a Pavia',
    ],
  },
  trainer: {
    title: 'Personal trainer a Pavia',
    eyebrow: 'Trainer',
    description:
      'Allenati con uno dei trainer NEST oppure porta il tuo personal trainer registrato. Lo spazio e pensato per sessioni individuali e piccoli gruppi.',
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
  'chi-siamo': {
    title: 'Chi siamo',
    eyebrow: 'NEST Pavia',
    description:
      'NEST nasce per offrire un modo diverso di allenarsi: privacy, comfort e uno spazio curato dove ogni sessione e dedicata esclusivamente a te.',
    path: '/chi-siamo/',
    cta: 'Contattaci',
    ctaHref: '/#contatti',
    bullets: [
      'Allenamento individuale',
      'Personal trainer',
      'Piccoli gruppi',
      'Privacy garantita',
    ],
  },
  'gift-card': {
    title: 'Gift card NEST',
    eyebrow: 'Regala NEST',
    description:
      'La gift card NEST permette di regalare tempo, qualita e privacy: chi la riceve sceglie quando allenarsi in uno spazio esclusivo.',
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
    title: 'Prenota NEST Pavia',
    eyebrow: 'Prenotazione',
    description:
      'Prenota il tuo slot NEST a Pavia e allenati in uno spazio privato per 75 minuti, da solo, con trainer o in piccolo gruppo.',
    path: '/prenota/',
    cta: 'Vai alla prenotazione',
    ctaHref: '/#prenotazione',
    bullets: [
      'Slot da 75 minuti',
      'Massimo 4 persone',
      'Accesso digitale',
      'Prenotazione online tramite Sportigo',
    ],
  },
  faq: {
    title: 'FAQ NEST Pavia',
    eyebrow: 'Domande frequenti',
    description:
      'Risposte rapide su accesso, prenotazioni, personal trainer, durata degli slot, regole di utilizzo, spogliatoi e servizi disponibili.',
    path: '/faq/',
    cta: 'Leggi le FAQ complete',
    ctaHref: '/#faq',
    bullets: [
      'Accesso consentito agli utenti registrati',
      'Sessioni fino a 4 persone',
      'Slot da 75 minuti',
      'Prenotazione e cancellazione online',
    ],
  },
  contatti: {
    title: 'Contatti NEST Pavia',
    eyebrow: 'Dove siamo',
    description:
      'NEST si trova in Viale Lodi 1 a Pavia. La struttura e prenotabile 7 giorni su 7, dalle 06:00 alle 22:00.',
    path: '/contatti/',
    cta: 'Apri la sezione contatti',
    ctaHref: '/#contatti',
    bullets: [
      'Viale Lodi 1, 27100 Pavia',
      'Aperto 7 giorni su 7',
      'Orari 06:00-22:00',
      'Email: info@nest-pavia.it',
    ],
  },
};

export const sectionList = Object.values(sections);
