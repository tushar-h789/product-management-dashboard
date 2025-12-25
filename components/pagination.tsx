"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showPageInfo?: boolean;
  className?: string;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
  showPageInfo = true,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    pages.push(1);

    // Calculate start and end of visible range
    let start = Math.max(2, currentPage - halfVisible);
    let end = Math.min(totalPages - 1, currentPage + halfVisible);

    // Adjust if we're near the start
    if (currentPage <= halfVisible + 1) {
      end = Math.min(maxVisiblePages, totalPages - 1);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - halfVisible) {
      start = Math.max(2, totalPages - maxVisiblePages + 1);
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("ellipsis");
    }

    // Add visible page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 py-6",
        className
      )}
    >
      {/* Page Info */}
      {showPageInfo && (
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">{startItem}</span> to{" "}
          <span className="font-semibold text-gray-900">{endItem}</span> of{" "}
          <span className="font-semibold text-gray-900">{totalItems}</span>{" "}
          results
        </div>
      )}

      {/* Pagination Controls */}
      <nav
        className="flex items-center gap-1"
        aria-label="Pagination Navigation"
      >
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className={cn(
            "flex items-center justify-center h-10 px-3 rounded-lg border border-gray-300",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
            currentPage === 1
              ? "bg-gray-50 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 cursor-pointer"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline ml-1">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center h-10 w-10 text-gray-400"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center justify-center min-w-10 h-10 px-3 rounded-lg",
                  "transition-all duration-200",
                  "font-medium text-sm",
                  isActive
                    ? "bg-purple-700 text-white shadow-md hover:bg-purple-800"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 cursor-pointer"
                )}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className={cn(
            "flex items-center justify-center h-10 px-3 rounded-lg border border-gray-300",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
            currentPage === totalPages
              ? "bg-gray-50 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 cursor-pointer"
          )}
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
}
