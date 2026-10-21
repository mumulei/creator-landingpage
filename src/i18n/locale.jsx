import { useEffect, useState } from 'react';
import { zh } from './messages';
import { LocaleContext, useLocale } from './use-locale';
import { normalizeLocale, storageKey, translate } from './translate';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    try { return normalizeLocale(localStorage.getItem(storageKey)); }
    catch { return 'en'; }
  });
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    const title = window.location.pathname.replace(/\/$/, '') === '/token-factory'
      ? 'Token Factory | Creatorial' : 'Creatorial — Turn UGC Into Your Best-Performing Ads';
    document.title = locale === 'zh' ? zh[title] : title;
    try { localStorage.setItem(storageKey, locale); } catch { /* Storage may be disabled. */ }
    // Text reflow changes the trigger positions without remounting the animations.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [locale]);
  const t = text => translate(locale, text);
  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
}

// Keep translations in React's render tree; do not mutate rendered DOM text.
export function T({ children }) {
  const { t } = useLocale();
  return t(children);
}
