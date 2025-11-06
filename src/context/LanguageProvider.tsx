import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import i18n, { initI18n, changeLanguage } from "../i18n";

type Lang = "pt" | "es";
type Ctx = { language: Lang; setLanguage: (l: Lang) => Promise<void>; };
const LanguageContext = createContext<Ctx>({ language: "pt", setLanguage: async () => {} });
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [language, setLanguageState] = useState<Lang>("pt");

  useEffect(() => {
    (async () => {
      await initI18n();
      setLanguageState((i18n.language.split("-")[0] as Lang) || "pt");
      setReady(true);
    })();
  }, []);

  const setLanguage = async (l: Lang) => {
    await changeLanguage(l);
    setLanguageState(l);
  };

  if (!ready) {
    return (
      <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
