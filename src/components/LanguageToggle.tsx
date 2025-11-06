import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { changeLanguage } from "../i18n";
import { useTranslation } from "react-i18next";

type Props = { style?: ViewStyle };

export default function LanguageToggle({ style }: Props) {
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const current = (i18n.language || "pt").split("-")[0] as "pt" | "es";

  const setLang = async (lang: "pt" | "es") => {
    await changeLanguage(lang);
  };

  return (
    <View
      style={[
        styles.wrap,
        style,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.divider }
      ]}
    >
      <TouchableOpacity onPress={() => setLang("pt")} accessibilityLabel="Português">
        <Text
          style={[
            styles.lang,
            { color: theme.colors.text, opacity: current === "pt" ? 1 : 0.8 }
          ]}
        >
          PT
        </Text>
      </TouchableOpacity>

      <Text style={[styles.sep, { color: theme.colors.text, opacity: 0.8 }]}>/</Text>

      <TouchableOpacity onPress={() => setLang("es")} accessibilityLabel="Español">
        <Text
          style={[
            styles.lang,
            { color: theme.colors.text, opacity: current === "es" ? 1 : 0.8 }
          ]}
        >
          ES
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1
  },
  lang: { fontSize: 12, fontWeight: "600", textDecorationLine: "underline" },
  sep: { fontSize: 12, fontWeight: "600" }
});
