// Pago con tarjeta. El backend todavía no tiene integrado un pasarela real
// (las llaves de Wompi existen en config.js pero no hay controlador/rutas
// para eso todavía), así que el pago en sí se simula como en el mockup
// original. Lo que sí es real es que, al "pagar", se crea una orden de
// verdad en /orders y se borra el carrito temporal de /cart.
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import ordersService from "../services/ordersService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { colors, fonts } from "../theme/colors";

function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

export default function PaymentScreen({ route, navigation }) {
  const { pickupTime } = route.params;
  const { customer } = useAuth();
  const cart = useCart();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holder, setHolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // guarda el total pagado para la pantalla final

  const handlePay = async () => {
    if (!cardNumber || !expiry || !cvc || !holder) {
      Alert.alert("Datos incompletos", "Completa todos los campos de la tarjeta.");
      return;
    }

    setLoading(true);
    try {
      await ordersService.create({
        customerName: `${customer.name} ${customer.lastName}`,
        customerContact: customer.email,
        items: cart.items.map((i) => ({ name: i.name, quantity: i.cantidad, price: i.price })),
        total: cart.total,
      });
      const paidTotal = cart.total;
      await cart.discardPersistedCart();
      setSuccess(paidTotal);
    } catch (error) {
      Alert.alert("No se pudo procesar el pago", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success !== null) {
    return (
      <View style={styles.successScreen}>
        <View style={styles.successIcon}>
          <Feather name="check" size={44} color={colors.green} />
        </View>
        <Text style={styles.successTitle}>¡Pago exitoso!</Text>
        <Text style={styles.successSubtitle}>Tu pedido fue confirmado para las {pickupTime}.</Text>
        <Text style={styles.successTotal}>${success.toFixed(2)}</Text>
        <PrimaryButton title="Volver al inicio" onPress={() => navigation.navigate("Main", { screen: "Inicio" })} />
        <TouchableOpacity onPress={() => navigation.navigate("Main", { screen: "Pedidos" })} style={{ marginTop: 16 }}>
          <Text style={styles.successLink}>Ver mis pedidos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <InputField
          label="Número de tarjeta"
          placeholder="1234 5678 9123 0000"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={(v) => setCardNumber(formatCardNumber(v))}
        />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <InputField label="Vencimiento" placeholder="MM/AA" value={expiry} onChangeText={(v) => setExpiry(formatExpiry(v))} />
          </View>
          <View style={{ flex: 1 }}>
            <InputField
              label="CVC"
              placeholder="•••"
              keyboardType="number-pad"
              value={cvc}
              onChangeText={(v) => setCvc(v.replace(/\D/g, "").slice(0, 3))}
            />
          </View>
        </View>
        <InputField label="Nombre del titular" placeholder="Nombre completo" value={holder} onChangeText={setHolder} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${cart.total.toFixed(2)}</Text>
        </View>

        <PrimaryButton title={`Pagar $${cart.total.toFixed(2)}`} onPress={handlePay} loading={loading} />

        <View style={styles.securityRow}>
          <Feather name="shield" size={16} color={colors.primary} />
          <Text style={styles.securityText}>Pago seguro, respaldado por encriptación SSL</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primaryLight },
  card: { backgroundColor: colors.white, borderRadius: 24, padding: 20 },
  row: { flexDirection: "row", gap: 12 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#F0F0F8", marginBottom: 16 },
  totalLabel: { fontFamily: fonts.heading, fontSize: 15, color: colors.textDark },
  totalValue: { fontFamily: fonts.headingExtra, fontSize: 18, color: colors.textDark },
  securityRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 16 },
  securityText: { fontSize: 12, color: colors.textDark, flex: 1 },
  successScreen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: colors.white },
  successIcon: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#E8F5E9", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  successTitle: { fontFamily: fonts.headingExtra, fontSize: 22, color: colors.textDark, marginBottom: 8 },
  successSubtitle: { color: "#888", fontSize: 14, marginBottom: 8, textAlign: "center" },
  successTotal: { fontFamily: fonts.heading, fontSize: 20, color: colors.primary, marginBottom: 32 },
  successLink: { color: colors.primary, fontFamily: fonts.heading, fontSize: 14 },
});
