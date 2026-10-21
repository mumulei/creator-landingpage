import { zh } from './messages.js';

export const storageKey = 'creatorial-language';
export function normalizeLocale(value) { return value === 'zh' ? 'zh' : 'en'; }
export function translate(locale, text) {
  if (locale !== 'zh' || typeof text !== 'string') return text;
  const translated = zh[text.trim()];
  return translated === undefined ? text : text.replace(text.trim(), translated);
}
