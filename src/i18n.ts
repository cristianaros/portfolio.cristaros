import { useEffect, useState } from 'react';

export type Locale = 'es' | 'en';

export function browserLocale(): Locale {
  if (typeof window !== 'undefined') {
    if (/^\/experience\/?$/.test(window.location.pathname)) return 'en';
    if (/^\/experiencia\/?$/.test(window.location.pathname)) return 'es';
    try {
      const selected = localStorage.getItem('portfolio-locale');
      if (selected === 'es' || selected === 'en') return selected;
    } catch {}
  }
  if (typeof navigator === 'undefined') return 'es';
  const preferred = navigator.languages?.[0] ?? navigator.language;
  return preferred?.toLowerCase().startsWith('en') ? 'en' : 'es';
}

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('es');
  useEffect(() => setLocale(browserLocale()), []);
  return locale;
}
