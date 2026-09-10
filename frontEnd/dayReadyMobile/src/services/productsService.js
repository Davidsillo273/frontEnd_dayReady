// Lectura de la colección "products" (backend/src/routes/productsRoutes.js).
// La app móvil sólo consume productos, la creación/edición es tarea del
// panel de administración web, así que aquí no se exponen esos métodos.
import { apiFetch } from "../config/api";

const productsService = {
  getAll() {
    return apiFetch("/products");
  },

  getById(productId) {
    return apiFetch(`/products/${productId}`);
  },

  getByCategory(category) {
    return apiFetch(`/products/category/${encodeURIComponent(category)}`);
  },
};

export default productsService;
