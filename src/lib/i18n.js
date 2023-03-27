import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import langEn from '@assets/lang/en.json';
import langKa from '@assets/lang/ka.json';
import langRu from '@assets/lang/ru.json';

const resources = {
    en: {
        translation: langEn
    },
    ka: {
        translation: langKa
    },
    ru: {
        translation: langRu
    }
};

i18n.use(initReactI18next).init( {
    compatibilityJSON: 'v3',
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
});

export default i18n;