import { getCart } from "./cartUtils";
import { useState, useEffect } from "react";

export default function ProductCart() {
  const [cartItems, setCartItems] = useState([]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const hst = subtotal * 0.13;
  const shipping = cartItems.length > 0 ? 10.0 : 0; // No shipping if empty
  const orderTotal = subtotal + hst + shipping;

  const handleRemoveFromCart = (product) => {
    const updatedCart = cartItems.filter(
      (item) => item.title !== product.title
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQuantity = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.title === product.title
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQuantity = (product) => {
    const updatedCart = cartItems.map((item) =>
      item.title === product.title
        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Load cart from localStorage
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  return (
    <div className="p-4">
      {cartItems.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold pb-5">Items in Cart</h2>

          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-2">
            {/* LEFT SIDE - CART ITEMS */}
            <div className="md:col-span-3">
              <div className="flex flex-col gap-2">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-200 p-4 rounded shadow flex flex-col md:flex-row min-h-[220px] h-auto"
                  >
                    {/* Product Image */}
                    <div className="md:w-1/3 flex justify-center items-start mb-4 md:mb-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full max-w-[120px] h-auto object-contain rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-2/3 flex flex-col flex-1 pr-3">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-700 text-sm pt-2 flex-grow break-words">
                        {item.description}
                      </p>

                      {/* Add More + Price */}
                      <div className="flex justify-between items-center mt-auto pb-1 gap-2">
                        {/* Add Again Button */}
                        <div className="flex items-center gap-2">
                          {/* Decrease Button */}
                          <button
                            className="w-8 h-8 flex items-center justify-center bg-gray-300 text-black rounded-full hover:bg-gray-400 transition cursor-pointer"
                            onClick={() => decreaseQuantity(item)}
                          >
                            –
                          </button>

                          {/* Quantity Display */}
                          <span className="px-3 py-1 ">
                            {item.quantity || 1}
                          </span>

                          {/* Increase Button */}
                          <button
                            className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition cursor-pointer"
                            onClick={() => increaseQuantity(item)}
                          >
                            +
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          className="bg-red-500 text-white px-5 rounded-full hover:bg-red-600 transition cursor-pointer"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          Delete
                        </button>

                        {/* Price */}
                        <span className="text-yellow-600 font-bold">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - SUMMARY */}
            <div className="md:col-span-1 bg-gray-200 p-3 rounded shadow h-fit">
              {/* Price Breakdown */}
              <div>
                <div className="flex justify-between text-gray-700 text-sm pt-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-sm pt-2">
                  <span>HST (13%)</span>
                  <span>${hst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pb-2 text-gray-700 text-sm pt-2">
                  <span>Shipping & Handling</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              </div>

              <hr className="pb-2" />

              {/* Total */}
              <div className="flex justify-between font-bold pb-4">
                <span>Order Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>

              {/* Place Order Button */}
              <button className="w-full bg-yellow-500 text-black p-1 rounded-full font-bold hover:bg-yellow-600 transition cursor-pointer">
                Place Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      )}
    </div>
  );
}
