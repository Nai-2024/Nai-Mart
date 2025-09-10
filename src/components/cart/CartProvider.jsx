
// Provides global cart state
// 
import { createContext, useState, useEffect } from "react";
import { getCart } from "../../services/cartUtils";

// Create the context
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
    localStorage.setItem("cart", JSON.stringify(newCart)); // ✅ keep storage in sync
  };


    // New: clear the cart completely
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

 return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, updateCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
