// Detalle de un producto. Recibe el producto por parámetro de navegación
// (route.params.product) para no tener que pedirlo de nuevo si ya se tenía
// a mano en Home; "los demás también compraron" sí se trae fresco del
// backend, filtrando por la misma categoría.
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import QuantityControl from "../components/QuantityControl";
import PrimaryButton from "../components/PrimaryButton";
import productsService from "../services/productsService";
import { useCart } from "../context/CartContext";
import { colors, fonts } from "../theme/colors";

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    productsService
      .getByCategory(product.category)
      .then((list) => setRelated(list.filter((p) => p._id !== product._id).slice(0, 5)))
      .catch(() => setRelated([])); // si no hay más de esa categoría, simplemente no se muestra la sección
  }, [product]);

  const handleContinue = () => {
    cart.addItem(product, quantity);
    navigation.navigate("Checkout");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Image source={{ uri: product.image }} style={styles.heroImage} />
        <TouchableOpacity style={[styles.roundButton, styles.backButton]} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color={colors.textDark} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, styles.likeButton]} onPress={() => setLiked(!liked)}>
          <Feather name="heart" size={20} color={liked ? colors.primary : "#333"} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.details}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.stock}>{product.quantity} disponibles</Text>
        <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {related.length > 0 && (
          <>
            <Text style={styles.relatedTitle}>Los demás también compraron</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
              {related.map((r) => (
                <TouchableOpacity
                  key={r._id}
                  style={{ width: 110 }}
                  onPress={() => navigation.push("ProductDetail", { product: r })}
                >
                  <Image source={{ uri: r.image }} style={styles.relatedImage} />
                  <Text style={styles.relatedPrice}>${Number(r.price).toFixed(2)}</Text>
                  <Text style={styles.relatedName} numberOfLines={1}>{r.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomBarQty}>{quantity} producto{quantity > 1 ? "s" : ""}</Text>
          <Text style={styles.bottomBarTotal}>${(product.price * quantity).toFixed(2)}</Text>
        </View>
        <View style={styles.bottomBarActions}>
          <QuantityControl value={quantity} onChange={setQuantity} />
          <PrimaryButton title="Continuar" onPress={handleContinue} style={{ width: "auto", paddingHorizontal: 24 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  hero: { height: 300 },
  heroImage: { width: "100%", height: "100%" },
  roundButton: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  backButton: { top: 48, left: 16 },
  likeButton: { bottom: 16, left: 16 },
  details: { padding: 20, paddingBottom: 40 },
  categoryBadge: { alignSelf: "flex-start", backgroundColor: colors.primary, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 10 },
  categoryText: { color: colors.white, fontSize: 11, fontFamily: fonts.heading },
  name: { fontFamily: fonts.headingExtra, fontSize: 22, color: colors.textDark, marginBottom: 4 },
  stock: { fontSize: 12, color: "#999", marginBottom: 4 },
  price: { fontFamily: fonts.heading, fontSize: 18, color: colors.textDark, marginBottom: 12 },
  description: { fontSize: 13, color: "#666", lineHeight: 22, marginBottom: 24 },
  relatedTitle: { fontFamily: fonts.heading, fontSize: 14, color: colors.textDark, marginBottom: 14 },
  relatedImage: { width: 110, height: 90, borderRadius: 12 },
  relatedPrice: { fontFamily: fonts.heading, fontSize: 13, color: colors.textDark, marginTop: 6 },
  relatedName: { fontSize: 11, color: "#888" },
  bottomBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, backgroundColor: colors.white, elevation: 6 },
  bottomBarQty: { fontSize: 12, color: "#999" },
  bottomBarTotal: { fontFamily: fonts.heading, fontSize: 16, color: colors.textDark },
  bottomBarActions: { flexDirection: "row", alignItems: "center", gap: 16 },
});
