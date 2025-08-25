import { useEffect, useState } from "react";

export default function SidebarFilters({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Notify parent whenever filter changes
  useEffect(() => {
    onFilterChange({ category: selectedCategory, price: selectedPrice });
  }, [selectedCategory, selectedPrice]);

  return (
    <aside className="w-full md:w-[20%] pt-2 border-r border-gray-300">
      {/* Category filter */}
      <div className="mb-6">
        <h3 className="font-semibold pb-2">Category</h3>
        <ul className="space-y-2">
          <li>
            <button
              className={`hover:text-[#d67405] cursor-pointer ${selectedCategory === "all" ? "font-bold" : ""}`}
              onClick={() => {
                setSelectedCategory("all");
                setSelectedPrice(null); // reset price when selecting "All"
              }}>All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`hover:text-[#d67405] cursor-pointer ${
                  selectedCategory === cat ? "font-bold" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price filter */}
      <div className="mb-6">
        <h3 className="font-semibold pt-2">Price</h3>
        <ul className="space-y-2">
          <li>
            <button
              className={`hover:text-[#d67405] cursor-pointer ${
                selectedPrice === "0-50" ? "font-bold" : ""
              }`}
              onClick={() => setSelectedPrice("0-50")}
            >
              $0 - $50
            </button>
          </li>
          <li>
            <button
              className={`hover:text-[#d67405] cursor-pointer ${
                selectedPrice === "50-100" ? "font-bold" : ""
              }`}
              onClick={() => setSelectedPrice("50-100")}
            >
              $50 - $100
            </button>
          </li>
          <li>
            <button
              className={`hover:text-[#d67405] cursor-pointer ${
                selectedPrice === "100+" ? "font-bold" : ""
              }`}
              onClick={() => setSelectedPrice("100+")}
            >
              Over $100
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
