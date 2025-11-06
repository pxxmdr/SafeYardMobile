import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageProvider";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <View style={{ flexDirection:"row", gap:8, alignItems:"center" }}>
      <Text style={{ fontSize:12 }}>{t("lang.current")}: {language.toUpperCase()}</Text>
      <TouchableOpacity onPress={() => setLanguage("pt")}><Text>PT</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setLanguage("es")}><Text>ES</Text></TouchableOpacity>
    </View>
  );
}
