const copy = {
  privacy: {
    title: 'Privacy Policy',
    body: 'Documento in preparazione. Prima della pubblicazione finale inserire titolare del trattamento, dati societari, basi giuridiche, servizi terzi e riferimenti di contatto.',
  },
  cookie: {
    title: 'Cookie Policy',
    body: 'Documento in preparazione. Prima della pubblicazione finale verificare cookie, widget Sportigo, font remoti, analytics ed eventuali embed.',
  },
  terms: {
    title: 'Termini e Condizioni',
    body: "Documento in preparazione. Prima della pubblicazione finale inserire regole di prenotazione, cancellazione, accesso agli spazi e responsabilita'.",
  },
};

export function LegalPage({ type }) {
  const page = copy[type];

  return (
    <main className="legal-page">
      <a href="/">Torna al sito</a>
      <h1 className="section-title">{page.title}</h1>
      <p className="section-body">{page.body}</p>
    </main>
  );
}
