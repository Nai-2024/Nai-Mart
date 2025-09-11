import { useState } from "react";
import { liveValidateField } from "../services/validation";
import { companyInfo } from "../services/contact";
import { GradientBrandText } from "../services/gradientBrandText";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // use live validation from validation.js
    setErrors((prev) => ({
      ...prev,
      [name]: liveValidateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const key in formData) {
      newErrors[key] = liveValidateField(key, formData[key]);
    }
    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg !== "")) return;

    setSubmitted(true);
    console.log("Message sent:", formData);

    // Clear form fields
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-[1300px] p-4 bg-white shadow-l">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center py-6">
          Contact <GradientBrandText text="Us" />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 pb-3">
              Send Us a Message
            </h2>

            {submitted && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                Your message has been sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="pb-4">
                <label
                  className="block text-gray-700 font-medium pb-1"
                  htmlFor="name"
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  disabled={submitted}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ED4930] ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="pb-4">
                <label
                  className="block text-gray-700 font-medium pb-1"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  disabled={submitted}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ED4930] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div className="pb-4">
                <label
                  className="block text-gray-700 font-medium pb-1"
                  htmlFor="subject"
                >
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  disabled={submitted}
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ED4930] ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="pb-4">
                <label
                  className="block text-gray-700 font-medium pb-1"
                  htmlFor="message"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  disabled={submitted}
                  className={`w-full border rounded-md p-2 min-h-40 md:min-h-40 focus:outline-none focus:ring-2 focus:ring-[#ED4930] ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full bg-[#ED4930] text-white font-semibold py-2 rounded-full hover:bg-[#F7A823] transition-colors ${
                  submitted ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info / Map */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 pb-3">
              Contact Information
            </h2>

            <div className="pb-7 pt-5">
              <p className="p-1">
                <span className="font-medium">Address:</span>{" "}
                {companyInfo.address}
              </p>
              <p className="p-1">
                <span className="font-medium">Phone:</span> {companyInfo.phone}
              </p>
              <p className="p-1">
                <span className="font-medium">Email:</span> {companyInfo.email}
              </p>
              <p className="p-1">
                <span className="font-medium">Business Hours:</span>{" "}
                {companyInfo.businessHours}
              </p>
            </div>

            <div className="w-full h-64 rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5043367768466!2d-79.3780816845014!3d43.64751597912101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d1b1f86701%3A0x63c7b5b6cf93c184!2s1%20Yonge%20St%2C%20Toronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sca!4v1694000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
