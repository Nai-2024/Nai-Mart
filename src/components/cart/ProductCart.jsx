import {
  getCart,
  removeFromCart,
  addToCart,
  calculateCartTotals,
} from "../../srvices/cartUtils";
import { useEffect, useContext } from "react";
import { CartContext } from "./CartProvider";
import CartItem from "./CartItem";
import CartSummary from "./CartSummery";

export default function ProductCart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  // Load cart from localStorage
  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  const increaseQuantity = (item) => {
    addToCart(item);
    setCartItems(getCart());
  };

  const decreaseQuantity = (item) => {
    const updatedCart = cartItems.map((i) =>
      i.id === item.id
        ? { ...i, quantity: Math.max((i.quantity || 1) - 1, 1) }
        : i
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1500px] p-4">
        {cartItems.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold pb-5">Items in Cart</h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="md:col-span-3 flex flex-col gap-2">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={() => increaseQuantity(item)}
                    onDecrease={() => decreaseQuantity(item)}
                    onRemove={() => handleRemove(item.id)}
                  />
                ))}
              </div>
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
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
