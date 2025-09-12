
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

import { useNavigate } from "react-router";
export default function ProductCard({ product }) {

  const navigate = useNavigate();

  //function for navigation
  function goToProduct(product) {
    navigate("/product/" + product.id, { state: product });
  }
  return (
    <div
      onClick={() => goToProduct(product)}
      className="relative bg-gray-100 rounded shadow-md p-4 pb-14 flex flex-col hover:shadow-xl hover:-translate-y-1 transition duration-300 min-h-[280px] cursor-pointer">
      {/* Image */}
      <div className="flex justify-center pt-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-32 h-32 object-contain rounded-lg"
        />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-center leading-snug pt-6">
        {product.title}
      </h3>

      {/* Price */}
      <div className="absolute left-4 right-4 bottom-4 flex justify-center">
        <span className="font-bold text-yellow-600">
          ${product.price}
        </span>
      </div>
    </div>
  );
}


