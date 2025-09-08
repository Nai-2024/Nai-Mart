import { useLocation } from "react-router-dom";
import { CartContext } from "../components/cart/CartProvider";
import { useContext } from "react";
import CartSummary from "../components/cart/CartSummery";
import { calculateCartTotals } from "../services/cartUtils";

export default function OrderConfirmation() {
  const location = useLocation();
  const { cartItems } = useContext(CartContext);

  // shippingData was saved from ShippingForm → navigate("/payment", { state: { shippingData } })
  const shippingData = location.state?.shippingData || {};
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems);

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-[1500px] flex flex-col md:flex-row gap-2">
        {/* LEFT SIDE - Order Details */}
        <div className="w-full md:w-2/3 flex flex-col gap-6 bg-gray-100 rounded shadow p-4">
          {/* Order Info, Shipping Info, Items */}
          <h2 className="text-2xl font-bold text-green-600 text-center">
            Thank you for shopping with Nai Mart!
          </h2>
          <p className="text-gray-600 text-center">
            Your order has been placed successfully. Below are your details.
          </p>

          {/* Order Status / Info Row */}
          <div className="grid grid-cols-2 gap-2 text-sm border-b pb-4">
            <div className=" grid grid-cols-2 gap-4">
              <span className="font-semibold">Order Status</span>
              <span className="text-green-600">Confirmed</span>
            </div>
            <div className=" grid grid-cols-2 gap-4">
              <span className="font-semibold">Order No.</span>
              <span>#123456</span>
            </div>
            <div className=" grid grid-cols-2 gap-4">
              <span className="font-semibold">Shipping Date</span>
              <span>Sep 15, 2025</span>
            </div>
            <div className=" grid grid-cols-2 gap-4">
              <span className="font-semibold">Payment Status</span>
              <span>Paid</span>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border-b pb-4">
            <h3 className="bg-gray-400 text-lg font-semibold px-2">
              Shipping Information
            </h3>
            <p>
              {shippingData.firstName} {shippingData.lastName}
            </p>
            <p>
              {shippingData.address} {shippingData.address2}
            </p>
            <p>
              {shippingData.city} - {shippingData.province}
              {""}
              {shippingData.postalCode}
            </p>
            <p>{shippingData.country}</p>
            <p>{shippingData.phone}</p>
            <p>{shippingData.email}</p>
          </div>

          {/* Items Section */}
          <h3 className=" bg-gray-400 px-4 text-lg font-semibold">Items in Your Order</h3>
          <div className="flex flex-col gap-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 border-b pb-4">
                {/* Left: Product Image */}
                <div className="w-24 h-24 flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1">
                  {/* Top section: Title + Price */}
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{item.title}</h4>
                    <span className="text-lg font-bold text-yellow-600">
                      ${item.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 pt-3">{item.description}</p>

                  {/* Rating */}
                  <div className="flex items-center pt-2 gap-6">
                    <span className="font-medium">Rating:</span>
                    <span>{item.rating?.rate ?? "N/A"} ⭐</span>
                    <span className="text-sm text-gray-500">
                      ({item.rating?.count ?? 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Cart Summary */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            showCheckoutButton={false}
            className="bg-gray-100 rounded shadow"
          />
        </div>
      </div>
    </div>
  );
}
