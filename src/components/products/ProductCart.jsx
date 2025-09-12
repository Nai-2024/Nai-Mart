// this is the parent component that serves as controller of the cart.

import { getCart, calculateCartTotals, } from "../../services/cartUtils";
import { useEffect, useContext } from "react";
import { CartContext } from "../cart/CartProvider";
import CartItem from "../cart/CartItem";
import CartSummary from "../cart/CartSummery";

export default function ProductCart() {
  const { cartItems, setCartItems } = useContext(CartContext); // Keeps track of the current items in the cart. Updates the cart when items are added, removed, or quantity is changed.

  // Load cart from localStorage
 useEffect(() => {
  const items = getCart(); // Fetch the cart items from localStorage
  setCartItems(items);     // Update the cart state in context
}, []); // Prevent overwriting cart state during re-renders. see details at the bottom of the page.

// Function to update the cart items based on action
const updateCart = (itemId, action) => {
  // Make a copy of the current cart items
  let updatedCart = [...cartItems];

  // Increase quantity
  if (action === "increase") {
    updatedCart = updatedCart.map(function(item) {
      if (item.id === itemId) {
        // If quantity exists, increase by 1, otherwise start from 1
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
  }

  // Decrease quantity
  if (action === "decrease") {
    updatedCart = updatedCart.map(function(item) {
      if (item.id === itemId) {
        // Decrease quantity but do not go below 1
        return { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) };
      }
      return item;
    });
  }

  // Remove item from cart
  if (action === "remove") {
    updatedCart = updatedCart.filter(function(item) {
      return item.id !== itemId;
    });
  }

  // Update state and localStorage
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

// This comes from cartUtils.js 
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems);

  return (
      <div className="w-full flex justify-center p-4">
    <div className="w-full max-w-[1400px]">
        {cartItems.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold pb-2">Items in Cart</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="md:col-span-3 flex flex-col gap-4">
                {/* rendering CartItem component*/}
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={() => updateCart(item.id, "increase")}
                    onDecrease={() => updateCart(item.id, "decrease")}
                    onRemove={() => updateCart(item.id, "remove")}
                  />
                ))}
              </div>
              {/* rendering CartSummary component*/}
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                className="bg-gray-100 rounded shadow" // parent controls card style
              />
            </div>
          </div>
        ) : (
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
        )}
      </div>
    </div>
  );
}


/*
Load cart from localStorage
useEffect(() => {
  const items = getCart(); // Fetch the cart items from localStorage
  setCartItems(items);     // Update the cart state in context
}, []); // 

The empty array [] as the second argument ensures that this runs only once, when the component mounts.If we don’t pass [] here, this will runs after every render, which would overwrite any cart changes

Example of what happens
User adds 2 items to the cart and refreshes the page.
Without this useEffect:
cartItems resets to [], losing all previous items.
With this useEffect:
getCart() retrieves the saved cart from localStorage.
setCartItems(items) restores the cart in the UI.

*/