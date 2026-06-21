import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SPORTIGO_PRIVACY_URL = 'https://www.sportigo.io/fr/regles-de-confidentialite';
const SPORTIGO_TERMS_URL =
  'https://cdn.prod.website-files.com/6026a3b1f0c5d55691a55af1/65df1bea3a88d0237801aaae_CONDITIONS%20GE%CC%81NE%CC%81RALES%20DE%20VENTE.pdf';

function extractHtml(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);

  if (start === -1 || end === -1) return '';

  return source.slice(start, end + endMarker.length);
}

function getSiteChrome() {
  const home = readFileSync(join(process.cwd(), 'content/home.html'), 'utf8');
  const header = extractHtml(home, '<div class="cursor"', '<!-- HERO -->')
    .replace('<!-- HERO -->', '')
    .replace('<nav id="navbar">', '<nav id="navbar" class="scrolled legal-site-nav">');
  const footer = extractHtml(home, '<footer>', '</footer>');

  return { header, footer };
}

const pages = {
  privacy: {
    title: 'Privacy Policy',
    updatedAt: '21 giugno 2026',
    intro:
      'Questa informativa descrive in modo sintetico come NEST Pavia tratta i dati personali raccolti tramite il sito e i servizi digitali collegati.',
    sections: [
      {
        title: 'Titolare del trattamento',
        body: [
          'Il titolare del trattamento sarà indicato nella versione definitiva con ragione sociale, sede, P.IVA e recapiti ufficiali di NEST Pavia.',
          'Per richieste privacy e informazioni puoi usare il contatto email indicato sul sito: info@nest-pavia.it.',
        ],
      },
      {
        title: 'Dati trattati',
        body: [
          'Il sito pubblico può trattare dati tecnici di navigazione, indirizzo IP, informazioni sul dispositivo e dati inviati volontariamente tramite email o link esterni.',
          'Le funzionalità di prenotazione, account, pagamento, accesso e gift card possono essere gestite tramite Sportigo. In quel caso Sportigo può trattare dati come nome, cognome, email, telefono, dati di accesso, dati di prenotazione e dati necessari alla gestione degli abbonamenti o pagamenti.',
        ],
      },
      {
        title: 'Finalità',
        body: [
          'I dati sono usati per rispondere alle richieste, permettere la prenotazione degli slot, gestire account e accessi, inviare comunicazioni operative e garantire sicurezza e corretto funzionamento del servizio.',
          'I dati non vengono usati per finalità non compatibili con il rapporto richiesto dall’utente.',
        ],
      },
      {
        title: 'Servizi terzi',
        body: [
          'NEST utilizza Sportigo come piattaforma tecnica per prenotazioni, area utente, gift card e servizi collegati. Le modalità di trattamento dichiarate da Sportigo sono consultabili nella sua informativa privacy.',
          'Il sito usa inoltre font remoti e contenuti tecnici necessari al funzionamento della pagina.',
        ],
        links: [{ label: 'Informativa privacy Sportigo', href: SPORTIGO_PRIVACY_URL }],
      },
      {
        title: 'Diritti degli utenti',
        body: [
          'L’utente può chiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati nei limiti previsti dal GDPR.',
          'Per dati trattati direttamente dentro Sportigo, alcune richieste potrebbero dover essere gestite tramite la piattaforma o tramite Sportigo, ferma restando l’assistenza di NEST quando applicabile.',
        ],
      },
      {
        title: 'Nota',
        body: [
          'Questa pagina è una bozza operativa e deve essere verificata con dati societari definitivi e consulente legale prima della pubblicazione finale.',
        ],
      },
    ],
  },
  cookie: {
    title: 'Cookie Policy',
    updatedAt: '21 giugno 2026',
    intro:
      'Questa cookie policy descrive l’uso di cookie e tecnologie simili sul sito NEST Pavia e nei servizi integrati.',
    sections: [
      {
        title: 'Cookie tecnici',
        body: [
          'Il sito può usare cookie o tecnologie equivalenti necessari alla corretta erogazione delle pagine, alla sicurezza, alla compatibilità tecnica e alla gestione della navigazione.',
          'Questi strumenti non richiedono consenso quando sono strettamente necessari al funzionamento del servizio richiesto.',
        ],
      },
      {
        title: 'Widget Sportigo',
        body: [
          'Le aree di prenotazione, accesso utente e gift card possono caricare componenti Sportigo. Tali componenti possono usare cookie, local storage o richieste tecniche necessarie per account, prenotazioni, pagamenti, controllo accessi e sicurezza.',
          'Le informazioni privacy dichiarate da Sportigo sono consultabili nella relativa informativa.',
        ],
        links: [{ label: 'Informativa privacy Sportigo', href: SPORTIGO_PRIVACY_URL }],
      },
      {
        title: 'Servizi esterni',
        body: [
          'Il sito carica font da Google Fonts e script esterni necessari per animazioni e componenti integrati. Questi servizi possono ricevere dati tecnici come indirizzo IP e informazioni sul browser.',
          'Le campagne Meta possono usare Meta Pixel solo previo consenso marketing. In assenza di consenso marketing, il relativo codice di tracciamento non viene caricato.',
          'Al momento non è previsto Google Analytics. Se saranno aggiunti altri strumenti di analytics o marketing, la policy dovrà essere aggiornata.',
        ],
      },
      {
        title: 'Gestione preferenze',
        body: [
          'L’utente può gestire o bloccare i cookie dal proprio browser. Il blocco di cookie tecnici o storage usati da Sportigo potrebbe impedire prenotazioni, login o pagamenti.',
        ],
      },
      {
        title: 'Nota',
        body: [
          'Questa pagina è una bozza operativa. Prima del go-live va verificata con una scansione reale dei cookie e degli script effettivamente attivi.',
        ],
      },
    ],
  },
  terms: {
    title: 'Termini e Condizioni',
    updatedAt: '21 giugno 2026',
    intro:
      'Questi termini regolano l’uso del sito NEST Pavia e, in forma sintetica, l’accesso ai servizi di prenotazione dello spazio.',
    sections: [
      {
        title: 'Oggetto del servizio',
        body: [
          'NEST Pavia offre uno spazio fitness privato prenotabile per allenamenti individuali, sessioni con personal trainer e piccoli gruppi, nel rispetto dei limiti indicati sul sito e nella piattaforma di prenotazione.',
          'Le informazioni pubblicate sul sito hanno valore descrittivo e possono essere aggiornate in qualsiasi momento.',
        ],
      },
      {
        title: 'Prenotazioni, account e pagamenti',
        body: [
          'La gestione di prenotazioni, account utente, eventuali gift card e pagamenti può avvenire tramite Sportigo o piattaforme collegate.',
          'L’uso delle funzionalità Sportigo può essere soggetto anche alle condizioni e informative pubblicate da Sportigo, inclusi aspetti tecnici, account, pagamenti, disponibilità del servizio e trattamento dei dati.',
        ],
        links: [
          { label: 'Informativa privacy Sportigo', href: SPORTIGO_PRIVACY_URL },
          { label: 'CGV Sportigo', href: SPORTIGO_TERMS_URL },
        ],
      },
      {
        title: 'Accesso allo spazio',
        body: [
          'L’accesso è consentito solo agli utenti registrati e prenotati, negli orari e con le modalità indicate nella conferma di prenotazione.',
          'Ogni slot dura 75 minuti salvo diversa indicazione. L’accesso anticipato, quando previsto, non modifica l’orario di fine sessione.',
          'Il numero massimo di persone ammesse è quello indicato sul sito o nella piattaforma di prenotazione.',
        ],
      },
      {
        title: 'Regole di utilizzo',
        body: [
          'Gli utenti devono usare attrezzature e spazi con attenzione, rispettare igiene, ordine, orari e indicazioni ricevute da NEST.',
          'È richiesto l’uso di asciugamano personale e il riordino dell’attrezzatura al termine della sessione.',
          'Non è consentito far accedere persone non registrate o non incluse nella prenotazione.',
        ],
      },
      {
        title: 'Cancellazioni e responsabilità',
        body: [
          'Le regole di cancellazione, modifica, rimborso o credito sono quelle mostrate al momento della prenotazione o comunicate da NEST.',
          'L’utente dichiara di essere in condizioni fisiche idonee all’allenamento e di usare lo spazio sotto la propria responsabilità, salvo i limiti inderogabili di legge.',
        ],
      },
      {
        title: 'Personal trainer esterni',
        body: [
          'Eventuali personal trainer esterni possono accedere solo se registrati o autorizzati secondo le regole NEST e della piattaforma di prenotazione.',
          'Il trainer resta responsabile della propria attività professionale, dei propri requisiti e del rapporto con il cliente.',
        ],
      },
      {
        title: 'Nota',
        body: [
          'Questi termini sono una bozza operativa. Prima della pubblicazione finale vanno completati con dati societari, prezzi, policy definitive di cancellazione e validazione legale.',
        ],
      },
    ],
  },
};

export function LegalPage({ type }) {
  const page = pages[type];
  const { header, footer } = getSiteChrome();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: header }} />
      <main className="legal-page">
        <a href="/">Torna al sito</a>
        <h1 className="section-title">{page.title}</h1>
        <p className="legal-updated">Ultimo aggiornamento: {page.updatedAt}</p>
        <p className="section-body">{page.intro}</p>
        {page.sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.links ? (
              <div className="legal-links">
                {section.links.map((link) => (
                  <a href={link.href} target="_blank" rel="noopener" key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </main>
      <div dangerouslySetInnerHTML={{ __html: footer }} />
    </>
  );
}
