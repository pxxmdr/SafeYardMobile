import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import pt from "../locales/pt/common.json";
import es from "../locales/es/common.json";

const SUPPORTED = ["pt", "es"] as const;
type Lang = typeof SUPPORTED[number];

const resources: Resource = {
  pt: { translation: pt },
  es: { translation: es }
};

const LANGUAGE_KEY = "@safeyard:language";

function systemLanguage(): Lang {
  const code = Localization.getLocales()?.[0]?.languageCode?.toLowerCase() ?? "pt";
  return (SUPPORTED.includes(code as Lang) ? code : "pt") as Lang;
}

async function detectLanguage(): Promise<Lang> {
  const saved = (await AsyncStorage.getItem(LANGUAGE_KEY)) as Lang | null;
  if (saved && SUPPORTED.includes(saved)) return saved;
  return systemLanguage();
}

export async function initI18n(): Promise<void> {
  const lng = await detectLanguage();
  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "pt",
    defaultNS: "translation",
    interpolation: { escapeValue: false }
  });
}

export async function changeLanguage(lang: Lang): Promise<void> {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
}

export default i18n;
