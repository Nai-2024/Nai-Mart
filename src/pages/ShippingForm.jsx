import { useState } from "react";

export default function ShippingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Canada",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // send data back to parent (Checkout)
  };

  return (
    <>
      <h2 className="text-xl font-semibold pb-4">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col">
            <h6 className="mb-1">First Name</h6>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <h6 className="mb-1">Last Name</h6>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-3">
          {/* First Name */}
          <div className="flex flex-col">
            <h6>Phone Number</h6>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <h6>Emaill Address</h6>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
              required
            />
          </div>
        </div>
        <div className="grid pt-3 gap-3">
          {/* Address Line 1 */}
          <div className="flex flex-col">
            <h6>Delivery Address</h6>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Address Line 2 */}
          <div className="flex flex-col">
            <h6>Delivery Address Line 2 (Optional)</h6>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2  pt-3 ">
          <div className="flex flex-col">
            <h6>City Name</h6>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <h6>Postal Code</h6>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3  pt-3 pb-6">
          <div className="flex flex-col">
            <h6>Province / Territory</h6>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
              required
            >
              <option value="" className="text-gray-400" disabled>
                Select Province / Territory
              </option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon</option>
            </select>
          </div>
          <div className="flex flex-col">
            <h6>Country</h6>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
              required
            >
              <option value="" className="text-gray-400" disabled>
                Select Country</option>
              <option>Canada</option>
              <option>USA</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 rounded-full hover:bg-blue-700 transition"
        >
          Save Shipping Info
        </button>
      </form>
    </>
  );
}
