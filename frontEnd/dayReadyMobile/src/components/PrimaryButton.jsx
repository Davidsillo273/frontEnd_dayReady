// Botón principal reutilizado en casi todas las pantallas. "variant" cambia
// el color (naranja para la mayoría de acciones, verde para
// registro/confirmaciones), y "loading" deshabilita el botón y muestra un
// spinner mientras se espera la respuesta del backend.
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors, radius, fonts } from "../theme/colors";

export default function PrimaryButton({ title, onPress, variant = "primary", loading = false, disabled = false, style }) {
  const isDisabled = disabled || loading;
  const backgroundColor = variant === "green" ? colors.green : colors.primary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, opacity: isDisabled ? 0.6 : 1 }, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: colors.white, fontFamily: fonts.heading, fontSize: 15 },
});
