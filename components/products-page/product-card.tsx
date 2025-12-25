"use client";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Loader2, } from "lucide-react";
import Link from "next/link";
import axios, { AxiosError } from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function ProductCard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Using axios to fetch products
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-purple-700 animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative  bg-gray-100">
                  <img
                    src={product.images}
                    alt={product.title}
                    className="w-full h-48 object-contain"
                  />
                </div>

                <div className="p-4">
                 <div className="flex items-center justify-between mb-2">
                   <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full mb-2">
                    {product.category}
                  </span>
                   <span className="text-2xl font-bold text-purple-700">
                      ${product.price}
                    </span>
                 </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="">
                   
                    <div className="flex items-center justify-between mt-4">
                      <button className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors text-sm font-medium">
                      Buy Now
                    </button>
                   <Link href={`/products/details?id=${product.id}`} >
                       <button className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-800 hover:text-white transition-colors text-sm font-medium">
                      view details
                    </button>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
