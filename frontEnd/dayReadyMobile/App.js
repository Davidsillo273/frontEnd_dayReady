// Punto de entrada de la app. Se mantiene lo más corto posible a propósito:
// sólo arma los providers globales (sesión, carrito) y la navegación; toda
// la lógica de cada pantalla vive en src/screens.
import React, { useCallback } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts as usePoppins, Poppins_700Bold, Poppins_800ExtraBold } from "@expo-google-fonts/poppins";
import { useFonts as useNunito, Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";

import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import RootNavigator from "./src/navigation/RootNavigator";

// Evita que Expo oculte el splash nativo hasta que las fuentes terminen de
// cargar; si no se hace esto, los textos "saltan" de la fuente del sistema
// a Poppins/Nunito apenas un instante después de abrir la app.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [poppinsLoaded] = usePoppins({ Poppins_700Bold, Poppins_800ExtraBold });
  const [nunitoLoaded] = useNunito({ Nunito_400Regular, Nunito_700Bold });
  const fontsLoaded = poppinsLoaded && nunitoLoaded;

  // Recién se oculta el splash nativo cuando el árbol de abajo ya se
  // terminó de dibujar, para no dejar un parpadeo en blanco entre el
  // splash y la pantalla de carga (LoadingScreen).
  const onLayout = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <SafeAreaProvider>
        <AuthProvider>
          <CartProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationContainer>
          </CartProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </View>
  );
}
