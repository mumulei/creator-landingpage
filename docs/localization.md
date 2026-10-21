# Site Languages

The Home and Token Factory pages share a React locale provider. The desktop
header and mobile navigation both offer English and Simplified Chinese.
English remains the default. The explicit choice is saved under
`creatorial-language` in localStorage and survives navigation and reloads.
If storage is unavailable, switching still works for the current page.

- `src/i18n/messages.js`: Chinese translations, keyed by the English copy.
- `src/i18n/locale.jsx`: provider and `<T>` for rendered copy.
- `src/i18n/use-locale.js`: `useLocale()` for translated attributes and controls.
- `src/i18n/translate.js`: fallback and locale normalization.

Keep route paths, anchor IDs, email addresses, names, and brand names stable.
For new copy, add a dictionary entry and render `<T>{copy}</T>` or `t(copy)`.
Do not translate text by mutating the DOM. Embedded screenshots, video content,
third-party artwork lettering and product logos retain their original assets.

Run `node --test scripts/i18n.test.mjs` and `npm run build`.
Browser checks should include switching both directions on each route,
cross-route persistence, reload persistence, and the mobile menu.
