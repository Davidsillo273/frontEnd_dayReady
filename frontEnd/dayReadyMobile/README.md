# DayReady Móvil

Aplicación móvil del proyecto **DayReady** (sistema de pedidos anticipados
para el comedor del instituto), hecha con **Expo / React Native**. Permite a
los estudiantes explorar el catálogo de comida, apartar productos, pagar y
llevar el registro de sus pedidos desde el celular, conectándose al mismo
backend que usa la versión web del proyecto.

## Integrantes

- Fernando Javier Guerrero Iraheta
- David Eduardo Guardado Castro
- Ivanya Nolazco Cabrera

**Módulo:** 5 — Desarrollo de componentes para dispositivos móviles
**Docente:** Daniel Wilfredo Granados Hernández

## Tecnologías y dependencias principales

| Paquete | Para qué se usa |
|---|---|
| `expo` | Entorno base (managed workflow) de la app |
| `react-native` | Framework de UI para móvil |
| `@react-navigation/native`, `native-stack`, `bottom-tabs` | Navegación entre pantallas y menú inferior (Inicio / Pedidos / Perfil) |
| `react-native-screens`, `react-native-safe-area-context` | Dependencias nativas que exige React Navigation |
| `react-native-svg` | Dibuja el logo y las cabeceras "de ola" del diseño |
| `@react-native-async-storage/async-storage` | Guarda la sesión del cliente en el dispositivo (equivalente a `localStorage` en la web) |
| `expo-splash-screen` | Splash screen nativo personalizado con el logo de la marca |
| `expo-font`, `@expo-google-fonts/poppins`, `@expo-google-fonts/nunito` | Tipografías del diseño (Poppins para títulos, Nunito para texto) |
| `@expo/vector-icons` | Íconos (viene incluido con Expo, no se instala aparte) |

No se usa Redux ni ninguna librería de manejo de estado externa: la sesión y
el carrito se manejan con Context API (`src/context`), que alcanza de sobra
para el tamaño de la app.

## Estructura del proyecto

```
App.js                  Punto de entrada: providers + navegación (sin lógica de pantallas)
app.json                Configuración de Expo (nombre, íconos, splash)
assets/                 Íconos y splash generados a partir del logo real de la marca
src/
  config/api.js         URL base del backend + helper de fetch con cookies
  context/               Sesión (AuthContext) y carrito (CartContext)
  navigation/             Stack raíz + Tab menú principal
  screens/                Una pantalla por archivo
  components/             Piezas de UI reutilizables (botones, tarjetas, inputs...)
  services/               Una función por endpoint del backend
  utils/validators.js     Validaciones de formularios (mismas reglas que el backend)
  theme/colors.js         Paleta, radios y sombras compartidas
```

## Conexión con el backend

El backend (carpeta `../../backend`) debe estar corriendo en el puerto
`4000` (`node index.js` o `npm run dev` dentro de esa carpeta).

La URL del backend se resuelve automáticamente en `src/config/api.js` según
la plataforma:

- **Android (emulador):** `http://10.0.2.2:4000/api` — es el alias que usa
  el propio emulador de Android para apuntar a la PC anfitriona.
- **iOS Simulator / Expo Web:** `http://localhost:4000/api`.
- **Celular físico (Expo Go):** ninguno de los anteriores funciona porque el
  celular y la PC son dispositivos distintos en la red. Hay que editar la
  constante `LAN_IP` en `src/config/api.js` con la IP de la PC dentro de la
  red local (se obtiene con `ipconfig` en Windows, buscando la "Dirección
  IPv4" del adaptador Wi-Fi).

La sesión del cliente se maneja por cookie (el login del backend deja un JWT
en una cookie httpOnly), así que no hace falta guardar ningún token
manualmente; React Native reenvía esa cookie solo en cada petición.

## Cómo correrlo

```bash
cd frontEnd/dayReadyMobile
npm install
npx expo start
```

Desde ahí se puede abrir con Expo Go escaneando el código QR (celular
físico), o presionar `a` / `w` en la terminal para abrir el emulador de
Android o la versión web.

## Notas de alcance

- El login con Google y el pago con tarjeta son simulaciones visuales,
  porque el backend todavía no tiene esas integraciones (no hay OAuth de
  Google ni rutas para Wompi). Al "pagar", sí se crea una orden real en la
  base de datos y se limpia el carrito.
- El historial de pedidos filtra las órdenes por el correo del cliente
  logueado porque el modelo `Order` del backend aún no guarda una
  referencia directa al cliente, solo su nombre y contacto en texto.
