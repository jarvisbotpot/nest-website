'use client';

import { useEffect } from 'react';
import { appStoreUrl, googlePlayUrl } from '../app-links';

export function AppRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || '';
    const isAndroid = /android/i.test(ua);
    const isAppleMobile = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const target = isAndroid ? googlePlayUrl : isAppleMobile ? appStoreUrl : '';

    if (!target) return;

    const timer = window.setTimeout(() => {
      window.location.href = target;
    }, 450);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
