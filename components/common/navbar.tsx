"use client";
import { useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';

export default function BeautyologyHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-700 rounded-full flex items-center justify-center">
                <span className="text-purple-700 text-xs font-bold">B</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-purple-900 tracking-wide">
              BEAUTYOLOGY
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-purple-700 text-white rounded-r-lg hover:bg-purple-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart and Auth Buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Cart Button */}
            <button className="flex items-center gap-2 text-purple-900 hover:text-purple-700 transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </button>

            {/* Auth Button */}
            <button
              onClick={handleAuthClick}
              className="flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">
                {isLoggedIn ? 'Log In' : 'Sign Up'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}