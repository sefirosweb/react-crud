import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './translations/resources';

const i18nInstance = i18n
    .use(LanguageDetector)
    .use(initReactI18next)

i18nInstance.init({
    debug: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    resources
})

export default i18nInstance