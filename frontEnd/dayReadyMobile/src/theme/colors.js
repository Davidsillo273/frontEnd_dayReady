// Paleta única de la app. Se centraliza aquí para no repetir códigos de
// color sueltos por cada pantalla (mismos valores que ya usaba el mockup
// web en styles/globals.css, para mantener la identidad visual del
// proyecto al pasarlo a React Native).
export const colors = {
  primary: "#F4A261",
  primaryLight: "#FDEBD0",
  primaryDark: "#E07B39",
  green: "#4CAF50",
  greenLight: "#C8E6C9",
  greenDark: "#388E3C",
  red: "#F44336",
  textDark: "#1A1A2E",
  textMedium: "#555577",
  textLight: "#888899",
  white: "#FFFFFF",
  bgLight: "#FFF8F3",
  bgPeach: "#FFF0E6",
  border: "#E8E8F0",
  inputBg: "#F8F8FC",
};

// Radios y sombras reutilizados por varios componentes (tarjetas, botones,
// hojas modales) para que todo comparta el mismo lenguaje visual.
export const radius = {
  sm: 10,
  md: 16,
  lg: 28,
};

export const shadow = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  soft: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
};

export const fonts = {
  // Nunito y Poppins se cargan en App.js con expo-font; mientras cargan,
  // React Native usa la fuente del sistema como respaldo automáticamente.
  body: "Nunito_400Regular",
  bodyBold: "Nunito_700Bold",
  heading: "Poppins_700Bold",
  headingExtra: "Poppins_800ExtraBold",
};
