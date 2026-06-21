# NEST Website

Sito NEST Pavia migrato a Next.js.

## Struttura

- `app/`: route Next.js.
- `content/home.html`: markup principale della landing, importato dalla homepage.
- `public/assets/css/styles.css`: stile principale.
- `public/assets/js/main.js`: interazioni, consenso cookie, Meta Pixel, gift card e widget Sportigo.
- `public/assets/images/hero-gym.jpg`: immagine hero.
- `app/privacy`, `app/cookie`, `app/terms`: pagine legali.
- `source/nest-static-before-next.html`: ultima versione statica prima della migrazione.
- `docs/launch-checklist.md`: cose da chiudere prima del go-live.

## Comandi

```bash
npm run dev
npm run build
npm run preview
```

`npm run build` genera `out/`, pubblicabile anche su hosting statico economico. Se l'integrazione Sportigo richiedera' API server-side, si potra' rimuovere l'export statico e pubblicare come app Next.js completa.

## Integrazioni

### Cookie e consenso

Il sito mostra un banner al primo accesso e salva le preferenze in `localStorage` con chiave `nest_cookie_consent_v1`.

- `necessari`: sempre attivi.
- `funzionali`: abilitano il caricamento dei widget Sportigo.
- `marketing`: abilita Meta Pixel e gli eventi pubblicitari.

Sportigo e Meta Pixel non vengono caricati nel markup iniziale. Vengono iniettati via JavaScript solo dopo il consenso relativo.

### Meta Pixel

Impostare l'ID nel file ambiente:

```bash
NEXT_PUBLIC_META_PIXEL_ID=1234567890
```

Le PageView e gli eventi Meta sono inviati solo dopo consenso marketing. Gli eventi sono agganciati con attributi `data-meta-event` / `data-meta-source` su CTA di prenotazione, gift card e login Sportigo; le PageView vengono aggiornate anche quando il menu cambia URL senza ricaricare la pagina. Senza consenso marketing o senza Pixel ID, tutto resta disattivato.

### Sportigo

I widget Sportigo vengono caricati solo dopo consenso funzionale:

- `Appointment` su `#sportigo-container`
- `GiftCard` su `#sportigo-container-giftcard`

Se il consenso funzionale non e' presente, viene mostrato un messaggio con link al pannello preferenze cookie.

## Prossimo lavoro

1. Confermare dominio finale: per ora i meta usano `https://nest-pavia.it/`.
2. Confermare P.IVA e testi legali definitivi.
3. Confermare link Instagram e dati contatto.
4. Inserire `NEXT_PUBLIC_META_PIXEL_ID` quando disponibile.
5. Capire da Sportigo se serve solo widget embed o integrazione API/SSO.
