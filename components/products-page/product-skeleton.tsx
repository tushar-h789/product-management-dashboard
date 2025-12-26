export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200" />

      <div className="p-4">
        {/* Category and Price Skeleton */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-9 w-24 bg-gray-200 rounded-lg" />
          <div className="h-9 w-28 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
