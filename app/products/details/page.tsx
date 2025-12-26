"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, ShoppingBag, Star } from "lucide-react";
import { FcMinus, FcPlus } from "react-icons/fc";
import { HiPlusSm } from "react-icons/hi";
import { Product, Dimensions, Review } from "@/lib/types/products";
import { getProductById } from "@/lib/api/products";  



export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-purple-700" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-xl p-6 text-center text-red-600">
        Failed to load product details
      </div>
    );
  }

  const finalPrice = product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 lg:px-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        Home / {product.category} / {product.brand} / <span className="font-semibold text-gray-800">{product.title}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="mb-4 overflow-hidden rounded-2xl bg-gray-50">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="h-[400px] w-full object-contain p-8"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 overflow-hidden rounded-lg border-2 ${selectedImage === index ? 'border-purple-600' : 'border-gray-200'}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-purple-700">
              {product.brand}
            </h2>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{product.reviews.length} reviews</span>
              <span className="text-gray-400">•</span>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${finalPrice.toFixed(2)}
              </span>
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                -{product.discountPercentage}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-green-600">
                You save ${(product.price - finalPrice).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-6 border-t border-b border-gray-200 py-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                <FcMinus />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                <HiPlusSm />
                </button>
              </div>
              <button
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800"
                disabled={product.stock === 0}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Only <span className="font-semibold text-purple-700">{product.stock}</span> items left!
              Don&apos;t miss it.
            </p>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-600">{product.shippingInformation}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="font-semibold">Warranty</h4>
                <p className="text-sm text-gray-600">{product.warrantyInformation}</p>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="font-semibold">Return Policy</h4>
              <p className="text-sm text-gray-600">{product.returnPolicy}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Reviews */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {/* Specifications */}
        <div className="rounded-xl border border-gray-200 p-6">
          <h3 className="mb-4 text-xl font-bold">Product Specifications</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 py-3">
              <span className="font-medium text-gray-600">Brand</span>
              <span className="font-semibold">{product.brand}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-3">
              <span className="font-medium text-gray-600">Category</span>
              <span className="font-semibold">{product.category}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-3">
              <span className="font-medium text-gray-600">Dimensions</span>
              <span className="font-semibold">
                {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 py-3">
              <span className="font-medium text-gray-600">Availability</span>
              <span className="font-semibold text-green-600">{product.availabilityStatus}</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="rounded-xl border border-gray-200 p-6">
          <h3 className="mb-4 text-xl font-bold">Customer Reviews ({product.reviews.length})</h3>
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center font-semibold text-purple-700">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.reviewerName}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="mt-4 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}