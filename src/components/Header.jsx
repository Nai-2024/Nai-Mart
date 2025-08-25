// Header.jsx
import { Link } from "react-router-dom";
import logo from "../assets/Nai-logo.png";
import cart from "../assets/cart.png";

export default function Header() {
  return (
    <header className="w-full bg-teal-700 font-poppins font-semibold">
      <nav className="max-w-[1300px] mx-auto grid grid-cols-[auto_1fr_3fr_auto_auto] items-center gap-6 md:p-2">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-18 h-18 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-80 cursor-pointer"
          />
        </Link>

        {/* Title */}
        <span className="text-white md:text-xl">Nai Mart</span>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-9 rounded px-3 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />

        {/* Links */}
        {/* Links */}
        <div className="flex gap-6">
          <Link
            to="/"
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            Contact
          </Link>
        </div>

        {/* Cart */}
        <Link to="/cart">
          <img
            src={cart}
            alt="Cart"
            className="w-9 transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-80 cursor-pointer"
          />
        </Link>
      </nav>
    </header>
  );
}
