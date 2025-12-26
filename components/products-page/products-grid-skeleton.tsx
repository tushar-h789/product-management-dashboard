import ProductCardSkeleton from "./product-skeleton";

interface ProductsGridSkeletonProps {
  count?: number;
  className?: string;
}

export default function ProductsGridSkeleton({
  count = 8,
  className = "",
}: ProductsGridSkeletonProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
