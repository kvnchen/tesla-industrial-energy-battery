import enUS from '../locales/en-US';

const LOCALE = navigator.language || 'en-US';

export default function i18n(key: string) {
  switch (LOCALE) {
    case 'en-US':
    default:
      return enUS[key];
  }
}
