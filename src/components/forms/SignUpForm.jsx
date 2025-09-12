import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { validateSignupForm } from "../../services/validation";

export default function SignUpForm() {
  // initializing the state for your signup form using React’s useState hook - sets up all the signup form fields with default values
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

  // ------------------- Error state -------------------
  const [errors, setErrors] = useState({}); // Stores validation errors for each input

  // ------------------- Toast / success message state -------------------
  const [toast, setToast] = useState(""); // Success notification after registration

  // ------------------- Track registration completion -------------------
  const [registered, setRegistered] = useState(false); // Toggle to show form or thank-you message

  // ------------------- Live field validation -------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form state
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validate input as user types
    setErrors((prev) => ({
      ...prev,
      [name]: validateSignupForm(name, value, { ...formData, [name]: value }),
    }));
  };

  // ------------------- Submit handler -------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setToast(""); // Clear previous toast

    // Check all fields for errors before submitting
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateSignupForm(key, formData[key], formData);
      if (error) formErrors[key] = error; // Add error to object if exists
    });

    // If any errors exist, show them and stop submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // ------------------- Firebase Auth -------------------
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid; // Get unique user ID from Firebase

      // ------------------- Store user data in Firestore -------------------
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
        createdAt: new Date(), // Store account creation time
      });

      setRegistered(true); // Show success message instead of form
      setToast("Thank you for registering! Your account has been created."); // Show toast notification

      // ------------------- Reset form after successful registration -------------------
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

      setTimeout(() => setToast(""), 4000); // Hide toast after 4 seconds
    } catch (err) {
      // Show Firebase error (like email already in use)
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
            autoComplete="off"
            className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 bg-white rounded-lg shadow-md flex flex-col gap-4"
          >
            {errors.general && (
              <p className="text-red-600 font-medium">{errors.general}</p>
            )}
            <h3 className="text-center font-bold pb-4">Create Your Account</h3>

            <h6 className="pt-2 font-semibold">Personal Information:</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email address"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Phone number (Optional)"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <h4 className="pt-2 font-semibold">Shipping Address</h4>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
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
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">{errors.postalCode}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option value="" disabled hidden>
                  Select Province
                </option>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">
                  Newfoundland and Labrador
                </option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Ontario">Ontario</option>
                <option value="Prince Edward Island">
                  Prince Edward Island
                </option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
                <option value="Northwest Territories">
                  Northwest Territories
                </option>
                <option value="Nunavut">Nunavut</option>
                <option value="Yukon">Yukon</option>
              </select>
              {errors.province && (
                <p className="text-red-500 text-sm">{errors.province}</p>
              )}

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Canada">Canada</option>
                <option value="USA">USA</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
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
