import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CartSummary from "../components/cart/CartSummery";

export default function OrderConfirmation() {
  const location = useLocation(); // Get data passed via navigation (e.g., shipping info from Payment page)

  // Local state
  const [order, setOrder] = useState(null); // Stores order data retrieved from localStorage
  const [shippingData, setShippingData] = useState({}); // Stores shipping info for display
  const [orderNumber, setOrderNumber] = useState(""); // Randomly generated order number

  // Current date for order date display
  const today = new Date();
  const orderDate = today.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Function to generate expected shipping date (5 days from today)
  const generateShippingDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 5); // Add 5 days
    return today.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to generate a random 6-digit order number
  const generateOrderNumber = () =>
    `${Math.floor(100000 + Math.random() * 900000)}`;

  // Fetch order and shipping data on mount
  useEffect(() => {
    // Generate and set order number
    setOrderNumber(generateOrderNumber());

    // Retrieve last order from localStorage
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) setOrder(JSON.parse(savedOrder));

    // Async function to fetch shipping info
    const fetchShippingData = async () => {
      try {
        if (auth.currentUser) { // If user is logged in
          const docRef = doc(db, "users", auth.currentUser.uid); // Reference to user's Firestore doc
          const docSnap = await getDoc(docRef); // Fetch document
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Set shipping info from Firestore data
            setShippingData({
              ...data.shippingAddress,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
            });
          } else {
            // Fallback to shipping info passed via navigation state
            setShippingData(location.state?.shippingData || {});
          }
        } else {
          // If not logged in, use shipping info from navigation state
          setShippingData(location.state?.shippingData || {});
        }
      } catch (err) {
        console.error("Error fetching shipping info:", err);
      }
    };

    fetchShippingData(); // Call async function
  }, [location.state]); // Runs when location.state changes

  // JSX rendering
  return (
    <div className="w-full flex justify-center p-4">
      {/* Main container */}
      <div className="w-full max-w-3xl flex flex-col gap-4 bg-white rounded shadow p-6">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-green-600 text-center">
          Thank you for shopping with Nai Mart!
        </h2>
        <p className="text-gray-600 text-center">
          Your order has been placed successfully. Below are your details.
        </p>

        {/* Order Status Section */}
        <div className="bg-gray-100 rounded shadow p-4">
          <h3 className="bg-gray-400 px-4 text-lg font-semibold mb-2">
            Order Status
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm px-4 py-2">
            <span className="font-semibold text-gray-800">Order Status:</span>
            <span className="text-green-600 font-bold">Confirmed</span>

            <span className="font-semibold text-gray-800">Order Date:</span>
            <span>{orderDate}</span>

            <span className="font-semibold text-gray-800">Order No:</span>
            <span>{orderNumber}</span>

            <span className="font-semibold text-gray-800">Shipping Date:</span>
            <span>{generateShippingDate()}</span>

            <span className="font-semibold text-gray-800">Payment Status:</span>
            <span>Paid</span>
          </div>
        </div>

        {/* Shipping Information Section */}
        <div className="bg-gray-100 rounded shadow p-4">
          <h3 className="bg-gray-400 px-4 text-lg font-semibold">
            Shipping Information
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm px-4 py-2">
            <span className="font-semibold text-gray-800">Full Name:</span>
            <span className="text-gray-700">
              {shippingData.firstName} {shippingData.lastName}
            </span>

            <span className="font-semibold text-gray-800">Phone Number:</span>
            <span className="text-gray-700">{shippingData.phone}</span>

            <span className="font-semibold text-gray-800">Email:</span>
            <span className="text-gray-700">{shippingData.email}</span>

            <span className="font-semibold text-gray-800">Address:</span>
            <span className="text-gray-700">
              {shippingData.address}
              {shippingData.address2 ? `, ${shippingData.address2}` : ""},{" "}
              {shippingData.city}, {shippingData.province}{" "}
              {shippingData.postalCode}, {shippingData.country}
            </span>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-gray-100 rounded p-4 shadow">
          <h3 className="bg-gray-400 px-4 text-lg font-semibold mb-2">
            Items in Your Order
          </h3>
          <div className="flex flex-col">
            {order?.items?.length > 0 ? (
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 py-3 ${
                    idx !== order.items.length - 1
                      ? "border-b border-gray-400 pb-5"
                      : ""
                  }`}
                >
                  {/* Item Image */}
                  <div className="w-24 h-24 flex justify-center items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{item.title}</h4>
                      <span className="text-lg font-bold text-yellow-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-600 pt-2">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 px-6">
                No items found in your order.
              </p>
            )}
          </div>
        </div>

        {/* Payment Summary Section */}
        {order?.totals && (
          <div className="bg-gray-100 rounded p-4 shadow">
            <h3 className="bg-gray-400 px-4 text-lg font-semibold">
              Your Payment Summary
            </h3>
            <CartSummary
              subtotal={order.totals.subtotal}
              shipping={order.totals.shipping}
              tax={order.totals.tax}
              total={order.totals.total}
              showCheckoutButton={false} // Hide checkout button on order confirmation page
              className="px-4 py-0"
            />
          </div>
        )}
      </div>
    </div>
  );
}