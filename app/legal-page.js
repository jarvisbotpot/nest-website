import { withBasePath } from './site-paths';
import { getSiteChrome } from './site-chrome';

const META_PRIVACY_URL = 'https://www.facebook.com/privacy/policy/';
const COMPANY_LEGAL_NAME = 'ESSEPI S.R.L.';
const COMPANY_LEGAL_ADDRESS = 'Via G. Moruzzi n. 45/c, 27100 Pavia';
const COMPANY_TAX_ID = 'C.F./P.IVA 03016970182';
const CONTACT_EMAIL = 'info@nesttraining.it';

const pages = {
  privacy: {
    title: 'Privacy Policy',
    updatedAt: '25 giugno 2026',
    intro:
      'Questa informativa descrive in modo sintetico come NEST Pavia tratta i dati personali raccolti tramite il sito e i servizi digitali collegati.',
    sections: [
      {
        title: 'Titolare del trattamento',
        body: [
          `Il titolare del trattamento è ${COMPANY_LEGAL_NAME}, con sede in ${COMPANY_LEGAL_ADDRESS}, ${COMPANY_TAX_ID}.`,
          `Per richieste privacy e informazioni puoi scrivere a ${CONTACT_EMAIL}.`,
        ],
      },
      {
        title: 'Dati trattati',
        body: [
          'Il sito pubblico può trattare dati tecnici di navigazione, indirizzo IP, informazioni sul dispositivo e dati inviati volontariamente tramite email o link esterni.',
          'Le funzionalità di prenotazione, account, pagamento, accesso e servizi collegati possono essere gestite tramite l’app NEST o piattaforme collegate. In quel caso possono essere trattati dati come nome, cognome, email, telefono, dati di accesso, dati di prenotazione e dati necessari alla gestione degli abbonamenti o pagamenti.',
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
          'Il sito può inviare l’utente verso gli store Apple e Google per scaricare l’app NEST.',
          'Il sito usa inoltre font remoti e contenuti tecnici necessari al funzionamento della pagina.',
        ],
      },
      {
        title: 'Diritti degli utenti',
        body: [
          'L’utente può chiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati nei limiti previsti dal GDPR.',
          'Per dati trattati dentro l’app NEST o piattaforme collegate, alcune richieste potrebbero dover essere gestite tramite quei servizi, ferma restando l’assistenza di NEST quando applicabile.',
        ],
      },
      {
        title: 'Nota',
        body: [
          'Questa pagina deve essere verificata con un consulente legale prima della pubblicazione finale.',
        ],
      },
    ],
  },
  cookie: {
    title: 'Cookie Policy',
    updatedAt: '25 giugno 2026',
    intro:
      'Questa Cookie Policy descrive l’uso di cookie, local storage, pixel e tecnologie simili sul sito NEST Pavia e nei servizi integrati.',
    sections: [
      {
        title: 'Titolare e contatti',
        body: [
          `Il sito è riferito a NEST Pavia, spazio fitness privato con sede operativa in Viale Lodi 1, 27100 Pavia (PV). Il titolare è ${COMPANY_LEGAL_NAME}, con sede in ${COMPANY_LEGAL_ADDRESS}, ${COMPANY_TAX_ID}.`,
          `Per richieste relative a cookie, consenso e strumenti di tracciamento puoi scrivere a ${CONTACT_EMAIL}.`,
        ],
      },
      {
        title: 'Cosa sono cookie e tecnologie simili',
        body: [
          'I cookie sono piccoli file salvati dal browser sul dispositivo dell’utente. Tecnologie simili, come local storage, pixel e script di terze parti, possono memorizzare informazioni o trasmettere dati tecnici durante la navigazione.',
          'Questi strumenti possono essere necessari al funzionamento del sito oppure usati, solo con consenso, per servizi integrati e misurazione delle campagne pubblicitarie.',
        ],
      },
      {
        title: 'Cookie necessari',
        body: [
          'Il sito usa strumenti tecnici necessari per mostrare le pagine, mantenere sicurezza, compatibilità tecnica, preferenze essenziali e corretto funzionamento dell’interfaccia.',
          'Questi strumenti non richiedono consenso quando sono strettamente necessari al servizio richiesto dall’utente.',
          'Tra gli strumenti necessari rientra anche la memorizzazione locale della scelta cookie, salvata nel browser con chiave nest_cookie_consent_v1, per evitare di mostrare il banner a ogni visita.',
        ],
      },
      {
        title: 'Cookie marketing e Meta Pixel',
        body: [
          'Per campagne pubblicitarie su Meta, Facebook e Instagram, il sito può usare Meta Pixel per misurare visite, interazioni e conversioni collegate alle campagne.',
          'Meta Pixel viene caricato solo dopo consenso marketing. Se il consenso marketing viene rifiutato o non espresso, il codice Meta Pixel non viene inserito nella pagina.',
          'Quando attivo, Meta Pixel può comunicare a Meta dati tecnici e informazioni sugli eventi di navigazione, secondo le regole e informative di Meta.',
          'Al momento non è previsto Google Analytics.',
        ],
        links: [{ label: 'Informativa privacy Meta', href: META_PRIVACY_URL }],
      },
      {
        title: 'Font, librerie e risorse tecniche',
        body: [
          'Il sito può caricare font da Google Fonts e librerie tecniche da CDN esterne, ad esempio per animazioni e componenti dell’interfaccia.',
          'Questi servizi possono ricevere dati tecnici come indirizzo IP, informazioni sul browser e dati di richiesta necessari alla consegna delle risorse.',
          'Queste risorse sono usate per presentazione, compatibilità e funzionamento tecnico del sito, non per profilazione autonoma da parte di NEST.',
        ],
      },
      {
        title: 'Gestione e revoca del consenso',
        body: [
          'Alla prima visita viene mostrato un banner che consente di rifiutare i cookie non necessari, accettare tutto oppure personalizzare le preferenze per categoria.',
          'Le preferenze possono essere modificate in qualsiasi momento tramite il pulsante “Cookie” presente sul sito.',
          'La revoca del consenso non pregiudica la liceità dei trattamenti effettuati prima della revoca.',
          'L’utente può anche cancellare cookie e dati locali dal proprio browser. La cancellazione può far ricomparire il banner alla visita successiva.',
        ],
      },
      {
        title: 'Durata e aggiornamenti',
        body: [
          'La scelta cookie viene conservata nel browser fino a cancellazione da parte dell’utente o aggiornamento tecnico della gestione del consenso.',
          'Questa Cookie Policy sarà aggiornata se verranno introdotti nuovi strumenti di analytics, marketing, profilazione o servizi terzi diversi da quelli indicati.',
        ],
      },
    ],
  },
  terms: {
    title: 'Termini e Condizioni',
    updatedAt: '25 giugno 2026',
    intro:
      'Questi termini regolano l’uso del sito NEST Pavia e, in forma sintetica, l’accesso ai servizi di prenotazione dello spazio.',
    sections: [
      {
        title: 'Gestore',
        body: [
          `NEST Pavia è gestito da ${COMPANY_LEGAL_NAME}, con sede in ${COMPANY_LEGAL_ADDRESS}, ${COMPANY_TAX_ID}.`,
          'La sede operativa dello spazio è in Viale Lodi 1, 27100 Pavia (PV).',
        ],
      },
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
          'La gestione di prenotazioni, account utente, eventuali gift card e pagamenti può avvenire tramite app NEST o piattaforme collegate.',
          'L’uso dell’app NEST e delle piattaforme collegate può essere soggetto anche alle relative condizioni e informative, inclusi aspetti tecnici, account, pagamenti, disponibilità del servizio e trattamento dei dati.',
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
          'Questi termini devono essere verificati con un consulente legale prima della pubblicazione finale.',
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
        <a href={withBasePath('/')}>Torna al sito</a>
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
