
/*
  - This is a component that renders each product.
  - It receives a single product prop.
  - Displays:
    - Product image (img) with object-contain so it doesn’t stretch.
    - Title (clamped to 1 line) and description (clamped to 2 lines).
    - Price and “Add to Cart” button.
  - On click of the button:
    - Saves the product to cart (addToCart).
    - Navigates to product details page using navigate(/product/${product.id}, { state: { product } }).  
*/

import { useNavigate } from "react-router-dom";
import { addToCart } from "./cartUtils";

export default function ProductCard({ product }) {
 const navigate = useNavigate();

  const handleAddToCart = () => {
       addToCart(product);          // Save product to cart
      // alert("Product added to cart!");

    navigate("/cart")
  };

  return (
    <div className="bg-gray-200 rounded shadow-md p-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition duration-300 min-h-[310px] cursor-pointer">
      
      {/* Image */}
      <div className="flex justify-center pt-2">
        <img src={product.image} alt={product.title} className="w-32 h-32 object-contain rounded-lg"/>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between gap-1">
        <h3 className="font-semibold line-clamp-1 text-center">{product.title}</h3>
        <p className="text-sm mb-2 line-clamp-2">{product.description.slice(0, 80)}...</p>

        {/* Price + Add to Cart button */}
        <div className="flex items-center justify-between pt-5">
          <span className="font-bold text-yellow-600">${product.price}</span>
          <button
            className="bg-yellow-500 text-black px-3 rounded-xl hover:bg-yellow-600 transition cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
