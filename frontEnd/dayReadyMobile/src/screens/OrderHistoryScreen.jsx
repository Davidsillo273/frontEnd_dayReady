// Historial de pedidos del cliente. El modelo "Order" del backend no
// guarda el id del cliente (sólo customerName/customerContact en texto),
// así que se trae la lista completa de /orders y se filtra en el cliente
// por el correo de quien inició sesión (el mismo correo que se manda como
// customerContact al crear la orden en PaymentScreen).
import React, { useCallback, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ordersService from "../services/ordersService";
import { useAuth } from "../context/AuthContext";
import { colors, fonts, radius } from "../theme/colors";

const STATUS_COLORS = {
  entregado: colors.green,
  pendiente: colors.primary,
  "no entregado": colors.red,
};

export default function OrderHistoryScreen() {
  const { customer } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    try {
      const all = await ordersService.getAll();
      setOrders(all.filter((order) => order.customerContact === customer?.email));
    } catch (error) {
      console.warn("No se pudo cargar el historial:", error.message);
    } finally {
      setLoading(false);
    }
  }, [customer]);

  // Se recarga cada vez que la pestaña vuelve a tomar foco (por ejemplo,
  // justo después de pagar un pedido nuevo).
  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [loadOrders])
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial de pedidos</Text>
        <Text style={styles.subtitle}>Pedidos realizados con tu cuenta.</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadOrders} colors={[colors.primary]} />}
        ListEmptyComponent={!loading && <Text style={styles.empty}>Todavía no tienes pedidos.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: "https://via.placeholder.com/120x100?text=DayReady" }}
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              {item.items.map((product, index) => (
                <Text key={index} style={styles.line}>
                  <Text style={styles.bold}>{product.quantity}x</Text> {product.name}
                </Text>
              ))}
              <Text style={styles.line}>
                <Text style={styles.bold}>Pago: </Text>
                <Text style={{ color: item.estadoPago ? colors.green : colors.red }}>
                  {item.estadoPago ? "Completado" : "Pendiente"}
                </Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.bold}>Estado: </Text>
                <Text style={{ color: STATUS_COLORS[item.estado] || colors.textDark }}>{item.estado}</Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.bold}>Fecha: </Text>
                {new Date(item.fecha).toLocaleDateString("es-ES")}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  header: { backgroundColor: colors.primaryLight, padding: 24, paddingTop: 48, alignItems: "center" },
  title: { fontFamily: fonts.heading, fontSize: 18, color: colors.textDark },
  subtitle: { color: colors.primary, fontSize: 12, fontFamily: fonts.heading, marginTop: 4 },
  list: { padding: 20 },
  empty: { textAlign: "center", color: colors.textLight, marginTop: 40 },
  card: { flexDirection: "row", gap: 14, backgroundColor: colors.bgPeach, borderRadius: radius.md, padding: 14, marginBottom: 14 },
  image: { width: 90, height: 80, borderRadius: 12 },
  line: { fontSize: 13, marginBottom: 3, color: colors.textDark },
  bold: { fontFamily: fonts.heading },
});
