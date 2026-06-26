'use client';

import { useEffect, useMemo, useState } from 'react';
import { appStoreLinks } from './app-links';

const clientBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function withClientBasePath(path) {
  if (!clientBasePath || !path.startsWith('/')) return path;
  return `${clientBasePath}${path}`;
}

function detectStoreDevice() {
  if (typeof navigator === 'undefined') return 'desktop';

  const ua = navigator.userAgent || navigator.vendor || '';
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'ios';
  return 'desktop';
}

export function AppStoreSelector() {
  const [device, setDevice] = useState('unknown');

  useEffect(() => {
    const detectedDevice = detectStoreDevice();
    setDevice(detectedDevice);
    document.documentElement.dataset.appDevice = detectedDevice;
  }, []);

  const visibleStores = useMemo(() => {
    if (device === 'unknown') return [];
    if (device === 'ios' || device === 'android') {
      return appStoreLinks.filter((store) => store.device === device);
    }

    return appStoreLinks;
  }, [device]);

  return (
    <div className="app-store-actions" data-device={device} aria-label="Link download app NEST">
      {visibleStores.map((store) => (
        <a
          className="store-badge-link"
          href={store.href}
          target="_blank"
          rel="noopener"
          key={store.href}
          data-store-target={store.device}
          data-meta-event="Lead"
          data-meta-source={`app_${store.device}`}
          aria-label={store.badgeAlt}
        >
          <img src={withClientBasePath(store.badgeSrc)} alt={store.badgeAlt} />
        </a>
      ))}
    </div>
  );
}
