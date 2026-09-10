// Contexto del carrito de compras. Mientras el estudiante navega por el
// catálogo el carrito vive sólo en memoria (no tiene sentido crear un
// registro en la base de datos por cada producto que toca "Agregar"); recién
// se guarda en el backend cuando llega a Checkout, y ahí sí queda un
// documento real en la colección "carts" que se puede actualizar o borrar.
import React, { createContext, useContext, useMemo, useState } from "react";
import cartService from "../services/cartService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ productId, name, image, price, cantidad }]
  const [cartId, setCartId] = useState(null); // id de Mongo una vez creado en el backend

  const addItem = (product, cantidad = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product._id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product._id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          cantidad,
        },
      ];
    });
  };

  const updateQuantity = (productId, cantidad) => {
    if (cantidad <= 0) return removeItem(productId);
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, cantidad } : i)));
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setCartId(null);
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.cantidad, 0),
    [items]
  );

  // Guarda (o actualiza, si ya existía) el carrito en el backend. Se llama
  // al entrar a Checkout, para que el pedido quede respaldado en la base de
  // datos antes de pasar a la pantalla de pago.
  const persistCart = async (customerId) => {
    const payloadItems = items.map((i) => ({ productoId: i.productId, cantidad: i.cantidad }));

    if (cartId) {
      const { cart } = await cartService.update(cartId, payloadItems);
      return cart;
    }

    const cart = await cartService.create(customerId, payloadItems);
    setCartId(cart._id);
    return cart;
  };

  // Se llama después de pagar: la orden ya quedó creada, así que el
  // carrito temporal en la base de datos ya no hace falta (delete real).
  const discardPersistedCart = async () => {
    if (cartId) {
      await cartService.remove(cartId).catch(() => {});
    }
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        cartId,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        persistCart,
        discardPersistedCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
