// ShippingSummary.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShippingSummary() {
  // State to hold current user data
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Effect runs on component mount to load user info
  useEffect(() => {
    // Retrieve user data from local storage
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (savedUser) {
      // Set user state
      setUser(savedUser);
    } else {
      // If no user is found, redirect to signup page
      navigate("/signup");
    }
  }, [navigate]);

  // If no user or no shipping address, render nothing
  if (!user || !user.shippingAddress) return null;

  // Short reference to shipping address
  const sa = user.shippingAddress;

  return (
    <div className="bg-gray-100 rounded">
      {/* Heading */}
      <h2 className="text-xl font-semibold border-b pb-2">
        Shipping Information
      </h2>

      {/* Full Name */}
      <div className="flex items-start pt-2 gap-4 md:gap-10">
        <span className="font-semibold min-w-[120px] md:w-32 flex-shrink-0">
          Full Name:
        </span>
        <span>
          {(sa.firstName || user.firstName) +
            " " +
            (sa.lastName || user.lastName)}
        </span>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-4 md:gap-10">
        <span className="font-semibold min-w-[120px] md:w-32 flex-shrink-0">
          Phone:
        </span>
        <span>{sa.phone || user.phone}</span>
      </div>

      {/* Email */}
      <div className="flex items-start gap-4 md:gap-10">
        <span className="font-semibold min-w-[120px] md:w-32 flex-shrink-0">
          Email:
        </span>
        <span>{sa.email || user.email}</span>
      </div>

      {/* Address */}
      <div className="flex items-start gap-4 md:gap-10">
        <span className="font-semibold min-w-[120px] md:w-32 flex-shrink-0">
          Address:
        </span>
        <span>
          {sa.address}
          {sa.address2 && `, ${sa.address2}`}, {sa.city}, {sa.province},{" "}
          {sa.postalCode}, {sa.country}
        </span>
      </div>
    </div>
  );
}
