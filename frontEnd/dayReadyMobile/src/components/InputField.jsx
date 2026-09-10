// Campo de texto reutilizable para todos los formularios (login, registro,
// perfil, checkout...). Soporta mostrar/ocultar contraseña y un mensaje de
// error debajo, para que las validaciones (ver src/utils/validators.js) se
// vean directamente en el formulario en vez de con un alert genérico.
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, fonts } from "../theme/colors";

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  editable = true,
  multiline = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View style={styles.group}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
          editable={editable}
          multiline={multiline}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={10}>
            <Feather name={showPassword ? "eye-off" : "eye"} size={18} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 16 },
  label: { fontFamily: fonts.heading, fontSize: 14, color: colors.textDark, marginBottom: 6 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  inputError: { borderColor: colors.red },
  input: { flex: 1, paddingVertical: 14, fontFamily: fonts.body, fontSize: 14, color: colors.textDark },
  multiline: { minHeight: 80, textAlignVertical: "top" },
  errorText: { color: colors.red, fontSize: 12, marginTop: 4, fontFamily: fonts.body },
});
