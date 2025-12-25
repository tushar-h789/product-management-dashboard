"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BeautyologyHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Left Side */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-purple-700 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 text-xs font-bold">B</span>
                </div>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-900 tracking-wide">
                BEAUTYOLOGY
              </h1>
            </Link>

            {/* Navigation Links - Center (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors duration-200",
                    isActive(link.href)
                      ? "text-purple-700 bg-purple-50"
                      : "text-gray-700 hover:bg-gray-100 hover:text-purple-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Sign In Button - Right Side */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors text-sm sm:text-base font-medium">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors z-50 relative"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu - Overlay */}
      <nav
        className={cn(
          "fixed top-16 md:top-20 left-0 right-0 bg-white border-b border-gray-200 z-40 lg:hidden",
          "transform transition-transform duration-300 ease-in-out",
          "overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-5rem)]",
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4">
          <div className="flex flex-col gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200",
                  isActive(link.href)
                    ? "text-purple-700 bg-purple-50"
                    : "text-gray-700 hover:bg-gray-100 hover:text-purple-700"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
