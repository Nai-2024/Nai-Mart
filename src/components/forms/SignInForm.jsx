import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setToast("");

    if (!formData.email || !formData.password) {
      setErrors({ general: "Email and password are required." });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Fetch full user info from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      let userData = {};
      if (userDoc.exists()) {
        userData = userDoc.data();
      }

      // Save all info in localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ uid: user.uid, email: user.email, ...userData })
      );

      setToast(`Welcome back, ${userData.firstName || "User"}! 🎉`);
      setFormData({ email: "", password: "" });

      navigate("/");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      setErrors({ general: "Invalid email or password." });
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

      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errors.general && (
            <p className="text-red-600 font-medium">{errors.general}</p>
          )}
          <h3 className="text-center font-bold pb-4">Login to Your Account</h3>

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
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition font-semibold cursor-pointer"
          >
            Sign In
          </button>

          <hr />
          <div className="flex justify-center items-center gap-6 pt-4 text-sm">
            <p className="text-gray-400">Don’t have an account?</p>
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Create one
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
