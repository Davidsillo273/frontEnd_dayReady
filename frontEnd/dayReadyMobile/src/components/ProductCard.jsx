// Tarjeta de producto usada en la grilla de Home. "product" viene tal cual
// lo devuelve el backend (name, price, category, image...).
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, radius, fonts, shadow } from "../theme/colors";

export default function ProductCard({ product, onAdd, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View>
        <Image
          source={{ uri: product.image || "https://via.placeholder.com/300x180?text=DayReady" }}
          style={styles.image}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.category}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={10} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>{product.type || "Cafetería"}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={(event) => {
              event.stopPropagation?.();
              onAdd(product);
            }}
          >
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: "48%", backgroundColor: colors.white, borderRadius: radius.md, overflow: "hidden", ...shadow.card },
  image: { width: "100%", height: 110 },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: { color: colors.white, fontSize: 10, fontFamily: fonts.heading },
  body: { padding: 10 },
  name: { fontFamily: fonts.heading, fontSize: 13, color: colors.textDark, marginBottom: 2 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 8 },
  locationText: { fontSize: 11, color: colors.textLight },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontFamily: fonts.heading, fontSize: 15, color: colors.textDark },
  addButton: { backgroundColor: colors.primary, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14 },
  addButtonText: { color: colors.white, fontSize: 12, fontFamily: fonts.heading },
});
