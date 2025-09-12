import { Link } from "react-router-dom";
import { companyInfo } from "../services/companyInfo";

export default function Footer() {
  // Reusable constant for footer link styles
  // Footer link hover gradient class
  const footerLinkHoverClass =
    "transition-transform duration-300 " +
    "hover:bg-gradient-to-r hover:from-[#F27F68] hover:to-[#F7A823] hover:bg-clip-text hover:text-transparent";
  return (
    <footer className="bg-[#232F3E] text-[#ccc] font-[Poppins,sans-serif]">
      <div className="w-full  mx-auto grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-6 px-5 py-7 md:py-7">
        {/* Quick Links */}
        <div>
          <h3 className="text-white pb-1">Quick Links</h3>
          <Link to="/" className={`block ${footerLinkHoverClass}`}>
            Home
          </Link>
          <Link to="/about" className={`block ${footerLinkHoverClass}`}>
            About Us
          </Link>
          <Link to="/contact" className={`block ${footerLinkHoverClass}`}>
            Contact
          </Link>
          <Link to="/login" className={`block ${footerLinkHoverClass}`}>
            Login
          </Link>
          
        </div>

        {/* About Section */}
        <div className="text-center">
          <h3
            className="font-bold text-base md:text-lg inline-block
               bg-gradient-to-r from-[#ED4930] to-[#F7A823] bg-clip-text text-transparent"
          >
            Nai Mart
          </h3>
          <p className="pb-3">
            {" "}
            Shop the latest in clothing, electronics, and jewelry—all in one
            trusted online store.
          </p>
          <Link
            to="/signup"
            state={{ isLogin: false }}
            className="bg-yellow-600 text-gray-900 text-sm font-bold px-9 py-1 rounded-full hover:bg-yellow-700 transition-colors cursor-pointer"
          >
            Sign Up
          </Link>
        </div>

        {/* Contact Info */}
        <div className="text-left md:justify-self-end text-center md:text-left">
          <h3 className="text-white pb-1">Contact</h3>
          <p className="mb-2">Email: {companyInfo.email}</p>
          <p className="mb-2">Phone: {companyInfo.phone}</p>
          <p>Address: {companyInfo.address}</p>
        </div>
      </div>

      <div className="bg-[#131A22] text-center py-4 text-sm text-[#aaa] fw-bold">
        &copy; {new Date().getFullYear()} Nai Mart. All rights reserved.
      </div>
    </footer>
  );
}
