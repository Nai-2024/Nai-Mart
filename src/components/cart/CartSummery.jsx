
export default function CartSummary({ subtotal, shipping, tax, total }) {
  return (
    <div className="md:col-span-1 bg-gray-100 p-3 rounded shadow h-fit">
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

      <button className="w-full bg-yellow-500 text-black p-1 rounded-full font-bold hover:bg-yellow-600 transition cursor-pointer">
        Place Order
      </button>
    </div>
  );
}
