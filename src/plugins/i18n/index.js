import { createI18n } from 'vue-i18n';
import en from './en';

const messages = {
  en: en,
};

const options = {
  locale: 'en',
  legacy: false,
  messages,
};

const i18n = createI18n(options);

export default i18n;

export const t = i18n.global.t;
export const te = i18n.global.te;
