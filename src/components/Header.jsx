import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import { useContext } from "react";
import { CartContext } from "./cart/CartProvider";
import { GradientBrandText } from "../services/gradientBrandText";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function Header({ currentUser }) {
  // Access cart items from CartContext
  const { cartItems } = useContext(CartContext);

  // Calculate total quantity of items in cart
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  // For navigation redirection
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("currentUser"); // // Clear localStorage
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to logout. Try again.");
    }
  };

  // Custom styled navigation link (supports button or NavLink)
  const StyledNavLink = ({ to, children, as = "a", ...props }) => {
    const Component = as === "button" ? "button" : NavLink;
    return (
      <Component
        to={as === "button" ? undefined : to}
        onClick={props.onClick}
        className="font-medium tracking-wide cursor-pointer text-sm md:text-base transition-transform duration-300 hover:scale-110 relative 
                 bg-gradient-to-r from-[#ED4930] to-[#F7A823] bg-clip-text text-transparent
                 inline-block 
                 after:block after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-gradient-to-r after:from-[#ED4930] after:to-[#F7A823] after:transition-all hover:after:w-full"
      >
        {children}
      </Component>
    );
  };

  return (
    <header className="w-full bg-[#232F3E] font-poppins font-semibold sticky top-0 z-50 shadow-md">
      <nav className="w-full flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left - Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 md:w-25 md:h-14 cursor-pointer"
            />
          </NavLink>
        </div>

        {/* Center - Navigation */}
        <div className="flex-1 flex justify-center gap-4 md:gap-6 text-sm md:text-base overflow-hidden">
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/about">About Us</StyledNavLink>
          <StyledNavLink to="/contact">Contact</StyledNavLink>

          {currentUser ? (
            <StyledNavLink as="button" onClick={handleLogout}>
              Logout
            </StyledNavLink>
          ) : (
            <StyledNavLink to="/login">Login</StyledNavLink>
          )}
        </div>

        {/* Right - User + Cart */}
        <div className="flex-shrink-0 flex items-center gap-3 md:gap-6">
          {currentUser && (
            <div className="flex flex-col items-start gap-[1px]">
              <span className="text-[9px] md:text-[11px] text-gray-300">
                Welcome
              </span>
              <GradientBrandText
                text={currentUser.firstName}
                className="text-[11px] md:text-[13px] truncate max-w-[100px]"
              />
            </div>
          )}
          <div className="pr-4">
            <NavLink to="/cart" className="relative">
              <img src={cart} alt="Cart" className="w-8 md:w-9 " />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
