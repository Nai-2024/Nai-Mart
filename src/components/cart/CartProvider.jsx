
// Provides global cart state
// 
import { createContext, useState, useEffect } from "react";
import { getCart } from "../../services/cartUtils";

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// Create a provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // cartItems → current items in the cart. setCartItems → function to update cart items. 

  // Load cart from localStorage when app mounts
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  // Helper to update cart and context
  const updateCart = (newCart) => {
    setCartItems(newCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
