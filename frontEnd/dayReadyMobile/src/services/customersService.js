// CRUD sobre la colección "customers" (backend/src/routes/customerRoutes.js).
// No existe un endpoint "/me", así que el perfil del cliente logueado se
// busca filtrando por correo (getByEmail), tal como ya lo hace la web de
// clientes con localStorage. El resultado nunca trae "password" porque el
// backend lo excluye con .select("-password").
import { apiFetch } from "../config/api";

const customersService = {
  getByEmail(email) {
    return apiFetch(`/customers?email=${encodeURIComponent(email)}`);
  },

  updateProfile(customerId, changes) {
    return apiFetch(`/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(changes),
    });
  },

  // Suma saldo a la DayWallet del cliente (billetera digital del proyecto).
  addBalance(customerId, amount) {
    return apiFetch(`/customers/${customerId}/balance`, {
      method: "PATCH",
      body: JSON.stringify({ amount }),
    });
  },
};

export default customersService;
