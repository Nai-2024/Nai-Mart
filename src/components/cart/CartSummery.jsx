// This component renders subtotal, HST, Shiiping and Total order.
// The props (subtotal, shipping, tax, total) automatically comes from parent componnent - ProductCart.

import { useNavigate } from "react-router";

export default function CartSummary({
  subtotal,
  shipping,
  tax,
  total,
  showCheckoutButton = true,
  children, // allow custom buttons
  className = "", // parent will confroll styling cart Summary section
}) {

  const navigate = useNavigate();

  return (
    <div className={`md:col-span-1 p-3 h-fit ${className}`}>
      {/* Subtotal, tax, shipping */}
      <div className="flex justify-between text-gray-700 text-sm pt-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-700 text-sm pt-2">
        <span>HST (13%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between pb-2 text-gray-700 text-sm pt-2">
        <span>Shipping & Handling</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      <hr className="pb-2" />

      <div className="flex justify-between font-bold pb-4">
        <span>Order Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Only show button if prop is true */}
      {showCheckoutButton && (
        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-yellow-500 text-black p-1 rounded-full font-bold hover:bg-yellow-600 transition cursor-pointer"
        >
          Proceed to checkout
        </button>
      )}

      {/* Custom button(s) passed from parent */}
      {children}
    </div>
  );
}