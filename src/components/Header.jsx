import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import { useContext } from "react";
import { CartContext } from "./cart/CartProvider";

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const StyledNavLink = ({ to, children }) => (
    <NavLink
      to={to}
      className="font-medium tracking-wide cursor-pointer text-sm md:text-base transition-transform duration-300 hover:scale-110 relative 
               bg-gradient-to-r from-[#ED4930] to-[#F7A823] bg-clip-text text-transparent
               after:block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-[#ED4930] after:to-[#F7A823] after:transition-all hover:after:w-full"
    >
      {children}
    </NavLink>
  );

  return (
    <header className="w-full bg-[#232F3E] font-poppins font-semibold sticky top-0 z-50 shadow-md">
      <nav className="w-full flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left Section - Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 md:w-25 md:h-14 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
            />
          </NavLink>
        </div>

        {/* Center Section - Navigation */}
        <div className="flex-1 flex justify-center gap-6 md:gap-8 text-sm md:text-base">
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/about">About Us</StyledNavLink>
          <StyledNavLink to="/contact">Contact</StyledNavLink>
          <StyledNavLink to="/loging">Login</StyledNavLink>
        </div>

        {/* Right Section - Cart */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <NavLink to="/cart" className="relative">
            <img
              src={cart}
              alt="Cart"
              className="w-8 md:w-9 hover:scale-110 cursor-pointer"
            />

            {/* Check if the qty is > 0 */}
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
