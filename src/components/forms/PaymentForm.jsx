
import { useState } from "react";
import {
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateCardholder,
  validateCardType,
} from "../../services/validation";

export default function PaymentForm({ onSubmit }) {
  const [paymentData, setPaymentData] = useState({
    cardholder: "",
    cardType: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardholder: "",
    cardType: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));

    let error = "";
    switch (name) {
      case "cardholder":
        error = validateCardholder(value) ? "" : "Name must contain only letters";
        break;
      case "cardType":
        error = validateCardType(value) ? "" : "Please select card type";
        break;
      case "cardNumber":
        error = validateCardNumber(value) ? "" : "Card number must be 16 digits";
        break;
      case "expiry":
        error = validateExpiry(value) ? "" : "Expiry must be MM/YY";
        break;
      case "cvv":
        error = validateCVV(value) ? "" : "CVV must be 3-4 digits";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasError = Object.values(errors).some((err) => err !== "");
    if (hasError) return alert("Please fix all errors before submitting");

    onSubmit(paymentData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Cardholder Name */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Cardholder Name</label>
        <input
          type="text"
          name="cardholder"
          value={paymentData.cardholder}
          onChange={handleChange}
          placeholder="Your Name"
          className={`border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.cardholder ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.cardholder && (
          <p className="text-red-500 text-sm mt-1">{errors.cardholder}</p>
        )}
      </div>

      {/* Card Type */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Card Type</label>
        <select
          name="cardType"
          value={paymentData.cardType}
          onChange={handleChange}
          className={`border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.cardType ? "border-red-500" : "border-gray-300"
          }`}
          required
        >
          <option value="" disabled>
            Select Card Type
          </option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="Amex">American Express</option>
        </select>
        {errors.cardType && (
          <p className="text-red-500 text-sm mt-1">{errors.cardType}</p>
        )}
      </div>

      {/* Card Number */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          className={`border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.cardNumber ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
        )}
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Expiry</label>
          <input
            type="text"
            name="expiry"
            value={paymentData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className={`border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.expiry ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.expiry && (
            <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">CVV</label>
          <input
            type="password"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            placeholder="***"
            className={`border p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.cvv ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 text-black p-2 rounded-full font-bold hover:bg-yellow-600 transition cursor-pointer mt-4"
      >
        Pay Now
      </button>
    </form>
  );
}
