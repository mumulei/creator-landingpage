import test from 'node:test';
import assert from 'node:assert/strict';
import { zh } from '../src/i18n/messages.js';
import { normalizeLocale, translate } from '../src/i18n/translate.js';

test('locale is restricted to the two supported languages', () => {
  assert.equal(normalizeLocale('zh'), 'zh');
  for (const value of ['en', 'fr', '', null, undefined]) assert.equal(normalizeLocale(value), 'en');
});
test('every translation is nonempty and English remains unchanged', () => {
  for (const [en, chinese] of Object.entries(zh)) {
    assert.ok(chinese.trim(), en);
    assert.equal(translate('en', en), en);
    assert.equal(translate('zh', en), chinese);
  }
});
test('preserves inline spacing, brands and missing-key fallback', () => {
  assert.equal(translate('zh', ' Built for '), ' 为 ');
  assert.equal(translate('zh', 'Creatorial'), 'Creatorial');
  assert.equal(translate('zh', 'unknown string'), 'unknown string');
  assert.equal(translate('zh', 5), 5);
});
