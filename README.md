# NEST Website

Sito NEST Pavia migrato a Next.js.

## Struttura

- `app/`: route Next.js.
- `content/home.html`: markup principale della landing, importato dalla homepage.
- `public/assets/css/styles.css`: stile principale.
- `public/assets/js/main.js`: interazioni, menu, gift card e widget Sportigo.
- `public/assets/images/hero-gym.jpg`: immagine hero.
- `app/privacy`, `app/cookie`, `app/terms`: pagine legali placeholder.
- `source/nest-static-before-next.html`: ultima versione statica prima della migrazione.
- `docs/launch-checklist.md`: cose da chiudere prima del go-live.

## Comandi

```bash
npm run dev
npm run build
npm run preview
```

`npm run build` genera `out/`, pubblicabile anche su hosting statico economico. Se l'integrazione Sportigo richiedera' API server-side, si potra' rimuovere l'export statico e pubblicare come app Next.js completa.

## Prossimo lavoro

1. Confermare dominio finale: per ora i meta usano `https://nest-pavia.it/`.
2. Confermare P.IVA e testi legali definitivi.
3. Confermare link Instagram e dati contatto.
4. Capire da Sportigo se serve solo widget embed o integrazione API/SSO.
