// Menú de navegación principal: 3 pestañas fijas abajo de la pantalla
// (Inicio / Pedidos / Perfil), igual que el BottomNav.jsx del mockup web
// pero como un Tab.Navigator real de React Navigation.
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors, fonts } from "../theme/colors";

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Inicio: "home",
  Pedidos: "file-text",
  Perfil: "user",
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: { fontFamily: fonts.heading, fontSize: 10 },
        tabBarStyle: { height: 64, paddingBottom: 10, paddingTop: 8 },
        tabBarIcon: ({ color, size }) => (
          <Feather name={TAB_ICONS[route.name]} color={color} size={size ? 22 : 22} />
        ),
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Pedidos" component={OrderHistoryScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
