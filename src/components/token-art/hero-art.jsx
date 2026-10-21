import { lazy, Suspense } from 'react';
import { useLocale } from '../../i18n/use-locale';

// Import only the official Computer figure, rather than the full collection.
const Computer = lazy(() => import('./computer-figure.jsx'));

export default function HeroArt() {
  const { t } = useLocale();
  return <div className="tf-computer-visual">
    <Suspense fallback={<div className="tf-computer-loading" aria-label={t('Loading interactive computer')} />}>
      <Computer />
    </Suspense>
  </div>;
}
