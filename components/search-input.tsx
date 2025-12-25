"use client";

import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  isLoading = false,
  showClearButton = true,
  onClear,
  className,
  inputClassName,
  disabled = false,
  autoFocus = false,
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  const hasValue = value.trim().length > 0;
  const showClear = showClearButton && hasValue && !isLoading;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        {/* Search Icon */}
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={cn(
            "w-full pl-10 pr-10 py-3",
            "border border-gray-300 rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            "disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500",
            "transition-colors duration-200",
            inputClassName
          )}
          aria-label="Search input"
          aria-busy={isLoading}
        />

        {/* Right side icons container */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {/* Loading Indicator */}
          {isLoading && (
            <Loader2
              className="h-5 w-5 text-purple-700 animate-spin"
              aria-label="Searching..."
            />
          )}

          {/* Clear Button */}
          {showClear && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
              title="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
