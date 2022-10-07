import { initReactI18next } from "react-i18next";
import en_translations from "./en";
import he_translation from "./he";
import i18next from "i18next";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  fallbackNS: "common",
  resources: {
    en: {
      translation: en_translations,
    },
    he: {
      translation: he_translation,
    },
  },
});

export default i18next;
