import { absoluteUrl, withBasePath } from './site-paths';
import { AppStoreSelector } from './AppStoreSelector';

export function AppDownloadPanel({ compact = false }) {
  return (
    <div className={`app-download-panel${compact ? ' app-download-panel-compact' : ''}`}>
      <div className="app-download-copy">
        <span className="booking-kicker">App NEST</span>
        <h3>Porta la prenotazione sul tuo smartphone.</h3>
        <p>
          Scarica l'app NEST per acquistare crediti, prenotare lo slot e gestire l'accesso allo spazio.
        </p>
        <AppStoreSelector />
        <p className="store-legal-note">
          Apple, il logo Apple e App Store sono marchi di Apple Inc. Google Play e il logo Google Play sono marchi di Google LLC.
        </p>
      </div>
      <div className="app-qr-card" data-app-qr-card>
        <span>Scansiona per scaricare l'app</span>
        <img src={withBasePath('/assets/images/nest-app-qr.svg')} alt={`QR code download app NEST: ${absoluteUrl('/app/')}`} />
        <p>Da desktop inquadra il codice con la fotocamera del telefono e apri lo store del tuo dispositivo.</p>
      </div>
    </div>
  );
}
