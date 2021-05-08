import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from "./locales/en/translation.json";
import SK from "./locales/sk/translation.json";

i18n
.use(initReactI18next)
.init({
  resources: {
    en: {translation: EN},
    sk: {translation: SK}
  },
  lng: "en",
  fallbackLng: "en",
  debug: false,

  interpolation: {
    escapeValue: false
  }
})

export default i18n;