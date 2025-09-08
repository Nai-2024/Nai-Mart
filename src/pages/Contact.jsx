
import { companyInfo } from "../services/contact";
import { GradientBrandText } from "../services/gradientBrandText";

export default function ContactUs() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1500px] p-4 bg-white shadow-l">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 text-center py-6">
          Contact <GradientBrandText text="Us" />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 pb-3">
              Send Us a Message
            </h2>
            <form>
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
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ED4930]"
                />
              </div>
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
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ED4930]"
                />
              </div>
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
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ED4930]"
                />
              </div>
              <div className="pb-4">
                <label
                  className="block text-gray-700 font-medium pb-1"
                  htmlFor="message"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  placeholder="Your message..."
                  className="w-full border border-gray-300 rounded-md p-2 min-h-40 md:min-h-40 focus:outline-none focus:ring-2 focus:ring-[#ED4930]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#ED4930] text-white font-semibold py-2 rounded-full hover:bg-[#F7A823] transition-colors"
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

            {/* Optional: Google Map Embed */}
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
