"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import ProductCardItem from "@/components/products-page/product-card-item";
import { getFeaturedProducts } from "@/lib/api/products";
import { Product } from "@/lib/types/products";

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getFeaturedProducts();
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

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Heading and Subheading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Featured Products
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of premium products designed to
            enhance your lifestyle
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-purple-700 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center max-w-md mx-auto">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
              {products.map((product) => (
                <ProductCardItem key={product.id} product={product} />
              ))}
            </div>

            {/* View All Products Button */}
            <div className="text-center">
              <Link href="/products">
                <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-purple-700 text-white rounded-lg hover:bg-purple-800 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                  View All Products
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </Link>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-600 text-lg">
              No products available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
