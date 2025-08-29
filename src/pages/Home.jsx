
/*
  This Component Handles data fetching and filtering.
  - This is the container component:
  - Fetches products from https://fakestoreapi.com/products using useEffect.
  - Stores products in products state.
  - Stores filtered products in filteredProducts state (so filtering doesn’t mutate the original list).
  - Manages loading state.
  - Handles filters:
  - handleFilterChange applies category and price filters.
  Renders:
  - SidebarFilters (for filtering categories/prices).
  - ProductsList (displays filtered products).

  */
import { useEffect, useState } from "react";
import SidebarFilters from "../components/SidebarFilters";
import ProductsList from "../components/ProductsList";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Handle filter changes from sidebar
  const handleFilterChange = ({ category, price }) => {
    let temp = [...products];

    // Filter by category
    if (category !== "all") {
      temp = temp.filter((p) => p.category === category);
    }

    // Filter by price
    if (price === "0-50") temp = temp.filter((p) => p.price <= 50);
    if (price === "50-100") temp = temp.filter((p) => p.price > 50 && p.price <= 100);
    if (price === "100+") temp = temp.filter((p) => p.price > 100);

    setFilteredProducts(temp);
  };

  if (loading) return <p>Loading...</p>;

return (
  <div className="w-full flex justify-center">
    <div className="w-full max-w-[1500px] flex flex-col md:flex-row gap-3 p-4">
      <SidebarFilters onFilterChange={handleFilterChange} />
      <ProductsList products={filteredProducts} />
    </div>
  </div>
);

}




