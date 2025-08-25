
/*
- Receives products as props.
- Maps over products and renders a ProductCard for each.
- If no products match the filter, shows “No products found.”
*/

import ProductCard from "./ProductCard";

export default function ProductsList({ products }) {
  return (
    <div className="w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

