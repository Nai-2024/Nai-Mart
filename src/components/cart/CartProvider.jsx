

import { createContext, useState, useEffect } from "react";
import { getCart } from "../../srvices/cartUtils";

// Create the context
export const CartContext = createContext();

// Create a provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage when app mounts
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  // Optional: helper to update cart and context
  const updateCart = (newCart) => {
    setCartItems(newCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
