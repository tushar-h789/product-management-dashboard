// app/products/page.tsx
"use client";
import { useState, useEffect, useMemo } from "react";
import { Loader2, Search } from "lucide-react";
import CategorySidebar from "../../components/products-page/category-sidebar";
import ProductCardItem from "../../components/products-page/product-card-item";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/search-input";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { Product } from "@/lib/types/products";
import { getProducts } from "@/lib/api/products";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Use debounced search hook
  const {
    inputValue: searchInputValue,
    searchValue: searchTerm,
    isSearching,
    handleChange: handleSearchChange,
    clearSearch,
  } = useDebouncedSearch({
    debounceDelay: 300,
    initialValue: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    ).sort();
    return uniqueCategories;
  }, [products]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(term);
        const categoryMatch = product.category.toLowerCase().includes(term);
        return titleMatch || categoryMatch;
      });
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Calculate paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Clear all filters (search + category)
  const clearFilters = () => {
    clearSearch();
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Sidebar - Hidden on mobile, shown on larger screens */}
          <aside className="w-full lg:w-64 lg:shrink-0 order-2 lg:order-1">
            <div className="lg:sticky lg:top-4">
              <CategorySidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </aside>

          {/* Main Content - Right Side */}
          <div className="flex-1 min-w-0 order-1 lg:order-2">
            {/* Header with Search */}
            <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  Our Products
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                  {searchTerm || selectedCategory ? (
                    <>
                      {searchTerm && (
                        <span className="break-word">
                          Searching for: &quot;{searchTerm}&quot;
                        </span>
                      )}
                      {searchTerm && selectedCategory && (
                        <span className="hidden sm:inline"> • </span>
                      )}
                      {selectedCategory && (
                        <span className="block sm:inline mt-1 sm:mt-0">
                          Filtered by: {selectedCategory}
                        </span>
                      )}
                    </>
                  ) : (
                    "Browse our collection of premium products"
                  )}
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full">
                <SearchInput
                  value={searchInputValue}
                  onChange={handleSearchChange}
                  placeholder="Search by product title or category..."
                  isLoading={isSearching}
                  showClearButton={true}
                  onClear={clearSearch}
                />
              </div>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-purple-700 animate-spin" />
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
                <p className="font-medium">Error: {error}</p>
              </div>
            )}

            {/* Products Display */}
            {!loading && !error && (
              <div>
                {/* Show results count */}
                {(searchTerm || selectedCategory) && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {filteredProducts.length === 0
                        ? "No products found"
                        : filteredProducts.length === 1
                        ? "Found 1 product"
                        : `Found ${filteredProducts.length} products`}
                    </h2>
                    {(searchTerm || selectedCategory) && (
                      <button
                        onClick={clearFilters}
                        className="px-3 sm:px-4 py-2 text-sm sm:text-base text-purple-700 hover:text-purple-800 font-medium hover:bg-purple-50 rounded-lg transition-colors w-full sm:w-auto"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                )}

                {/* Show products or no results */}
                {filteredProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                      {paginatedProducts.map((product) => (
                        <ProductCardItem key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                      totalItems={filteredProducts.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                      maxVisiblePages={5}
                      showPageInfo={true}
                      className="mt-6 sm:mt-8"
                    />
                  </>
                ) : (
                  <div className="text-center py-12 sm:py-16 md:py-20 px-4">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                      No products found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
                      {searchTerm || selectedCategory
                        ? "No products match your filters. Try adjusting your search or category filter."
                        : "No products available."}
                    </p>
                    {(searchTerm || selectedCategory) && (
                      <button
                        onClick={clearFilters}
                        className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
