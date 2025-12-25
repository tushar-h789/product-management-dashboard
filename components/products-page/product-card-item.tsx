"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductCardItemProps } from "@/lib/types/products";


export default function ProductCardItem({ product }: ProductCardItemProps) {
  // Use thumbnail if available, otherwise use first image
  const imageUrl =
    product.thumbnail || (product.images && product.images[0]) || "";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative bg-gray-100">
        <Image
          src={imageUrl as string}
          alt={product.title}
          className="w-full h-48 object-contain"
          width={100}
          height={100}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
            {product.category}
          </span>
          <span className="text-2xl font-bold text-purple-700">
            ${product.price}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <button className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors text-sm font-medium">
            Buy Now
          </button>
          <Link href={`/products/details?id=${product.id}`}>
            <button className="px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-800 hover:text-white transition-colors text-sm font-medium">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
