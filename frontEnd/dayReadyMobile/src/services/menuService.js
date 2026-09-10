// Menú del día (backend/src/routes/dailyMenuRoutes.js). Se usa en Home para
// la sección "Destacados", que en el mockup original era data quemada.
import { apiFetch } from "../config/api";

const menuService = {
  getAll() {
    return apiFetch("/menu");
  },

  getByDay(dayOfWeek) {
    return apiFetch(`/menu/day/${dayOfWeek}`);
  },
};

export default menuService;
