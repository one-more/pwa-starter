import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './resources/en.json';

export const initI18N = () => {
    i18n.use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en,
            },
            fallbackLng: 'en',
            debug: false,

            keySeparator: '.',

            interpolation: {
                escapeValue: false,
            },
            react: {
                wait: true,
            },
            initImmediate: true,
            ns: ['translations'],
            defaultNS: 'translations',
        });
};

export { default as i18n } from 'i18next';
export { useTranslation, Trans } from 'react-i18next';
