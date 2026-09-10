// Control de "-  cantidad  +" usado en el detalle de producto y en el
// carrito. Sólo dispara onChange con el nuevo valor; quien lo use decide
// qué hacer (por ejemplo, CartContext elimina el item si llega a 0).
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fonts } from "../theme/colors";

export default function QuantityControl({ value, onChange, min = 1 }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.btn} onPress={() => onChange(value - 1)} disabled={value <= min}>
        <Text style={styles.symbol}>−</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => onChange(value + 1)}>
        <Text style={styles.symbol}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E0E0E8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  symbol: { fontSize: 18, fontWeight: "600", color: colors.textDark },
  value: { fontFamily: fonts.heading, fontSize: 16, color: colors.textDark, minWidth: 20, textAlign: "center" },
});
