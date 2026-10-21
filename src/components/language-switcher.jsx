import { ChevronDown } from 'lucide-react';
import { useLocale } from '../i18n/use-locale';

export default function LanguageSwitcher({ mobile = false }) {
  const { locale, setLocale } = useLocale();
  return <label className={`language-switcher${mobile ? ' language-switcher--mobile' : ''}`}>
    <select aria-label={locale === 'zh' ? '选择语言' : 'Choose language'} value={locale} onChange={event => setLocale(event.target.value)}>
      <option value="en">English</option>
      <option value="zh">简体中文</option>
    </select>
    <ChevronDown size={12} aria-hidden="true" />
  </label>;
}
