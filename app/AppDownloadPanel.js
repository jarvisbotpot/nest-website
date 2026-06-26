import { absoluteUrl, withBasePath } from './site-paths';
import { appStoreLinks } from './app-links';

export function AppDownloadPanel({ compact = false }) {
  return (
    <div className={`app-download-panel${compact ? ' app-download-panel-compact' : ''}`}>
      <div className="app-download-copy">
        <span className="booking-kicker">App NEST</span>
        <h3>Porta la prenotazione sul tuo smartphone.</h3>
        <p>
          Scarica l'app NEST per acquistare crediti, prenotare lo slot e gestire l'accesso allo spazio.
        </p>
        <div className="app-store-actions" aria-label="Link download app NEST">
          {appStoreLinks.map((store) => (
            <a
              className="store-button"
              href={store.href}
              target="_blank"
              rel="noopener"
              key={store.href}
              data-meta-event="Lead"
              data-meta-source={`app_${store.platform.toLowerCase()}`}
            >
              <span>{store.platform}</span>
              <strong>{store.label}</strong>
            </a>
          ))}
        </div>
      </div>
      <div className="app-qr-card">
        <span>QR unico</span>
        <img src={withBasePath('/assets/images/nest-app-qr.svg')} alt={`QR code download app NEST: ${absoluteUrl('/app/')}`} />
        <p>Scansionalo con la fotocamera: ti porta allo store corretto in base al dispositivo.</p>
      </div>
    </div>
  );
}
