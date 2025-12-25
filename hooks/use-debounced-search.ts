"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "@/lib/utils";

export interface UseDebouncedSearchOptions {
  debounceDelay?: number;
  initialValue?: string;
  onSearchChange?: (value: string) => void;
}

export interface UseDebouncedSearchReturn {
  inputValue: string;
  searchValue: string;
  isSearching: boolean;
  handleChange: (value: string) => void;
  clearSearch: () => void;
  setSearchValue: (value: string) => void;
}

export function useDebouncedSearch(
  options: UseDebouncedSearchOptions = {}
): UseDebouncedSearchReturn {
  const { debounceDelay = 300, initialValue = "", onSearchChange } = options;

  const [inputValue, setInputValue] = useState(initialValue);
  const [searchValue, setSearchValue] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);

  // Create debounced function for search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
      setIsSearching(false);
      onSearchChange?.(value);
    }, debounceDelay),
    [debounceDelay, onSearchChange]
  );

  // Handle input change
  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
      setIsSearching(true);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setInputValue("");
    setSearchValue("");
    setIsSearching(false);
    onSearchChange?.("");
  }, [onSearchChange]);

  // Sync searchValue when setSearchValue is called
  const setSearchValueDirect = useCallback(
    (value: string) => {
      setInputValue(value);
      setSearchValue(value);
      setIsSearching(false);
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  return {
    inputValue,
    searchValue,
    isSearching,
    handleChange,
    clearSearch,
    setSearchValue: setSearchValueDirect,
  };
}
