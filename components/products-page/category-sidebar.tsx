"use client";

import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategorySidebarProps } from "@/lib/types/products";


export default function CategorySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (category: string | null) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-purple-700" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Filter by Category
        </h2>
      </div>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-left">
            <span className="text-sm sm:text-base text-gray-700 font-medium cursor-pointer truncate pr-2">
              {selectedCategory ? selectedCategory : "All Categories"}
            </span>
            <ChevronDown
              className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform shrink-0 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto cursor-pointer">
          <DropdownMenuItem
            onClick={() => handleCategorySelect(null)}
            className={`cursor-pointer ${
              !selectedCategory
                ? "bg-purple-50 text-purple-700 hover:bg-purple-100 cursor-pointer"
                : ""
            }`}
          >
            All Categories
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`cursor-pointer ${
                selectedCategory === category
                  ? "bg-purple-50 text-purple-700 hover:bg-purple-500"
                  : ""
              }`}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedCategory && (
        <button
          onClick={() => handleCategorySelect(null)}
          className="mt-3 sm:mt-4 w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-700 hover:text-purple-800 font-medium hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
        >
          Clear Filter
        </button>
      )}

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600">
          {selectedCategory ? (
            <>
              Filtering by:{" "}
              <span className="font-semibold text-purple-700">
                {selectedCategory}
              </span>
            </>
          ) : (
            <>Showing all categories</>
          )}
        </p>
      </div>
    </div>
  );
}
