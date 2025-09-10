import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function ShippingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Canada",
  });

  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setUser(savedUser);

      // Pre-fill with shipping info if available
      if (savedUser.shippingAddress) {
        setFormData(savedUser.shippingAddress);
      }
    } else {
      // Redirect unregistered user to Sign Up
      navigate("/signup");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      setToast("User not logged in!");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    try {
      setLoading(true);

      const userRef = doc(db, "users", user.uid);
      const shippingInfo = { ...formData };

      await updateDoc(userRef, {
        shippingAddress: shippingInfo,
      });

      const updatedUser = {
        ...user,
        shippingAddress: shippingInfo,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setToast("Shipping info saved successfully!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error("Error saving shipping info:", err);
      setToast("Failed to save shipping info.");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show summary card if shipping info exists
  if (user?.shippingAddress) {
    const sa = user.shippingAddress;
    return (
      <div className="px-2 text-gray-700 bg-gray-100 space-y-2">
        <h2 className="text-xl font-semibold border-b-1 pb-2">
          Shipping Information:
        </h2>

        <div className="flex items-center gap-10 pt-2">
          <span className="font-semibold w-32">Full Name:</span>
          <span>
            {(sa.firstName || user.firstName) +
              " " +
              (sa.lastName || user.lastName)}
          </span>
        </div>

        <div className="flex items-center gap-10 pt-1">
          <span className="font-semibold w-32">Phone:</span>
          <span>{sa.phone || user.phone}</span>
        </div>

        <div className="flex items-center gap-10 pt-1">
          <span className="font-semibold w-32">Email:</span>
          <span>{sa.email || user.email}</span>
        </div>

        <div className="flex items-center gap-10 pt-1">
          <span className="font-semibold w-32">Address:</span>
          <span>
            {sa.address}
            {sa.address2 && `, ${sa.address2}`}, {sa.city}, {sa.province},{" "}
            {sa.postalCode}, {sa.country}
          </span>
        </div>
      </div>
    );
  }

  // 🔹 No need to show the form if user is not registered
  return null;
}
