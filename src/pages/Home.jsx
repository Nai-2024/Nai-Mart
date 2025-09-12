
/*
  This Component Handles data fetching and filtering.
  - This is the container component:
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
import ProductsList from "../components/products/ProductsList";
import { fetchProducts } from "../services/api";

// ProductsPage Component: Handles fetching products, filtering, and displaying them
export default function ProductsPage() {
  // State to store all products fetched from API
  const [products, setProducts] = useState([]);
  
  // State to store products after applying filters (so original products remain unchanged)
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // State to track loading status while fetching data
  const [loading, setLoading] = useState(true);

  // Fetch products from API when component mounts
  useEffect(() => {
    async function getProducts() {
      const data = await fetchProducts(); // Call utility function to fetch products
      setProducts(data);                  // Save all products
      setFilteredProducts(data);          // Initialize filtered products with all products
      setLoading(false);                  // Turn off loading state
    }
    getProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handles filter changes from the sidebar component
  const handleFilterChange = ({ category, price }) => {
    let temp = [...products]; // Create a copy to avoid mutating original products

    // Filter products by category if not "all"
    if (category !== "all") temp = temp.filter((p) => p.category === category);

    // Filter products by price range
    if (price === "0-50") temp = temp.filter((p) => p.price <= 50);
    if (price === "50-100") temp = temp.filter((p) => p.price > 50 && p.price <= 100);
    if (price === "100+") temp = temp.filter((p) => p.price > 100);

    setFilteredProducts(temp); // Update the filtered products state
  };

  // Show loading message while fetching products
  if (loading) return <p>Loading...</p>;

  // Render the main UI
  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-3">
        {/* Sidebar for filters: category and price */}
        <SidebarFilters onFilterChange={handleFilterChange} />

        {/* Products list: displays filtered products */}
        <ProductsList products={filteredProducts} />
      </div>
    </div>
  );
}