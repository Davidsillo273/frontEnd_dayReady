// Configuración de la conexión con el backend de DayReady.
//
// El backend corre en Express, escucha en el puerto 4000 y todas sus rutas
// cuelgan del prefijo "/api" (ver backend/app.js). En web "localhost"
// funciona porque el navegador y el backend viven en la misma máquina, pero
// en un celular o emulador "localhost" apunta al propio dispositivo, no a
// la PC donde corre el backend. Por eso el host cambia según la plataforma:
//
//   - Emulador de Android: 10.0.2.2 es un alias especial que sí resuelve a
//     la máquina anfitriona (esto lo define el propio emulador, no nosotros).
//   - iOS Simulator y la versión web de Expo: pueden usar localhost porque
//     comparten red con la PC.
//   - Celular físico (Expo Go): ninguno de los anteriores funciona, hay que
//     poner la IP de la PC en la red local (ej. 192.168.1.10). Se puede ver
//     con "ipconfig" en Windows. Se deja como variable para cambiarla rápido.
import { Platform } from "react-native";

// 👉 Si vas a probar en un celular físico, reemplaza esta IP por la de tu
// computadora dentro de la red local (la misma donde corre "node index.js").
const LAN_IP = "192.168.1.10";

function resolveHost() {
  if (Platform.OS === "android") return "10.0.2.2";
  if (Platform.OS === "web" || Platform.OS === "ios") return "localhost";
  return LAN_IP;
}

export const API_BASE_URL = `http://${resolveHost()}:4000/api`;

// Envoltorio sobre fetch que ya deja listo lo que se repite en cada
// llamada: la URL base, el header de JSON y el envío de cookies de sesión
// (credentials: "include", indispensable porque el login guarda un JWT en
// una cookie httpOnly y no en el cuerpo de la respuesta).
export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // El backend siempre responde en JSON (incluso en los errores), así que
  // lo parseamos una sola vez aquí en lugar de repetirlo en cada servicio.
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Los controladores del backend mandan { message: "..." } al fallar.
    const message = data?.message || "Ocurrió un error al conectar con el servidor.";
    throw new Error(message);
  }

  return data;
}
