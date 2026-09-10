// CRUD sobre "carts" (backend/src/routes/cartRoutes.js). El carrito se
// arma en memoria mientras el estudiante navega (ver CartContext) y recién
// se guarda en la base de datos al llegar a Checkout, que es cuando de
// verdad hace falta persistirlo. items va como [{ productoId, cantidad }];
// el backend es quien calcula subtotal/total/totalFinal, así que aquí no
// se duplica esa cuenta.
import { apiFetch } from "../config/api";

const cartService = {
  create(customerId, items, descuentos = 0) {
    return apiFetch("/cart", {
      method: "POST",
      body: JSON.stringify({ customerId, items, descuentos }),
    });
  },

  getById(cartId) {
    return apiFetch(`/cart/${cartId}`);
  },

  update(cartId, items, descuentos = 0) {
    return apiFetch(`/cart/${cartId}`, {
      method: "PUT",
      body: JSON.stringify({ items, descuentos }),
    });
  },

  remove(cartId) {
    return apiFetch(`/cart/${cartId}`, { method: "DELETE" });
  },
};

export default cartService;
