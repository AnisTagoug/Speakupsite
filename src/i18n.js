import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import ptBR from './locales/pt-BR.json';
import de from './locales/de.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  pt: { translation: pt },
  'pt-BR': { translation: ptBR },
  de: { translation: de },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n; 