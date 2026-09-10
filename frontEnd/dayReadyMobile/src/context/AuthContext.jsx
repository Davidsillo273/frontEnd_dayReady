// Contexto global de sesión. Guarda el cliente que inició sesión y expone
// login/logout a toda la app, para no tener que pasar props de pantalla en
// pantalla.
//
// Nota sobre cómo se maneja la sesión: el backend guarda el JWT en una
// cookie httpOnly (authCookie) y todavía no tiene un middleware que valide
// esa cookie en las rutas de "customers" (no hay endpoint tipo "/me"). Por
// eso, en vez de decodificar un token, guardamos localmente el correo del
// cliente que inició sesión y con eso pedimos su perfil completo a
// /customers?email=. Es el mismo patrón que ya usa la web de clientes con
// localStorage.getItem('customerId'), sólo que aquí usamos AsyncStorage
// porque no existe localStorage en React Native.
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/authService";
import customersService from "../services/customersService";

const SESSION_KEY = "dayready:lastEmail";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  // Al abrir la app, si ya había una sesión guardada, se recupera el
  // perfil del cliente para no obligarlo a iniciar sesión cada vez.
  useEffect(() => {
    (async () => {
      try {
        const savedEmail = await AsyncStorage.getItem(SESSION_KEY);
        if (savedEmail) {
          const matches = await customersService.getByEmail(savedEmail);
          if (matches?.[0]) setCustomer(matches[0]);
        }
      } catch (error) {
        // Si el backend no responde al abrir la app, simplemente se queda
        // sin sesión restaurada; el usuario puede iniciar sesión de nuevo.
        console.warn("No se pudo restaurar la sesión:", error.message);
      } finally {
        setIsRestoringSession(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    await authService.login(email, password); // deja la cookie de sesión
    const matches = await customersService.getByEmail(email);
    if (!matches?.[0]) {
      throw new Error("No se encontró el perfil del cliente.");
    }
    setCustomer(matches[0]);
    await AsyncStorage.setItem(SESSION_KEY, email);
    return matches[0];
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setCustomer(null);
      await AsyncStorage.removeItem(SESSION_KEY);
    }
  };

  // Se usa después de editar el perfil o de sumar saldo, para que toda la
  // app vea los datos actualizados sin tener que volver a iniciar sesión.
  const refreshProfile = async () => {
    if (!customer?.email) return;
    const matches = await customersService.getByEmail(customer.email);
    if (matches?.[0]) setCustomer(matches[0]);
  };

  return (
    <AuthContext.Provider
      value={{ customer, isRestoringSession, login, logout, refreshProfile, setCustomer }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
