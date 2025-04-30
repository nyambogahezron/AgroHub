
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/marketplace/ProductCard";
import Filters, { FilterOptions } from "@/components/marketplace/Filters";
import { products, Product } from "@/data/products";
import { Grid3X3, Grid2X2, List } from "lucide-react";

const Marketplace = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [viewMode, setViewMode] = useState<"grid3" | "grid2" | "list">("grid3");

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...products];

    // Filter by search text
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(
        (product) => product.location === filters.location
      );
    }

    // Filter by season
    if (filters.season) {
      filtered = filtered.filter((product) =>
        product.seasonality.includes(filters.season)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Filter by organic
    if (filters.organic) {
      filtered = filtered.filter((product) => product.organic);
    }

    setFilteredProducts(filtered);
  };

  const getGridClass = () => {
    switch (viewMode) {
      case "grid3":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6";
      case "grid2":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8";
      case "list":
        return "grid-cols-1 gap-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Agricultural Marketplace</h1>
            <p className="text-gray-600">
              Discover and purchase high-quality agricultural products directly from verified farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Filters onFilterChange={handleFilterChange} />
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-5 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">
                      Showing <span className="font-medium">{filteredProducts.length}</span> products
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 mr-2">View:</span>
                    <button
                      onClick={() => setViewMode("grid3")}
                      className={`p-2 rounded-md ${
                        viewMode === "grid3"
                          ? "bg-agri-green-light text-agri-green"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <Grid3X3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("grid2")}
                      className={`p-2 rounded-md ${
                        viewMode === "grid2"
                          ? "bg-agri-green-light text-agri-green"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <Grid2X2 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md ${
                        viewMode === "list"
                          ? "bg-agri-green-light text-agri-green"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-10 text-center">
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className={`grid ${getGridClass()}`}>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
