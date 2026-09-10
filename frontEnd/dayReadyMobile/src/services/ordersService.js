// CRUD sobre "orders" (backend/src/routes/orderRoutes.js). El modelo de
// orden no guarda el id del cliente, sólo "customerName" y
// "customerContact" (texto libre), así que para el historial de pedidos
// guardamos el correo del cliente en customerContact al crear la orden y
// filtramos por ese mismo correo al listar (ver OrderHistoryScreen).
import { apiFetch } from "../config/api";

const ordersService = {
  getAll() {
    return apiFetch("/orders");
  },

  getById(orderId) {
    return apiFetch(`/orders/${orderId}`);
  },

  create({ customerName, customerContact, items, total }) {
    return apiFetch("/orders", {
      method: "POST",
      body: JSON.stringify({
        customerName,
        customerContact,
        items,
        total,
        estadoPago: true, // en la app se paga antes de crear la orden
      }),
    });
  },

  updateStatus(orderId, estado) {
    return apiFetch(`/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ estado }),
    });
  },
};

export default ordersService;
