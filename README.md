# NEST Website

Base progetto per trasformare la landing NEST in un sito pubblicabile.

## File

- `index.html`: versione corrente apribile nel browser.
- `source/nest-landing-final-original.html`: copia intatta del file ricevuto su Discord.
- `docs/launch-checklist.md`: cose da chiudere prima della pubblicazione.

## Stato

Il file ricevuto e' un HTML monolitico: include CSS, JavaScript, immagini inline e dipendenze CDN.
Va bene come base visuale, ma per un sito definitivo conviene separare asset, SEO, privacy, contatti e deploy.

## Prossimo lavoro

1. Separare `style.css` e `main.js`.
2. Sostituire immagini inline/base64 con file ottimizzati.
3. Confermare dominio, email, link social e sistemi di prenotazione.
4. Aggiungere privacy policy, cookie policy e SEO tecnico.
5. Preparare deploy su hosting statico o server.
