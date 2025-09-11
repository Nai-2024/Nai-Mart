import { useLocation, useNavigate } from "react-router-dom";
import { addToCart, getCart } from "../services/cartUtils";
import { useContext } from "react";
import { CartContext } from "../components/cart/CartProvider";

export default function ProductDetails() {
  const navigate = useNavigate(); // It is used to navigate to diferent pages
  const location = useLocation(); // It gives info about the current route
  const product = location.state; // Retrieves whatever object you passed when navigating
  const { setCartItems } = useContext(CartContext);

  if (!product) {
    // if no product is in the cart it will display <P>
    return <p className="p-6">No product found.</p>;
  }

  const handleAddToCart = function () {
    addToCart(product); // saves in localStorage
    setCartItems([...getCart()]); // refresh cart in context
    navigate("/cart"); // go to cart page
    //window.location.reload(); // forces ProductCart to read updated localStorage
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1400px] p-9 flex flex-col md:flex-row gap-20 bg-gray-100">
        {/* Left - Image */}
        <div className="w-full md:w-2/5 flex justify-center">
          <div className="w-full h-96 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full object-contain"
            />
          </div>
        </div>

        {/* Right - Details */}
        <div className="w-full md:w-3/5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Rating:</span>
            <span>{product.rating?.rate ?? "N/A"} ⭐</span>
            <span className="text-sm text-gray-500">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <span className="text-2xl font-bold text-yellow-600 pb-20">
            ${product.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-black text-sm px-12 py-1 rounded-full hover:bg-yellow-600 transition cursor-pointer w-auto inline-block self-start"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
