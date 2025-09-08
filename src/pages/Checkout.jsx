import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/cart/CartProvider";
import { calculateCartTotals } from "../services/cartUtils";
import CartSummary from "../components/cart/CartSummery";
import ShippingForm from "./ShippingForm";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems);
  const navigate = useNavigate();

  const handleShippingSubmit = (formData) => {
    console.log("Shipping info:", formData);
    alert("Shipping info submitted");
  };

  // Continue button
  const handleContinue = () => {
    navigate("/payment");
  };

  return (
<div className="w-full flex justify-center p-4">
  <div className="w-full max-w-[1500px] flex flex-col md:flex-row gap-2">
    {/* Shipping Form - 65% */}
    <div className="w-full md:w-2/3 px-5 py-5 bg-gray-100 rounded">
      <ShippingForm onSubmit={handleShippingSubmit} />
    </div>

    {/* Cart Summary - 35% */}
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
          onClick={handleContinue}
          className="w-full bg-yellow-500 text-black p-1 rounded-full font-bold hover:bg-yellow-600 transition cursor-pointer"
        >
          Continue
        </button>
      </CartSummary>
    </div>
  </div>
</div>

  );
}
