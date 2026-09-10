// Botón de "continuar con Google". El mockup original lo mostraba en Login
// y Register, pero el backend todavía no tiene integración con OAuth de
// Google, así que se deja como lo que es: un botón visual que avisa que la
// función llegará después, en vez de fingir que funciona.
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors, fonts } from "../theme/colors";

export default function SocialButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <AntDesign name="google" size={18} color="#DB4437" />
      <Text style={styles.text}>Continuar con Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
  },
  text: { fontFamily: fonts.heading, fontSize: 13, color: "#444" },
});
