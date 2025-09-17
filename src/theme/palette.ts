export type ThemeMode = "light" | "dark";

export const DARK_PALETTE = {
  background: "#000000",
  surface: "rgba(255,255,255,0.06)",
  surfaceAlt: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  textMuted: "#CCCCCC",
  primary: "#00B131",
  danger: "#FF4D4D",
  divider: "#1f1f1f",
};

export const LIGHT_PALETTE = {
  background: "#FFFFFF",
  surface: "rgba(0,0,0,0.04)",
  surfaceAlt: "rgba(0,0,0,0.06)",
  text: "#111111",
  textMuted: "#5A5A5A",
  primary: "#00B131",
  danger: "#D62828",
  divider: "#E6E6E6",
};

export type ThemeColors = typeof DARK_PALETTE;

export type Theme = {
  mode: ThemeMode;
  colors: ThemeColors;
};
