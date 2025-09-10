import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { validateSignupForm } from "../services/validation";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Canada",
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const [registered, setRegistered] = useState(false); // NEW: track registration success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setToast("");

    const validationErrors = validateSignupForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          address: formData.address,
          address2: formData.address2,
          city: formData.city,
          postalCode: formData.postalCode,
          province: formData.province,
          country: formData.country,
        },
        createdAt: new Date(),
      });

      setRegistered(true); // ✅ set registration success
      setToast("Thank you for registering! Your account has been created.");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: "",
        address2: "",
        city: "",
        postalCode: "",
        province: "",
        country: "Canada",
      });

      setTimeout(() => setToast(""), 4000);
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="w-full flex justify-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-[1500px] flex flex-col md:flex-row justify-center">
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-slideDown z-50">
            {toast}
          </div>
        )}

        {/* Registration Form */}
        {!registered ? (
          <form
            onSubmit={handleSubmit}
            autoComplete="off" // disable autocomplete for the whole form
            className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 bg-white rounded-lg shadow-md flex flex-col gap-4"
          >
            {errors.general && (
              <p className="text-red-600 font-medium">{errors.general}</p>
            )}
            <h3 className="text-center font-bold pb-4">Create Your Account</h3>

            {/* Personal Information */}
            <h6 className="pt-2 font-semibold">Personal Information:</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email address"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Phone number (Optional)"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Shipping Address */}
            <h4 className="pt-2 font-semibold">Shipping Address</h4>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
              required
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Apartment / Suite (optional)"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder="Province"
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Canada">Canada</option>
                <option value="USA">USA</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition font-semibold cursor-pointer"
            >
              Create Your Account
            </button>

            <hr />
            <div className="flex justify-center items-center gap-6 pt-4 text-sm">
              <p className="text-gray-400">Already have an account?</p>
              <a
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login here
              </a>
            </div>
          </form>
        ) : (
          //  Confirmation / Thank You Message
          <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl p-8 bg-white rounded-lg shadow-md text-center flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-green-600">
              Thank You for Registering!
            </h3>
            <p className="text-gray-700">
              Your account has been successfully created. You can now{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login here
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
