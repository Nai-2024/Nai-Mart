import { useLocation } from "react-router-dom";
import { CartContext } from "../components/cart/CartProvider";
import { useContext, useEffect, useState } from "react";
import CartSummary from "../components/cart/CartSummery";
import { calculateCartTotals } from "../services/cartUtils";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function OrderConfirmation() {
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const [shippingData, setShippingData] = useState({});
  const [orderNumber, setOrderNumber] = useState(""); // store generated order number
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems);

  // --- Order date ---
  const today = new Date();
  const orderDate = today.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // --- Generating shipping date ---
  const generateShippingDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 5); // adds 5 days
    return today.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // --- Generating order number ---
  const generateOrderNumber = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    return `${randomNum}`;
  };

  useEffect(() => {
    // --- Generate order number once when component mounts ---
    setOrderNumber(generateOrderNumber());

    // --- Fetch shipping info ---
    const fetchShippingData = async () => {
      try {
        if (auth.currentUser) {
          const docRef = doc(db, "users", auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setShippingData({
              ...docSnap.data().shippingAddress,
              firstName: docSnap.data().firstName,
              lastName: docSnap.data().lastName,
              email: docSnap.data().email,
              phone: docSnap.data().phone,
            });
          } else {
            setShippingData(location.state?.shippingData || {});
          }
        } else {
          setShippingData(location.state?.shippingData || {});
        }
      } catch (err) {
        console.error("Error fetching shipping info:", err);
      }
    };

    fetchShippingData();
  }, [location.state]);

  return (
    <div className="w-full flex justify-center items-center p-6">
      {/* LEFT SIDE - Order Details */}
      <div className="w-full max-w-3xl flex flex-col gap-6 bg-gray-100 rounded shadow p-6 mx-auto">
        <h2 className="text-2xl font-bold text-green-600 text-center">
          Thank you for shopping with Nai Mart!
        </h2>
        <p className="text-gray-600 text-center">
          Your order has been placed successfully. Below are your details.
        </p>

        {/* Order Status */}
        <div>
          <h3 className="bg-gray-400 px-4 text-lg font-semibold">
            Order Status
          </h3>
          <div className="flex flex-col gap-1 text-sm py-2 px-6">
            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">
                Order Status:
              </span>
              <span className="text-green-600 font-bold">Confirmed</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">
                Order Date:
              </span>
              <span>{orderDate}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">
                Order No:
              </span>
              {/* Called the function earlier and stored in state */}
              <span>{orderNumber}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">
                Shipping Date:
              </span>
              {/* Called the function directly here */}
              <span>{generateShippingDate()}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">
                Payment Status:
              </span>
              <span>Paid</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mb-6">
          <h3 className="bg-gray-400 px-4 text-lg font-semibold">
            Shipping Information
          </h3>
          <div className="flex flex-col gap-1 text-sm py-2 px-6">
            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">
                Full Name:
              </span>
              <span className="text-gray-700">
                {shippingData.firstName} {shippingData.lastName}
              </span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">
                Phone Number:
              </span>
              <span className="text-gray-700">{shippingData.phone}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">Email:</span>
              <span className="text-gray-700">{shippingData.email}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-800 w-48">Address:</span>
              <span className="text-gray-700">
                {shippingData.address}
                {shippingData.address2
                  ? `, ${shippingData.address2}`
                  : ""}, {shippingData.city}, {shippingData.province}{" "}
                {shippingData.postalCode}, {shippingData.country}
              </span>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <h3 className="bg-gray-400 px-4 text-lg font-semibold">
          Items in Your Order
        </h3>
        <div className="flex flex-col gap-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex gap-4 pb-4">
              <div className="w-24 h-24 flex justify-center items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{item.title}</h4>
                  <span className="text-lg font-bold text-yellow-600">
                    ${item.price}
                  </span>
                </div>
                <p className="text-gray-600 pt-3">{item.description}</p>
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
    </div>
  );
}
