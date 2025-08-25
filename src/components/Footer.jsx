
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#ccc] font-[Poppins,sans-serif]">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-6 px-5 py-10 md:py-12">
        {/* Quick Links */}
        <div>
          <h3 className="text-white mb-3">Quick Links</h3>
          <Link to="/" href="#" className="block mb-2 hover:text-[#16a085]">Home</Link>
          <Link to="/about" href="#" className="block mb-2 hover:text-[#16a085]">About Us</Link>
          <Link to="/contact" href="#" className="block mb-2 hover:text-[#16a085]">Contact</Link>
        </div>

        {/* About Section */}
        <div className="text-center">
          <h3 className="text-white mb-3">Nai Electronics</h3>
          <p className="mb-2">Your trusted online store for electronics, gadgets, and more.</p>
        </div>

        {/* Contact Info */}
        <div className="text-left md:justify-self-end text-center md:text-left">
          <h3 className="text-white mb-3">Contact</h3>
          <p className="mb-2">Email: info@naielectronics.com</p>
          <p className="mb-2">Phone: +1 234 567 890</p>
          <p>Address: 123 Main Street, City</p>
        </div>
      </div>

      <div className="bg-[#111] text-center py-4 text-sm text-[#aaa]">
        &copy; {new Date().getFullYear()} Nai Electronics. All rights reserved.
      </div>
    </footer>
  );
}


