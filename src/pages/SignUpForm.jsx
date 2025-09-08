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
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

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
        createdAt: new Date(),
      });

      // Show success toast
      setToast("User registered successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Hide toast after 3 seconds
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-slideDown">
          {toast}
        </div>
      )}

      <div className="w-full max-w-lg p-6 bg-white rounded shadow">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errors.general && (
            <p className="text-red-600 font-medium">{errors.general}</p>
          )}
          <h3 className="text-center font-bold pb-4">Create Your Account</h3>
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <span className="text-red-600">{errors.firstName}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <span className="text-red-600">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <span className="text-red-600">{errors.phone}</span>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <span className="text-red-600">{errors.password}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <span className="text-red-600">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
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
      </div>
    </div>
  );
}
