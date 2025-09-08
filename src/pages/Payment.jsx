import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/cart/CartProvider";
import { getCart, calculateCartTotals } from "../services/cartUtils";
import CartSummary from "../components/cart/CartSummery";

export default function Payment() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  // Calculate totals
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems);

  const [paymentData, setPaymentData] = useState({
    cardholder: "",
    cardType: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment info:", paymentData);
    alert("Payment submitted!");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1500px] flex flex-col md:flex-row gap-2 p-4">
        {/* Payment Form - 65% */}
        <div className="w-full md:w-2/3 p-5 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold pb-4">Payment Details</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Cardholder Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Cardholder Name</label>
              <input
                type="text"
                name="cardholder"
                value={paymentData.cardholder}
                onChange={handleChange}
                placeholder="Your Name"
                className="border border-gray-400 p-2 rounded"
                required
              />
            </div>

            {/* Card Type */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Card Type</label>
              <select
                name="cardType"
                value={paymentData.cardType}
                onChange={handleChange}
                className="border border-gray-400 p-2 rounded"
                required
              >
                <option value="" className="text-gray-400" disabled>
                  Select Card Type
                </option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Amex">American Express</option>
              </select>
            </div>

            {/* Card Number */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="border border-gray-400 p-2 rounded"
                required
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Expiry</label>
                <input
                  type="text"
                  name="expiry"
                  value={paymentData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="border border-gray-400 p-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleChange}
                  placeholder="***"
                  className="border border-gray-400 p-2 rounded"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* Cart Summary + Continue - 35% */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            showCheckoutButton={false}
            className="bg-gray-100 rounded shadow"
          >
            <button
              onClick={() => navigate("/order-confirmation")}
              className="w-full bg-yellow-500 text-black p-2 rounded-full font-bold hover:bg-yellow-600 transition cursor-pointer"
            >
              Pay Now
            </button>
          </CartSummary>
        </div>
      </div>
    </div>
  );
}
